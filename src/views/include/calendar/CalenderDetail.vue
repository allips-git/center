<template>
<main>
    <div class="z-50 overflow-hidden w-full max-w-[full] bg-white h-full">
        <div class="!containerh-full">
            <div class="flex items-center justify-between px-5 py-3 pr-1">
                <h1 class="text-xl font-bold">{{ calendar['monthDetail']['date'] }}</h1>
            </div>
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
            <Button label="일 캘린더 보기" text severity="secondary" @click="getNext"/>
            <!-- <Button label="새 일정" text icon="pi pi-plus" class="*:!font-bold" @click="calenderSetPop= true"/> -->
        </div>
    </div>
</main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useCalendarStore } from '@/store';
import { usePopup } from '@/assets/js/popup';

const router            = useRouter();
const calendar          = useCalendarStore();

const { getPopupOpen, getPopupClose } = usePopup();

const getMonthDataInfo = async (emCd: string) => {
    getPopupClose('calendarDetail', true);
    getPopupOpen('calendarEdit');
    await calendar.getEmCd(emCd);
}

const getNext = async () => {
    await getPopupClose('calendarDetail', true);
    router.push({ path : '/calendar/day' })
}
</script>

<style lang="scss">

</style>
