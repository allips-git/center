/**
 * @description 회계 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData, getConvertDate } from '@/assets/js/function';

interface MainHeader {
    saleAmt    : number;
    purcAmt    : number;
    margin     : number;
}

interface DateList {
    stDt    : string;
}

interface List {
    emCd        : string;
    stDt        : string;
    clientNm    : string;
    addr        : string;
    addrDetail  : string;
    totalSaleAmt: number;
    totalPurcAmt: number;
    rev         : number;
}

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
    searchDt    : Date;
    stCd        : string;
    mainHeader  : MainHeader;
    dateList    : DateList[];
    list        : List[];
    monthList   : MonthList[];
    weekData    : [];
    weekList    : WeekList[];
    dayList     : DayList[];
    start       : number;
}

const getMainHeader = (): MainHeader => {
    return {
        saleAmt : 0,
        purcAmt : 0,
        margin  : 0
    }
}

export const useAccStore = defineStore('acc', {
    state: (): State => ({
        searchDt    : new Date(),
        stCd        : '003',
        mainHeader  : getMainHeader(),
        dateList    : [],
        list        : [],
        monthList   : [],
        weekData    : [],
        weekList    : [],
        dayList     : [],
        start       : 0
    }),
    getters : {
        year            : (state) => state.searchDt.getFullYear(),
        month           : (state) => state.searchDt.getMonth() + 1,
        monthSaleAmt    : (state) => state.monthList.reduce((acc, cur) => acc + Number(cur.saleAmt), 0),
        monthPurcAmt    : (state) => state.monthList.reduce((acc, cur) => acc + Number(cur.purcAmt), 0),
        monthMargin     : (state) => {
            const saleAmt = state.monthList.reduce((acc, cur) => acc + Number(cur.saleAmt), 0);
            const purcAmt = state.monthList.reduce((acc, cur) => acc + Number(cur.purcAmt), 0);

            return saleAmt === 0 ? 100 : Math.round(((saleAmt - purcAmt) / saleAmt) * 100);
        },
        weekSaleAmt     : (state) => state.weekList.reduce((acc, cur) => acc + Number(cur.saleAmt), 0),
        weekPurcAmt     : (state) => state.weekList.reduce((acc, cur) => acc + Number(cur.purcAmt), 0),
        weekMargin      : (state) => {
            const saleAmt = state.weekList.reduce((acc, cur) => acc + Number(cur.saleAmt), 0);
            const purcAmt = state.weekList.reduce((acc, cur) => acc + Number(cur.purcAmt), 0);

            return saleAmt === 0 ? 100 : Math.round(((saleAmt - purcAmt) / saleAmt) * 100);
        },
        daySaleAmt     : (state) => state.dayList.reduce((acc, cur) => acc + Number(cur.saleAmt), 0),
        dayPurcAmt     : (state) => state.dayList.reduce((acc, cur) => acc + Number(cur.purcAmt), 0),
        dayMargin      : (state) => {
            const saleAmt = state.dayList.reduce((acc, cur) => acc + Number(cur.saleAmt), 0);
            const purcAmt = state.dayList.reduce((acc, cur) => acc + Number(cur.purcAmt), 0);

            return saleAmt === 0 ? 100 : Math.round(((saleAmt - purcAmt) / saleAmt) * 100);
        }
    },
    actions : {
        async getAccAll()
        {
            const params = {
                stCd  : this.stCd,
                start : this.start
            }

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/accV1/getAccAll`, params);

                console.log(res);
                this.mainHeader = res.data['amt'];
                this.dateList   = res.data['date'];
                this.list       = res.data['list'];
            }
            catch(e)
            {
                console.log(e);
            }
        },
        async getMonData()
        {
            const params = {
                year : this.searchDt.getFullYear()
            };

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/accV1/getAccMonth`, params);

                console.log(res);

                this.monthList  = res.data['list'];
            }
            catch(e)
            {
                console.log(e);
            }
        },
        async getWeekData()
        {
            const params = {
                year    : this.searchDt.getFullYear(),
                month   : this.searchDt.getMonth() + 1
            };

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/accV1/getAccWeek`, params);

                console.log(res);

                this.weekData  = res.data['week'];
                this.weekList  = res.data['list'];
            }
            catch(e)
            {
                console.log(e);
            }
        },
        async getDayData()
        {
            const params = {
                dt : getConvertDate(new Date(this.searchDt), 'yyyy-mm-dd')
            };

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/accV1/getAccDay`, params);

                this.dayList    = res.data['list'];
            }
            catch(e)
            {
                console.log(e);
            }
        },
        getSearchDt(dt: string)
        {
            this.searchDt = new Date(dt);
        },
        getStCd(stCd: string)
        {
            this.stCd = stCd;
        }
    }
});