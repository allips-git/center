<template>
    <BackHeader title="설정" />
    <main class="">
        <section class="p-4">
            <div class="flex gap-2">
                <Avatar icon="pi pi-user" class="mr-2" size="xlarge" shape="circle" />
                <div class="">
                    <h1>디자인 윈도우</h1>
                    <span class="text-sm"></span>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import Avatar from 'primevue/avatar';
</script>

<style lang="scss">

</style>