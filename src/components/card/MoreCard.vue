<template>
    <div class="border border-gray-200 rounded-md p-4 first:mt-6 last:mb-3">
        <div class="flex justify-between w-full items-center">
            <h1 class="font-bold flex gap-2 items-center" ><span class="size-1.5 rounded-full bg-green-500 block"></span>{{ itemNm }}</h1>
            <span class="pi pi-angle-right text-gray-400"></span> 
        </div>
        <ul class="flex flex-col gap-0.5 text-gray-600 text-sm mt-3 *:flex *:justify-between">
            <li>
                <p>단위</p>
                <b class="text-gray-900 text-base">{{ size }}{{ unitNm }}</b>
            </li>
            <li>
                <p>판매</p>
                 <b class="text-red-500 text-base">{{ getAmt(saleAmt) }}<span class="text-xs font-normal ml-0.5">원</span></b> 
            </li>
            <li>
                <p>매입</p>
                <b class="text-blue-600 text-base">{{ getAmt(purcAmt) }}<span class="text-xs font-normal ml-0.5">원</span></b> 
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { getCommas } from '@/assets/js/function';

defineProps<{
    itemNm  : string;
    size    : number;
    unitNm  : string;
    saleAmt : number;
    purcAmt : number;
}>();

const getAmt = (amt: number) => {
    return getCommas(Number(amt));
}
</script>