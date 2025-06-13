<template>
    <div class="top-header">
        <header class="h-[3.125rem] sticky top-0 flex w-full items-center p-4 md:p-6 md:shadow-none bg-white z-50 md:border-gray-100">
            <IconArrowForward class="mt-0.5 fill-l-lv0 size-6" @click="goBack"/>
            <h1 class="absolute text-sm font-bold -translate-x-1/2 -translate-y-1/2 text-t-lv1 left-1/2 top-1/2 md:relative md:-translate-y-0 md:-translate-x-0 md:top-0 md:left-2">{{ title }}</h1>
        </header>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router'; // useRouter 임포트
import IconArrowForward from '../icons/IconArrowForward.vue';

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
