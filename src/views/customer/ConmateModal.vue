<template>
    <main class="overflow-y-auto pb-52 w-full" ref="mainRef">
        <div class="md:p-4">
            <div class="">
                <div class="">
                    <h2 class="hidden pb-4 text-base font-bold md:block">고객정보</h2>
                    <section class="aspect-[4/3] -z-10 md:aspect-auto w-full">
                        <img src="@/assets/img/test.png" class="object-cover w-full aspect-[4/3] md:rounded-md " alt="">
                    </section>
                
                    
                    <section class="overflow-hidden relative -top-4 px-4 pt-6 pb-2 bg-white rounded-t-xl md:px-0 md:top-0">
                        <InfoCard :title="mate['ceNm']" :info="mate['headers']" />   
                    </section>
                </div>
    
                <div class="gray-bar md:hidden"></div>
            </div>

            <div class="overflow-y-auto md:flex-col md:flex md:col-span-2 md:w-[100%] md:relative">
                <section class="p-4 md:p-0 md:pt-0">
                    <h2 class="hidden py-4 text-base font-bold md:block">주문정보</h2>

                        <div class="flex flex-col gap-5">
                            <TableCard v-for="(table, index) in mate['list']" :key="index" :title="table.title" :cards="table.cardLists"
                           :columns="table.columns" :rows="table.rows" :tags="table.tags" :showTag="table.showTag"
                           :showButton="table.showButton" :sizeYn="mate['sizeYn']"/>
                        </div>
                </section>
                
                <div class="gray-bar md:hidden"></div> 
                <section class="p-4 md:p-0">
                    <h2 class="hidden py-4 text-base font-bold md:block">결제정보</h2>
                    <CalculateCard  :showtitle="true" :calcs="mate['payList']" title="합계 금액" totalTitle="총 합계 금액" :totalAmt="getAmt(mate['payList'], 'total')"/>
                </section>
              

            </div>
            
          
        
        </div>
        <section :style="{width: mainWidth + 'px', left: mainLeft + 'px',}" class="overflow-hidden fixed bottom-0 px-4 pt-4 pb-0 w-full bg-white rounded-t-2xl border-t border-gray-200 md:pb-0">
            <div class="flex justify-between *:flex *:gap-2 *:items-center text-sm w-full mb-4">
                <div>
                    <div class="label-checkbox-box">
                        <RadioButton />
                        <label for="general" class="text-sm text-t-lv4">일반양식</label>
                    </div>
                    <div class="label-checkbox-box">
                        <RadioButton />
                            <label for="excel" class="text-sm text-t-lv4">엑셀양식</label>
                    </div>
                </div>
                <div class="flex justify-between text-sm text-t-lv4">
                    <p>사이즈 숨김</p>
                    <ToggleSwitch v-model="mate['sizeYn']" />
                </div>
            </div>
    
    
            <IftaLabel class="w-[100%]">
            <IconField class="w-full">

                <InputText  :value="''+domain+'/customer/conDoc?cd='+emCd+''" readonly @click="getConDoc" class="w-[100%]"/>
                <InputIcon class="cursor-pointer pi pi-eye" @click="getConDoc"/>
            </IconField>

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
    const url = domain+'/customer/conDoc?cd='+emCd;
    window.open(url, '_blank');
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