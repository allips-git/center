<template>
    <ul>
        <li class="flex items-center gap-2">
            <p class="w-20 text-gray-600">매출</p>
            <p class="text-lg font-bold">{{ saleAmt }}원</p>
        </li>
        <li class="flex items-center gap-2">
            <p class="w-20 text-gray-600">매입</p>
            <p class="text-lg font-bold">{{ purcAmt }}원</p>
        </li>
        <li class="flex items-center gap-2">
            <p class="w-20 text-gray-600">마진</p>
            <p class="text-lg font-bold text-green-500">{{ margin }}%</p>
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