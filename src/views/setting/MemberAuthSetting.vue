<template>
    <BackHeader title="맴버 권한 설정"/>
    <main class="relative pb-5 pc-contents-h-box">
    <section class="px-5 pt-5">
        
            <div class="flex items-center justify-between">
                <p class="text-lg font-bold">맴버 등급 설정</p>
                <Select class="w-full max-w-32"  size="small"/>
            </div>
            <p class="text-sm text-gray-500">맴버 기본 등급을 설정하는 기능입니다. <br>직급별 기초 등급 설정을 하시고 맴버 추가에 등급을 적용해 보세요.</p>
    </section>
    <div class="gray-bar"></div>
    <section>


<ul class="w-full mt-4">
    <li class="flex items-center justify-between w-full gap-2" v-for="(customer, index) in customers" :key="customer.id">
        <div class="w-full">
            <p class="flex items-center gap-2 px-5 py-2 font-bold bg-gray-100">{{ customer.name }} 고객 리스트</p>
            <ol class="flex flex-col *:border-b *:p-4 *:border-gray-200 *:flex *:justify-between *:items-center">
                <li v-for="(detail, detailIndex) in customer.details" key="detailIndex" class="flex items-center justify-between">
                    <p>{{ detail.description }}</p>
                    <ToggleSwitch />
                </li>
            </ol>
        </div>
    </li>
</ul>
        
    </section>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BackHeader from '@/components/layouts/BackHeader.vue'
import ToggleSwitch from 'primevue/toggleswitch';
import Avatar from 'primevue/avatar';

const customers = ref([
  {
    name: '고객 리스트',
    details: [
      { description: '고객 완료건 숨김' },
    ],
  },
  {
    name: '고객 상세정보',
    details: [
      { description: '읽기 허용' },
      { description: '편집 허용' },
    ],
  },
  {
    name: '공장 관리',
    details: [
      { description: '읽기 허용' },
      { description: '편집 허용' },
    ],
  },
  {
    name: '플랙톡',
    details: [
      { description: '읽기 허용' },
      { description: '편집 허용' },
    ],
  },
  {
    name: '캘린더',
    details: [
      { description: '읽기 허용' },
      { description: '편집 허용' },
    ],
  },
  {
    name: '회계',
    details: [
      { description: '읽기 허용' },
      { description: '편집 허용' },
    ],
  },
  {
    name: '통계',
    details: [
      { description: '읽기 허용' },
      { description: '편집 허용' },
    ],
  },
  {
    name: '설정',
    details: [
      { description: '읽기 허용' },
      { description: '편집 허용' },
    ],
  },
]);
</script>

<style lang="scss">

</style>