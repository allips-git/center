<template>
<main class="relative">
    <BackHeader title="해당 공장 이름~~~~" />
    <div class="!pb-52">
        <section class="overflow-hidden aspect-video rounded-b-md">
            <img src="@/assets/img/test.png" class="object-cover w-full aspect-video" alt="">
        </section>
    
        <section class="">
            <h1 class="px-5 pt-5 pb-2 mb-4 text-2xl font-bold">공장 이름~!~!</h1>
            <ul class="flex flex-col gap-4 p-5 pt-0 rounded-md">
                <li v-for="(item, index) in infoItems" :key="index" class="flex">
                    <p class="w-24 text-gray-600 whitespace-nowrap">{{ item.label }}</p>
                    <p>{{ item.value }}
                        <ul v-if="item.label === '영업시간'" class="flex flex-col gap-1 mt-1">
                            <li v-for="(extraItem, extraIndex) in item.extra" :key="extraIndex" >
                            {{ extraItem }}
                            </li>
                        </ul>
                    </p>
                </li>
            </ul>
            <!-- 카운트 -->
            <ul class="grid grid-cols-4 mx-4 mt-2 rounded-lg bg-gray-50">
                <li
                    v-for="(item, index) in orderItems"
                    :key="index"
                    class="flex flex-col items-center justify-center py-5 border-r last:border-r-0"
                    >
                    <p class="text-lg font-bold text-indigo-600">{{ item.value }}</p>
                    <p class="text-sm text-gray-600">{{ item.label }}</p>
                </li>
            </ul>
        </section>
        <div class="w-full h-3 my-8 bg-gray-100"></div>
        <section>
            <CalculateCard />
        </section>
    </div>
    <div class="flex-col border-t bottom-fixed-btn-box">
            <div class="flex justify-between mb-1 text-lg font-bold">
                <p >총 제품</p>
                <p class="text-indigo-600">0개</p>
            </div>
            <Button label="제품 설정하기" size="large" @click="ProductInfoPop = true"/>
        </div>


    <Dialog
    v-model:visible="ProductInfoPop" 
    header="제품정보" 
    :modal=true
    position="center"
    class="custom-dialog-bottom"
    >
    <ProductInfo/>
    </Dialog>
</main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BackHeader from '@/components/layouts/BackHeader.vue'
import ProductInfo from "@/views/include/factory/ProductInfo.vue";

const ProductInfoPop = ref(true)

// 정보 배열 정의
const infoItems = ref([
  {
    label: '혜택',
    value: '11',
  },
  {
    label: '전화번호',
    value: '010-1234-5678',
  },
  {
    label: '영업시간',
    value: '09:00 - 18:00',
    extra: ['주말 휴무', '공휴일 10:00 - 16:00'], // 추가 정보를 배열로 저장
  },
  {
    label: '주소',
    value: '부산 수영구 수영로 411-1',
  },
  {
    label: '계좌',
    value: '123-456-7890123',
  },
]);

const orderItems = ref([
  {
    label: '주문',
    value: '0',
  },
  {
    label: '생산',
    value: '0',
  },
  {
    label: '생산완료',
    value: '0',
  },
  {
    label: '출고',
    value: '0',
  },
]);

</script>

<style lang="scss">

</style>