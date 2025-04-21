/**
 * @description 카카오 플랜톡 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData } from '@/assets/js/function';

// type Nullable<T>    = T | null;
// type AmtUnitType    = 'F' | 'P'; /** F : 금액(원) / P : %(퍼센트) */

// interface AmtInfo {
//     saleAmt     : number;
//     purcAmt     : number;
//     marginAmt   : number;
// }

// const getAmtInfo = (): AmtInfo => ({
//     saleAmt : 0,
//     purcAmt : 0,
//     margin  : 0
// });

interface MonthList {
    date    : string;
    waitAmt : number;
    saleAmt : number;
    purcAmt : number;
    rev     : number;
    margin  : number;
}

interface WeekList {
    date    : string;
    week    : number;
    waitAmt : number;
    saleAmt : number;
    purcAmt : number;
    rev     : number;
    margin  : number;
}

interface DayList {
    emCd        : string;
    clientNm    : string;
    stCd        : string;
    stNm        : string;
    addr        : string;
    addrDetail  : string;
    saleAmt     : number;
    purcAmt     : number;
    rev         : number;
}

interface State {
    searchDt : Date;
}

export const useKakaoStore = defineStore('kakao', {
    state: (): State => ({
        searchDt : new Date()
    }),
    getters : {
        year : (state) => state.searchDt.getFullYear()
    },
    actions : {
        async getList(params)
        {
            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/accV1/getList`, params);

                console.log(res);
            }
            catch(e)
            {
                console.log(e);
            }
        }
    }
});