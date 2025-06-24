<template>
<main class="fixed inset-0 w-screen h-screen">
    <div class="flex flex-col h-full">
        <TopHeader v-if="showTopHeader" @toggleHeader="toggleHeader"/>
        <div class="flex flex-1 h-[calc(100%-var(--header-height))]">
            <SideHeader 
                :setWideSide="setWideSide"
                :drawerClass="false"
            />
            <div class="overflow-hidden flex-1 w-full">
                <div class="overflow-y-auto h-full">
                    <div class="flex justify-center w-full min-h-full" 
                         :class="{ 'pb-[56px] md:pb-0' : showAppFooter }">
                        <div class="w-full xl:max-w-[980px] xl:my-4 2xl:max-w-[1140px]" :class="{ 'xl:shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-md': showShadow }">
                            <RouterView />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ConfirmDialog></ConfirmDialog>
    </div>
    <AppBar v-if="showAppFooter"/>
</main>
  </template>
  
<script setup lang="ts">
import { ref, onMounted,computed } from 'vue';
import { useRoute } from 'vue-router'; // useRoute 임포트
import { useKakaoStore } from '@/store';

import SideHeader from '@/components/layouts/SideHeader.vue';
import TopHeader from '@/components/layouts/TopHeader.vue';
import AppBar from '@/components/layouts/AppBar.vue';
import ConfirmDialog from 'primevue/confirmdialog';


const kakao = useKakaoStore();
// const popup = usePopupStore();
const setWideSide   = ref(true); // wideSide 상태를 정의
const listRef       = ref<HTMLElement | null>(null);

const toggleHeader = () => {
    setWideSide.value = !setWideSide.value; // 상태 토글
    sessionStorage.setItem('setWideSide', JSON.stringify(setWideSide.value)); // 상태를 문자열로 변환하여 저장
};

const getScroll = async (event: Event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target as HTMLElement;

    if (scrollTop + clientHeight >= scrollHeight) 
    {
        switch(route.name)
        {
            case 'PlantalkRes':
                if(kakao.more)
                {
                    await kakao.getKakaoSendList();
                }
            break;
        }
    }
}

onMounted(() => {
    const savedWideSide = sessionStorage.getItem('setWideSide');
    if (savedWideSide !== null) {
        setWideSide.value = JSON.parse(savedWideSide); // 초기 상태를 복원
    }

    listRef.value?.addEventListener('scroll', getScroll);
});

// 현재 경로의 메타 정보에 따라 TopHeader 표시 여부 결정
const route = useRoute();

// PC에서 항상 표시하고 모바일에서는 메타 정보에 따라 결정
const showTopHeader = computed(() => {
    const isPC = window.innerWidth >= 1024; // PC 화면 크기 기준
    return isPC || route.meta.showTopHeader; // PC일 경우 항상 true
});

// PC에서 항상 표시하고 모바일에서는 메타 정보에 따라 결정
const showAppFooter = computed(() => {
    const isPC = window.innerWidth >= 1024; // PC 화면 크기 기준
    return isPC || route.meta.showAppFooter; // PC일 경우 항상 true
});

// 섀도우 표시 여부를 결정하는 computed 속성
const showShadow = computed(() => {
    return route.meta.showShadow !== false; // 기본값은 true
});

</script>

<style lang="scss">
:root {
    --header-height: 56px;
}
</style>