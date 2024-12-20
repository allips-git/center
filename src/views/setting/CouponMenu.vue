<template>
    <div>
        <BackHeader title="할인설정"/>
        <main class="pt-5 pb-32 pc-contents-h-box">
            <p class="px-5 text-lg font-bold">쿠폰 메뉴</p>
            <section class="form-gap-box">
                <ul>
                    <!-- v-for -->
                    <li class="flex items-center justify-between p-4 border-b">
                            <div class="flex items-center gap-4 ">
                                <div  class="flex items-center gap-2 font-bold">
                                    <p class="text-lg">쿠폰 이름</p>
                                    <span class="-gray-400 text">・</span>
                                    <span class="text-xl text-indigo-600">20%</span>
                                </div>  
                            </div>
                        <span class="pi pi-angle-right !text-xl text-gray-400"></span>
                    </li>
                    <li class="flex items-center justify-between p-4 border-b">
                            <div class="flex items-center gap-4 ">
                                <div  class="flex items-center gap-2 font-bold">
                                    <p class="text-lg">쿠폰 이름</p>
                                    <span class="-gray-400 text">・</span>
                                    <span class="text-xl text-indigo-600">20%</span>
                                </div>  
                            </div>
                        <span class="pi pi-angle-right !text-xl text-gray-400"></span>
                    </li>
                </ul>
            </section>
        </main>
        <div class="bottom-fixed-btn-box md:!absolute">
            <router-link to="/setting/coupon_detail">
                <Button label="쿠폰 추가" size="large" class="w-full"/>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'




</script>

<style lang="scss">

</style>