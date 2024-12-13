<template>
    
    <main class="max-h-screen time-grid-custom">
        <swiper :slides-per-view="7" :slides-per-group="7" @slideChange="onSlideChange">
            <swiper-slide v-for="(item, index) in products" :key="index">
                <div class="flex items-center justify-center h-20 rounded">
                    <div class="flex flex-col items-center justify-center gap-0.5 relative w-full h-full">
                        <span class="text-xs">{{ item.week }}</span>
                        <div class="flex items-center justify-center text-center rounded-full size-9"
                        :class="{ 'bg-blue-500 text-white': item.isToday,}"
                        >
                            <h3 class="text-2xl font-bold">
                            {{ item.dateDay }}</h3>
                        </div>
                        <span v-if="item.selectDay" class="absolute bottom-0 z-10 w-full h-[3px] rounded-full bg-indigo-600"></span>
                    </div>
                </div>
            </swiper-slide>
        </swiper>

        <swiper>
            <swiper-slide>
            <div class="relative z-10 w-full h-[calc(100vh-70px)]">
                <FullCalendar :options="calendarOptions" />
            </div>
            </swiper-slide>

            <swiper-slide>
            <div class="relative z-10 w-full h-[calc(100vh-70px)]">
                <FullCalendar :options="calendarOptions" />
            </div>
            </swiper-slide>

            <swiper-slide>
            <div class="relative z-10 w-full h-[calc(100vh-70px)]">
                <FullCalendar :options="calendarOptions" />
            </div>
            </swiper-slide>
        </swiper>
        <div class="fixed z-50 bottom-4 right-4 size-12">
            <Button size="large" icon="pi pi-plus" class="!size-full" rounded @click="calenderSetPop= true"></Button>
        </div>
        <Dialog
        v-model:visible="calenderSetPop" 
        header="일정" 
        :modal=true
        position="bottom"
        class="text-gray-200 custom-dialog-bottom"
        >
            <CalenderSet/>
        </Dialog>
    </main>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CalenderSet from '@/views/include/calendar/CalenderSet.vue'
import FullCalendar from '@fullcalendar/vue3';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

const images = ref([
  'https://via.placeholder.com/300/FF7F7F/333333?text=Image+1',
  'https://via.placeholder.com/300/7F7FFF/333333?text=Image+2',
  'https://via.placeholder.com/300/7FFF7F/333333?text=Image+3',
  'https://via.placeholder.com/300/FFFF7F/333333?text=Image+4',
  'https://via.placeholder.com/300/FF7FFF/333333?text=Image+5',
]);

const calenderSetPop = ref(false)

// 제품 데이터 타입 정의
interface Product {
    dateDay: number;
    week: string;
    isToday: boolean;
    selectDay: boolean;
}

const isToday = ref('') 
// 제품 데이터 정의
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

const selectedDate = ref(new Date()); // 현재 선택된 날짜

// 캘린더 옵션 설정
const calendarOptions = ref({
  plugins: [interactionPlugin, timeGridPlugin],
  initialView: 'timeGridDay',
  locale: koLocale, // 기본 한국어 설정
  headerToolbar: {
    left: '',
    center: 'title',
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
    { title: '김가은', start: '2024-12-12T00:00:00', end: '2024-12-12T01:40:00' },
  ],
  eventContent: function(arg) {
    return {
      html: `
        <div>
          <strong>${arg.event.title}</strong> <span calss="mx-2">・</span> <span>시공완료</span> <br />
          <span>${arg.event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
          <span class="mx-1">~</span>
          <span calss="w-full">${arg.event.end ? arg.event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : 'N/A'}</span>
        </div>
      `
    };
  },
});



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
</style>
