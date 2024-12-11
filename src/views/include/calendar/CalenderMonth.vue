<template>
    <main class="month-custom">
        <div class="h-screen">
          <FullCalendar 
          :options="calendarOptions"
          @dateClick="dateClick" 
          />
        </div>
        <div class="fixed z-50 bottom-4 right-4 size-12">
            <Button size="large" icon="pi pi-plus" class="!size-full" rounded @click="calenderSetPop= true"></Button>
        </div>
        <Dialog
        v-model:visible="calenderSetPop" 
        header="일정" 
        :modal=true
        position="bottom"
        class="custom-dialog-bottom"
        >
            <CalenderSet/>
        </Dialog>
    
        <div v-show="isModalVisible" class="z-50 overflow-hidden w-full max-w-[300px] rounded-xl bg-white border border-gray-100 shadow-sm" :style="modalStyle">
          <div ref="modalContentRef">
              <div class="flex items-center justify-between px-5 py-3 pr-1">
                <h1 class="text-xl font-bold">2024-10-10 (일)</h1>
                <Button text plain icon="pi pi-times" @click="closeModal" size="small" />
            </div>
              <div class="p-3 overflow-auto bg-gray-50 max-h-96">
                <ul class="flex flex-col gap-2">
                    <li class="flex items-center justify-between w-full p-3 bg-blue-100 rounded-lg">
                        <div class="flex gap-1">
                            <b>김가은</b>
                            <span>・</span>
                            <p class="">시공</p>
                        </div>
                        <p class="text-sm">08:08 PM ~ 08:08 PM</p>
                    </li>
                </ul>
            </div>
            
            <div class="bg-white *:w-full flex gap-1 py-2 px-2 ">
                <Button label="일 캘린더 보기" text severity="secondary" class="*:!font-bold"/>
                <Button label="새 일정" text icon="pi pi-plus" class="*:!font-bold" @click="calenderSetPop= true"/>
            </div>

          </div>
        </div>
    </main>
</template>
  
<script setup lang="ts">
import { ref, nextTick } from 'vue';
import CalenderSet from '@/views/include/calendar/CalenderSet.vue'
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko'; 

const calenderSetPop = ref(false)
const isModalVisible = ref(false); // 모달 표시 여부
const modalStyle = ref({}); // 모달 스타일을 위한 객체
const selectedDate = ref(''); // 선택한 날짜
const modalContentRef = ref<HTMLElement | null>(null);

// 랜덤 색상 생성 함수
const getRandomColor = () => {
const letters = '0123456789ABCDEF';
let color = '#';
for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
}
return color;
};

// 날짜 클릭 핸들러
const dateClick = function(info) {
  selectedDate.value = info.dateStr; // 선택한 날짜 저장
  toggle(info.jsEvent); // 클릭 이벤트로 토글 함수 호출
};

// 모달 토글 함수
const toggle = (event) => {
  isModalVisible.value = true;

  nextTick(() => {
    // 모달 콘텐츠가 렌더링된 후 높이를 계산
    const modalHeight = modalContentRef.value?.offsetHeight;

    // 기본 높이 설정
    const calculatedHeight = modalHeight || 150;

    // 뷰포트 크기 가져오기
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = event.clientX;
    let top = event.clientY;

    // 가로 위치 조정
    if (left + 300 > viewportWidth) {
      left = viewportWidth - 300 - 10;
    }

    // 세로 위치 조정
    if (top + calculatedHeight > viewportHeight) {
      top = viewportHeight - calculatedHeight - 10;
    }

    modalStyle.value = {
      position: 'absolute',
      left: `${left}px`,
      top: `${top}px`,
    };
  });
};

// 모달 닫기 함수
const closeModal = () => {
  isModalVisible.value = false; // 모달 숨김
};


// 캘린더 옵션 설정
const calendarOptions = ref({
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    locale: koLocale, // 기본 한국어 설정
    headerToolbar: {
        left: '',
        center: 'title',
        right: ''
    },
    height: '100%', // 캘린더 높이 설정
    dayCellContent: function(info) {
        // 날짜 숫자만 반환
        return { html: info.date.getDate().toString() }; 
    },
    events: [
        { title: '이벤트 1', start: '2024-12-01', backgroundColor: getRandomColor() },
        { title: '이벤트 2', start: '2024-12-01', backgroundColor: getRandomColor() },
        { title: '이벤트 3', start: '2024-12-01', backgroundColor: getRandomColor() },
        { title: '이벤트 4', start: '2024-12-01', backgroundColor: getRandomColor() },
        { title: '이벤트 5', start: '2024-12-01', backgroundColor: getRandomColor() },
        { title: '이벤트 6', start: '2024-12-01', backgroundColor: getRandomColor() },
        { title: '이벤트 7', start: '2024-12-01', backgroundColor: getRandomColor() },
    ],
    selectable: true,
    editable: true,
    dayMaxEvents : true,
});

// dateClick 핸들러를 calendarOptions에 추가
calendarOptions.value.dateClick = dateClick;




</script>

<style lang="scss">
@use '/src/assets/calendar_custom.scss';
</style>
