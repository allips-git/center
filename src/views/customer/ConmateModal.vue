<template>
    <BackHeader title="계약서" />
    <main class="!pb-36">
        <div class="relative">
            <section class="aspect-video relative -z-10 overflow-hidden">
                <img src="@/assets/img/test.png" class="w-full aspect-video object-cover" alt="">
            </section>
        
            <section class="relative -top-4 rounded-t-xl overflow-hidden bg-white">
                <InfoCard :title="mate['ceNm']" :info="mate['headers']" />
                <div class="gray-bar"></div>

                <section class="px-5">
                    <div class="flex flex-col gap-5">
                        <TableCard v-for="(table, index) in mate['list']" :key="index" :title="table.title" :cards="table.cardLists"
                       :columns="table.columns" :rows="table.rows" :tags="table.tags" :showTag="table.showTag"
                       :showButton="table.showButton" :sizeYn="mate['sizeYn']"/>
                    </div>
                </section>
            </section>
            <section class="px-5">
                <CalculateCard  :showtitle="true" :calcs="mate['payList']" title="합계 금액" totalTitle="총 합계 금액" :totalAmt="getAmt(mate['payList'], 'total')"/>
            </section>
        </div>
    </main>
    <section class="fixed bg-white border-t border-gray-200 rounded-t-2xl p-5 bottom-0 w-full overflow-hidden">
        <div class="flex justify-between *:flex *:gap-2 *:items-center text-sm w-full">
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

        <div class="btn-2-layout-box pt-4">
            <InputText :value="''+domain+'/customer/conDoc?cd='+emCd+''" readonly @click="getConDoc"/>
        </div>
        <div class="btn-2-layout-box pt-4">
            <Button label="계약서 링크 발송"/>
        </div>
    </section>
    </template>
    
<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import CalculateCard from "@/components/card/CalculateCard.vue";
import InfoCard from "@/components/card/InfoCard.vue";
import TableCard from "@/components/card/TableCard.vue";
import RadioButton from 'primevue/radiobutton';
import ToggleSwitch from 'primevue/toggleswitch';
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

onMounted(() => {
    mate.getInfo({ emCd : esti['emCd'] });
})

</script>

<style lang="scss">

</style>