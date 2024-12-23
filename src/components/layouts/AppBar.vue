<template>
    <ul class="sticky bottom-0 left-0 w-full gap-4 px-3 h-[56px] bg-gray-50 md:hidden flex ">
      <li 
        class="flex flex-col items-center cursor-pointer py-0.5 justify-evenly w-full"
        :class="{ '*:text-indigo-600': isActive(item.link) }"
        v-for="item in SideHeaderItems" 
        :key="item.id" 
        @click="handleClick(item)"
      >
        <span class="pi !text-xl text-gray-400" :class="item.iconClass"></span> 
        <p class="text-sm font-normal text-gray-400 duration-300">{{ item.label }}</p>
      </li>
    </ul>
  
    
    <Drawer v-model:visible="moSideHeader" header="" class="custom-drawer" position="right">
      <template #header>
        <!-- <div class="flex items-center w-full gap-2"></div> -->
      </template>
      <SideHeader 
        :drawerClass="true" 
        @closeDrawer="moSideHeader = false"
      />
    </Drawer> 
   
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import Drawer from 'primevue/drawer';
  import SideHeader from '@/components/layouts/SideHeader.vue';
  
  const moSideHeader = ref(false); // 기본값을 false로 설정
  
  const route = useRoute(); // 현재 라우트 정보 가져오기
  
  const props = defineProps({
    drawerClass: {
      type: Boolean,
    },
    setWideSide: {
      type: Boolean,
    },
  });
  
  // Vue Router 가져오기
  const router = useRouter();
  
  const SideHeaderItems = ref([
    { id: 1, label: '홈', link: '/', iconClass: 'pi-home' }, 
    { id: 2, label: '캘린더', link: '/calendar', iconClass: 'pi-calendar' }, 
    { id: 3, label: '회계', link: '/acc', iconClass: 'pi-money-bill' },
    { id: 4, label: '통계', link: '/average', iconClass: 'pi-chart-line' },
    { id: 5, label: '더보기', iconClass: 'pi-bars' },
  ]);
  
  // 클릭 핸들러
  const handleClick = (item: { id: number; link: string; label: string }) => {
    if (item.id === 5) {
      // id가 5인 항목('더보기') 클릭 시
      moSideHeader.value = true; // Drawer 열기
    } else {
      // 나머지 항목은 링크 이동
      navigateTo(item.link);
    }
  };
  
  // 링크로 이동
  const navigateTo = (link: string) => {
    router.push(link);
  };
  
  // 현재 경로와 링크를 비교하여 활성화 여부 판단
  const isActive = (link: string) => {
    return route.path === link; // 현재 경로와 비교
  };
  
  </script>
  