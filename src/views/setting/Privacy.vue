<template>
    <iframe :src="file" width="100%" frameborder="0"></iframe>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const file = ref('@/src/assets/file/privacy.pdf');
</script>

<style lang="scss">

</style>