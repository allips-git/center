<template>
<main ref="mainRef">
    <BackHeader :title="factory['sys']['info']['faNm']" />
    <div class="!pb-36">
        <section class="overflow-hidden aspect-video rounded-b-md">
            <img :src="getImage(factory['sys']['info']['filePath'])" class="object-cover w-full aspect-video" alt="">
        </section>
    
        <section class="">
            <h1 class="px-5 pt-5 pb-2 mb-1 text-sm font-bold">공장 정보</h1>
            <ul class="flex flex-col gap-[10px] p-5 pt-0 text-sm rounded-md">
                <li class="flex text-xs">
                    <p class="flex items-center w-24 text-xs text-gray-600 whitespace-nowrap">혜택</p>
                    <p class="font-medium"><div class="flex items-center justify-center font-bold text-white bg-orange-500 rounded-full size-5">P</div>{{ factory['sys']['info']['boon'] }}</p>
                </li>
                <li class="flex">
                    <p class="flex items-center w-24 text-xs text-gray-600 whitespace-nowrap">전화번호</p>
                    <p class="capsuel_sky">{{ factory['sys']['info']['tel'] }}</p>
                </li>
                <li class="flex">
                    <p class="flex items-center w-24 text-xs text-gray-600 whitespace-nowrap">영업시간</p>
                    <div class="text-xs">
                        <p class="">09:00 - 18:00</p>
                    </div>
                </li>
                <li class="flex">
                    <p class="flex items-center w-24 text-xs text-gray-600 whitespace-nowrap">주소</p>
                    <p class="text-xs">({{ factory['sys']['info']['zip'] }}) {{ factory['sys']['info']['addr']+' '+factory['sys']['info']['addrDetail'] }}</p>
                </li>
                <li class="flex">
                    <p class="flex items-center w-24 text-xs text-gray-600 whitespace-nowrap">계좌</p>
                    <p class="text-xs">{{ factory['sys']['info']['bankNm']+' '+factory['sys']['info']['accNum'] }}</p>
                </li>
            </ul>
            <!-- 카운트 -->
            <ul class="grid grid-cols-4 py-5 mx-4 border border-gray-200 rounded-[4px] mt-[10px]">
                <li class="flex flex-col items-center justify-center border-r last:border-r-0">
                    <p class="text-lg font-bold text-blue-600">0</p>
                    <p class="text-xs text-gray-500">주문</p>
                </li>
                <li class="flex flex-col items-center justify-center border-r last:border-r-0">
                    <p class="text-lg font-bold text-blue-600">0</p>
                    <p class="text-xs text-gray-500">생산</p>
                </li>
                <li class="flex flex-col items-center justify-center border-r last:border-r-0">
                    <p class="text-lg font-bold text-blue-600">0</p>
                    <p class="text-xs text-gray-500">생산완료</p>
                </li>
                <li class="flex flex-col items-center justify-center border-r last:border-r-0">
                    <p class="text-lg font-bold text-blue-600">0</p>
                    <p class="text-xs text-gray-500">출고</p>
                </li>
            </ul>
        </section>
        <div class="w-full h-3 my-8 bg-gray-100"></div>
        <section class="px-5">
            <!-- <CalculateCard  :showtitle="true"  title="거래원장" totalTitle="총 결제 금액"/> -->
        </section>
        <section class="px-5">
            <!-- <NoticeCard/> -->
        </section>
    </div>

    <!-- <div class="flex-col border-t bottom-fixed-btn-box">
        <div class="flex justify-between mb-1 text-base font-bold">
            <p >총 제품</p>
            <p class="text-blue-600">{{ factory['sys']['info']['itemCnt'] }}개</p>
        </div>
        <Button label="제품 설정하기" size="large" @click="getPopupOpen('sysFactoryItemList')"/>
    </div> -->

    <div :style="{width: mainWidth + 'px', left: mainLeft + 'px',  
    }" class="!flex-col bottom-fixed-btn-box !pt-[18px] !gap-4">
            <div class="flex justify-between w-full text-base font-bold">
                <p class="">총 제품</p>
                <p class="text-p-lv4">{{ factory['out']['detail']['itemCnt'] }}개</p>
            </div>
            <Button label="제품 설정하기" size="large" @click="getPopupOpen('sysFactoryItemList')"/>
    </div>
    
</main>
<Dialog v-model:visible="popup['pop']['sysFactoryItemList']" header="시스템 공장 제품 리스트" 
    :modal=true position="center" class="custom-dialog-full"
    @update:visible="getPopupClose('sysFactoryItemList', true)">
    <template #header>
        <div class="modal-fullheader">
            <Button @click="getPopupClose(true, 'sysFactoryItemList')" severity="contrast" text icon="pi pi-arrow-left" class="flex justify-start"/>
            <h2 class="modal-backheader-title">제품정보</h2>
        </div>
    </template>
    <ProductInfo/>
</Dialog>
<Dialog v-model:visible="popup['pop']['sysFactoryItemSet']" header="제품관리" 
    :modal=true position="center" class="custom-dialog-full"
    @update:visible="getPopupClose('sysFactoryItemSet', true)">
    <template #header>
        <div class="modal-fullheader">
            <Button @click="getPopupClose('sysFactoryItemSet', true)" severity="contrast" text icon="pi pi-arrow-left" class="flex justify-start"/>
            <h2 class="modal-backheader-title">제품관리</h2>
        </div>
    </template>
    <ProductMng/>
</Dialog>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import ProductInfo from "@/views/include/factory/ProductInfo.vue";
import ProductMng from "@/views/include/factory/ProductMng.vue";
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

const getImage = (imgUrl: string) => {
    return 'https://elasticbeanstalk-ap-northeast-2-627549176645.s3.ap-northeast-2.amazonaws.com/' + imgUrl;
}

onMounted(async () => {
    await factory.getSysFactoryDetail();
});

</script>

<style lang="scss">

</style>