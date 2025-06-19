<template>
    <main class="h-[calc(100vh-56px)] overflow-hidden">
        <BackHeader title="일정" />
        <div class="h-[calc(100vh-110px)] md:h-[calc(100vh-48px)]">
            <CalenderDay class=""/>
        </div>
        <div class="absolute z-50 flex justify-center text-sm -translate-x-1/2 bottom-24 left-1/2 md:hidden">
            <div class="px-5 py-2 bg-white border border-gray-200 rounded-full shadow-sm" @click="getMonthView">월별</div>
        </div>

        <Dialog v-model:visible="popup['pop']['calendarSet']" 
        header="일정"
        :modal=true
        position="center"
        class="custom-dialog-bottom backPopup"
        :dismissableMask="true"
        @update:visible="getPopupClose(true, 'calendarSet')">
        <template #header>
            <div class="modal-fullheader">
                <Button @click="getPopupClose(true, 'calendarEdit')" severity="contrast" text icon="pi pi-arrow-left" iconPos="right"/>
                <!-- 버튼 클릭시 뒤로 가게 수정 필요 -->
                <h2 class="modal-backheader-title">일정 상세</h2>
            </div>
        </template>
        <CalenderSet/>
        </Dialog>

        <Dialog v-model:visible="popup['pop']['calendarEdit']" 
        header="일정"
        :modal=true
        position="center"
        class="custom-dialog-bottom backPopup"
        :dismissableMask="true"
        @update:visible="getPopupClose(true, 'calendarEdit')">
        <template #header>
            <div class="modal-backheader">
                <Button @click="getPopupClose(true, 'calendarEdit')" severity="contrast" text icon="pi pi-times" iconPos="right"/>
                <h2 class="modal-backheader-title">일정 편집</h2>
            </div>
        </template>
        <CalenaderEdit/>

        </Dialog>
    </main>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import CalenderDay from '@/views/include/calendar/CalenderDay.vue'
import CalenderSet from '@/views/include/calendar/CalenderSet.vue';
import CalenaderEdit from '@/views/include/calendar/CalenaderEdit.vue'
import { usePopupStore, useCalendarStore } from '@/store';
import { useRouter } from 'vue-router';
import { usePopup } from '@/assets/js/popup';

const calendar  = useCalendarStore();
const popup     = usePopupStore();
const router    = useRouter();

const { getPopupClose } = usePopup();

const getMonthView = async () => {
    await calendar.getSearchDt(new Date());

    router.push('/calendar');
}
</script>

<style lang="scss">

</style>