<template>
    <li class="flex flex-col justify-between px-4 py-4 text-sm border-b border-gray-200 first:mt-3">
        <div>
            <div class="flex gap-2 text-xs">
                <div class="flex gap-2">
                    <p class="text-gray-500">평균 마진</p>
                    <p class="font-bold">{{ margin }}%</p>
                </div>
                <p class="text-gray-400">|</p>
                <div class="flex gap-2">
                    <p class="">결제대기</p>
                    <p class="font-bold text-red-500">{{ waitAmt }}원</p>
                </div>                    
            </div>
        </div>
        <div class="flex justify-between">
            <b class="flex items-center gap-1.5 mb-2 text-lg">
                {{ date }} 
                <span class="text-sm text-gray-400">></span>
            </b>
            <div class="flex flex-col items-end">
                <p class="text-lg font-bold text-green-500">{{ saleAmt }}원</p>
                <div class="flex gap-1">
                    <p class="">수익</p>
                    <p class="font-bold">{{ rev }}원</p>
                </div>
            </div>
        </div>
    </li>
</template>

<script setup lang="ts">
defineProps({
    date    : String,
    margin  : Number,
    waitAmt : String,
    saleAmt : String,
    rev     : String
});

</script>