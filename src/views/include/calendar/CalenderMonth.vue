<template>
    <div class="h-screen">
        <FullCalendar :options="calendarOptions" />

    </div>
  </template>
  
  <script setup lang="ts">
  im
  import { ref, onMounted } from 'vue';
  import FullCalendar from '@fullcalendar/vue3';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import interactionPlugin from '@fullcalendar/interaction';
  import koLocale from '@fullcalendar/core/locales/ko'; // 한국어 로케일 임포트
  
  // 캘린더 옵션 설정
  const calendarOptions = ref({
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    locale: 'ko', // 한국어 설정
    headerToolbar: { // 헤더 도구 설정
      left: '', // 왼쪽에 배치할 버튼
      center: 'title', // 중앙에 캘린더 제목
      right: '' // 오른쪽에 배치할 버튼
    },
    height: '100%', // 캘린더 높이 설정
  });
  
  // 한국어 로케일 설정
  onMounted(() => {
    FullCalendar.globalLocales.push(koLocale);
  });
  </script>
  
  <style lang="scss">
  @import '/src/assets/calendar_custom.scss';

  </style>
  