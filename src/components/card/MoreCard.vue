<template>
    <div class="p-4 border border-gray-200 rounded-md first:mt-6 last:mb-3" @click=" OutMngPop = true ">
        <div class="flex items-center justify-between w-full">
            <h1 class="flex items-center gap-2 font-bold" ><span class="size-1.5 rounded-full bg-green-500 block"></span>아르카디아</h1>
            <span class="text-gray-400 pi pi-angle-right"></span> 
        </div>
            
        <ul class="flex flex-col gap-0.5 text-gray-600 text-sm mt-3 *:flex *:justify-between">
            <li>
                <p>단위</p>
                <b class="text-base text-gray-900">2회베</b>
            </li>

            <li>
                <p>판매</p>
                 <b class="text-base text-red-500">27,000<span class="text-xs font-normal ml-0.5">원</span></b> 
            </li>

            <li>
                <p>매입</p>
                <b class="text-base text-blue-600">27,000<span class="text-xs font-normal ml-0.5">원</span></b> 
            </li>
        </ul>
        <Dialog
        v-model:visible="OutMngPop" 
        header="외주공장 이름 제품관리" 
        :modal=true
        position="center"
        class="custom-dialog-bottom"
        >
            <OutMng/>
        </Dialog>
    </div>
    
</template>

<script setup lang="ts">
import { ref } from 'vue'
import OutMng from "@/views/include/factory/OutMng.vue";

const OutMngPop = ref(false)

import MoreCard from "@/components/card/MoreCard.vue";




</script>