<template>
    <main class="time-grid-custom">
        <swiper :slides-per-view="7" :slides-per-group="7">
            <swiper-slide v-for="(item, index) in calendar['dayList']" :key="index" @click="getDayChoice(item.date, index)">
                <div class="flex items-center justify-center h-20 rounded cursor-pointer">
                    <div class="flex flex-col items-center justify-center gap-0.5 relative w-full h-full">
                        <span class="text-xs">{{ item.week }}</span>
                        <div class="flex items-center justify-center text-center rounded-full size-9"
                        :class="{ 'bg-sky-500 text-white': item.isToday,}"
                        >
                            <h3 class="text-2xl font-bold">
                            {{ item.dateDay }}</h3>
                        </div>
                        <span v-if="calendar['daySelIndex'] === index" class="absolute bottom-0 z-10 w-full h-[3px] rounded-full bg-sky-500"></span>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
        <div class="relative z-10 w-full h-[calc(100vh-118px)] md:h-[calc(100vh-178px)]">
            <div class="absolute z-50 flex justify-center -translate-x-1/2 top-4 left-1/2">
                <span class="absolute z-40 -translate-y-1/2 right-4 top-1/2 pi pi-angle-down !text-sm text-gray-400"></span>
                <DatePicker v-model="calendar['searchDt']" dateFormat="yy.mm.d" class="custom-daySelect" showIcon fluid iconDisplay="input"
                    @update:modelValue="(value) => getDatePicker(value)"/>
            </div>
            <FullCalendar :options="{ ... calendarOptions, events : calendar['dayEvents'] }" ref="fullCalendar" />
            <div class="absolute z-50 flex justify-center text-sm -translate-x-1/2 bottom-4 left-1/2">
                <div class="px-5 py-2 bg-white border border-gray-200 rounded-full shadow-sm" @click="calendar.getSearchDt(new Date())">당일</div>
            </div>
        </div>
    </main>
</template>
  
<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';
import DatePicker from 'primevue/datepicker';
import 'swiper/swiper-bundle.css';
import { useConfirm } from "primevue/useconfirm";
import { ref, onMounted, watch } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useCalendarStore } from '@/store';
import { getAxiosData, getConvertDate, getTokenOut } from '@/assets/js/function';

const confirm   = useConfirm();
const calendar  = useCalendarStore();

// 캘린더 옵션 설정
const calendarOptions = {
    plugins             : [interactionPlugin, timeGridPlugin],
    initialView         : 'timeGridDay',
    locale              : koLocale, // 기본 한국어 설정
    headerToolbar       : {
        left    : '',
        center  : '',
        right   : ''
    },
    nowIndicator        : true,
    height              : '100%',
    allDaySlot          : false,
    selectable          : true,
    editable            : true,
    dayMaxEvents        : true,
    initialDate         : getConvertDate(new Date(), 'yyyy-mm-dd'),
    slotLabelFormat     : { hour: '2-digit', minute: '2-digit', hour12: false }, // 24시간제 설정
    snapDuration        : '00:10:00',
    eventContent        : function(arg) {
        return {
            html: ` <div class="text-gray-900 border-0 ${arg.event.classNames.join(' ')}">
                        <strong>${arg.event.title}</strong> <span calss="mx-2">・</span> <span>${arg.event._def.extendedProps['stCd'] === '001' ? '견적' : '시공'}</span> <br />
                        <span>${arg.event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                        <span class="mx-1">${arg.event.end ? '~' : ''}</span>
                        <span calss="w-full">${arg.event.end ? arg.event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : ''}</span>
                    </div>`
        };
    },
    eventDrop: function(info) {
        const { event } = info;

        const data  = event._def.extendedProps;

        const exDt  = event.start;
        const msg   = `해당 일정을 ${getConvertDate(new Date(exDt), 'hh:ii')}로 변경하시겠습니까?`;

        confirm.require({
            message     : msg,
            header      : '일정 변경',
            rejectProps : {
                label       : '취소',
                severity    : 'secondary',
                outlined    : true
            },
            acceptProps : {
                label: '확인'
            },
            accept : async () => {
                const params = {
                    emCd  : data['emCd'],
                    stCd  : data['stCd'],
                    exDt  : getConvertDate(calendar['searchDt'], 'yyyy-mm-dd')+' '+getConvertDate(exDt, 'hh:ii')
                };

                try
                {
                    const instance  = await getAxiosData();
                    await instance.post(`https://data.planorder.kr/calendarV1/getDayExchange`, params);
                    await calendar.getDayData();
                    await calendar.getMonthData();
                }
                catch(e)
                {
                    console.log(e);
                    if(e.response.status === 401)
                    {
                        getTokenOut();
                    }
                    else
                    {
                        alert('일정 변경 처리 중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                    }
                    info.revert();
                }
            },
            reject : () => {
                /** 드래그한 이벤트 취소 */
                info.revert();
            },
            onHide : () => {
                /** 드래그한 이벤트 취소 */
                info.revert();
            }
        });
    }
};

const getDayChoice = async (date: string, index: number) => {
    await calendar.getSearchDt(new Date(date));
    await calendar.getDayChoiceSet(index);
    await calendar.getDayData();
}

const getDatePicker = async (value) => {
    const date  = getConvertDate(new Date(value), 'yyyy-mm-dd');
    const index = calendar.dayList.findIndex(item => item.date === date);

    await calendar.getDayChoiceSet(index);
    await calendar.getDayData();
}

const updateNowIndicator = () => {
    const nowIndicator = document.querySelector('.fc-timegrid-now-indicator-line');
    if (nowIndicator) 
    {
        const now       = new Date();
        const hours     = String(now.getHours()).padStart(2, '0');
        const minutes   = String(now.getMinutes()).padStart(2, '0');

        nowIndicator.style.setProperty('--current-time', `"${hours}:${minutes}"`);
    }
};

const fullCalendar = ref(null);

/** 날짜 변경 감지(현재 월 데이터 변경 시 작동) */
watch(() => calendar.searchDt, async (ordDate, newDate) => {
    if(newDate !== ordDate)
    {
        await calendar.getMonthData();
    }
});

onMounted(async () => {
    updateNowIndicator();
    setInterval(updateNowIndicator, 60000); // 매 분마다 업데이트
    await calendar.getDayListSet();
    await calendar.getDayData();
});
</script>

<style lang="scss">
@use '/src/assets/calendar_custom.scss';
.custom-slide-time-grid .swiper-slide.swiper-slide-active{
    width: 100% !important;
}

.custom-daySelect{    
    justify-content: center !important;
    align-items: center !important;
    height: 28px;
    .p-datepicker-input{
        max-width: 110px;
        font-size: 0.825rem !important;
        border-radius: 9999px !important;
        width: 100% !important;
        flex-basis: auto !important; 
        flex: 0 0 auto !important;
        height: 100%;
        padding-right: 0.75rem !important;
    }
    .p-datepicker-input-icon-container{
        display: none;
    }
}

</style>
