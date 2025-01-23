<template>
    <main>
        <BackHeader :title="factory['out']['detail']['header'][0]['value']+' 상세 정보'" />
        <main class="!pb-36">
            <div class="relative">
                <section class="relative overflow-hidden bg-white rounded-t-xl">
                    <InfoCard :title="factory['out']['detail']['header'][0]['value']" 
                        :info="factory['out']['detail']['header']" :btnLabel="'수정하기'"
                        @get-btn="getPopOpen('outFactorySet')"/>
                </section>
                <div class="gray-bar"></div>
    
                <section class="px-5">
                    <CalculateCard :showtitle="true" :calcs="factory['out']['detail']['info']" title="매입 거래원장" 
                        totalTitle="총 결제 금액" :totalAmt="factory['out']['detail']['totalAmt']"/>
                </section>
            </div>
        </main>
        <div class="flex-col !border-0 bottom-fixed-btn-box shadow-custom-y">
            <div class="flex justify-between mb-1 font-bold">
                <p >총 제품</p>
                <p class="text-p-lv4">{{ factory['out']['detail']['itemCnt'] }}개</p>
            </div>
            <Button label="제품 설정하기" size="large" @click="getPopupOpen('outFactoryItemList')"/>
        </div>
    
        <Dialog v-model:visible="popup['pop']['outFactoryItemList']" header="외주공장 제품정보" 
            :modal=true position="bottom" class="custom-dialog-bottom backPopup"
            @update:visible="getPopupClose('outFactoryItemList', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="popup['pop']['outFactoryItemList'] = false" severity="contrast" text icon="pi pi-arrow-left"/>
                    <h2 class="modal-backheader-title">외주 공장 제품정보</h2>
                </div>
            </template>
            <OutProduct/>
        </Dialog>
    
        <Dialog v-model:visible="popup['pop']['outFactorySet']" header="외주공장 저장" 
            :modal=true position="bottom" :dismissableMask="true" class="custom-dialog-bottom "
            @update:visible="getPopupClose('outFactorySet', true)">
            <OutFactorySet/>
        </Dialog>
    </main>
</template>
    
<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import CalculateCard from "@/components/card/CalculateCard.vue";
import InfoCard from "@/components/card/InfoCard.vue";
import OutProduct from "@/views/include/factory/OutProduct.vue";
import OutFactorySet from '@/views/include/factory/OutFactorySet.vue'
import { onMounted } from 'vue';
import { usePopupStore, useFactoryStore } from '@/store';
import { usePopup } from '@/assets/js/popup';

const popup     = usePopupStore();
const factory   = useFactoryStore();
const { getPopupOpen, getPopupClose } = usePopup();

const getPopOpen = (popNm: string) => {
    factory.getOutInfoReset();
    factory.getOutFactoryInfo();
    getPopupOpen(popNm);
}

onMounted(async () => {
    await factory.getOutFactoryDetail();
});
</script>

<style lang="scss">

</style>