<template>
<main class="">
    <div class="">
        <div class="flex gap-2 mb-4">
            <IconField class="w-full table-search-input gray_input">
                <InputIcon>
                    <i class="pi pi-search" />
                </InputIcon>
                <InputText v-model="factory['out']['itemSearch']" placeholder="제품명 검색" class="w-full" @keyup.enter="factory.getOutFactoryItemList()"/>
            </IconField>
        </div>
        <section class="">
            <div class="flex items-center justify-end">
                <!-- <p class="text-lg font-bold text-indigo-600">블라인드</p> -->
                 <div class="pl-2 pr-1 gap-2 text-10 py-[2.5px] text-p-lv4 rounded-full flex items-center justify-center bg-[#CDE8FD]" @click="getOutItemSet">
                    <p class="pb-px">제품 추가</p>
                    <IconAddCircle class="size-[18px]"/>
                </div>
            </div>
            <div class="flex flex-col gap-4">
                <MoreCard v-for="(item, index) in factory['out']['itemList']" :key="index" :itemNm="item['itemNm']" :size="item['size']" :unitNm="item['unitNm']" 
                    :saleAmt="item['saleAmt']" :purcAmt="item['purcAmt']" @click="getItemDetail(item['itemCd'])"/>
            </div>
        </section>
    </div>    
</main>

<Dialog v-model:visible="popup['pop']['outFactoryItemSet']" header="외주공장 제품관리" 
    :modal=true position="center" :dismissableMask="true" class="custom-dialog-bottom backPopup"
    @update:visible="getPopupClose(true, 'outFactoryItemSet')">
    <template #header>
        <div class="modal-fullheader">
            <Button @click="getPopupClose(true, 'outFactoryItemSet')" severity="contrast" text icon="pi pi-arrow-left"/>
            <h2 class="modal-backheader-title">외주공장 제품관리</h2>
        </div>
    </template>
    <OutMng/>
</Dialog>
</template>

<script setup lang="ts">
import IconField from 'primevue/iconfield'; 
import InputText from 'primevue/inputtext'; 
import InputIcon from 'primevue/inputicon'; 
import MoreCard from '@/components/card/MoreCard.vue'; 
import OutMng from "@/views/include/factory/OutMng.vue";
import { onMounted } from 'vue';
import { usePopupStore, useFactoryStore } from '@/store';
import { usePopup } from '@/assets/js/popup';
import IconMore from '@/components/icons/IconMore.vue';
import IconAddCircle from '@/components/icons/IconAddCircle.vue';

const popup     = usePopupStore();
const factory   = useFactoryStore();

const { getPopupOpen, getPopupClose } = usePopup();

const getOutItemSet = () => {
    factory.getOutItemInfoReset();
    getPopupOpen('outFactoryItemSet');
}

const getItemDetail = async (itemCd: string) => {
    await factory.getOutItemInfoReset();
    await factory.getOutItemCd(itemCd);
    await getPopupOpen('outFactoryItemSet');
    await factory.getOutFactoryItemInfo();
}

onMounted(async () => {
    await factory.getOutFactoryItemList();
});

</script>