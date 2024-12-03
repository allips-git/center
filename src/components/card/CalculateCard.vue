<template>
    <div class="p-4 rounded bg-white border border-gray-200">
        
        <div class="">
            <div v-if="showtitle" class="flex font-bold pb-3 border-b border-gray-100 items-center justify-between">
                <h4 class="">{{ title }}</h4>
                <!-- 단위 -->
                <p class="text-indigo-600 text-lg">111 <span class="ml-0.5">폭</span></p>
            </div>
                <dl class="flex py-3 border-b border-gray-100 items-center justify-between">
                    <dt class="text-gray-400 ">제품금액</dt>
                    <dd class="flex items-center font-bold">
                        <p class="text-lg">12121212</p> 
                        <span class="text-sm ml-0.5">원</span>
                    </dd>
                </dl>

                <dl class="flex pt-3 font-bold items-center justify-between">
                    <dt class="text-xl">총금액</dt>
                    <dd class="flex items-center text-indigo-600">
                        <p class="text-xl">12121212</p> 
                        <span class="text-sm ml-0.5">원</span>
                    </dd>
                </dl>
            

            <div v-if="!showtitle" class="custom_accordion">
                <Accordion value="0">
                    <AccordionPanel class="*:pb-0 " value="0" >
                        <AccordionHeader class="!gap-2 !px-0">
                            <p class="font-bold text-sm pb-0 w-full">제품 결제 내역</p>
                            <p class="font-bold text-sm pb-0 flex-none">더보기</p>
                            </AccordionHeader>
                        <AccordionContent class="w-full *:!px-0">
                            <div class="flex flex-col gap-5">
                                <div class="flex w-full mt-3 gap-4">
                                    <IftaLabel class="w-full">
                                        <Select placeholder="선택" class="w-full" />
                                        <label for="emali">가공방법</label>
                                    </IftaLabel>
    
                                    <IftaLabel class="w-full">
                                        <Select placeholder="선택" class="w-full" />
                                        <label for="emali">가공방법</label>
                                    </IftaLabel>
                                </div>
    
                                <IftaLabel class="w-full">
                                    <label for="emali">지시사항</label>
                                    <Textarea id="over_label" rows="3" cols="30" style="resize: none" class="w-full" />
                                </IftaLabel>
                            </div>
                        </AccordionContent>
                    </AccordionPanel>
                </Accordion>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps,ref } from 'vue';

import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';

import IftaLabel from 'primevue/iftalabel';
import Textarea from 'primevue/textarea';


defineProps({
    title       : String,
    showtitle   : Boolean,
})

</script>

<style lang="scss">
.custom_accordion{
    .p-accordionheader{
        justify-content: space-between;
    }
}
</style>