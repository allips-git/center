<template>
<div class="py-4">
    <div class="flex items-start justify-between">
        <div class="gap-4">
            <div class="flex items-center gap-4">
                <h2 class="font-bold text-con">{{ clientNm }}</h2>
                <Tag severity="info" :value="stNm" rounded class="!text-xs !bg-p-lv5 !text-p-lv4"></Tag>
            </div>
            <p class="mt-2 text-desc">{{ addr }}</p>
        </div>
        <ul class="flex flex-col gap-1 *:flex *:gap-2 *:justify-between *:items-center">
            <li class="">
                <p class="w-10 text-desc">매출</p>
                <span class="font-bold text-right text-con">{{ saleAmt }}</span>
            </li>

            <li class="">
                <p class="w-10 text-desc">매입</p>
                <span class="font-bold text-right text-con">{{ purcAmt }}</span>
            </li>

            <li class="">
                <p class="w-10 text-desc">수익</p>
                <span class="font-bold text-right !text-green-500 text-con">{{ rev }}</span>
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