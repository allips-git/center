<template>
<div class="">
    <div class="flex items-start justify-between pb-[18px]">
        <div class="">
            <div class="flex items-center gap-4">
                <h2 class="font-bold text-13">{{ clientNm }}</h2>
                <Tag severity="info" :value="stNm" rounded class="!text-10 !bg-p-lv5 !text-p-lv4 !px-2 !py-1"></Tag>
            </div>
            <p class="mt-2 text-t-lv3 text-11">{{ addr }}</p>
        </div>
        <ul class="flex flex-col gap-1 *:flex *:gap-2 *:justify-between *:items-center">
            <li class="">
                <p class="w-10 text-xs text-t-lv2">매출</p>
                <span class="text-sm font-medium text-right">{{ saleAmt }}</span>
            </li>

            <li class="">
                <p class="w-10 text-xs text-t-lv2">매입</p>
                <span class="text-sm font-medium text-right">{{ purcAmt }}</span>
            </li>

            <li class="">
                <p class="w-10 text-xs text-t-lv2">수익</p>
                <span class="text-right !text-green-500 text-sm font-medium">{{ rev }}</span>
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