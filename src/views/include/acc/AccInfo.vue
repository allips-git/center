<template>
    <ul class="flex flex-col gap-2 title-sm">
        <li class="flex items-center gap-2">
            <p class="text-gray-600 ">매출</p>
            <p class="font-bold text-data">{{ saleAmt }}원</p>
        </li>
        <li class="flex items-center gap-2">
            <p class="text-gray-600 ">매입</p>
            <p class="font-bold text-data">{{ purcAmt }}원</p>
        </li>
        <li class="flex items-center gap-2">
            <p class="text-gray-600 ">마진</p>
            <p class="font-bold text-green-500 text-data">{{ margin }}%</p>
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