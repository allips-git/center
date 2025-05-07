<template>
    <BackHeader title="맴버 권한 설정"/>
    <main class="relative overflow-y-auto pb-[56px] md:pb-0">
      <section class="px-5 pt-5 pb-3">
        <div class="flex items-center justify-between w-full">
            <p class="text-sm font-bold">맴버 등급 설정</p>
            <div class="w-auto custom-select-arrow gray-select max-w-20 !h-[30px]">
                <Select class="w-full *:!text-xs"  size="small" />
                <IconPlay class="absolute rotate-90 top-1.5 right-2 *:fill-gray-400 -z-10"/>
            </div>
        </div>
        <p class="text-t-lv3 text-11 mt-[]">맴버 기본 등급을 설정하는 기능입니다. <br>직급별 기초 등급 설정을 하시고 맴버 추가에 등급을 적용해 보세요.</p>
      </section>

      <section>


        <ul class="w-full px-4 mt-4 md:px-6">
          <li class="flex items-center justify-between w-full gap-2 text-sm text-t-lv1" v-for="(customer, index) in customers" :key="customer.id">
            <div class="w-full">
              <p class="flex items-center gap-2 p-4 font-bold bg-[#F8F9FA] border border-l-lv3">{{ customer.name }}</p>
                <ol class="flex flex-col *:p-4 *:border-b *:border-l-lv5 *:flex *:justify-between *:items-center">
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
import IconPlay from '@/components/icons/IconPlay.vue';


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