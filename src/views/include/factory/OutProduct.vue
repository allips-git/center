<template>
<main class="p-4">
    <div class="">
        <div class="flex gap-2 mb-4">
            <IconField class="table-search-input w-full">
                <InputIcon>
                    <i class="pi pi-search" />
                </InputIcon>
                <InputText v-model="factory['out']['itemSearch']" placeholder="제품명 검색" class="w-full" @keyup.enter="factory.getOutFactoryItemList()"/>
            </IconField>
        </div>
        <section class="border-b py-4">
            <div class="flex justify-between items-center">
                <!-- <p class="text-lg font-bold text-indigo-600">블라인드</p> -->
                <Button label="제품 추가" showIcon icon="pi pi-plus" size="small" rounded @click="getOutItemSet" />
            </div>
            <div class="flex flex-col gap-4">
                <MoreCard v-for="(item, index) in factory['out']['itemList']" :key="index" :itemNm="item['itemNm']" :size="item['size']" :unitNm="item['unitNm']" 
                    :saleAmt="item['saleAmt']" :purcAmt="item['purcAmt']" @click="getItemDetail(item['itemCd'])"/>
            </div>
        </section>
    </div>    
</main>

<Dialog v-model:visible="popup['pop']['outFactoryItemSet']" header="외주공장 제품관리" 
    :modal=true position="center" :dismissableMask="true" class="custom-dialog-bottom"
    @update:visible="getPopClose(true, 'outFactoryItemSet')">
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