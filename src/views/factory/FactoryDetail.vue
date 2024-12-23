<template>
<main>
    <BackHeader :title="factory['sys']['info']['faNm']" />
    <div class="!pb-36">
        <section class="aspect-video rounded-b-md overflow-hidden">
            <img src="@/assets/img/test.png" class="w-full aspect-video object-cover" alt="">
        </section>
    
        <section class="">
            <h1 class="text-2xl font-bold mb-4 px-5 pt-5 pb-2">{{ factory['sys']['info']['faNm'] }}</h1>
            <ul class="flex flex-col gap-4 p-5 pt-0 rounded-md">
                <li class="flex">
                    <p class="text-gray-600 w-24 whitespace-nowrap">혜택</p>
                    <p>{{ factory['sys']['info']['boon'] }}</p>
                </li>
                <li class="flex">
                    <p class="text-gray-600 w-24 whitespace-nowrap">전화번호</p>
                    <p>{{ factory['sys']['info']['tel'] }}</p>
                </li>
                <li class="flex">
                    <p class="text-gray-600 w-24 whitespace-nowrap">영업시간</p>
                    <div>
                        <p>09:00 - 18:00</p>
                        <ul class="flex flex-col gap-1 mt-1">
                            <li>주말 휴무</li>
                            <li>공휴일 10:00 - 16:00</li>
                        </ul>
                    </div>
                </li>
                <li class="flex">
                    <p class="text-gray-600 w-24 whitespace-nowrap">주소</p>
                    <p>({{ factory['sys']['info']['zip'] }}) {{ factory['sys']['info']['addr']+' '+factory['sys']['info']['addrDetail'] }}</p>
                </li>
                <li class="flex">
                    <p class="text-gray-600 w-24 whitespace-nowrap">계좌</p>
                    <p>{{ factory['sys']['info']['bankNm']+' '+factory['sys']['info']['accNum'] }}</p>
                </li>
            </ul>
            <!-- 카운트 -->
            <ul class="mt-2 grid grid-cols-4 bg-gray-50 rounded-lg mx-4">
                <li class="py-5 flex flex-col items-center justify-center border-r last:border-r-0">
                    <p class="text-indigo-600 text-lg font-bold">0</p>
                    <p class="text-gray-600 text-sm">주문</p>
                </li>
                <li class="py-5 flex flex-col items-center justify-center border-r last:border-r-0">
                    <p class="text-indigo-600 text-lg font-bold">0</p>
                    <p class="text-gray-600 text-sm">생산</p>
                </li>
                <li class="py-5 flex flex-col items-center justify-center border-r last:border-r-0">
                    <p class="text-indigo-600 text-lg font-bold">0</p>
                    <p class="text-gray-600 text-sm">생산완료</p>
                </li>
                <li class="py-5 flex flex-col items-center justify-center border-r last:border-r-0">
                    <p class="text-indigo-600 text-lg font-bold">0</p>
                    <p class="text-gray-600 text-sm">출고</p>
                </li>
            </ul>
        </section>
        <div class="h-3 w-full bg-gray-100 my-8"></div>
        <section>
            <CalculateCard />
        </section>
    </div>

    <div class="bottom-fixed-btn-box flex-col border-t">
        <div class="flex font-bold text-lg mb-1 justify-between">
            <p >총 제품</p>
            <p class="text-indigo-600">{{ factory['sys']['info']['itemCnt'] }}개</p>
        </div>
        <Button label="제품 설정하기" size="large" @click="getPopupOpen('sysFactoryItemList')"/>
    </div>
    <Dialog v-model:visible="popup['pop']['sysFactoryItemList']" header="시스템 공장 제품 리스트" 
        :modal=true position="bottom" class="custom-dialog-bottom"
        @update:visible="getPopupClose('sysFactoryItemList', true)">
        <ProductInfo/>
    </Dialog>
    <Dialog v-model:visible="popup['pop']['sysFactoryItemSet']" header="시스템 공장 제품 정보" 
        :modal=true position="bottom" class="custom-dialog-bottom"
        @update:visible="getPopupClose('sysFactoryItemSet', true)">
        <ProductMng/>
    </Dialog>
</main>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import ProductInfo from "@/views/include/factory/ProductInfo.vue";
import ProductMng from "@/views/include/factory/ProductMng.vue";
import { onMounted } from 'vue';
import { usePopupStore, useFactoryStore } from '@/store';
import { usePopup } from '@/assets/js/popup';

const popup     = usePopupStore();
const factory   = useFactoryStore();
const { getPopupOpen, getPopupClose } = usePopup();

onMounted(async () => {
    await factory.getSysFactoryDetail();
});

</script>

<style lang="scss">

</style>