<template>
    <main class="pb-[174px] md:pb-[124px]" ref="mainRef">
        <BackHeader :title="factory['out']['detail']['header'][0]['value']+' 상세 정보'" />
        <main class="" >
            <div class="relative">
                <section class="relative p-4 overflow-hidden bg-white rounded-t-xl md:p-6">
                    <InfoCard :title="factory['out']['detail']['header'][0]['value']" 
                        :info="factory['out']['detail']['header']" :btnLabel="'수정하기'"
                        @get-btn="getPopOpen('outFactorySet')"/>
                </section>

                <div class="gray-bar"></div>
    
                <section class="p-4 md:p-6">
                    <CalculateCard :showtitle="true" :calcs="factory['out']['detail']['info']" title="매입 거래원장" 
                        totalTitle="총 결제 금액" :totalAmt="factory['out']['detail']['totalAmt']"/>
                </section>
            </div>
            
          

            <div :style="{width: mainWidth + 'px', left: mainLeft + 'px',  
            }" class="!flex-col bottom-fixed-btn-box" 
            >
            <div class="flex justify-between w-full mb-1 font-bold">
                    <p >총 제품</p>
                    <p class="text-p-lv4">{{ factory['out']['detail']['itemCnt'] }}개</p>
                </div>
                <Button label="제품 설정하기" size="large" @click="getPopupOpen('outFactoryItemList')"/>
            </div>
          
        </main>


    
        <Dialog v-model:visible="popup['pop']['outFactoryItemList']" header="외주공장 제품정보" 
            :modal=true position="center" class="custom-dialog-full"
            @update:visible="getPopupClose('outFactoryItemList', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose('outFactoryItemList', true)" severity="contrast" text icon="pi pi-times"/>
                    <h2 class="modal-backheader-title">외주 공장 제품정보</h2>
                </div>
            </template>
            <OutProduct/>
        </Dialog>


        <Dialog v-model:visible="popup['pop']['outFactorySet']" header="외주 공장 저장" 
            :modal=true position="center" class="custom-dialog-bottom" 
            @update:visible="getPopClose('outFactorySet', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose(true, 'outFactorySet')" severity="contrast" text icon="pi pi-times"/>
                    <h2 class="modal-backheader-title">외주 공장 저장</h2>
                </div>
            </template>
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
import { ref } from 'vue';
import { onMounted } from 'vue';
import { usePopupStore, useFactoryStore } from '@/store';
import { usePopup } from '@/assets/js/popup';

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
    observer.observe(mainRef.value)
});


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