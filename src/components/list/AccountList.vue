<template>
<div class="px-5 py-4 border-b border-gray-200">
    <div class="flex items-start justify-between">
        <div class="flex items-center gap-2">
            <h2 class="text-lg font-bold">{{ clientNm }}</h2>
            <Tag severity="info" :value="stNm" class="!text-xs"></Tag>
        </div>
        <b class="text-lg text-right text-green-500">{{ rev }}원</b>
    </div>
    <div class="flex justify-end gap-2 mt-1 text-sm">
        <p class="flex gap-1">메출<span>{{ saleAmt }}원</span></p>
        <p class="flex gap-1">매입<span>{{ purcAmt }}원</span> </p>
    </div>
    <p class="mt-2 text-xs text-gray-400">{{ addr }}</p>
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