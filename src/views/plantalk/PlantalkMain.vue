<template>
    <main class="h-full pb-20 overflow-y-scroll">
        <main class="">
            <BackHeader title="플랜톡"/>
            <div class="">
                <section class="p-4 md:p-6">
                    <div class="flex items-center gap-1">
                        <h1 class="font-bold title-md">플랜톡</h1>
                        <div class="text-base">
                            <p v-if="!kakao['status']" class="font-extrabold text-red-500">OFF</p>
                            <p v-if="kakao['status']" class="font-extrabold text-p-lv4">ON</p>            
                        </div>
                    </div>
                    <p class="mt-px text-caption !text-t-lv3">알림 <span class="font-bold text-p-lv4">{{ kakao['cnt'] }}</span>종을 사용중입니다.</p>
                    <ul class="grid grid-cols-2 gap-4 text-sm mt-4 *:p-4 *:rounded-lg">
                        <li class="flex flex-col justify-between col-span-2 gap-1 bg-yellow-50">
                            <p class="text-caption !font-medium !text-t-lv0">플랜톡 잔여 포인트 {{ kakao['point'] }}P</p>
                            <p class="cursor-pointer text-caption !text-p-lv4">충전하기</p>
                            <!-- <Button label="충전하기" size="small" /> -->
                        </li>
                        <li class="col-span-1 bg-gray-50" @click="goToPage('/plantalk/res', 'Y')">
                            <div class="flex items-center justify-between">
                                <div class="flex flex-col gap-1">
                                    <h5 class="!font-medium !text-t-lv1 text-caption">예약된 알림</h5>
                                    <p class="!text-t-lv3 text-caption">상세보기</p>
                                </div>
                                <IconPlay class="size-[18px] fill-gray-400"/>
                            </div>
                        </li>
                        <li class="col-span-1 bg-gray-50" @click="goToPage('/plantalk/res', 'N')">
                            <div class="flex items-center justify-between">
                                <div class="flex flex-col gap-1">
                                    <h5 class="!font-medium !text-t-lv1 text-caption">발송 메시지보기</h5>
                                    <p class="!text-t-lv3 text-caption">오늘<span class="ml-1 !text-p-lv4">{{ kakao['sendCnt'] }}건</span></p>
                                </div>
                                <IconPlay class="size-[18px] fill-gray-400"/>
                            </div>
                        </li>
                    </ul>
                </section>
        
                <!-- <div class="gray-bar"></div> -->
        
                <section class="p-4 md:p-6">
                    <h1 class="font-bold title-sm">알림</h1>
                    <ul class="flex flex-col *:border-b   *:py-4  *:border-l-lv5">
                        <li v-for="(item, index) in kakao['list']" :key="index" class="flex items-center justify-between" @click="goToDetail(item['kdCd'])">
                            <div>
                                <div class="flex items-center gap-2">
                                    <p class="font-bold title-sm !text-t-lv2">{{ item.kdNm }}</p>
                                    <img src="@/assets/img/icon-kakaologo.png" alt="kakao" title="kakao" class="size-[18px]"/>
                                </div>
                                <p class="mt-2 text-desc text-t-lv4">{{ item.descrip }}</p>
                            </div>
                            <div class="flex items-center gap-2 font-bold">
                                <span v-if="item.useYn" class="text-xs text-white px-1.5 py-0.5 bg-[#2FD159] rounded-full">ON</span>
                                <span v-if="!item.useYn" class="text-xs text-white px-1.5 py-0.5 bg-red-500 rounded-full">OFF</span>
                                <IconPlay class="size-[18px] fill-gray-400"/>
                            </div>
                        </li>
                    </ul>
                </section>
            </div>                       
        </main>
        <Dialog v-model:visible="popup['pop']['kakaoDetail']" header="플랜톡 설정" 
            :modal=true position="center" class="custom-dialog-bottom" 
            @update:visible="getPopupClose('kakaoDetail', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose(true, 'kakaoDetail')" severity="contrast" text icon="pi pi-times"/>
                    <h2 class="modal-backheader-title">플랜톡 설정</h2>
                </div>
            </template>
            <ScheduleAlert/>
        </Dialog>

      
    </main>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import ScheduleAlert from "@/views/include/plantalk/ScheduleAlert.vue";
import IconPlay from '@/components/icons/IconPlay.vue';
import { onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { usePopupStore, useKakaoStore } from '@/store';
import { usePopup } from '@/assets/js/popup';

const popup = usePopupStore();
const kakao = useKakaoStore();
const router = useRouter();

const { getPopupOpen, getPopupClose } = usePopup();

const goToPage = async (path: string, resGb: string) => {
    await kakao.getResGb(resGb);
    router.push(path);
};

const goToDetail = async (kdCd: string) => {
    await kakao.getKdCd(kdCd);
    await kakao.getKakaoInfo();
    getPopupOpen('kakaoDetail');
}

onMounted(() => {
    kakao.getKakao();
})

 </script>
