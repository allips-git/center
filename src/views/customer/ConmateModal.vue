<template>
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
import { onMounted } from 'vue';
import { useEstiStore, useConMateStore } from '@/store';
import { getAmt } from '@/assets/js/function';

const esti      = useEstiStore();
const mate      = useConMateStore();
const domain    = window.location.origin;
const emCd      = btoa(esti['emCd']);

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