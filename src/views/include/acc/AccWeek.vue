<template>
    <main>
        <section class="px-5 pt-5">
            <AccInfo :dateSelect="true"/>
        </section>
            <div class="mt-5"></div> 
        <section>
            <StatisticsList @click="AccDayPop = true"/>
        </section>
    </main>

    <Dialog
    v-model:visible="AccDayPop" 
    header="일간 분석" 
    :modal=true
    position="center"
    class="custom-dialog-bottom"
    >
        <AccDay/>
    </Dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import StatisticsList from '@/components/list/StatisticsList.vue'
import AccDay from '@/views/include/acc/AccDay.vue'
import AccInfo from '@/views/include/acc/AccInfo.vue'

const AccDayPop = ref(false)

</script>

<style lang="scss">

</style>