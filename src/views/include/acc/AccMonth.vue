<template>
    <main class="acc-month-wrapper">
        <section class="p-4 pb-5">
            <div class="flex relative flex-col gap-4 w-full">
                <section class="flex justify-between items-center acc-datepicker">
                    <h1 class="font-bold text-18">{{ acc.year }}년</h1>
                    <DatePicker v-model="acc.searchDt" view="year" dateFormat="yy'년'" yearFormat="yy'년'" yearNavigator
                        class="acc-custom-picker *:!text-xs" :locale="locale" showIcon fluid iconDisplay="input"  appendTo="self"
                        @update:modelValue="acc.getMonData()" />
                </section>
                <AccInfo :saleAmt="getAmt(acc.monthSaleAmt)" :purcAmt="getAmt(acc.monthPurcAmt)" :margin="acc.monthMargin"/>
            </div>
        </section>
           <div class="gray-bar my-[10px]"></div> 
        <section>
            <ul class="px-4">
                <li class="py-[10px] font-bold text-gray-500 border-b border-gray-200 text-sm">
                    <p>{{ acc.year }}년</p>
                </li>
                <template v-for="(item, index) in acc['monthList']" :key="index">
                    <StatisticsList :date="item['date']+'월'" :margin="item['margin']" 
                        :waitAmt="getAmt(item['waitAmt'])" :saleAmt="getAmt(item['saleAmt'])" :rev="getAmt(item['rev'])" @click="getWeekPopup(item['date'])"/>
                </template>
            </ul>
        </section>

        <Dialog v-model:visible="popup['pop']['accWeek']" 
        header="주간 분석"
        :modal=true
        position="center"
        class="custom-dialog-bottom backPopup"
        dismissable-mask="true"
        @update:visible="getPopupClose('accWeek', true)">
        <template #header>
            <div class="modal-fullheader">
                <Button @click="getPopupClose('accWeek', true)" severity="contrast" text icon="pi pi-arrow-left" iconPos="right"/>
                <h2 class="modal-backheader-title">주간 분석</h2>
            </div>
        </template>
        <AccWeek/>

        </Dialog>
    </main>
</template>

<script setup lang="ts">
import StatisticsList from '@/components/list/StatisticsList.vue'
import DatePicker from 'primevue/datepicker';
import AccWeek from '@/views/include/acc/AccWeek.vue'
import AccInfo from '@/views/include/acc/AccInfo.vue'
import { onMounted } from 'vue';
import { usePopupStore, useAccStore } from '@/store';
import { usePopup } from '@/assets/js/popup';
import { getCommas } from '@/assets/js/function';

const locale = 'ko';
const popup = usePopupStore();
const acc   = useAccStore();

const { getPopupOpen, getPopupClose } = usePopup();

const getWeekPopup = (month: string) => {
    getPopupOpen('accWeek');
    acc.getSearchDt(`${acc.year}-${month}-01`);
}

const getAmt = (amt: number) => {
    return getCommas(Number(amt));
}

onMounted(() => {
    acc.getMonData();
});
</script>

<style lang="scss">
.acc-month-wrapper {
    .acc-custom-picker {
        .p-datepicker-panel {
            // margin-top: 0 !important;
        }
        .p-datepicker-calendar-container {
            display: none !important;
        }

       .p-datepicker-year-view{
        margin-top: 0 !important;
       }
    }
}
</style>