<template>
    <div class="p-4 bg-white border border-gray-200 rounded">
        <div class="">
            <div v-if="showtitle" class="flex items-center justify-between pb-3 text-base font-bold border-b border-gray-100">
                <h4 class="text-base text-t-lv1">{{ title }}</h4>
                <!-- 단위 -->
                <p class="text-p-lv4"><span class="ml-0.5">{{ unit }}</span></p>
                <!-- <Button label="거래원장 출력" /> -->
            </div>
            <div v-if="showtoggle" class="custom_accordion">
                <Accordion value="0">
                    <AccordionPanel class="*:pb-0 " value="0" >
                        <AccordionHeader class="!gap-2 !px-0 !mb-5">
                            <p class="w-full pb-0 text-base">{{ title }}</p>
                            <p class="flex-none pb-0 text-sm font-bold">더보기</p>
                            </AccordionHeader>
                        <AccordionContent class="w-full *:!px-0">
                            <slot></slot>
                        </AccordionContent>
                    </AccordionPanel>
                </Accordion>
            </div>

            <div class="flex flex-col gap-2 py-3 border-dashed border-y">
             <template v-for="(calc, index) in calcs" :key="index">
                <dl v-if="Number(calc.amt) !== 0 || calc.title === '제품 금액' || calc.title === '이달 매입금'" class="flex items-center justify-between">
                    <dt class="text-xs text-t-lv2">
                        {{ calc.title }}
                        <span v-if="calc.memo !== ''" :class="{
                        'text-red-500' : calc.red,
                        'text-blue-500': calc.blue,
                        'text-neutral-700': !calc.red && !calc.blue
                    }">{{ calc.memo ? `(${calc.memo})` : '' }}</span>
                    </dt>
                    <dd class="text-xs font-bold text-right" :class="{
                        'text-red-500' : calc.red,
                        'text-blue-500': calc.blue,
                        'text-neutral-700': !calc.red && !calc.blue
                    }">{{ getAmt(calc.amt) }}<span class="text-sm font-normal">원</span>
                    </dd>
                </dl>
                </template>
            </div>
                <!-- <dl class="flex items-center justify-between py-3 border-b border-gray-100">
                    <dt class="text-gray-400 ">제품금액</dt>
                    <dd class="flex items-center font-bold">
                        <p class="text-lg">12121212</p> 
                        <span class="text-sm ml-0.5">원</span>
                    </dd>
                </dl> -->

                <dl class="flex items-center justify-between pt-3 font-bold border-t border-dotted">
                    <dt class="text-base">{{ totalTitle }}</dt>
                    <dd class="flex items-end text-p-lv4">
                        <p class="text-18">{{ getAmt(totalAmt) }}<span class="text-xs ml-0.5 font-normal">원</span></p> 
                    </dd>
                </dl>
            
        </div>
    </div>
</template>

<script setup lang="ts">
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import { getCommas } from '@/assets/js/function';

defineProps({
    title       : String,
    unit        : String,
    showUnit    : Boolean,
    showMore    : Boolean,
    calcs       : Array,
    totalTitle  : String,
    showtitle   : Boolean,
    totalAmt    : Number,
    showtoggle  : Boolean,
})

const getAmt = (amt: number) => {
    return getCommas(amt);
}

// interface Calc {
//     title   : string;
//     amt     : number;
//     red     : boolean;
//     blue    : boolean;
// }

</script>

<style lang="scss">
.custom_accordion{
    .p-accordionheader{
        justify-content: space-between;
    }
}
</style>