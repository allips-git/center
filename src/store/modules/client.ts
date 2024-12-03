/**
 * @description 고객 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData, getConvertDate } from '@/assets/js/function';

interface List {
    step        : number;
    clientCd    : string;
    clientNm    : string;
    tel         : number;
    addr        : string;
    addrDetail  : string;
    date        : string;
    amt         : number;
}

interface Info {
    estiDt      : string;
    clientNm    : string;
    tel         : null | number;
    zip         : null | number;
    addr        : string;
    addrDetail  : string;
    person      : string;
    groupCd     : string;
    groupNm     : string;
}

interface Select {
    label   : string;
    value   : string;
}

interface Msg {
    clientNm    : string;
    tel         : string;
    addr        : string;
    person      : string;
    groupNm     : string;
}

interface State {
    type    : string;
    search  : string;
    stCd    : string;
    list    : List[];
    info    : Info;
    person  : Select[];
    group   : Select[];
    msg     : Msg;
    start   : number;
}

const getInfo = (): Info => {
    return {
        estiDt      : new Date(),
        clientNm    : '',
        tel         : null,
        zip         : null,
        addr        : '',
        addrDetail  : '',
        person      : '',
        groupCd     : 'N',
        groupNm     : ''
    }
}

const getMsg = (): Msg => {
    return {
        clientNm    : '',
        tel         : '',
        addr        : '',
        person      : '',
        groupNm     : ''
    }
}

export const useClientStore = defineStore('client', {
    state: (): State => ({
        type    : 'I',
        search  : '',
        stCd    : '',
        list    : [],
        info    : getInfo(),
        person  : [],
        group   : [{ value : 'N', label : '신규입력' }],
        msg     : getMsg(),
        start   : 0
    }),
    actions: {
        async getList()
        {
            const params = {
                search : this.search,
                stCd   : this.stCd,
                start  : this.start
            };

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/clientV1/getList`, params);

                console.log(res);

                const list      = [];

                res['data']['list'].map(item => {
                    let step = 1;

                    switch(item.stCd)
                    {
                        case '001':
                            step = 1;
                        break;
                        case '002':
                            step = 2;
                        break;
                        case '003':
                            step = 3;
                        break;
                        case '006':
                            step = 4;
                        break;
                        case '011':
                            step = 5;
                        break;
                        case 'N':
                            step = 6;
                        break;
                    }

                    list.push({
                        step        : step,
                        clientCd    : item.clientCd,
                        clientNm    : item.clientNm,
                        tel         : item.tel,
                        addr        : item.addr ,
                        addrDetail  : item.addrDetail,
                        date        : getConvertDate(new Date(item.regDt), 'yy.mm.dd'),
                        amt         : item.amt
                    });
                })

                this.list = list;
            }
            catch(e)
            {
                console.log(e);
            }
        },
        async getData()
        {
            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/clientV1/getData`);

                this.person = res.data['info']['person'];
                this.group.push(...res.data['info']['group']);

                console.log(this.group);
            }
            catch(e)
            {
                console.log(e);
            }
        },
        async getInfo()
        {
            console.log('info');
        },
        getMsgSet(msg: string, name: string)
        {
            this.msg        = getMsg();
            this.msg[name]  = msg;
        },
        async getReset()
        {
            this.person = [];
            this.group  = [{ value : 'N', label : '신규입력' }];
            this.info   = getInfo();
        }
    }
});