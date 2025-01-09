<template>
    <div class="relative">
        <BackHeader title="맴버 관리"/>
        <div class="flex gap-1 absolute z-[60] text-sm translate-y-1/2 right-4 bottom-1/2 text-gray-500">
            <p>등급설정</p>
            <IconSetting class="size-5 fill-gray-400" />
        </div>
    </div>
    <main class="pb-32 pc-contents-h-box">
        <ul class="">
            <!-- v-for -->
            <li class="flex items-center justify-between px-5 py-4" @click="router.push('/setting/member_detail')">
                    <div class="flex items-center gap-4 ">
                        <IconAvatar class="fill-sky-400 size-10"/>
                        <div  class="flex flex-col">
                            <p class="font-bold ">홍길동</p>
                            <span class="text-xs text-gray-400">대표</span>
                        </div>
                    </div>
                <span class="pi pi-check !text-xl text-sky-500 !font-bold"></span>
            </li>
        </ul>
    <div class="bottom-fixed-btn-box md:!absolute">
        <Button label="맴버 추가" size="large"/>
    </div>
    </main>
</template>

<script setup lang="ts">
import IconAvatar from '@/components/icons/IconAvatar.vue';
import IconSetting from '@/components/icons/IconSetting.vue';
import BackHeader from '@/components/layouts/BackHeader.vue'

import { useRouter } from 'vue-router';

const router    = useRouter();

</script>

<style lang="scss">

</style>