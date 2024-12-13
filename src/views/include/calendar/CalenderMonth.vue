<template>
    <main class="relative month-custom">
        <div class="h-screen">
          <FullCalendar 
          :options="calendarOptions"
          
          />
          <!-- @dateClick="dateClick"  -->
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
    
        <div v-if="isModalVisible" class="z-50 overflow-hidden w-full max-w-[300px] rounded-xl bg-white border border-gray-100 shadow-sm" :style="modalStyle">
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
import { ref, nextTick, onMounted } from 'vue';
import CalenderSet from '@/views/include/calendar/CalenderSet.vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko'; 

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
      position: 'absolute',
      left: `${left}px`,
      top: `${top}px`,
    };
  });
};

const dateClick = function(info) {
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
    center: 'title',
    right: ''
  },
  dayCellContent: function(info) {
        // 날짜 숫자만 반환
        return { html: info.date.getDate().toString() }; 
    },
//     eventAdd: (info) => {
//     // 필요 시 추가 로직 작성
//   },
  height: '100%',
  // selectable: true,
//   editable: false,
  dayMaxEvents: true,
  eventStartEditable: false, // 터치 드래그 비활성화
  dateClick: dateClick,
});

onMounted(() => {
  const calendarEl = document.querySelector('.fc'); // FullCalendar의 최상위 DOM 요소 선택
  if (calendarEl) {
    calendarEl.addEventListener('touchstart', (event) => {
      const left = event.touches[0].clientX;
      const top = event.touches[0].clientY;
      alert(`Touched Position: X = ${left}, Y = ${top}`);
      toggle({ pageX: left, pageY: top });
    });
  }
});


</script>

<style lang="scss">
@use '/src/assets/calendar_custom.scss';
</style>
