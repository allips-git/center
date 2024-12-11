<template>
    <main class="time-grid-custom">
        <div class="h-screen">
          <FullCalendar 
          :options="calendarOptions"
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
        class="text-gray-200 custom-dialog-bottom"
        >
            <CalenderSet/>
        </Dialog>
    </main>
</template>
  
<script setup lang="ts">
import { ref, nextTick } from 'vue';
import CalenderSet from '@/views/include/calendar/CalenderSet.vue'
import FullCalendar from '@fullcalendar/vue3';
import timeGridPlugin from '@fullcalendar/timegrid'; // timeGrid 플러그인 추가
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko'; 

const calenderSetPop = ref(false)


// 캘린더 옵션 설정
const calendarOptions = ref({
    plugins: [interactionPlugin, timeGridPlugin],
    initialView: 'timeGridFourDay',
    locale: koLocale, // 기본 한국어 설정
    headerToolbar: {
        left: '',
        center: '',
        right: ''
    },
    views: {
    timeGridFourDay: {
      type: 'timeGrid',
      duration: { days: 1 },

        },
    },
    events: [
    { title: '이벤트 1', start: '2024-12-11T15:00:00', end: '2024-12-11T16:00:00' }, // 시간 포함
    ],
    initialDate: new Date(), // 오늘 날짜 기준으로 설정
    height: '100%',
    allDaySlot: false,
    selectable: true,
    editable: true,
    dayMaxEvents : true,
    duration: { days: 4 },
});





</script>

<style lang="scss">
@use '/src/assets/calendar_custom.scss';
</style>
