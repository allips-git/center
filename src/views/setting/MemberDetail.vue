<template>
    <BackHeader title="맴버상세"/>
    <main class="relative pb-32 pc-contents-h-box">
        <section class="">
        <div class="flex items-center justify-between py-3.5 p-4 pb-0">
            <div class="flex items-center gap-3 ">
                <IconAvatar class="fill-[#78BBFF] size-[51px]"/>
                <div  class="flex flex-col">
                    <p class="font-bold">이름</p>
                    <div class="flex flex-col font-bold text-t-lv4 text-10">
                        <span class="">011-9871-1212</span>
                        <span class="">대표</span> 
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-center rounded-full">
                <IconPhone />
            </div>
        </div>
    </section>
    <div class="px-4">
        <div class="gray-bar !bg-[#E5E5EC] !h-px  w-full"></div>
    </div>
    <section class="">
        <!-- <h2 class="px-5 text-lg font-bold">이력</h2> -->
        <ul class="w-full mt-4">
    <li 
      v-for="(item, index) in dummyData" 
      :key="index" 
      class="flex items-center justify-between w-full gap-2 px-5 py-2.5"
    >
      <div class="flex items-center text-xs gap-2 w-[calc(100%-120px)]">
        <div class="flex-none rounded-full size-3"
        :class="item.status === '수정' ? 'bg-yellow-300' : item.status === '삭제' ? 'bg-red-400' : 'bg-sky-400'"
        ></div>
        <div class="flex items-center text-t-lv2">
          (<b class="truncate max-w-[55px] w-full">{{ item.clientName }}</b>)
        </div>
        <p class="truncate text-t-lv2">{{ item.estimateText }}</p>
      </div>
      <span class="text-right text-t-lv2 text-10 whitespace-nowrap">{{ item.timestamp }}</span>
    </li>
  </ul>
    </section>
    <div class="bottom-fixed-btn-box md:!absolute">
        <router-link to="/setting/member_edit">
            <Button label="맴버정보 수정" size="large" severity="secondary" class="w-full"/>
        </router-link>
        <router-link to="/setting/member_auth">
            <Button label="권한설정" size="large" class="w-full"/>
        </router-link>
    </div>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BackHeader from '@/components/layouts/BackHeader.vue'
import IconAvatar from '@/components/icons/IconAvatar.vue';
import IconPhone from '@/components/icons/IconPhone.vue';

const dummyData = ref([
  {
    clientName: '고객명네글',
    estimateText: '견적생성 견적생성견적생성견적생성견적생성견적생성견적생성견적생성견적생성견적생성',
    timestamp: '김경희: 22.07.13일 12:18',
    status: '일반', // 상태 추가
  },
  {
    clientName: '이름1',
    estimateText: '견적생성 예시 텍스트입니다.',
    timestamp: '홍길동: 22.07.14일 14:20',
    status: '삭제', // 상태 추가
  },
  {
    clientName: '이름2',
    estimateText: '또 다른 견적생성 예시입니다.',
    timestamp: '이영희: 22.07.15일 16:30',
    status: '수정', // 상태 추가
  },
  {
    clientName: '이름3',
    estimateText: '더 많은 견적생성 텍스트.',
    timestamp: '김철수: 22.07.16일 18:45',
    status: '삭제', // 상태 추가
  },
  {
    clientName: '이름4',
    estimateText: '마지막 견적생성 예시입니다.',
    timestamp: '박민수: 22.07.17일 20:00',
    status: '수정', // 상태 추가
  },
]);


</script>

<style lang="scss">

</style>