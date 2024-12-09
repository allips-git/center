<template>
    <BackHeader title="단체 메세지" />
    <main class="w-full">
        <!-- <BackHeader title="단체 메세지 보내기"/> -->
        <div class="flex w-full mx-auto overflow-y-scroll bg-white h-[calc(100vh-48px)]">
            <MessageSendLeft />
            <MessageSendRight />
        </div>
    </main>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import MessageSendLeft from "@/views/include/groupMessage/MessageSendLeft.vue";
import MessageSendRight from "@/views/include/groupMessage/MessageSendRight.vue";

</script>

<style scoped>

</style>