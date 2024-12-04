<template>
    <div class="p-4 rounded bg-white border border-gray-200">
        
        <div class="">
            <div v-if="showtitle" class="flex font-bold text-lg pb-3 border-b border-gray-100 items-center justify-between">
                <h4 class="">{{ title }}</h4>
                <!-- 단위 -->
                <p class="text-indigo-600 text-lg"><span class="ml-0.5">{{ unit }}</span></p>
            </div>
            <div v-if="showtoggle" class="custom_accordion">
                <Accordion value="0">
                    <AccordionPanel class="*:pb-0 " value="0" >
                        <AccordionHeader class="!gap-2 !px-0">
                            <p class="font-bold pb-0 w-full">{{ title }}</p>
                            <p class="font-bold text-sm pb-0 flex-none">더보기</p>
                            </AccordionHeader>
                        <AccordionContent class="w-full *:!px-0">
                            <slot></slot>
                        </AccordionContent>
                    </AccordionPanel>
                </Accordion>
            </div>

            <div class="flex flex-col gap-2 py-3 ">
             <template v-for="(calc, index) in calcs" :key="index">
                <dl v-if="Number(calc.amt) !== 0 || calc.title === '제품 금액'" class="flex items-center justify-between">
                    <dt class="text-neutral-500 text-base">{{ calc.title }}</dt>
                    <dd class="text-right font-bold text-lg" :class="{
                        'text-red-500' : calc.red,
                        'text-blue-500': calc.blue,
                        'text-neutral-700': !calc.red && !calc.blue
                    }">{{ (calc.amt) }}<span class="font-normal text-xs">원</span>
                    </dd>
                </dl>
                </template>
            </div>
                <!-- <dl class="flex py-3 border-b border-gray-100 items-center justify-between">
                    <dt class="text-gray-400 ">제품금액</dt>
                    <dd class="flex items-center font-bold">
                        <p class="text-lg">12121212</p> 
                        <span class="text-sm ml-0.5">원</span>
                    </dd>
                </dl> -->

                <dl class="flex pt-3 font-bold items-center justify-between  border-t border-dotted">
                    <dt class="text-xl">{{ totalTitle }}</dt>
                    <dd class="flex items-center text-indigo-600">
                        <p class="text-xl">12121212</p> 
                        <span class="text-sm ml-0.5">원</span>
                    </dd>
                </dl>
            
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';


defineProps({
    title      : String,
    totalTitle : String,
    showtitle  : Boolean,
    showtoggle : Boolean,
    unit       : String,
})

interface Calc {
    title: string;
    amt: number;
    red: boolean;
    blue: boolean;
}

import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';

const calcs = ref<Calc[]>([
    { title: '제품 금액', amt: 10000, red: false, blue: false },
    { title: '배송비', amt: 3000, red: true, blue: false },
    { title: '할인', amt: -2000, red: false, blue: true },
    { title: '세금', amt: 500, red: false, blue: false },
    { title: '총 합계', amt: 11500, red: false, blue: false }
]);


</script>

<style lang="scss">
.custom_accordion{
    .p-accordionheader{
        justify-content: space-between;
    }
}
</style>