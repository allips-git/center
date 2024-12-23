<template>
    <header class="h-[48px] sticky top-0 flex w-full items-center px-2 md:border-b shadow-sm md:shadow-none bg-white z-50 md:border-gray-100">
        <Button 
            plain 
            text 
            rounded 
            icon="pi pi-chevron-left" 
            @click="goBack"
            class="!block pc-hidden md:!hidden"
        />
        <h1 class="absolute text-lg font-bold -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 md:relative md:-translate-y-0 md:-translate-x-0 md:top-0 md:left-2">{{ title }}</h1>
    </header>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router'; // useRouter 임포트

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
})

const router = useRouter(); // useRouter 훅 사용

// 뒤로가기 함수 정의
const goBack = () => {
    router.back(); // 또는 router.go(-1);
};
</script>

<style lang="scss">


</style>
