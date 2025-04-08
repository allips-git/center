/**
 * @description 쿠폰 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData } from '@/assets/js/function';

interface List {
    cpCd    : number;
    cpNm    : string;
    val     : string;
    unit    : string;
}

interface Info {
    cpNm    : string;
    unit    : P | F; /** P : 퍼센트 / F : 금액 */
    val     : null | number;
}

interface Msg {
    cpNm    : string;
    val     : string;
}

interface State {
    type    : I | U;  /** I : 등록 / U : 수정 */
    cpCd    : null | number;
    list    : List[];
    info    : Info;
    more    : boolean;
    msg     : Msg;
    start   : number;
}

const getInfo = (): Info => {
    return {
        cpNm    : '',
        unit    : 'F',
        val     : null
    }
}

const getMsg = (): Msg => {
    return {
        cpNm    : '',
        val     : ''
    }
}

export const useCouponStore = defineStore('coupon', {
    state: (): State => ({
        type    : 'I',
        cpCd    : null,
        list    : [],
        info    : getInfo(),
        more    : true,
        msg     : getMsg(),
        start   : 0
    }),
    actions : {
        async getList()
        {
            try
            {
                const params    = {
                    start : this.start
                };

                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/couponV1/getList`, params);
                const list      = [];

                console.log(res);
                
                res.data['list'].map(item => {
                    list.push({
                        cpCd    : item['cpCd'],
                        cpNm    : item['cpNm'],
                        val     : item['val'],
                        unit    : item['unit'] === 'P' ? '%' : '원'
                    });
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
                const params    = {
                    cpCd : this.cpCd
                };

                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/couponV1/getInfo`, params);

                console.log(res);

                this.info.cpNm  = res.data['info']['cpNm'];
                this.info.unit  = res.data['info']['unit'];
                this.info.val   = res.data['info']['val'];
            }
            catch(e)
            {
                console.log(e);
            }
        },
        getCpCd(cpCd: number)
        {
            this.type = 'U';
            this.cpCd = cpCd;
        },
        getUnit(unit: P | F)
        {
            this.info.unit = unit;

            if(unit === 'P')
            {
                if(this.info.val > 100)
                {
                    this.info.val = 100;
                }
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
        }
    }
});