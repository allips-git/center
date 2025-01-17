<template>
  <iframe :src="googleDocsUrl" height="100%"></iframe>
</template>

<script setup lang="ts">
import privacy from '@/assets/file/privacy.pdf';

const googleDocsUrl = `https://docs.google.com/gview?url=${window.location.origin}${privacy}&embedded=true`;

console.log(googleDocsUrl);
</script>

<style lang="scss">

</style>