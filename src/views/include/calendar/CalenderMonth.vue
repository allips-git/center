<template>
    <main class="relative h-[100%-48px] month-custom">
        <div class="flex justify-center pb-3.5 acc-datepicker">
            <DatePicker v-model="calendar['searchDt']" view="month" dateFormat="yy.mm'월'" class="custom-datapicker *:!text-12 !max-w-[120px] *:!pl-1 *:!pr-1.5" 
                :locale="locale" showIcon fluid iconDisplay="input" @update:modelValue="getUpdate">
                <template #inputicon="slotProps" class="!pl-1">
                    <IconPlay class="rotate-90 !fill-gray-500"/>
                </template>
            </DatePicker>
        </div>
        <div class="h-[calc(100vh-147px)] w-full md:h-[calc(100vh-171px)]">
            <FullCalendar :options="{ ... calendarOptions, events : calendar['monthEvents']}" ref="fullCalendar"/>
        </div>
    </main>
</template>
  
<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko'; 
import DatePicker from 'primevue/datepicker';
import IconPlay from '@/components/icons/IconPlay.vue'
import { useConfirm } from "primevue/useconfirm";
import { ref, watch, onMounted } from 'vue';
import { useCalendarStore } from '@/store';
import { getAxiosData, getConvertDate, getTokenOut } from '@/assets/js/function';
import { usePopup } from '@/assets/js/popup';

const confirm       = useConfirm();
const calendar      = useCalendarStore();

const locale            = 'ko';
const selectedDate      = ref('');

const { getPopupOpen } = usePopup();

const dateClick = async (info) => {
    await calendar.getMonthDetail(info['dateStr']);
    
    if(calendar['monthDetail']['list'].length !== 0)
    {
        previousDate.value = selectedDate.value; // 이전 날짜 저장
        // 선택한 날짜 저장
        selectedDate.value = info.dateStr;
        // getPopupOpen('calendarDetail');
    }
};

// 이전 선택된 날짜를 저장할 ref 추가
const previousDate = ref(null);

const getUpdate = async () => {
    await getMonthData();
    await calendar.getDayListSet();
}

const getMonthData = async () => {
    await calendar.getMonthData();
}

// 캘린더 옵션 설정
const calendarOptions = {
    plugins             : [dayGridPlugin, interactionPlugin],
    initialView         : 'dayGridMonth',
    locale              : koLocale,
    height              : '100%',
    droppable           : true,
    editable            : true,
    selectable          : true,
    dayMaxEvents        : true,
    initialDate         : getConvertDate(calendar.searchDt, 'yyyy-mm-dd'),
    dateClick           : dateClick,
    eventClick          : async function(e) {
        getPopupOpen('calendarEdit');
        await calendar.getIkey(e.event._def.extendedProps.ikey);
        await calendar.getEmCd(e.event._def.extendedProps.emCd);
    },
    dayCellContent      : function(info) {
        return { html: info.date.getDate().toString() }; 
    },
    eventContent: function(arg) {
        return {
            html: `<div class="text-gray-900 truncate border-0 ${arg.event.classNames.join(' ')}">${arg.event.title}</div>`
        }
    },
    eventDrop: async function(info) {
        // await getPopupOpen('confirm');
        
        const { event } = info;
        const data = event._def.extendedProps;

        const preDt = getConvertDate(new Date(data['stDt']), 'yyyy-mm-dd');
        const exDt  = event.startStr;
        const msg   = `해당 일정을 ${preDt}에서 ${exDt}로 변경하시겠습니까?`;

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
                    preDt : data['stDt'],
                    exDt  : exDt
                };

                try
                {
                    const instance  = await getAxiosData();
                    await instance.post(`https://data.planorder.kr/calendarV1/getMonExchange`, params);
                    await calendar.getMonthData();
                    await calendar.getDayData();
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
                // getPopupClose('confirm', true);
            },
            onHide : () => {
                /** 드래그한 이벤트 취소 */
                info.revert();
                // getPopupClose('confirm', true);
            }
        });
    }
};

onMounted(async () => {
    await window.addEventListener('resize', handleResize); // resize 이벤트 리스너 추가
    await getMonthData();
});

const fullCalendar = ref(null);
const handleResize = () => {
    if (fullCalendar.value) 
    {
        fullCalendar.value.getApi().updateSize();
    }
};

/** 날짜 변경 감지 */
watch(() => calendar.searchDt, async (newDate) => {
    await calendar.getDayData();
    
    if (fullCalendar.value) 
    {
        fullCalendar.value.getApi().gotoDate(newDate);
    }
});
</script>

<style lang="scss">
@use '/src/assets/calendar_custom.scss';

.custom-select{    
    justify-content: center !important;
    align-items: center !important;
    height: 34px;
    .p-datepicker-input{
        font-size: 1rem !important;
        border-radius: 9999px !important;
        width: 100% !important;
        flex-basis: auto !important; 
        flex: 0 0 auto !important;
        height: 100%;
    }
}
</style>
