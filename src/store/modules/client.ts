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
}

interface State {
    search  : string;
    stCd    : string;
    list    : List[];
    info    : Info;
    start   : number;
}

const getInfo = (): Info => {
    return {
        estiDt      : '',
        clientNm    : '',
        tel         : null,
        zip         : null,
        addr        : '',
        addrDetail  : '',
        person      : '',
        groupCd     : '',
    }
}

export const useClientStore = defineStore('client', {
    state: (): State => ({
        search  : '',
        stCd    : '',
        list    : [],
        info    : getInfo(),
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
        async getInfo()
        {
            console.log('info');
        }
    }
});