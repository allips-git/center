<template>
    <ul class="flex flex-col gap-2 text-13">
        <li class="flex items-center gap-[13px]">
            <p class="text-t-lv3">매출</p>
            <p class="font-bold text-18">{{ saleAmt }}원</p>
        </li>
        <li class="flex items-center gap-[13px]">
            <p class="text-t-lv3">매입</p>
            <p class="font-bold text-18">{{ purcAmt }}원</p>
        </li>
        <li class="flex items-center gap-[13px]">
            <p class="text-t-lv3">마진</p>
            <p class="font-bold text-green-500 text-18">{{ margin }}%</p>
        </li>
    </ul>
</template>

<script setup lang="ts">
defineProps({
    saleAmt : Number,
    purcAmt : Number,
    margin  : Number
});
</script>

<style lang="scss">

</style>