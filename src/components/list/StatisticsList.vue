<template>
    <ul>
        <li class="px-4 py-2 font-bold text-lx bg-gray-50">
            <p>2024년</p>
            <p class="text-indigo-600">2024년 04월 3주차</p>
            <p class="text-indigo-600">2024.04.22 (월)</p>
        </li>
        <li v-for="(item, index) in salesData" :key="index" class="flex flex-col justify-between px-4 py-4 text-sm border-b border-gray-200 first:mt-3">
            <div>
                <div class="flex gap-2 text-xs">
                    <div class="flex gap-2">
                        <p class="text-gray-500">평균 마진</p>
                        <p class="font-bold">{{ item.avgMargin }}%</p>
                    </div>
                    <p class="text-gray-400">|</p>
                    <div class="flex gap-2">
                        <p class="">결제대기</p>
                        <p class="font-bold text-red-500">{{ item.avgMargin }}%</p>
                    </div>                    
                </div>
            </div>
            <div class="flex justify-between">
                <b class="flex items-center gap-1.5 mb-2 text-lg">{{ item.month }}월  <span class="text-sm text-gray-400">></span></b>
                <div class="flex flex-col items-end">
                    <p class="text-lg font-bold text-green-500">{{ item.total }}원</p>
                    <div class="flex gap-1">
                        <p class="">수익</p>
                        <p class="font-bold">{{ item.monthlyProfit }}원</p>
                    </div>
                </div>
            </div>
            
        </li>
    </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const salesData = ref([
    { month: '1', avgMargin: 10, monthlyProfit: '12,000,000', total: '200,000,000' },
    { month: '2', avgMargin: 15, monthlyProfit: '15,000,000', total: '215,000,000' },
    { month: '3', avgMargin: 12, monthlyProfit: '14,000,000', total: '229,000,000' },
    { month: '4', avgMargin: 18, monthlyProfit: '16,000,000', total: '245,000,000' },
    { month: '5', avgMargin: 20, monthlyProfit: '18,000,000', total: '263,000,000' },
    // 추가적인 데이터 항목을 필요에 따라 추가하세요.
]);

</script>