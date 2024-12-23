<template>
    <div class="p-4 border border-gray-200 rounded-md first:mt-6 last:mb-3">
        <div class="flex items-center justify-between w-ful">
            <h1 class="flex items-center gap-2 font-bold" ><span class="size-1.5 rounded-full bg-green-500 block"></span>{{ itemNm }}</h1>
            <span class="text-gray-400 pi pi-angle-right"></span> 
        </div>
        <ul class="flex flex-col gap-0.5 text-gray-600 text-sm mt-3 *:flex *:justify-between">
            <li>
                <p>단위</p>
                <b class="text-base text-gray-900">{{ size }}{{ unitNm }}</b>
            </li>
            <li>
                <p>판매</p>
                 <b class="text-base text-red-500">{{ getAmt(saleAmt) }}<span class="text-xs font-normal ml-0.5">원</span></b> 
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