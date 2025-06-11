<template>
    <li class="flex items-center justify-between py-[14px] border-b border-gray-100 first:mt-3">
        <div class="flex flex-col text-gray-500">
            <p class="font-bold text-gray-900 text-13">{{ date }} </p>
            <div class="flex flex-col mt-1 text-xs !text-t-lv2">
                <p>평균 마진 : {{ margin }}%</p>
                <p>월간 수익 : {{ rev }}원</p>
                <p>결제 대기 : {{ waitAmt }}원</p>
            </div>
        </div>
        <p class="text-base text-green-500">{{ saleAmt }}원</p>
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