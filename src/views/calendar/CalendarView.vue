<template>
    <main class="h-full md:pb-[0] pb-5 pt-[3.5rem] md:pt-0">
        <BackHeader title="일정" :fixed="true" :centerTitle="true"/>
        <div class="md:grid items-start justify-start md:grid-cols-[1fr_400px] md:h-[calc(100vh)]">
            <CalenderMonth class="flex-grow md:w-full md:block"/>
            <CalenderDay class="flex-grow hidden border-l border-gray-200 md:w-full md:block md:max-w-[400px] md:h-full" />
        </div>
        <div class="flex absolute bottom-24 left-1/2 z-50 justify-center text-sm -translate-x-1/2 md:hidden">
            <div class="px-5 py-2 bg-white rounded-full border border-gray-200 shadow-sm" @click="getDayView">일별</div>
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

        <Dialog v-model:visible="popup['pop']['calendarDetail']" 
        header="일정"
        :modal=true
        position="center"
        class="custom-dialog-bottom backPopup"
        :dismissableMask="true"
        @update:visible="getPopupClose(true, 'calendarDetail')">
        <template #header>
            <div class="modal-backheader">
                <Button @click="getPopupClose(true, 'calendarDetail')" severity="contrast" text icon="pi pi-times" iconPos="right"/>
                <h2 class="modal-backheader-title">일정 상세</h2>
            </div>
        </template>
        <CalenaderEdit/>
        </Dialog>

        <Dialog v-model:visible="popup['pop']['calendarEdit']" 
        :modal=true
        class="editPopup"
        :dismissableMask="true"
        @update:visible="getPopupClose(true, 'calendarEdit')">
        <template #header>
           
        </template>
        <CalenaderEdit/>

        </Dialog>

        <Dialog v-model:visible="popup['pop']['clientDetail']" header="고객 상세" 
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopClose('clientDetail', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose(true, 'clientDetail')" severity="contrast" text icon="pi pi-times" />
                    <h2 class="modal-backheader-title">고객 상세</h2>
                </div>
            </template>
            <CustomerDetail/>
        </Dialog>

    </main>
</template>

<script setup lang="ts">
import CalenderMonth from '@/views/include/calendar/CalenderMonth.vue'
import CalenderDay from '@/views/include/calendar/CalenderDay.vue'
import CalenderSet from '@/views/include/calendar/CalenderSet.vue';
import CalenaderEdit from '@/views/include/calendar/CalenaderEdit.vue'
import CustomerDetail from '@/views/include/customer/CustomerDetail.vue'
import BackHeader from '@/components/layouts/BackHeader.vue';
import { usePopupStore, useCalendarStore } from '@/store';
import { useRouter } from 'vue-router';
import { usePopup } from '@/assets/js/popup';

const calendar  = useCalendarStore();
const popup     = usePopupStore();
const router    = useRouter();

const { getPopupClose } = usePopup();

const getDayView = async () => {
    await calendar.getSearchDt(new Date());
    
    router.push('/calendar/day');
}
</script>

<style lang="scss">

</style>