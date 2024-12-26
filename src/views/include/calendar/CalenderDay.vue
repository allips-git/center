<template>
    <main class="time-grid-custom">
        <swiper :slides-per-view="7" :slides-per-group="7">
            <swiper-slide v-for="(item, index) in products" :key="index" @click="showDay(index)">
                <div class="flex items-center justify-center h-20 rounded cursor-pointer">
                    <div class="flex flex-col items-center justify-center gap-0.5 relative w-full h-full">
                        <span class="text-xs">{{ item.week }}</span>
                        <div class="flex items-center justify-center text-center rounded-full size-9"
                        :class="{ 'bg-indigo-500 text-white': item.isToday,}"
                        >
                            <h3 class="text-2xl font-bold">
                            {{ item.dateDay }}</h3>
                        </div>
                        <span v-if="selectedIndex === index" class="absolute bottom-0 z-10 w-full h-[3px] rounded-full bg-indigo-600"></span>
                    </div>
                </div>
            </swiper-slide>
        </swiper>


            <swiper class="h-[calc(100vh-174px)] md:h-[calc(100vh-178px)] custom-slide-time-grid">
                <swiper-slide>
                <div class="relative z-10 w-full h-[calc(100vh-174px)] md:h-[calc(100vh-178px)]">
                    <div class="absolute z-50 flex justify-center -translate-x-1/2 top-4 left-1/2">
                        <span class="absolute z-40 -translate-y-1/2 right-4 top-1/2 pi pi-angle-down !text-sm text-gray-400"></span>
                        <DatePicker v-model="date"  dateFormat="yy.mm.d" class="custom-daySelect"  showIcon fluid iconDisplay="input"/>
                    </div>
                    <FullCalendar :options="calendarOptions" />
                    <div class="absolute z-50 flex justify-center text-sm -translate-x-1/2 bottom-4 left-1/2">
                        <div class="px-5 py-2 bg-white border border-gray-200 rounded-full shadow-sm">당일</div>
                    </div>
                </div>
                </swiper-slide>

                <swiper-slide>
                <div class="relative z-10 w-full h-[calc(100vh-118px)] md:h-[calc(100vh-178px)]">
                    <div class="absolute z-50 flex justify-center -translate-x-1/2 top-4 left-1/2">
                        <span class="absolute z-40 -translate-y-1/2 right-4 top-1/2 pi pi-angle-down !text-sm text-gray-400"></span>
                        <DatePicker v-model="date"  dateFormat="yy.mm.d" class="custom-daySelect"  showIcon fluid iconDisplay="input"/>
                    </div>
                    <FullCalendar :options="calendarOptions" />
                    <div class="absolute z-50 flex justify-center text-sm -translate-x-1/2 bottom-4 left-1/2">
                        <div class="px-5 py-2 bg-white border border-gray-200 rounded-full shadow-sm">당일</div>
                    </div>
                </div>
                </swiper-slide>
            </swiper>

        <!-- <div class="fixed z-50 bottom-4 right-4 size-12">
            <Button size="large" icon="pi pi-plus" class="!size-full" rounded @click="calenderSetPop= true"></Button>
        </div> -->
        <Dialog
        v-model:visible="calenderSetPop" 
        header="일정" 
        :modal=true
        position="center"
        class="text-gray-200 custom-dialog-bottom"
        >
            <CalenderSet/>
        </Dialog>
    </main>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import CalenderSet from '@/views/include/calendar/CalenderSet.vue'
import FullCalendar from '@fullcalendar/vue3';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';
import DatePicker from 'primevue/datepicker';
import 'swiper/swiper-bundle.css';

const calenderSetPop = ref(false)

// 제품 데이터 타입 정의
interface Product {
    dateDay: number;
    week: string;
    isToday: boolean;
    selectDay: boolean;
}

const products = ref<Product[]>([
  { dateDay: 1, week: '일' , isToday:true ,selectDay:false },
  { dateDay: 2, week: '월' , isToday:false ,selectDay:false},
  { dateDay: 3, week: '화' , isToday:false ,selectDay:true},
  { dateDay: 4, week: '수' , isToday:false ,selectDay:false},
  { dateDay: 5, week: '목' , isToday:false ,selectDay:false},
  { dateDay: 6, week: '금' , isToday:false ,selectDay:false},
  { dateDay: 7, week: '토' , isToday:false ,selectDay:false},

  { dateDay: 8, week: '일' , isToday:false ,selectDay:false},
  { dateDay: 9, week: '월' , isToday:false ,selectDay:false},
  { dateDay: 10, week: '화' , isToday:false ,selectDay:false},
  { dateDay: 11, week: '수' , isToday:false ,selectDay:false},
  { dateDay: 12, week: '목' , isToday:false ,selectDay:false},
  { dateDay: 13, week: '금' , isToday:false ,selectDay:false},
  { dateDay: 14, week: '토' , isToday:false ,selectDay:false},  
]);

// 선택된 아이템의 인덱스를 저장, 오늘 날짜로 초기화
const selectedIndex = ref<number | null>(products.value.findIndex(item => item.isToday));

// 아이템 선택 메서드
const showDay = (index: number) => {
  selectedIndex.value = index; // 선택된 인덱스 업데이트

  // 선택된 아이템의 selectDay 속성 업데이트
  products.value.forEach((item, i) => {
    item.selectDay = (i === index);
  });
};

// 캘린더 옵션 설정
const calendarOptions = ref({
  plugins: [interactionPlugin, timeGridPlugin],
  initialView: 'timeGridDay',
  locale: koLocale, // 기본 한국어 설정
  headerToolbar: {
    left: '',
    center: '',
    right: ''
  },
  nowIndicator: true,
  height: '100%',
  allDaySlot: false,
  selectable: true,
  editable: true,
  dayMaxEvents: true,
  slotLabelFormat: { hour: '2-digit', minute: '2-digit', hour12: false }, // 24시간제 설정
  events: [
    { title: '김가은', start: '2024-12-17T00:00:00', end: '2024-12-17T01:40:00',classNames: ['bg-red-200']},
    { title: '김가은', start: '2024-12-17T01:40:00', end: '2024-12-17T02:40:00',classNames: ['bg-gray-200']},
    { title: '김가은', start: '2024-12-17T03:00:00', end: '2024-12-17T03:40:00',classNames: ['bg-blue-200']},
  ],
  eventContent: function(arg) {
    return {
      html: `
        <div class="text-gray-900 border-0 ${arg.event.classNames.join(' ')}">
          <strong>${arg.event.title}</strong> <span calss="mx-2">・</span> <span>시공완료</span> <br />
          <span>${arg.event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
          <span class="mx-1">~</span>
          <span calss="w-full">${arg.event.end ? arg.event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : 'N/A'}</span>
        </div>
      `
    };
  },
});
// 현재 시간 표시
const updateNowIndicator = () => {
  const nowIndicator = document.querySelector('.fc-timegrid-now-indicator-line');
  if (nowIndicator) {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    nowIndicator.style.setProperty('--current-time', `"${hours}:${minutes}"`);
  }
};

onMounted(() => {
  updateNowIndicator();
  setInterval(updateNowIndicator, 60000); // 매 분마다 업데이트
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
