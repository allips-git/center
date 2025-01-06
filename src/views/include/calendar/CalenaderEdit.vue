<template>
<section class="p-4">
    <div class="flex items-center gap-2 mb-5">
        <IconAvatar class="size-12 fill-sky-400"/>
        <div class="w-full">
            <p class="text-xs text-sky-500">일정</p>
            <p class="flex items-center text-lg font-bold">하현재 <span class="flex items-center justify-center ml-2 text-sm text-gray-400 size-4"><IconPlay class="size-2 fill-gray-400"/></span>  </p>
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
        <p>설치 예상시간 : 40분</p>
        <p>설치 수량 : 블라인드 5개, 커튼 4개</p>
    </div>
    <div class="w-full px-3 mt-4 mb-5 ml-4 border-l-2 border-gray-300 min-h-12">
        <p class="text-gray-400">메모메모메모메모메모 <br> 메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모 </p>
    </div>

    <div class="flex justify-end">
        <Iconpencil class="fill-gray-500 size-8"/>
    </div>
</section>
</template>

<script setup lang="ts">
import IconAvatar from '@/components/icons/IconAvatar.vue';
import IconPlay from '@/components/icons/IconPlay.vue'
import Iconpencil from '@/components/icons/Iconpencil.vue'

</script>

<style lang="scss"></style>