<template>
<main class="p-5">
    <section class="flex flex-col items-center justify-center gap-4">
        <div class="flex items-center justify-center rounded-full size-20 bg-green-50">
            <span class="!text-4xl text-green-500 pi pi-check"></span>
        </div>
        <p class="text-lg font-bold">알림 발송 완료</p>
    </section>
    <TalkAlert/>
</main>
</template>

<script setup lang="ts">
import TalkAlert from "@/components/list/TalkAlert.vue";

</script>

<style lang="scss">

</style>