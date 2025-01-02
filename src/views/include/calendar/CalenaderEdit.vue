<template>
<section class="p-4">
    <div class="flex items-center gap-2">
        <IconAvatar class="size-10 fill-sky-400"/>
        <div class="w-full">
            <p class="text-xs text-sky-500">일정</p>
            <p class="flex items-center text-lg font-bold text-">하현재 <span class="ml-2 text-sm text-gray-400">></span>  </p>
        </div>
        <p class="flex-none text-lg font-bold text-sky-500">시공</p>
    </div>
    <div class="py-3">
        <Select class="w-40 !rounded-full" size="small" />
    </div>
    <div class="flex flex-col items-start gap-2 text-gray-500">
        <p>6월 30일 (목) 16:45</p>
        <p class="px-3 py-px text-white rounded-full bg-sky-500">010-1251-8751</p>
        <p class="px-3 py-px text-white rounded-full bg-sky-500">부산시 수영구 수영로 411-1</p>
        <p>상세주소 : 광안자이 아파트 102동 1004호</p>
        <p>상세주소 : 광안자이 아파트 102동 1004호</p>
        <p>상세주소 : 광안자이 아파트 102동 1004호</p>
    </div>
</section>
</template>

<script setup lang="ts">
import IconAvatar from '@/components/icons/IconAvatar.vue';

</script>

<style lang="scss"></style>