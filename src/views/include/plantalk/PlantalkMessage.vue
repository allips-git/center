<template>
<main class="p-5">
    <section class="flex flex-col items-center justify-center gap-1 pb-5">
        <IconCheckboard class="fill-green-400"/>
        <p class="text-lg font-bold text-green-400">알림 발송 완료</p>
    </section>
    <TalkAlert/>
</main>
</template>

<script setup lang="ts">
import IconCheckboard from "@/components/icons/IconCheckboard.vue";
import TalkAlert from "@/components/list/TalkAlert.vue";

</script>

<style lang="scss">

</style>