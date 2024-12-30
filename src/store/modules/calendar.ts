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
    insTime     : string;
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

interface DayList {
    date        : string;
    dateDay     : number;
    week        : string;
    isToday     : boolean;
    selectDay   : boolean;
}

interface DayEvents {
    emCd        : string;
    clientCd    : string;
    title       : string;
    stCd        : string;
    stNm        : string;
    stDt        : Date;
    insTime     : string;
    classNames  : string;
}

interface Person {
    value : string;
    label : string;
}

interface History {
    ikey    : number;
    emCd    : string;
    name    : string;
    stDt    : string;
    stNm    : string;
}

interface Info {
    stCd        : string;
    clientNm    : string;
    estiPerson  : string;
    estiDt      : string;
    deliPerson  : string;
    deliDt      : string;
    history     : History[];
}

interface State {
    searchDt    : Date;
    emCd        : string;
    monthEvents : MonthEvents[];
    monthDetail : MonthDetail;
    dayList     : DayList[];
    daySelIndex : number;
    dayEvents   : DayEvents[];
    person      : Person[];
    info        : Info;
}

const getInfo = (): Info => {
    return {
        stCd        : '',
        clientNm    : '',
        estiPerson  : '',
        estiDt      : '',
        deliPerson  : '',
        deliDt      : '',
        history     : []
    }
}

export const useCalendarStore = defineStore('calendar', {
    state: (): State => ({
        searchDt    : new Date(),
        emCd        : '',
        monthEvents : [],
        monthDetail : {
            date : getConvertDate(new Date(), 'monthCalendar'),
            list : []
        },
        dayList     : [],
        daySelIndex : 0,
        dayEvents   : [],
        person      : [],
        info        : getInfo()
    }),
    getters : {
        initialDate : (state) => getConvertDate(state.searchDt, 'yyyy-mm-dd')
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

                this.person = res.data['person'];

                const info  = {
                    stCd        : res.data['stCd'],
                    clientNm    : res.data['clientNm'],
                    estiPerson  : res.data['info']['estiPerson'],
                    estiDt      : new Date(res.data['info']['estiDt']),
                    deliPerson  : res.data['info']['deliPerson'],
                    deliDt      : res.data['info']['deliDt'] !== '' ? new Date(res.data['info']['deliDt']) : '',
                    history     : res.data['history'].map(item => {
                        return {
                            ikey    : item['ikey'],
                            emCd    : item['emCd'],
                            name    : item['name'],
                            stDt    : item['stDt'],
                            stNm    : item['stNm']
                        }
                    })
                }

                this.info = info;

                console.log(this.info);
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
        async getDayData()
        {
            const params = {
                date : getConvertDate(new Date(this.searchDt), 'yyyy-mm-dd')
            };

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/calendarV1/getDayData`, params);

                this.dayEvents = res.data['list'].map(item => {
                    const startDt   = new Date(item['stDt'] + '+09:00');
                    const endDt     = new Date(item['stDt'] + '+09:00');
                    const insTime   = item['insTime'] !== '' ? item['insTime'] : '0:0';

                    const [hours, minutes] = insTime.split(':').map(Number);

                    endDt.setHours(endDt.getHours() + hours);
                    endDt.setMinutes(endDt.getMinutes() + minutes);

                    /** 
                     * @description 날짜는 금일로 고정하여 시간 데이터만 변경하여 표기 => 일자를 변경 시 fullcalendar를 컴포넌트에서 계속 재랜더링 안하기 위해 강제 처리
                     */
                    const sDt = getConvertDate(new Date(), 'yyyy-mm-dd')+'T'+getConvertDate(startDt, 'hh:ii');
                    const eDt = getConvertDate(new Date(), 'yyyy-mm-dd')+'T'+getConvertDate(endDt, 'hh:ii');

                    return {
                        emCd        : item.emCd,
                        clientCd    : item.clientCd,
                        title       : item.title,
                        stCd        : item.stCd,
                        stNm        : item.stNm,
                        start       : sDt,
                        end         : item.stCd === '001' ? null : eDt,
                        classNames  : item.classNames
                    }
                });
            }
            catch(e)
            {
                console.log(e);
            }
        },
        getSearchDt(newDate: Date)
        {
            this.searchDt   = newDate;
        },
        getEmCd(emCd: string)
        {
            this.emCd = emCd;
        },
        getDayListSet()
        {
            const year  = this.searchDt.getFullYear();
            const month = this.searchDt.getMonth();

            const firstDay  = new Date(year, month, 1);
            const lastDay   = new Date(year, month + 1, 0);
            const dayList   = [];

            const weekStr = ['일', '월', '화', '수', '목', '금', '토'];

            for (let day = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) 
            {
                dayList.push({
                    date        : getConvertDate(new Date(day), 'yyyy-mm-dd'),
                    dateDay     : day.getDate(),
                    week        : weekStr[day.getDay()],
                    isToday     : getConvertDate(new Date(), 'yyyy-mm-dd') === getConvertDate(new Date(day), 'yyyy-mm-dd') ? true : false,
                    selectDay   : getConvertDate(new Date(), 'yyyy-mm-dd') === getConvertDate(new Date(day), 'yyyy-mm-dd') ? true : false
                });
            }

            this.dayList        = dayList;
            this.daySelIndex    = this.dayList.findIndex(item => item.date === getConvertDate(new Date(this.searchDt), 'yyyy-mm-dd')) === -1 ? 0 : this.dayList.findIndex(item => item.date === getConvertDate(new Date(this.searchDt), 'yyyy-mm-dd'));
        },
        getDayChoiceSet(index: number)
        {
            this.daySelIndex = index;
        }
    }
});