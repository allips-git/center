<template>
    <main class="!pb-60 " ref="mainRef">
        <div class="relative">
            <section class="overflow-hidden relative p-4 bg-white rounded-t-xl">
                <InfoCard :title="'수신 : '+mate['faNm']" :info="mate['headers']" />
            </section>
            <div class="gray-bar !mt-0"></div>

            <section class="p-4">
                <div class="flex flex-col gap-5">
                    <TableCard v-for="(table, index) in mate['list']" :key="index" :title="table.title" :cards="table.cardLists"
                        :columns="table.columns" :rows="table.rows" :tags="table.tags" :showTag="table.showTag"
                        :showButton="table.showButton"/>
                </div>
            </section>
        </div>
        <!-- <section :style="{width: mainWidth + 'px', left: mainLeft + 'px',}" class="fixed bottom-[22px] md:bottom-0 w-full p-5 overflow-hidden bg-white border-t border-gray-200 rounded-t-2xl md:!w-[calc(100vw-200px)]">
            <div class="flex justify-end *:flex *:gap-2 *:items-center text-sm w-full">
                <div class="justify-end">
                    <div class="label-checkbox-box">
                        <RadioButton />
                        <label for="general" class="text-xs">일반양식</label>
                    </div>
                    <div class="label-checkbox-box">
                        <RadioButton />
                        <label for="excel" class="text-xs">엑셀양식</label>
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
        </section> -->

        <section :style="{width: mainWidth + 'px', left: mainLeft + 'px',}" class="overflow-hidden fixed bottom-0 px-4 pt-4 pb-0 w-full bg-white rounded-t-2xl border-t border-gray-200 md:pb-0">
            <div class="flex justify-end *:flex *:gap-2 *:items-center text-sm w-full mb-4">
                <div class="ourorder-radio">
                    <div class="label-checkbox-box">
                        <RadioButton />
                        <label for="general" class="text-sm text-t-lv4">일반양식</label>
                    </div>
                    <div class="label-checkbox-box">
                        <RadioButton />
                        <label for="excel" class="text-sm text-t-lv4">엑셀양식</label>
                    </div>
                </div>
            </div>
            <IftaLabel class="w-[100%]">
                <IconField class="w-full">
                    <InputText :value="''+domain+'/customer/outOrderDoc?cd='+edCd+''" readonly  class="w-full" style="border-color: #22c55e" @click="getOutOrderDoc" />
                    <InputIcon class="pi pi-eye" />
                </IconField>
                <label>발주서 링크</label>
            </IftaLabel>
            <div class="py-4 btn-2-layout-box conbutton">
                <Button label="링크 발주" @click="getNavi" severity="success" class="w-[100%]"/>
            </div>
        </section>
    </main>
</template>
    
<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import InfoCard from "@/components/card/InfoCard.vue";
import IftaLabel from 'primevue/iftalabel';
import TableCard from "@/components/card/TableCard.vue";
import RadioButton from 'primevue/radiobutton';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useOrderStore, useOutOrderMateStore } from '@/store';

const ord       = useOrderStore();
const mate      = useOutOrderMateStore();
const domain    = window.location.origin;
const edCd      = btoa(ord['edCd']);

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