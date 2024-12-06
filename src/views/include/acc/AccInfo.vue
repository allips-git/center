<template>
    <div class="relative w-full p-4 bg-white border border-gray-200 rounded-md">
        <section class="flex items-center justify-between mb-1" v-if="dateSelect">
            <h1 class="text-xl font-bold">2024년</h1>
            <Select class="w-20" size="small"/>
        </section>
        <ul v-for="(item, index) in salesData" :key="index">
            <li class="flex items-center gap-2">
                <p class="w-20 text-gray-600">{{ item.title }}</p>
                <p class="text-lg font-bold" :class="{ 'text-green-500': item.title === '마진' }">{{ item.amount }}<span v-if="item.title !== '마진'"> 원</span><span v-else> %</span></p>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue"

const salesData = ref([
    { title: '매출', amount: 131000 },
    { title: '환불', amount: 50000 },
    { title: '마진', amount: 81000 },
]);

const props = defineProps<{
    dateSelect: boolean;
}>();

const dateSelect = ref (true)
</script>

<style lang="scss">

</style>