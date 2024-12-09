<template>
<main class="pb-32">
    <section class="flex gap-2 px-5 mt-4">
        <Select placeholder="선택" /> 
        <IconField class="w-full table-search-input">
            <InputIcon>
                <i class="pi pi-search" />
            </InputIcon>
            <InputText placeholder="이름, 주소, 전화번호 검색" class="w-full" />
        </IconField>
    </section>

    <section>
        <div 
        :class="{ 'bg-indigo-50' : SelectedCustaomer}"
        class="flex items-center justify-between gap-2 px-5 py-4 border-b first:mt-5">
                <div>
                    <div class="flex gap-2 mb-2">
                        <h1 class="text-lg font-bold">고객고객</h1>
                        <Tag value="견적" class="!text-xs"></Tag>
                        <Tag severity="warn" value="대기" class="!text-xs"></Tag>
                    </div>
                    <p class="text-xs text-gray-400">부산 사상구 엄궁북로 62 롯데캐슬리버 301동 2003호</p>
                </div>
        
            <div class="flex flex-col justify-between flex-none h-full">
                <span class="text-sm text-right text-gray-400">24.04.19</span>
                <p class="text-lg font-bold">990,000원</p>
            </div>
        </div>        
    </section>
</main>

<div class="z-10 flex-col bottom-fixed-btn-box">
    <p class="mb-1 text-lg font-bold text-indigo-600">0명 선택됨</p>
    <div class="flex w-full gap-2 *:w-full">
        <Button size="large"  label="선택완료"/>
    </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IconField from 'primevue/iconfield'; 
import InputText from 'primevue/inputtext'; 
import InputIcon from 'primevue/inputicon'; 
import Tag from 'primevue/tag';

const SelectedCustaomer = ref(true)

</script>

<style lang="scss">

</style>