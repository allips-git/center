<template>
    <main>
        <div class="p-4">
            <IconField class="w-full bg">
                <InputIcon class="z-10">
                    <IconSearch class="w-4 h-4 text-t-lv2" />
                </InputIcon>
                <InputText v-model="factory['out']['itemSearch']" placeholder="제품명 검색" class="w-full" @keyup.enter="factory.getOutFactoryItemList()"/>
            </IconField>

            <section class="mt-4">
                <div class="flex justify-end items-center">
                    <!-- <p class="text-lg font-bold text-indigo-600">블라인드</p> -->
                    <Button class="flex items-center !bg-[#CDE8FD] !p-[0.25rem] !pl-[0.625rem] !text-p-lv4 rounded-full !border-0 btn-xs" size="small" @click="getOutItemSet">
                        <div class="p-button-label">제품 추가</div>
                        <IconAddCircle class="size-[1.125rem]"/>
                    </Button>
                </div>
                <div class="flex flex-col">
                    <MoreCard v-for="(item, index) in factory['out']['itemList']" :key="index" :itemNm="item['itemNm']" :size="item['size']" :unitNm="item['unitNm']" 
                        :saleAmt="item['saleAmt']" :purcAmt="item['purcAmt']" @click="getItemDetail(item['itemCd'])"/>
                </div>
            </section>
        </div>    
    </main>

<Dialog v-model:visible="popup['pop']['outFactoryItemSet']" header="외주공장 제품관리" 
    :modal=true position="center" :dismissableMask="true" class="custom-dialog-full"
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
import IconSearch from '@/components/icons/IconSearch.vue';

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