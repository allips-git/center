/**
 * @description 고정비용 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData, getConvertDate } from '@/assets/js/function';

interface List {
    fxCd    : string;
    fxNm    : string;
    fxDt    : string;
    title   : string;
    amt     : number;
}

interface Info {
    title       : string;
    fxDt        : date;
    amt         : null | number;
    fxGb        : string;
    contents    : string;
}

interface State {
    type    : I | U;  /** I : 등록 / U : 수정 */
    fxCd    : string;
    cnt     : number;
    amt     : number;
    list    : List[];
    info    : Info;
    more    : boolean;
    start   : number;
}

const getInfo = (): Info => {
    return {
        title       : '',
        fxDt        : new Date(),
        amt         : null,
        fxGb        : '001',
        contents    : ''
    }
}

export const useCostStore = defineStore('cost', {
    state: (): State => ({
        type    : 'I',
        fxCd    : '',
        cnt     : 0,
        amt     : 0,
        list    : [],
        info    : getInfo(),
        more    : true,
        start   : 0
    }),
    actions : {
        async getData()
        {
            try
            {
                const params    = {
                    start : this.start
                };

                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/staticPayV1/getData`, params);
                const list      = [];

                console.log(res);

                this.cnt = res.data['cnt'];
                this.amt = res.data['amt'];
                
                res.data['list'].map(item => {
                    const data = {
                        fxCd    : item['fxCd'],
                        fxNm    : item['fxNm'],
                        fxDt    : getConvertDate(new Date(item['fxDt']), 'yy.mm.dd'),
                        title   : item['title'],
                        amt     : item['amt']
                    };

                    list.push(data);
                });

                this.list  = [...this.list, ...list];

                this.start = this.start + 20;

                if(res.data['list'] === 0)
                {
                    this.more = false;
                }
            }
            catch(e)
            {
                console.log(e);
            }
        },
        async getInfo()
        {
            try
            {
                this.type = 'U';

                const params = {
                    fxCd : this.fxCd
                };

                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/staticPayV1/getInfo`, params);

                console.log(res);

                const info = {
                    title       : res.data['info']['title'],
                    fxDt        : new Date(res.data['info']['fxDt']),
                    amt         : res.data['info']['amt'],
                    fxGb        : res.data['info']['fxGb'],
                    contents    : res.data['info']['contents']
                };

                this.info = info;
            }
            catch(e)
            {
                console.log(e);
            }
        },
        getInfoReset()
        {
            this.type = 'I';
            this.info = getInfo();
        },
        getListReset()
        {
            this.start = 0;
            this.list  = [];
        },
        getFxCd(fxCd: string)
        {
            this.fxCd = fxCd;
        }
    }
});