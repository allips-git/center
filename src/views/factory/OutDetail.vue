<template>
    <BackHeader :title="factory['out']['detail']['header'][0]['value']+' 상세 정보'" />
    <main class="!pb-36">
        <div class="relative">
            <section class="relative rounded-t-xl overflow-hidden bg-white">
                <InfoCard :title="factory['out']['detail']['header'][0]['value']" :info="factory['out']['detail']['header']" :btnLabel="'수정하기'"/>
            </section>

            <div class="gray-bar"></div>

            <section class="px-5">
                <CalculateCard  :showtitle="true" title="매입 거래원장" totalTitle="총 결제 금액"/>
            </section>
        </div>
    </main>
    <div class="bottom-fixed-btn-box flex-col border-t">
        <div class="flex font-bold text-lg mb-1 justify-between">
            <p >총 제품</p>
            <p class="text-indigo-600">{{ factory['out']['info']['itemCnt'] }}개</p>
        </div>
        <Button label="제품 설정하기" size="large"/>
    </div>

    <Dialog v-model:visible="popup['pop']['outFactoryDetail']" header="외주공장 이름 제품정보" 
        :modal=true position="center" class="custom-dialog-bottom"
        @update:visible="getPopupClose('outFactoryDetail', true)">
        <OutProduct/>
    </Dialog>
</template>
    
<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import CalculateCard from "@/components/card/CalculateCard.vue";
import InfoCard from "@/components/card/InfoCard.vue";
import OutProduct from "@/views/include/factory/OutProduct.vue";
import { onMounted } from 'vue';
import { usePopupStore, useFactoryStore } from '@/store';
import { usePopup } from '@/assets/js/popup';

const popup     = usePopupStore();
const factory   = useFactoryStore();
const { getPopupOpen, getPopupClose } = usePopup();

onMounted(async () => {
    await factory.getOutFactoryDetail();
});
</script>

<style lang="scss">

</style>