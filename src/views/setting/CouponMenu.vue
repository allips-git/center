<template>
    <div>
        <BackHeader title="쿠폰 메뉴"/>
        <main class="pt-5 pb-32 pc-contents-h-box">
            <section class="form-gap-box">
                <ul>
                    <!-- v-for -->
                    <li 
                      v-for="(coupon, index) in coupons" 
                      :key="index" 
                      class="flex items-center justify-between w-full px-5 py-4"
                    >
                        <div class="flex items-center gap-4">
                            <div class="flex items-center gap-3 font-bold">
                                <p class="">{{ coupon.name }}</p>
                                <span class="text-lg text-sky-400">{{ coupon.discount }}%</span>
                            </div>  
                        </div>
                        <IconPlay class="!fill-l-lv0 size-[18px]" />
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
import IconPlay from '@/components/icons/IconPlay.vue'
import { ref } from 'vue';

// 더미 데이터
const coupons = ref([
    { name: '첫 구매 할인', discount: 20 },
    { name: '회원 가입 기념', discount: 15 },
    { name: '재구매 할인', discount: 10 },
    { name: '특별 이벤트', discount: 25 },
    { name: '생일 쿠폰', discount: 30 },
]);
</script>

<style lang="scss">

</style>
