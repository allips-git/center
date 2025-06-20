<template>
    <main>
        <section class="p-4">
            <AccInfo :saleAmt="getAmt(acc.daySaleAmt)" :purcAmt="getAmt(acc.dayPurcAmt)" :margin="acc.dayMargin"/>
        </section>
        <div class="gray-bar"></div>
        <section class="px-4">
            <div class="flex items-center py-4">
                <p class="mr-2 text-sm text-gray-600 whitespace-nowrap">{{ getDate(acc.searchDt) }}</p>
                <div class="w-full h-px bg-gray-300"></div>
            </div>
            <div class="">
                <template v-for="(item, index) in acc['dayList']" :key="index">
                    <AccountList class="py-0" :clientNm="item['clientNm']" :stNm="item['stNm']" :addr="item['addr']+' '+item['addrDetail']"
                        :saleAmt="getAmt(item['saleAmt'])" :purcAmt="getAmt(item['purcAmt'])" :rev="getAmt(item['rev'])"/>
                </template>

            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import AccountList from '@/components/list/AccountList.vue'
import AccInfo from '@/views/include/acc/AccInfo.vue'
import { onMounted } from 'vue';
import { useAccStore } from '@/store';
import { getCommas, getConvertDate } from '@/assets/js/function';

const acc = useAccStore();

const getDate = (date: string) => {
    return getConvertDate(new Date(date), 'accWeek');
}

const getAmt = (amt: number) => {
    return getCommas(Number(amt));
}

onMounted(() => {
    acc.getDayData();
});

</script>

<style lang="scss">

</style>