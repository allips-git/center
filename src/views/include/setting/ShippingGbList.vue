<template>
    <main class="relative pb-24  h-[90vh]">
        <section class="">
            <ul class="flex flex-col">
                <li v-if="setting.shippingGbList.length === 0" class="flex items-center gap-[14px] flex-none w-full px-4 py-[10px] md:px-6 cursor-pointer ">대표 배송지를 등록해주세요.</li>
                <li v-for="(item, index) in setting.shippingGbList" :key="index" class="flex items-center gap-[14px] flex-none w-full px-4 py-[10px] md:px-6 cursor-pointer " @click="getInfo(item.shippingGb, item.shippingGbNm)">
                    <!-- 상태 -->
                    <div :class="getStatusClass(item.shippingGb)" class="flex items-center justify-center flex-none font-bold text-white rounded-md text-11 md:text-sm w-[11.4%] aspect-square sm:size-10">
                        {{ item.shippingGbNm }}
                    </div>
                    <div class="flex gap-2 justify-between w-full">
                        <div class="flex flex-col flex-grow min-w-0">
                            <p class="font-bold text-13">{{ item.addr }}</p>
                            <span class="flex-1 text-10 truncate text-t-lv4 whitespace-nowrap max-w-[200px] sm:max-w-[100%]">({{ item.zip }}) {{ item.addrDetail }}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </section>

        <div class="fixed bottom-14 right-4 xl:right-[calc((100vw-1280px)/2+8rem)] xl:bottom-14 2xl:right-[calc((100vw-1440px)/2+8rem) register-button"  @click="getPopOpen">
            <Button label="대표 배송지 등록" icon="pi pi-plus" size="large"  @click="getPopOpen"/>
        </div>

        <Dialog v-model:visible="popup['pop']['shippingGbSet']" 
        header="대표 배송지 등록"
        :modal=true
        position="center"
        class="custom-dialog-full"
        @update:visible="getPopupClose('shippingGbSet', true)">
        <template #header>
            <div class="modal-backheader">
                <Button @click="getPopupClose('shippingGbSet', true)" severity="contrast" text icon="pi pi-times" iconPos="right"/>
                <h2 class="modal-backheader-title">대표 배송지</h2>
            </div>
        </template>
            <ShippingGbSet/>
        </Dialog>
    </main>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import ShippingGbSet from '@/views/include/setting/ShippingGbSet.vue'
import { onMounted } from 'vue';
import { usePopupStore, useSettingStore } from '@/store';
import { usePopup } from '@/assets/js/popup';

const popup     = usePopupStore();
const setting   = useSettingStore();

const { getPopupOpen, getPopupClose } = usePopup();

const getPopOpen = () => {
    getPopupOpen('shippingGbSet');
    // setting.getShippingReset();
}

const getStatusClass = (step: number) => {
    switch (step) 
    {
        case '001':
            return 'bg-blue-300';
        case '002':
            return 'bg-blue-400';
        case '003':
            return 'bg-blue-500';
        case '005':
            return 'bg-blue-700';
    }
};

const getList = async () => {
    await setting.getShippingGbList();
}

const getInfo = async (shippingGb: string, shippingGbNm: string) => {
    await setting.getShippingGb(shippingGb, shippingGbNm); 
    getPopupClose('shippingGbList');
}

onMounted(() => {
    getList();
})
</script>