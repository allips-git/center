/**
 * @description 일정 관련련 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData, getConvertDate } from '@/assets/js/function';

interface MonthEvents {
    emCd        : string;
    clientCd    : string;
    title       : string;
    stCd        : string;
    stNm        : string;
    stDt        : Date;
    classNames  : string;
}

interface DetailList {
    clientNm : string;
    time     : string;
}

interface MonthDetail {
    date : string;
    list : DetailList[];
}

interface State {
    searchDt    : Date;
    emCd        : string;
    monthEvents : MonthEvents[];
    monthDetail : MonthDetail;
}

export const useCalendarStore = defineStore('calendar', {
    state: (): State => ({
        searchDt    : new Date(),
        emCd        : '',
        monthEvents : [],
        monthDetail : {
            date : getConvertDate(new Date(), 'monthCalendar'),
            list : []
        }
    }),
    getters : {
    },
    actions : {
        async getInfo()
        {
            const params = {
                emCd : this.emCd
            };

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/calendarV1/getInfo`, params);

                console.log(res);
            }
            catch(e)
            {
                console.log(e);
            }            
        },
        async getMonthData()
        {
            const params = {
                date : getConvertDate(new Date(this.searchDt), 'yyyymm')
            };

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/calendarV1/getMonthData`, params);

                console.log(res);

                this.monthEvents = res.data['list'];
            }
            catch(e)
            {
                console.log(e);
            }
        },
        getMonthDetail(date: string)
        {
            this.monthDetail['date'] = getConvertDate(new Date(date), 'monthCalendar');
            this.monthDetail['list'] = this.monthEvents.filter(item => item.start === date).map((data) => {
                const startDt = new Date(data['stDt']);
                const endDt   = new Date(data['stDt']);
                const insTime = data['insTime'] !== '' ? data['insTime'] : '0:0';

                const [hours, minutes] = insTime.split(':').map(Number);

                endDt.setHours(endDt.getHours() + hours);
                endDt.setMinutes(endDt.getMinutes() + minutes);

                return {
                    emCd        : data['emCd'],
                    clientNm    : data['title'],
                    startTime   : getConvertDate(startDt, 'monthCalendarInfo'),
                    endTime     : getConvertDate(endDt, 'monthCalendarInfo'),
                    stNm        : data['stCd'] === '001' ? '견적' : '시공',
                    stCd        : data['stCd']
                }
            });
        },
        getSearchDt(newDate: Date)
        {
            this.searchDt           = newDate;
            this.calendarOptions    = { 
                ...this.calendarOptions, initialDate: getConvertDate(new Date(this.searchDt), 'yyyy-mm-dd')
            };
        },
        getEmCd(emCd: string)
        {
            this.emCd = emCd;
        }
    }
});