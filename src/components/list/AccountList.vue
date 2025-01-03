<template>
<div class="px-5 py-4 ">
    <div class="flex items-start justify-between">
        <div class="gap-2">
            <div class="flex items-center gap-2">
                <h2 class="text-lg font-bold">{{ clientNm }}</h2>
                <Tag severity="info" :value="stNm" class="!text-xs"></Tag>
            </div>
            <p class="mt-2 text-xs text-gray-400">{{ addr }}</p>
        </div>
        <ul class="flex flex-col gap-1 *:flex *:gap-2 *:justify-between">
            <li class="">
                <p class="w-10 text-gray-500">매출</p>
                <span class="font-bold text-right">{{ saleAmt }}</span>
            </li>

            <li class="">
                <p class="w-10 text-gray-500">매입</p>
                <span class="font-bold text-right">{{ purcAmt }}</span>
            </li>

            <li class="">
                <p class="w-10 text-gray-500">수익</p>
                <span class="font-bold text-right text-green-500">{{ rev }}</span>
            </li>
        </ul>
    </div>
</div>
</template>

<script setup lang="ts">
import Tag from 'primevue/tag';

defineProps({
    clientNm    : String,
    stNm        : String,
    addr        : String,
    saleAmt     : String,
    purcAmt     : String,
    rev         : String
})
</script>

<style lang="scss">

</style>