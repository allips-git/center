<template>
<main>
    
    <BackHeader :title="currentTitle"/>
    <main class="pt-5 pb-10">
        <section class="px-5">
            <h1 class="text-xl font-bold">{{ currentTitle }}</h1>
            <p class="mt-2 text-sm text-gray-400">{{ currentDescription }}</p>
        </section>
        
        <section class="flex items-center justify-between px-5 py-4 my-5 bg-gray-50 flax">
            <p class="font-bold">자동 알림 보내기</p>
            <ToggleSwitch />
        </section>
    
        <section class="px-5">
            <div class="flex items-center justify-between">
                <p class="font-bold">알림내용 미리보기</p>
                <Button label="테스트 발송" size="small" />
            </div>
            <TalkAlert/>
        </section>
    
        <section>
           <ul class="flex flex-col py-3 *:border-b *:p-4 *:border-gray-200 *:flex *:justify-between *:items-center">
                <li>
                    <p>고객 이름 표시 여부</p>
                    <ToggleSwitch />
                </li>
    
                <li>
                    <p>담당 맴버 표시 여부</p>
                    <ToggleSwitch />
                </li>
    
                <li>
                    <p>샵 주소</p>
                    <ToggleSwitch />
                </li>
    
                <li>
                    <p>주차 시간 설정</p>
                    <Select v-model="parkingTimeList" optionLabel="parkingTime" :options="parkingTimeOption" size="small" class="!border-none !shadow-none" />
                </li>
    
                <li>
                    <p>홈페이지 링크 표시 여부</p>
                    <ToggleSwitch />
                </li>
           </ul> 
        </section>
    
        <section class="px-5 mt-10 text-center">
            <h2 class="text-lg">카카오톡 발신 계정 연결</h2>
            <p class="mt-1 text-sm text-gray-400">연동 설정 전에는 플랜오더 대표 계정으로 발송이 되며, <br>
                카카오톡 계정 연결 시, 샵 해당 계정으로 고객에게 자동 고객 알림이 발송됩니다.</p>
                <Button class="w-full mt-5" size="large" severity="secondary" label="카카오 비즈니스 계정 등록"/>
        </section>
    </main>
</main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TalkAlert from "@/components/list/TalkAlert.vue";
import ToggleSwitch from 'primevue/toggleswitch';
import BackHeader from '@/components/layouts/BackHeader.vue'

const currentTitle = ref(''); // 제목을 저장할 변수
const currentDescription = ref(''); // 제목을 저장할 변수
const parkingTimeList = ref({ parkingTime: '무료' }); 

const parkingTimeOption = ref([    
    { parkingTime: '무료' },
    { parkingTime: '유료' },
    { parkingTime: '불가' },
    { parkingTime: '1시간' },
    { parkingTime: '2시간' },
    { parkingTime: '3시간' },
    { parkingTime: '4시간' },
]);

// 컴포넌트가 마운트될 때 로컬 스토리지에서 제목과 설명을 가져옴
onMounted(() => {
    const storedTitle = localStorage.getItem('pageTitle');
    const storedDescription = localStorage.getItem('pageDescription');
    
    if (storedTitle) {
        currentTitle.value = storedTitle;
    }

    if (storedDescription) {
        currentDescription.value = storedDescription;
    }
});

</script>

<style lang="scss">

</style>