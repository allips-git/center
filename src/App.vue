<template>
  <main class="">
      <div class="flex flex-col">
          <TopHeader v-if="showTopHeader" @toggleHeader="toggleHeader"
          :class="showTopHeader"
          />
        <div class="flex">
            <SideHeader 
            :setWideSide="setWideSide"
            :drawerClass="false"
            />
        <div class="z-0  w-full">
            <RouterView/>
        </div>
        <ConfirmDialog></ConfirmDialog>
        <!-- <Toast></Toast> -->
        </div>
      </div>
  </main>
  </template>
  
<script setup lang="ts">
import { ref, onMounted,computed } from 'vue';
import { useRoute } from 'vue-router'; // useRoute 임포트

import SideHeader from '@/components/layouts/SideHeader.vue';
import TopHeader from '@/components/layouts/TopHeader.vue';
import ConfirmDialog from 'primevue/confirmdialog';

const setWideSide = ref(false); // wideSide 상태를 정의

const toggleHeader = () => {
    setWideSide.value = !setWideSide.value; // 상태 토글
    sessionStorage.setItem('setWideSide', JSON.stringify(setWideSide.value)); // 상태를 문자열로 변환하여 저장
};

// onMounted를 사용하여 초기 상태를 설정할 수 있습니다.
onMounted(() => {
    const savedWideSide = sessionStorage.getItem('setWideSide');
    if (savedWideSide !== null) {
        setWideSide.value = JSON.parse(savedWideSide); // 초기 상태를 복원
    }
});

// 현재 경로의 메타 정보에 따라 TopHeader 표시 여부 결정
const route = useRoute();


// PC에서 항상 표시하고 모바일에서는 메타 정보에 따라 결정
const showTopHeader = computed(() => {
    const isPC = window.innerWidth >= 1024; // PC 화면 크기 기준
    return isPC || route.meta.showTopHeader; // PC일 경우 항상 true
});

</script>

<style lang="scss">



</style>