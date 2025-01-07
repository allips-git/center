<template>
    <div class="flex items-center w-full px-5 py-4 border-b border-gray-200 rounded-md first:mt-2 last:mb-3">
        <ul class="flex flex-col gap-0.5 text-gray-600 text-sm  *:flex *:items-center *:justify-start *:gap-2 w-full">
            <li>
                <h1 class="flex items-center gap-2 text-base font-bold" ><span class="size-1.5 rounded-full bg-green-500 block"></span>{{ itemNm }}</h1>
            </li>
            <li>
                <p>단위</p>
                <b class="text-gray-900 ">{{ size }}{{ unitNm }}</b>
            </li>
            <li>
                <p>판매</p>
                 <b class="text-red-500">{{ getAmt(saleAmt) }}<span class="text-xs font-normal ml-0.5">원</span></b> 
            </li>
            <li>
                <p>매입</p>
                <b class="text-blue-600">{{ getAmt(purcAmt) }}<span class="text-xs font-normal ml-0.5">원</span></b> 
            </li>
        </ul>
        <span class="text-gray-400 pi pi-angle-right !text-lg"></span> 
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