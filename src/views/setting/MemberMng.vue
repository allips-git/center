<template>
    <BackHeader title="맴버 관리"/>
    <main class="pb-32 pc-contents-h-box">
        <ul class="">
        <li class="flex items-center justify-between p-4 border-b">
                <div class="flex items-center gap-4 ">
                    <Avatar icon="pi pi-user"  style="background-color: #ece9fc; color: #2a1261" shape="circle" size="large"/>
                    <div  class="flex flex-col">
                        <p class="text-lg font-bold">이름</p>
                        <span class="text-sm text-gray-400">대표</span>
                    </div>
                </div>
            <span class="pi pi-check !text-xl text-indigo-600"></span>
        </li>
    </ul>
    <div class="bottom-fixed-btn-box md:!absolute">
        <Button label="맴버 추가" size="large"/>
    </div>
    </main>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import Avatar from 'primevue/avatar';


</script>

<style lang="scss">

</style>