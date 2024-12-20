<template>
    <main>
        <section class="px-5 pt-5">
            <AccInfo :dateSelect="true"/>
        </section>
           <div class="mt-5"></div> 
        <section @click="AccWeekPop = true">
            <StatisticsList/>
        </section>
    </main>
    <Dialog
    v-model:visible="AccWeekPop" 
    header="주간 분석" 
    :modal=true
    position="center"
    class="custom-dialog-bottom"
    >
        <AccWeek/>
    </Dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import StatisticsList from '@/components/list/StatisticsList.vue'
import AccWeek from '@/views/include/acc/AccWeek.vue'
import AccInfo from '@/views/include/acc/AccInfo.vue'

const salesData = ref([
    { title: '매출', amount: 131000 },
    { title: '환불', amount: 50000 },
    { title: '마진', amount: 81000 },
]);

const AccWeekPop = ref(false)

</script>

<style lang="scss">

</style>