<template>
<div class="px-5 py-4 border-b border-gray-200">
    <div class="flex items-start justify-between">
        <div class="flex items-center gap-2">
            <h2 class="text-lg font-bold">테스트</h2>
            <Tag severity="info" value="견적 진행" class="!text-xs"></Tag>
        </div>
        <b class="text-lg text-right text-green-500">461,000원</b>
    </div>

    <div class="flex justify-end gap-2 mt-1 text-sm">
                <p class="flex gap-1">메출<span>980,000원</span></p>
                <p class="flex gap-1">매입<span>519,000원</span> </p>
            </div>

    <p class="mt-2 text-xs text-gray-400">부산 사상구 엄궁북로 62 롯데캐슬리버 301동 2003호</p>
</div>
</template>

<script setup lang="ts">
import Tag from 'primevue/tag';

</script>

<style lang="scss">

</style>