<template>
    <BackHeader :title="mate['ceNm']+' 발주서'" />
    <main class="!pb-60 ">
        <div class="relative">
            <section class="relative p-4 overflow-hidden bg-white rounded-t-xl md:p-6">
                <InfoCard :title="'수신 : '+mate['faNm']" :info="mate['headers']" />
            </section>
            <div class="gray-bar !mt-0"></div>

            <section class="p-4 md:p-6">
                <div class="flex flex-col gap-5">
                    <TableCard v-for="(table, index) in mate['list']" :key="index" :title="table.title" :cards="table.cardLists"
                        :columns="table.columns" :rows="table.rows" :tags="table.tags" :showTag="table.showTag"
                        :showButton="table.showButton"/>
                </div>
            </section>
        </div>
    </main>
    <section class="fixed bottom-[22px] md:bottom-0 w-full p-5 overflow-hidden bg-white border-t border-gray-200 rounded-t-2xl md:!w-[calc(100vw-200px)]">
        <div class="flex justify-end *:flex *:gap-2 *:items-center text-sm w-full">
            <div class="justify-end">
                <div class="label-checkbox-box">
                    <RadioButton />
                    <label for="">일반양식</label>
                </div>
                <div class="label-checkbox-box">
                    <RadioButton />
                    <label for="">엑셀양식</label>
                </div>
            </div>
        </div>

        <div class="pt-4 btn-2-layout-box">
            <IconField class="w-full">
                <InputText :value="''+domain+'/customer/outOrderDoc?cd='+edCd+''" readonly @click="getOutOrderDoc" class="w-full"/>
                <InputIcon class="pi pi-eye" />
            </IconField>
        </div>
        <div class="pt-4 btn-2-layout-box">

            <Button label="링크 발주" severity="success" @click="getNavi" class="w-[100%]"/>
        </div>
    </section>
</template>
    
<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import InfoCard from "@/components/card/InfoCard.vue";
import TableCard from "@/components/card/TableCard.vue";
import RadioButton from 'primevue/radiobutton';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import { onMounted } from 'vue';
import { useOrderStore, useOutOrderMateStore } from '@/store';

const ord       = useOrderStore();
const mate      = useOutOrderMateStore();
const domain    = window.location.origin;
const edCd      = btoa(ord['edCd']);

const getOutOrderDoc = () => {
    const value = event.target.value;

    window.open(value, '_blank');
}

const getNavi = () => {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'share', value: `${domain}/customer/outOrderDoc?cd=${edCd}` }));
}

onMounted(() => {
    mate.getInfo({ edCd : ord['edCd'] });
})
</script>

<style lang="scss">

</style>