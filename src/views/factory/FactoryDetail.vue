<template>
<main>
    <BackHeader title="해당 공장 이름~~~~" />
    <div>
        <section class="aspect-video rounded-b-md overflow-hidden">
            <img src="@/assets/img/test.png" class="w-full aspect-video object-cover" alt="">
        </section>
    
        <section class="">
            <h1 class="text-2xl font-bold mb-4 px-5 pt-5 pb-2">공장 이름~!~!</h1>
            <ul class="flex flex-col gap-4 p-5 pt-0 rounded-md">
                <li v-for="(item, index) in infoItems" :key="index" class="flex">
                    <p class="text-gray-600 w-24 whitespace-nowrap">{{ item.label }}</p>
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
            <ul class="mt-2 grid grid-cols-4 bg-gray-50 rounded-lg mx-4">
                <li
                    v-for="(item, index) in orderItems"
                    :key="index"
                    class="py-5 flex flex-col items-center justify-center border-r last:border-r-0"
                    >
                    <p class="text-indigo-600 text-lg font-bold">{{ item.value }}</p>
                    <p class="text-gray-600 text-sm">{{ item.label }}</p>
                </li>
            </ul>
        </section>
        <div class="h-3 w-full bg-gray-100 my-8"></div>
        <section>
            <CalculateCard />
        </section>
    </div>
</main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BackHeader from '@/components/layouts/BackHeader.vue'
// import CalculateCard from "@/components/card/CalculateCard.vue";

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