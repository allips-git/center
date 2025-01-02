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

interface PayList {
    codeSub : string;
    codeNm  : string;
    cnt     : number;
    amt     : number;
}

interface KeywordList {
    codeSub : string;
    codeNm  : string;
    cnt     : number;
    amt     : number;
}

interface State {
    searchDt    : string;
    totalAmt    : number;
    saleAmt     : number;
    purcAmt     : number;
    fixedAmt    : number;
    clientRank  : ClientRank[];
    payList     : PayList[];
    keywordList : KeywordList[];
}

export const useAverageStore = defineStore('average', {
    state: (): State => ({
        searchDt    : new Date(),
        totalAmt    : 0,
        saleAmt     : 0,
        purcAmt     : 0,
        fixedAmt    : 0,
        clientRank  : [],
        payList     : [],
        keywordList : []
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
        keywordNmList: (state) => {
            return state.keywordList.map(item => item.codeNm);
        },
        accountPercent: (state) => {
            const total = state.payList.reduce((acc, cur) => acc + Number(cur.amt), 0);
            console.log(state.payList.find(item => item.codeSub === '001'));
            return total ? ((Number(state.payList.find(item => item.codeSub === '001')['amt']) / total) * 100).toFixed(2) + '%' : '0%';
        },
        cashPercent: (state) => {
            const total = state.payList.reduce((acc, cur) => acc + Number(cur.amt), 0);
            return total ? ((Number(state.payList.find(item => item.codeSub === '002')['amt']) / total) * 100).toFixed(2) + '%' : '0%';
        },
        cardPercent: (state) => {
            const total = state.payList.reduce((acc, cur) => acc + Number(cur.amt), 0);
            return total ? ((Number(state.payList.find(item => item.codeSub === '003')['amt']) / total) * 100).toFixed(2) + '%' : '0%';
        },
        keywordValList: (state) => {
            return state.keywordList.map(item => Number(item.cnt));
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
                this.totalAmt       = res.data['totalAmt'];
                this.saleAmt        = Number(res.data['summary']['saleAmt']);
                this.purcAmt        = Number(res.data['summary']['purcAmt']);
                this.fixedAmt       = Number(res.data['summary']['fixedAmt']);

                this.clientRank     = res.data['clientRank'];
                this.payList        = res.data['payGb'];
                this.keywordList    = res.data['unitGb'];
            }
            catch(e)
            {
                console.log(e);
            }
        }
    }
});