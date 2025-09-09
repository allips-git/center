/**
 * @description 실측 데이터 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData } from '@/assets/js/function';

// type Nullable<T>    = T | null;
// type AmtUnitType    = 'F' | 'P'; /** F : 금액(원) / P : %(퍼센트) */

interface List {
    num         : number;
    amCd        : string;
    amNm        : string;
    zip         : string;
    addr        : string;
    addrDetail  : string;
}

interface Info {
    regDt       : date;
    amNm        : string;
    zip         : string;
    addr        : string;
    addrDetail  : string;
    memo        : string;
}

interface Detail {
    
}

interface Msg {
    amNm : string;
}

interface State {
    type        : 'I' | 'U';
    search      : string;
    amCd        : string;
    list        : List[];
    info        : Info;
    detail      : Detail[];
    loading     : boolean;
    start       : number;
}

const getInfo = (): Info => {
    return {
        regDt       : new Date(),
        amNm        : '',
        zip         : '',
        addr        : '',
        addrDetail  : '',
        memo        : ''
    }
}

const getMsg = (): Msg => {
    return {
        amNm : ''
    }
}

export const useActualStore = defineStore('actual', {
    state: (): State => ({
        type        : 'I',
        amCd        : '',
        search      : '',
        list        : [],
        info        : getInfo(),
        detail      : [],
        msg         : getMsg(),
        loading     : true,
        start       : 0
    }),
    actions : {
        async getList()
        {
            const params = {
                search : this.search,
                start  : this.start
            };

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/actualV1/getList`, params);

                console.log(res);

                this.list       = this.list.concat(res.data.list);
                this.start      += 20;

                if(res.data['list'].length < 20)
                {
                    this.loading = false;
                }
            }
            catch(e)
            {
                console.log(e);
            }
        },
        async getInfo()
        {
            const params = {
                amCd : this.amCd
            };

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/actualV1/getInfo`, params);

                console.log(res);

                const info = {
                    regDt       : new Date(res.data.info.regDt),
                    amNm        : res.data.info.amNm,
                    zip         : res.data.info.zip,
                    addr        : res.data.info.addr,
                    addrDetail  : res.data.info.addrDetail,
                    memo        : res.data.info.memo
                };

                this.info = info;
            }
            catch(e)
            {
                console.log(e);
            }
        },
        async getDetail()
        {
            const params = {
                amCd : this.amCd
            };

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/actualV1/getDetail`, params);

                this.detail = res.data.detail.map(item => {
                    return {
                        adCd        : item.adCd,
                        itemCd      : item.itemCd,
                        itemNm      : item.itemCd === 'EX000001' ? '커튼 실측' : '블라인드 실측',
                        setLocate   : item.setLocate,
                        width       : item.width,
                        height      : item.height,
                        leftQty     : item.leftQty,
                        rightQty    : item.rightQty,
                        qty         : item.qty,
                        size        : item.size,
                        division    : item.division,
                        split       : item.split,
                        shape       : item.shape,
                        proc        : item.proc,
                        bproc       : item.bproc,
                        spec        : item.division === 'D' || item.division === 'A' ? JSON.parse(item.spec) : []
                    }
                });
            }
            catch(e)
            {
                console.log(e);
            }
        },
        getAmCd(amCd: string)
        {
            this.type = 'U';
            this.amCd = amCd;
        },
        getMsgSet(msg: string, name: string)
        {
            this.msg        = getMsg();
            this.msg[name]  = msg;
        },
        getListReset()
        {
            this.list   = [];
            this.start  = 0;
        },
        getReset()
        {
            this.type   = 'I';
            this.msg    = getMsg();
            this.info   = getInfo();
        }
    }
});