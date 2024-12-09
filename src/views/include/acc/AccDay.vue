<template>
    <main>
        <section class="px-5 pt-5">
            <AccInfo :dateSelect="false"/>
        </section>
        <div class="mt-5"></div>
        <section>
            <div class="px-4 py-2 font-bold text-lx bg-gray-50">
                <p class="text-indigo-600">2024.04.22 (월)</p>
            </div>
            <AccountList/>
            <AccountList/>
            <AccountList/>
            <AccountList/>
        </section>
    </main>

    <Dialog
    v-model:visible="AccWeekPop" 
    header="주간 분석" 
    :modal=true
    position="bottom"
    class="custom-dialog-bottom"
    >
        <AccWeek/>
    </Dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import AccountList from '@/components/list/AccountList.vue'
import AccInfo from '@/views/include/acc/AccInfo.vue'


const salesData = ref([
    { title: '매출', amount: 131000 },
    { title: '환불', amount: 50000 },
    { title: '마진', amount: 47 },
]);

const AccWeekPop = ref(false)

</script>

<style lang="scss">

</style>