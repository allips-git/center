<template>
    <div class="h-[calc(100vh-167px)] w-full md:h-[calc(100vh-171px)]">
        <FullCalendar :options="calendarOptions"/>
    </div>
</template>
  
<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko'; 
import { getConvertDate } from '@/assets/js/function';

// 캘린더 옵션 설정
const calendarOptions = {
    plugins             : [dayGridPlugin, interactionPlugin],
    initialView         : 'dayGridMonth',
    locale              : koLocale,
    height              : '100%',
    dragRevertDuration  : 500,
    droppable           : true,
    editable            : true,
    selectable          : true,
    dayMaxEvents        : true,
    initialDate         : getConvertDate(new Date(), 'yyyy-mm-dd'),
    events: [
        { title: '이벤트 1', start: '2024-12-01',  },
        { title: '이벤트 2', start: '2024-12-01',  },
        { title: '이벤트 3', start: '2024-12-01',  },
        { title: '이벤트 4', start: '2024-12-01',  },
        { title: '이벤트 5', start: '2024-12-01',  },
        { title: '이벤트 6', start: '2024-12-01',  },
        { title: '이벤트 7', start: '2024-12-01',  },
    ],
    eventDrop: function(arg) {
        console.log(arg);
    }
};
</script>

<!-- <template>
    <div class="h-[calc(100vh-167px)] w-full md:h-[calc(100vh-171px)]">
        <FullCalendar :options="calendarOptions"/>
    </div>
</template>
  
<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko'; 
import { getConvertDate } from '@/assets/js/function';

// 캘린더 옵션 설정
const calendarOptions = {
    plugins             : [timeGridPlugin, interactionPlugin],
    initialView         : 'timeGridDay',
    locale              : koLocale,
    height              : '100%',
    dragRevertDuration  : 500,
    droppable           : true,
    editable            : true,
    selectable          : true,
    dayMaxEvents        : true,
    initialDate         : getConvertDate(new Date(), 'yyyy-mm-dd'),
    events: [
        { title: '김가은', start: '2024-12-30T00:00:00', end: '2024-12-30T01:40:00',classNames: ['bg-red-200']},
        { title: '김가은', start: '2024-12-30T01:40:00', end: '2024-12-30T02:40:00',classNames: ['bg-gray-200']},
        { title: '김가은', start: '2024-12-30T03:00:00', end: '2024-12-30T03:40:00',classNames: ['bg-blue-200']},
    ],
    eventDrop: function(arg) {
        console.log(arg);
    }
};
</script> -->