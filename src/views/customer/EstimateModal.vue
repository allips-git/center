<!-- <template>
    <BackHeader title="견적서" />
    <main class="!pb-52 overflow-y-scroll">
        <div class="relative">
            <section class="relative overflow-hidden aspect-video -z-10">
                <img src="@/assets/img/test.png" class="object-cover w-full aspect-video" alt="">
            </section>
        
            <section class="relative p-4 pb-0 overflow-hidden bg-white md:p-6 -top-4 rounded-t-xl">
                <InfoCard :title="mate['ceNm']" :info="mate['headers']" />
                <div class="my-5 gray-bar"></div>

                <section class="">
                    <div class="flex flex-col gap-5">
                        <TableCard v-for="(table, index) in mate['list']" :key="index" :title="table.title" :cards="table.cardLists"
                       :columns="table.columns" :rows="table.rows" :tags="table.tags" :showTag="table.showTag"
                       :showButton="table.showButton" :sizeYn="mate['sizeYn']"/>
                    </div>
                </section>
            </section>

            <div class="gray-bar"></div>

            <section class="p-4">
                <CalculateCard  :showtitle="true" :calcs="mate['payList']" title="합계 금액" totalTitle="총 합계 금액" :totalAmt="getAmt(mate['payList'], 'total')"/>
            </section>
        </div>
    </main>
    <section class="fixed bottom-0 w-full p-5 overflow-hidden bg-white border-t border-gray-200 rounded-t-2xl pb-[75px] md:pb-0">
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

       
        <div class="pt-4 btn-2-layout-box">
            <Button label="견적서 링크 발송" @click="getNavi" class="w-[100%]"/>
        </div>
    </section>
</template> -->

<template>
    <BackHeader title="견적서" />
    <main class="w-full overflow-y-scroll pb-52 md:pb-16" ref="mainRef">
        <div class="md:grid md:grid-cols-3 md:gap-6 md:w-[100%] md:pb-52">
           
            <div class="md:col-span-1">
                <div class="md:px-6 md:pl-6 md:pr-0">
                    <h2 class="hidden py-4 font-bold title-lg md:block">고객정보</h2>
                    <section class="aspect-[4/3] -z-10 md:aspect-auto w-full">
                        <img src="@/assets/img/test.png" class="object-cover w-full aspect-[4/3] md:rounded-md " alt="">
                    </section>
                
                    
                    <section class="relative px-4 pt-4 pb-2 overflow-hidden bg-white -top-4 rounded-t-xl md:px-0 md:top-0">
                        <InfoCard :title="mate['ceNm']" :info="mate['headers']" />   
                    </section>
                </div>
    
                <div class="gray-bar md:hidden"></div>
            </div>
            <div class="overflow-y-scroll md:flex-col md:flex md:col-span-2 md:w-[100%] md:relative">

                <section class="p-4 pb-0 md:pl-0 md:pr-6 md:pt-0 md:pb-6">
        
                    <section class="">
                        <div class="flex flex-col">
                            <h2 class="hidden py-4 font-bold title-lg md:block">주문정보</h2>

                            <TableCard v-for="(table, index) in mate['list']" :key="index" :title="table.title" :cards="table.cardLists"
                           :columns="table.columns" :rows="table.rows" :tags="table.tags" :showTag="table.showTag"
                           :showButton="table.showButton" :sizeYn="mate['sizeYn']"/>
                        </div>
                    </section>
                </section>
                <section class="p-4 md:p-0 md:pr-6">
                    <h2 class="hidden py-4 font-bold title-lg md:block">결제정보</h2>

                    <CalculateCard  :showtitle="true" :calcs="mate['payList']" title="합계 금액" totalTitle="총 합계 금액" :totalAmt="getAmt(mate['payList'], 'total')"/>
                </section>
            </div>

        </div>
      
    </main>

  

    <section :style="{width: mainWidth + 'px', left: mainLeft + 'px',}" class="fixed bottom-0 w-full px-4 pt-4 overflow-hidden bg-white border-t border-gray-200 rounded-t-2xl md:pb-0">
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
            <Button label="견적서 링크 발송" @click="getNavi" class="w-[100%]"/>
        </div>
    </section>

</template>
<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import CalculateCard from "@/components/card/CalculateCard.vue";
import InfoCard from "@/components/card/InfoCard.vue";
import TableCard from "@/components/card/TableCard.vue";
import RadioButton from 'primevue/radiobutton';
import IftaLabel from 'primevue/iftalabel';
import ToggleSwitch from 'primevue/toggleswitch';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useEstiStore, useEstiMateStore } from '@/store';
import { getAmt } from '@/assets/js/function';

const esti      = useEstiStore();
const mate      = useEstiMateStore();
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

const getEstiDoc = () => {
    const value = event.target.value;

    window.open(value, '_blank');
}

const getNavi = () => {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'share', value: `${domain}/customer/estiDoc?cd=${emCd}` }));
}

onMounted(() => {
    mate.getInfo({ emCd : esti['emCd'] });
})

</script>

<style lang="scss">

</style>