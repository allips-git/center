<template>
    <div>
        <BackHeader title="쿠폰 메뉴"/>
        <main class="p-6 pc-contents-h-box">
            <section class="form-gap-box">
                <ul>
                    <!-- v-for -->
                    <li v-for="(coupon, index) in coupon['list']" :key="index" class="flex items-center justify-between w-full py-4" @click="getInfo(coupon.cpCd)">
                        <div class="flex items-center gap-4">
                            <div class="flex items-center gap-3 font-bold">
                                <p class="">{{ coupon.cpNm }}</p>
                                <span class="text-lg text-sky-400">{{ getCommas(Number(coupon.val)) }}{{ coupon.unit }}</span>
                            </div>  
                        </div>
                        <IconPlay class="!fill-l-lv0 size-[18px]" />
                    </li>
                </ul>
            </section>
        </main>
        <div class="bottom-fixed-btn-box md:!absolute">
            <Button label="쿠폰 추가" size="large" class="w-full" @click="getPopup"/>
        </div>
    </div>
    <!-- <Dialog v-model:visible="popup['pop']['couponDetail']" header="쿠폰 저장" 
        :modal=true position="bottom" :dismissableMask="true" class="custom-dialog-bottom"
        @update:visible="getPopupClose('couponDetail', true)">
        <CouponDetail/>
    </Dialog> -->

    <Dialog v-model:visible="popup['pop']['couponDetail']" header="쿠폰 저장" 
            :modal=true position="center" class="custom-dialog-bottom" 
            @update:visible="getPopupClose('couponDetail', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose(true, 'couponDetail')" severity="contrast" text icon="pi pi-times"/>
                    <h2 class="modal-backheader-title">쿠폰 메뉴 설정</h2>
                </div>
            </template>
        <CouponDetail/>

        </Dialog> 
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import IconPlay from '@/components/icons/IconPlay.vue'
import CouponDetail from "@/views/include/setting/CouponDetail.vue";
import { onMounted } from 'vue'
import { usePopupStore, useCouponStore } from '@/store';
import { getCommas } from '@/assets/js/function';
import { usePopup } from '@/assets/js/popup';

const popup     = usePopupStore();
const coupon    = useCouponStore();

const { getPopupOpen, getPopupClose } = usePopup();

const getPopup = async() => {
    await coupon.getInfoReset();
    getPopupOpen('couponDetail');
}

const getInfo = async (cpCd: string) => {
    await getPopup();
    await coupon.getCpCd(cpCd);
    coupon.getInfo();
}

onMounted(() => {
    coupon.getList();
})

</script>

<style lang="scss">

</style>
