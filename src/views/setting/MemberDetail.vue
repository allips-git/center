<template>
    <BackHeader title="맴버 상세"/>
    <main class="relative pb-32 pc-contents-h-box">
        <ul class="">
        <li class="flex items-center justify-between p-4">
            <div class="flex items-center gap-4 ">
                <Avatar icon="pi pi-user"  style="background-color: #ece9fc; color: #2a1261" shape="circle" size="large"/>
                <div  class="flex flex-col">
                    <p class="text-lg font-bold">이름</p>
                    <div class="flex items-center gap-2">
                        <span class="text-gray-600">대표</span> <span>・</span> <span class="text-gray-600 ">011-9871-1212</span>
                    </div>
                    
                </div>
            </div>
            <div class="flex items-center justify-center bg-green-100 rounded-full size-12">
                <span class="pi pi-phone !text-lg text-green-600"></span>
            </div>
        </li>
    </ul>
    <div class="gray-bar"></div>
    <section class="">
        <h2 class="px-5 text-lg font-bold">이력</h2>
        <ul class="w-full mt-4">
            <!-- v-for -->
            <li class="flex items-center justify-between w-full gap-2 px-5 py-2">
                <div class="flex items-center gap-2 w-[calc(100%-120px)]">
                    <!-- bg-yellow-600 bg-red-600  -->
                    <div class="flex-none bg-blue-600 rounded-full size-3"></div>
                    <p class="truncate "> <b>(테스트엄)</b> 견적생성 견적생성견적생성견적생성견적생성견적생성견적생성견적생성견적생성견적생성견적생성</p>
                </div>
                <span class="flex-none w-[120px] text-sm text-right text-gray-500">김경희: 22.07.13 12:18</span>
            </li>
        </ul>
    </section>
    <div class="bottom-fixed-btn-box md:!absolute">
        <router-link to="/setting/member_edit">
            <Button label="맴버정보 수정" size="large" severity="secondary" class="w-full"/>
        </router-link>
        <router-link to="/setting/member_auth">
            <Button label="권한설정" size="large" class="w-full"/>
        </router-link>
    </div>
    </main>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import Avatar from 'primevue/avatar';


</script>

<style lang="scss">

</style>