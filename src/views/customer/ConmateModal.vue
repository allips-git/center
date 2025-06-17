<!-- <template>
    <BackHeader title="계약서" />
    <main class="!pb-52 w-full">
        <div class="relative">
            <section class="relative overflow-hidden aspect-[4/3] -z-10">
                <img src="@/assets/img/test.png" class="object-cover w-full aspect-[4/3]" alt="">
            </section>
        
            <section class="relative px-6 pt-6 pb-2 overflow-hidden bg-white -top-4 rounded-t-xl">
                <InfoCard :title="mate['ceNm']" :info="mate['headers']" />   
            </section>

            <div class="gray-bar"></div>

            <section class="p-6">
                    <div class="flex flex-col gap-5">
                        <TableCard v-for="(table, index) in mate['list']" :key="index" :title="table.title" :cards="table.cardLists"
                       :columns="table.columns" :rows="table.rows" :tags="table.tags" :showTag="table.showTag"
                       :showButton="table.showButton" :sizeYn="mate['sizeYn']"/>
                    </div>
                </section>
            <div class="gray-bar"></div> 
            <section class="p-6">
                <CalculateCard  :showtitle="true" :calcs="mate['payList']" title="합계 금액" totalTitle="총 합계 금액" :totalAmt="getAmt(mate['payList'], 'total')"/>
            </section>
        </div>
        <section class="fixed bottom-0 w-full p-6 pb-24 bg-white border-t border-gray-200 md:pb-6 rounded-t-2xl">
            <div class="flex justify-between *:flex *:gap-2 *:items-center text-sm">
                <div>
                    <div class="label-checkbox-box">
                        <RadioButton />
                        <label for="">일반양식</label>
                    </div>
                    <div class="label-checkbox-box">
                        <RadioButton />
                        <label for="">엑셀양식</label>
                    </div>
                </div>
                <div class="flex justify-between">
                    <p>사이즈 숨김</p>
                    <ToggleSwitch v-model="mate['sizeYn']" />
                </div>
            </div>
    
            <div class="pt-4">
            <IconField>    
                <InputText class="w-full" :value="''+domain+'/customer/conDoc?cd='+emCd+''" readonly @click="getConDoc"/>
                <InputIcon class="pi pi-eye" />
            </IconField>
            </div>
            <div class="btn-2-layout-box">
                <Button label="계약서 링크 발송" @click="getNavi"/>
            </div>
        </section>
    </main>
</template> -->

<template>
    <BackHeader title="계약서" />
    <main class="w-full overflow-y-scroll pb-52 md:pb-16" ref="mainRef">
        <div class="md:grid md:grid-cols-3 md:gap-6 md:w-[100%] md:pb-52">
            <div class="md:col-span-1">
                <div class="md:px-6 md:pl-6 md:pr-0">
                    <h2 class="hidden py-4 font-bold title-lg md:block">고객정보</h2>
                    <section class="aspect-[4/3] -z-10 md:aspect-auto w-full">
                        <img src="@/assets/img/test.png" class="object-cover w-full aspect-[4/3] md:rounded-md " alt="">
                    </section>
                
                    
                    <section class="relative px-4 pt-6 pb-2 overflow-hidden bg-white -top-4 rounded-t-xl md:px-0 md:top-0">
                        <InfoCard :title="mate['ceNm']" :info="mate['headers']" />   
                    </section>
                </div>
    
                <div class="gray-bar md:hidden"></div>
            </div>

            <div class="overflow-y-scroll md:flex-col md:flex md:col-span-2 md:w-[100%] md:relative">
                <section class="p-4 md:pl-0 md:pr-6 md:pt-0">
                    <h2 class="hidden py-4 font-bold title-lg md:block">주문정보</h2>

                        <div class="flex flex-col gap-5">
                            <TableCard v-for="(table, index) in mate['list']" :key="index" :title="table.title" :cards="table.cardLists"
                           :columns="table.columns" :rows="table.rows" :tags="table.tags" :showTag="table.showTag"
                           :showButton="table.showButton" :sizeYn="mate['sizeYn']"/>
                        </div>
                </section>
                
                <div class="gray-bar md:hidden"></div> 
                <section class="p-4 md:p-0 md:pr-6">
                    <h2 class="hidden py-4 font-bold title-lg md:block">결제정보</h2>
                    <CalculateCard  :showtitle="true" :calcs="mate['payList']" title="합계 금액" totalTitle="총 합계 금액" :totalAmt="getAmt(mate['payList'], 'total')"/>
                </section>
              

            </div>
            
          
        
        </div>
        <section :style="{width: mainWidth + 'px', left: mainLeft + 'px',}" class="fixed bottom-0 w-full px-4 pt-4 pb-0 overflow-hidden bg-white border-t border-gray-200 rounded-t-2xl md:pb-0">
            <div class="flex justify-between *:flex *:gap-2 *:items-center text-sm w-full mb-4">
                <div>
                    <div class="label-checkbox-box">
                        <RadioButton />
                        <label for="general" class="text-desc">일반양식</label>
                    </div>
                    <div class="label-checkbox-box">
                        <RadioButton />
                        <label for="excel" class="text-desc">엑셀양식</label>
                    </div>
                </div>
                <div class="flex justify-between text-desc">
                    <p>사이즈 숨김</p>
                    <ToggleSwitch v-model="mate['sizeYn']" />
                </div>
            </div>
    
    
            <IftaLabel class="w-[100%]">
                <InputText  :value="''+domain+'/customer/estiDoc?cd='+emCd+''" readonly @click="getEstiDoc" class="w-[100%]"/>
                <label>발주서 링크</label>
            </IftaLabel>
    
           
            <div class="py-4 btn-2-layout-box conbutton">
                <Button label="계약서 링크 발송" @click="getNavi" class="w-[100%]"/>
            </div>
        </section>
        
    </main>
   
</template>
    
    
<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import CalculateCard from "@/components/card/CalculateCard.vue";
import InfoCard from "@/components/card/InfoCard.vue";
import TableCard from "@/components/card/TableCard.vue";
import RadioButton from 'primevue/radiobutton';
import ToggleSwitch from 'primevue/toggleswitch';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import IftaLabel from 'primevue/iftalabel';

import { ref } from 'vue';
import { onMounted } from 'vue';
import { useEstiStore, useConMateStore } from '@/store';
import { getAmt } from '@/assets/js/function';

const esti      = useEstiStore();
const mate      = useConMateStore();
const domain    = window.location.origin;
const emCd      = btoa(esti['emCd']);

const mainRef = ref(null);
const mainWidth = ref(0);
const mainLeft = ref(0)

onMounted(() => {
    const updateMainSize = () => {
        if (mainRef.value) {
            mainWidth.value = mainRef.value.offsetWidth
            mainLeft.value = mainRef.value.offsetLeft
        }
    }

    updateMainSize()

    const observer = new ResizeObserver(() => updateMainSize())
    if (mainRef.value instanceof Element) {
    updateMainSize()
    observer.observe(mainRef.value)
  } else {
    console.warn('mainRef is not a valid DOM element')
  }
});

const getConDoc = () => {
    const value = event.target.value;

    window.open(value, '_blank');
}

const getNavi = () => {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'share', value: `${domain}/customer/conDoc?cd=${emCd}` }));
}

onMounted(() => {
    mate.getInfo({ emCd : esti['emCd'] });
})

</script>

<style lang="scss">

</style>