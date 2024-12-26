<template>
    <main>
        <section class="px-5 pt-5">
            <AccInfo :saleAmt="getAmt(acc.daySaleAmt)" :purcAmt="getAmt(acc.dayPurcAmt)" :margin="acc.dayMargin"/>
        </section>
        <div class="mt-5"></div>
        <section>
            <div class="px-4 py-2 font-bold text-lx bg-gray-50">
                <p class="text-indigo-600">{{ getDate(acc.searchDt) }}</p>
            </div>
            <template v-for="(item, index) in acc['dayList']" :key="index">
                <AccountList :clientNm="item['clientNm']" :stNm="item['stNm']" :addr="item['addr']+' '+item['addrDetail']"
                    :saleAmt="getAmt(item['saleAmt'])" :purcAmt="getAmt(item['purcAmt'])" :rev="getAmt(item['rev'])"/>
            </template>
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