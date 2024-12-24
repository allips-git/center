/**
 * @description 통계 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData, getConvertDate } from '@/assets/js/function';

interface ClientRank {
    clientCd : string;
    clientNm : string;
    amt      : number;
}

interface State {
    searchDt    : string;
    totalAmt    : number;
    saleAmt     : number;
    purcAmt     : number;
    fixedAmt    : number;
    clientRank  : ClientRank[];
}

export const useAverageStore = defineStore('average', {
    state: (): State => ({
        searchDt    : new Date(),
        totalAmt    : 0,
        saleAmt     : 0,
        purcAmt     : 0,
        fixedAmt    : 0,
        clientRank  : [],
    }),
    getters : {
        totalAmount: (state) => {
            return state.saleAmt + state.purcAmt + state.fixedAmt;
        },
        saleAmtPercent: (state) => {
            const total = state.saleAmt + state.purcAmt + state.fixedAmt;
            return total ? ((state.saleAmt / total) * 100).toFixed(2) + '%' : '0%';
        },
        purcAmtPercent: (state) => {
            const total = state.saleAmt + state.purcAmt + state.fixedAmt;
            return total ? ((state.purcAmt / total) * 100).toFixed(2) + '%' : '0%';
        },
        fixedAmtPercent: (state) => {
            const total = state.saleAmt + state.purcAmt + state.fixedAmt;
            return total ? ((state.fixedAmt / total) * 100).toFixed(2) + '%' : '0%';
        },
        saleAmtFraction: (state) => {
            const total = state.saleAmt + state.purcAmt + state.fixedAmt;
            return total ? Math.round((state.saleAmt / total) * 5) : 0;
        },
        purcAmtFraction: (state) => {
            const total = state.saleAmt + state.purcAmt + state.fixedAmt;
            return total ? Math.round((state.purcAmt / total) * 5) : 0;
        },
        fixedAmtFraction: (state) => {
            const total = state.saleAmt + state.purcAmt + state.fixedAmt;
            return total ? Math.round((state.fixedAmt / total) * 5) : 0;
        }
    },
    actions : {
        async getData()
        {
            const params = {
                searchDt : getConvertDate(this.searchDt, 'yyyymm')
            };

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/averageV1/getData`, params);

                console.log(res);
                this.totalAmt   = res.data['totalAmt'];
                this.saleAmt    = Number(res.data['summary']['saleAmt']);
                this.purcAmt    = Number(res.data['summary']['purcAmt']);
                this.fixedAmt   = Number(res.data['summary']['fixedAmt']);

                this.clientRank = res.data['clientRank'];
            }
            catch(e)
            {
                console.log(e);
            }
        }
    }
});