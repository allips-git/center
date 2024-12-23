<template>
    <main class="relative h-[100%-48px] month-custom">
        <div class="flex justify-center py-4 border-b border-gray-200">
            <DatePicker v-model="date" view="month" dateFormat="yy.mm'월'" class="custom-select" :locale="locale"   showIcon fluid iconDisplay="input"/>
        </div>
        <div class="h-[calc(100vh-167px)] w-full md:h-[calc(100vh-171px)]">
          <FullCalendar 
          :options="calendarOptions"
          ref="fullCalendar"
          />
        </div>

        <div class="fixed z-50 bottom-4 right-4 size-12">
            <Button size="large" icon="pi pi-plus" class="!size-full" rounded @click="calenderSetPop= true"></Button>
        </div>
        
        <Dialog
        v-model:visible="calenderSetPop" 
        header="일정" 
        :modal=true
        position="center"
        class="border-0 custom-dialog-bottom"
        >
            <CalenderSet/>
        </Dialog>
    
        <div v-if="isModalVisible" class="z-50 overflow-hidden w-full max-w-[300px] rounded-xl bg-white border border-gray-100 shadow-sm max-h-[80vh]" :style="modalStyle">
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
                <router-link to="/calendar/day" class="md:hidden">
                    <Button label="일 캘린더 보기" text severity="secondary" class="*:!font-bold w-full" @click=""/>
                </router-link>
                <Button label="새 일정" text icon="pi pi-plus" class="*:!font-bold" @click="calenderSetPop= true"/>
            </div>

          </div>
        </div>
    </main>
</template>
  
<script setup lang="ts">
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue';
import CalenderSet from '@/views/include/calendar/CalenderSet.vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko'; 
import DatePicker from 'primevue/datepicker';
const locale = 'ko'; // 한국어 로케일 설정

const date = ref(new Date()); // 현재 날짜로 초기화
const calenderSetPop = ref(false);
const isModalVisible = ref(false); // 모달 표시 여부
const modalStyle = ref({}); // 모달 스타일을 위한 객체
const selectedDate = ref(''); // 선택한 날짜
const modalContentRef = ref<HTMLElement | null>(null);

const toggle = (event) => {
  isModalVisible.value = true;

  nextTick(() => {
    const modalHeight = modalContentRef.value?.offsetHeight || 150;
    const modalWidth = modalContentRef.value?.offsetWidth || 300;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = 0;
    let top = 0;

    if (event) {
      // event 객체에서 좌표 가져오기
      left = event.pageX;
      top = event.pageY;
    }

    // 뷰포트 초과 여부를 판단하여 위치 조정
    if (left + modalWidth > viewportWidth) {
      left = viewportWidth - modalWidth - 10; // 오른쪽 경계 초과 시 조정
    }
    if (top + modalHeight > viewportHeight) {
      top = viewportHeight - modalHeight - 10; // 아래쪽 경계 초과 시 조정
    }

    // 모달 스타일 업데이트
    modalStyle.value = {
      position: 'fixed',
      left: `${left}px`,
      top: `${top}px`,
    };
       // 이전 선택 해제
       if (previousDate.value) {
      const previousDateCell = document.querySelector(`[data-date="${previousDate.value}"]`);
      if (previousDateCell) {
        previousDateCell.classList.remove('selected-date'); // 이전 선택된 날짜 클래스 제거
      }
    }

    // 선택된 날짜의 배경색 변경
    const dateCell = document.querySelector(`[data-date="${selectedDate.value}"]`);
    if (dateCell) {
      dateCell.classList.add('selected-date'); // 선택된 날짜에 클래스 추가
    }
  });
};

const dateClick = function(info) {
    previousDate.value = selectedDate.value; // 이전 날짜 저장
  // 선택한 날짜 저장
  selectedDate.value = info.dateStr;
  let left, top;

  // 모바일에서 터치 이벤트 처리
  if (info.jsEvent.touches && info.jsEvent.touches.length > 0) {
    left = info.jsEvent.touches[0].clientX; 
    top = info.jsEvent.touches[0].clientY;
  } else if (info.jsEvent.pageX !== undefined && info.jsEvent.pageY !== undefined) {
    // PC에서 클릭 이벤트 처리
    left = info.jsEvent.pageX; 
    top = info.jsEvent.pageY;  
  }
  // 모달 토글 함수 호출, 좌표를 event로 전달
  toggle({ pageX: left, pageY: top }); // 좌표를 포함한 객체 전달
};

// 이전 선택된 날짜를 저장할 ref 추가
const previousDate = ref(null);


// 모달 닫기 함수
const closeModal = () => {
  isModalVisible.value = false; // 모달 숨김
};

// 캘린더 옵션 설정
const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  locale: koLocale,
  headerToolbar: {
    left: '',
    center: '',
    right: ''
  },
  dayCellContent: function(info) {
        // 날짜 숫자만 반환
        return { html: info.date.getDate().toString() }; 
    },

  height: '100%',
  selectable: true,
  dayMaxEvents: true,
  events: [
    { title: '김가은', start: '2024-12-12', classNames: ['bg-red-200'] },
    { title: '김가은', start: '2024-12-12', classNames: ['bg-gray-200'] },
    { title: '김가은', start: '2024-12-12', classNames: ['bg-blue-200'] },
    { title: '김가은', start: '2024-12-12', classNames: ['bg-blue-200'] },
    { title: '김가은', start: '2024-12-12', classNames: ['bg-blue-200'] },
  ],
  eventContent: function(arg) {
    return {
      html: `<div class="text-gray-900 border-0 ${arg.event.classNames.join(' ')}">${arg.event.title}</div>`
    };
  },
  dateClick: dateClick,
});

onMounted(() => {
  const calendarEl = document.querySelector('.fc'); // FullCalendar의 최상위 DOM 요소 선택
  if (calendarEl) {
    calendarEl.addEventListener('touchstart', (event) => {
      const left = event.touches[0].clientX;
      const top = event.touches[0].clientY;
      
      toggle({ pageX: left, pageY: top });
    });
  }
});

const fullCalendar = ref(null);


const handleResize = () => {
  if (fullCalendar.value) {
    fullCalendar.value.getApi().updateSize(); // FullCalendar의 크기 업데이트
  }
};

onMounted(() => {
  window.addEventListener('resize', handleResize); // resize 이벤트 리스너 추가
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
