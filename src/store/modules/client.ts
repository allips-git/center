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

interface DetailList {
    clientCd    : string;
    conDt       : string;
    deliConDt   : string;
    deliDt      : string;
    emCd        : string;
    estiDt      : string;
    insTime     : string;
    payDt       : string;
    preDt       : string;
    stCd        : string;
    stNm        : string;
    totalSaleAmt: string;
    useYn       : string;
}

interface Detail {
    clientNm    : string;
    tel         : string;
    zip         : number;
    addr        : string;
    addrDetail  : string;
    regDt       : string;
    person      : string;
    groupNm     : string;
    cnt         : {
        ing     : number;
        comp    : number;
        cancel  : number;
    },
    list        : DetailList[];
}

interface Msg {
    clientNm    : string;
    tel         : string;
    addr        : string;
    person      : string;
    groupNm     : string;
}

interface State {
    gb          : Y | N;
    type        : string;
    search      : string;
    stCd        : string;
    clientCd    : string;
    list        : List[];
    info        : Info;
    person      : Select[];
    group       : Select[];
    msg         : Msg;
    start       : number;
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

const getDetail = (): Detail => {
    return {
        clientNm    : '',
        tel         : '',
        zip         : '',
        addr        : '',
        addrDetail  : '',
        regDt       : '',
        person      : '',
        groupNm     : '',
        cnt         : {
            ing     : 0,
            comp    : 0,
            cancel  : 0 
        },
        list        : []
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
        gb          : 'Y',
        type        : 'I',
        search      : '',
        stCd        : '',
        clientCd    : '',
        list        : [],
        info        : getInfo(),
        detail      : getDetail(),
        person      : [],
        group       : [{ value : 'N', label : '신규입력' }],
        msg         : getMsg(),
        start       : 0
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
            const params = {
                clientCd : this.clientCd
            };

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/clientV1/getInfo`, params);

                console.log(res);

                const info      = res.data['info'];
                info['estiDt']  = new Date(info['estiDt']);

                this.type = 'U';
                this.info = info;
            }
            catch(e)
            {
                console.log(e);
            }
        },
        async getDetail()
        {
            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/clientV1/getDetail`, { clientCd : this.clientCd });

                console.log(res);

                const detail    = {
                    clientNm    : res.data['client']['clientNm'],
                    tel         : res.data['client']['tel'],
                    zip         : res.data['client']['zip'],
                    addr        : res.data['client']['addr'],
                    addrDetail  : res.data['client']['addrDetail'],
                    regDt       : res.data['client']['regDt'],
                    person      : res.data['client']['person'],
                    groupNm     : res.data['client']['groupNm'],
                    cnt         : {
                        ing     : res.data['cnt']['ing'],
                        comp    : res.data['cnt']['comp'],
                        cancel  : res.data['cnt']['cancel'] 
                    },
                    list        : res.data['list']
                }

                this.detail = detail;
            }
            catch(e)
            {
                console.log(e);
            }
        },
        getGb(gb: Y | N)
        {
            this.gb = gb;
        },
        getStCd(stCd: string)
        {
            this.stCd = stCd;
        },
        getMsgSet(msg: string, name: string)
        {
            this.msg        = getMsg();
            this.msg[name]  = msg;
        },
        getDataSet(clientCd: string)
        {
            this.clientCd = clientCd;
        },
        async getReset()
        {
            this.gb     = 'Y';
            this.type   = 'I';
            this.person = [];
            this.group  = [{ value : 'N', label : '신규입력' }];
            this.msg    = getMsg();
            this.info   = getInfo();
        }
    },
    persist: {
        key     : 'client',
        storage : localStorage,
        paths   : ['clientCd']
    }
});