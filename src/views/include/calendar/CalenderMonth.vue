<template>
    <main class="relative h-[100%-48px] month-custom">
        <div class="flex justify-center py-4 border-b border-gray-200">
            <DatePicker v-model="calendar['searchDt']" view="month" dateFormat="yy.mm'월'" class="custom-select" 
                :locale="locale" showIcon fluid iconDisplay="input" @update:modelValue="getUpdate" />
        </div>
        <div class="h-[calc(100vh-167px)] w-full md:h-[calc(100vh-171px)]">
            <FullCalendar :options="{ ... calendarOptions, events : calendar['monthEvents']}" ref="fullCalendar"/>
        </div>

        <!-- <div class="fixed z-50 bottom-4 right-4 size-12">
            <Button size="large" icon="pi pi-plus" class="!size-full" rounded @click="calenderSetPop= true"></Button>
        </div> -->
        
        <Dialog v-model:visible="popup['pop']['calendarSet']" header="일정" 
            :modal=true position="center" class="border-0 custom-dialog-bottom"
            @update:visible="getPopupClose('calendarSet', true)">
            <CalenderSet/>
        </Dialog>
        <div v-if="popup['pop']['calendarDetail']" class="z-50 overflow-hidden w-full max-w-[300px] rounded-xl bg-white border border-gray-100 shadow-sm max-h-[80vh]" :style="modalStyle">
            <div ref="modalContentRef">
                <div class="flex items-center justify-between px-5 py-3 pr-1">
                    <h1 class="text-xl font-bold">{{ calendar['monthDetail']['date'] }}</h1>
                    <Button text plain icon="pi pi-times" @click="getPopupClose('calendarDetail', true)" size="small" />
                </div>
                <div class="p-3 overflow-auto bg-gray-50 max-h-96">
                    <ul class="flex flex-col gap-2">
                        <li v-for="(item, index) in calendar['monthDetail']['list']" :key="index" 
                            :class="`flex items-center justify-between w-full p-3 bg-${item['stCd'] === '001' ? 'blue' : 'red'}-100 rounded-lg`"
                            @click="getMonthDataInfo(item['emCd'])">
                            <div class="flex gap-1">
                                <b>{{ item['clientNm'] }}</b>
                                <span>・</span>
                                <p class="">{{ item['stNm'] }}</p>
                            </div>
                            <p class="text-sm">
                                {{ item['stCd'] === '001' ? item['startTime'] : item['startTime'] + '~' + item['endTime'] }}
                            </p>
                        </li>
                    </ul>
                </div>
                
                <div class="bg-white *:w-full flex gap-1 py-2 px-2">
                    <router-link to="/calendar/day" class="md:hidden">
                        <Button label="일 캘린더 보기" text severity="secondary" class="*:!font-bold w-full"/>
                    </router-link>
                    <!-- <Button label="새 일정" text icon="pi pi-plus" class="*:!font-bold" @click="calenderSetPop= true"/> -->
                </div>
            </div>
        </div>
    </main>
</template>
  
<script setup lang="ts">
import CalenderSet from '@/views/include/calendar/CalenderSet.vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko'; 
import DatePicker from 'primevue/datepicker';
import { ref, nextTick, watch, onMounted, onBeforeUnmount } from 'vue';
import { usePopupStore, useCalendarStore } from '@/store';
import { getConvertDate } from '@/assets/js/function';
import { usePopup } from '@/assets/js/popup';


const popup             = usePopupStore();
const calendar          = useCalendarStore();

const locale            = 'ko';
const modalStyle        = ref({});
const selectedDate      = ref('');
const modalContentRef   = ref<HTMLElement | null>(null);

const { getPopupOpen, getPopupClose } = usePopup();

const toggle = (event) => {
    getPopupOpen('calendarDetail');
    nextTick(() => {
        const modalHeight       = modalContentRef.value?.offsetHeight || 150;
        const modalWidth        = modalContentRef.value?.offsetWidth || 300;
        const viewportWidth     = window.innerWidth;
        const viewportHeight    = window.innerHeight;

        let left = 0;
        let top  = 0;

    if (event) 
    {
        // event 객체에서 좌표 가져오기
        left = event.pageX;
        top = event.pageY;
    }

    // 뷰포트 초과 여부를 판단하여 위치 조정
    if (left + modalWidth > viewportWidth) 
    {
        left = viewportWidth - modalWidth - 10; // 오른쪽 경계 초과 시 조정
    }

    if (top + modalHeight > viewportHeight) 
    {
        top = viewportHeight - modalHeight - 10; // 아래쪽 경계 초과 시 조정
    }

    // 모달 스타일 업데이트
    modalStyle.value = {
        position    : 'fixed',
        left        : `${left}px`,
        top         : `${top}px`
    };
    
    // 이전 선택 해제
    if (previousDate.value) 
    {
        const previousDateCell = document.querySelector(`[data-date="${previousDate.value}"]`);
        if (previousDateCell) 
        {
            previousDateCell.classList.remove('selected-date'); // 이전 선택된 날짜 클래스 제거
        }
    }

    // 선택된 날짜의 배경색 변경
    const dateCell = document.querySelector(`[data-date="${selectedDate.value}"]`);

        if (dateCell) 
        {
            dateCell.classList.add('selected-date'); // 선택된 날짜에 클래스 추가
        }
    });
};

const dateClick = async (info) => {
    await getPopupClose('calendarDetail', true);
    await calendar.getMonthDetail(info['dateStr']);
    
    if(calendar['monthDetail']['list'].length !== 0)
    {
        previousDate.value = selectedDate.value; // 이전 날짜 저장
        // 선택한 날짜 저장
        selectedDate.value = info.dateStr;
        let left, top;

        // 모바일에서 터치 이벤트 처리
        if (info.jsEvent.touches && info.jsEvent.touches.length > 0) 
        {
            left = info.jsEvent.touches[0].clientX; 
            top = info.jsEvent.touches[0].clientY;
        } 
        else if (info.jsEvent.pageX !== undefined && info.jsEvent.pageY !== undefined) 
        {
            // PC에서 클릭 이벤트 처리
            left = info.jsEvent.pageX; 
            top = info.jsEvent.pageY;  
        }
        // 모달 토글 함수 호출, 좌표를 event로 전달
        toggle({ pageX: left, pageY: top }); // 좌표를 포함한 객체 전달
    }
};

// 이전 선택된 날짜를 저장할 ref 추가
const previousDate = ref(null);

const getMonthDataInfo = async (emCd: string) => {
    getPopupOpen('calendarSet');
    await calendar.getEmCd(emCd);
    await calendar.getInfo();
}

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
    dayCellContent      : function(info) {
        return { html: info.date.getDate().toString() }; 
    },
    eventContent: function(arg) {
        return {
            html: `<div class="text-gray-900 border-0 ${arg.event.classNames.join(' ')}">${arg.event.title}</div>`
        }
    },
    eventDrop: function(arg) {
        console.log(arg);
    }
};

onMounted(async () => {
    await window.addEventListener('resize', handleResize); // resize 이벤트 리스너 추가
    const calendarEl = document.querySelector('.fc'); // FullCalendar의 최상위 DOM 요소 선택
    if (calendarEl) 
    {
        await calendarEl.addEventListener('touchstart', (event) => {
            const left = event.touches[0].clientX;
            const top = event.touches[0].clientY;
            
            toggle({ pageX: left, pageY: top });
        });
    }

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

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize); // 컴포넌트 언마운트 시 리스너 제거
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
