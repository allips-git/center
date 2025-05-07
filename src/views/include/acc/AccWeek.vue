<template>
    <main>
        <section class="p-4 md:p-6">
            <div class="relative flex flex-col w-full gap-4">
                <section class="flex items-center justify-between">
                    <h1 class="text-xl font-bold">{{ acc.year }}년 {{ acc.month }}월</h1>
                  
                </section>
                <AccInfo :saleAmt="getAmt(acc.monthSaleAmt)" :purcAmt="getAmt(acc.monthPurcAmt)" :margin="acc.monthMargin"/>
            </div>
        </section>
        
        <div class="gray-bar"></div>
        <section>
            <template v-for="(item, index) in acc['weekData']" :key="index">
                <ul class="p-4 md:p-6">
                    <li class="pb-4 font-bold border-b border-gray-200 text-lx text-sky-400">
                        <p>{{ acc['month'] }}월 {{ item['week'] }}주차</p>
                    </li>
                    <template v-for="(week, wIndex) in acc['weekList']" :key="wIndex">
                        <StatisticsList :date="getDate(week['date'])" :margin="week['margin']" 
                            :waitAmt="getAmt(week['waitAmt'])" :saleAmt="getAmt(week['saleAmt'])" :rev="getAmt(week['rev'])" @click="getDayPopup(week['date'])"/>
                    </template>
                </ul>
            </template>
        </section>
    </main>

    <Dialog v-model:visible="popup['pop']['accDay']" 
        header="일간 분석"
        :modal=true
        position="center"
        class="custom-dialog-bottom backPopup"
        dismissable-mask="true"
        @update:visible="getPopupClose('accDay', true)">
        <template #header>
            <div class="modal-fullheader">
                <Button @click="getPopupClose('accDay', true)" severity="contrast" text icon="pi pi-arrow-left" iconPos="right"/>
                <h2 class="modal-backheader-title">일간 분석</h2>
            </div>
        </template>
        <AccDay/>

        </Dialog>
</template>

<script setup lang="ts">
import StatisticsList from '@/components/list/StatisticsList.vue'
import AccDay from '@/views/include/acc/AccDay.vue'
import AccInfo from '@/views/include/acc/AccInfo.vue'
import { onMounted } from 'vue';
import { usePopupStore, useAccStore } from '@/store';
import { usePopup } from '@/assets/js/popup';
import { getCommas, getConvertDate } from '@/assets/js/function';

const popup = usePopupStore();
const acc   = useAccStore();

const { getPopupOpen, getPopupClose } = usePopup();

const getDayPopup = (date: string) => {
    getPopupOpen('accDay');
    acc.getSearchDt(date);
}

const getDate = (date: string) => {
    return getConvertDate(new Date(date), 'accWeek');
}

const getAmt = (amt: number) => {
    return getCommas(Number(amt));
}

onMounted(() => {
    acc.getWeekData();
});
</script>

<style lang="scss">

</style>