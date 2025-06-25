<template>
<div class="flex flex-col h-full">
    <div class="flex-1 min-h-0">
        <div class="overflow-y-auto h-full">
            <div class="flex flex-col gap-[14px] bg-gray-100 md:p-4 md:gap-4 h-full">
                <!-- 배너 섹션 -->
                <section class="w-full">
                    <div class="relative w-full px-5 overflow-hidden bg-blue-100 rounded-md h-[9.1875rem] flex justify-between items-center">
                        <div class="flex flex-col">
                            <p class="mb-3 text-t-lv3 text-11">아주 쉬운 플랜오더 가이드 #1</p>
                            <p class="font-bold text-18">모든 맴버 일정 <br>모아보기</p>
                        </div>
                    
                        <div class="flex gap-2">
                            <img src="/src/assets/img/banner_01.png" class="w-[3.375rem]" alt="">
                            <img src="/src/assets/img/banner_02.png" class="w-[3.375rem]" alt="">
                        </div>
                    </div>
                </section>

                <!-- 메인 그리드 섹션 -->
                <main class="grid w-full grid-cols-12 gap-x-[10px] gap-y-[14px] px-4 md:px-0">
                    <section class="col-span-12">
                        <div class="flex flex-col gap-3 main-card-container-box">
                            <div class="main-card-tilte-box">
                                <h2 class="flex justify-center items-center text-base">전체 고객</h2>
                                <div class="flex gap-3.5 items-center">
                                    <div class="flex items-center text-22">
                                        <span class="flex items-center text-t-lv1">{{ main['clientCnt'] }}
                                        </span>
                                        <p class="">명</p>

                                    </div>
                                    <div class="block w-px h-5 bg-gray-200"></div>
                                        <IconAddCircle @click="getStCd('')" class="cursor-pointer"/>
                                    </div>
                            </div>
                            <ul class="grid grid-cols-5 pt-3 main-card-container-box-padding">
                                <li v-for="(item, index) in main['stCnt']" :key="index" class="flex flex-col items-center cursor-pointer justify-center border-r h-[2.4375rem] gap-[0.3125rem] last:border-r-0" @click="getStCd(item['stCd'])">
                                    <p class="text-data text-sky-500 h-[1.4375rem] flex items-center">{{ item.count }}</p>
                                    <p class="text-caption">{{ item.label }}</p>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section class="col-span-6">
                        <div class="main-card-container-box">
                            <div class="main-card-tilte-box">
                                <h2 class="flex gap-2 justify-center items-center text-sm">
                                    <img src="@/assets/img/img-factory.svg" alt="공장" title="공장" class="w-[0.9375rem]"/>
                                    공장
                                </h2>
                            </div>
                            <router-link to="/factory/list" class="flex items-end justify-between !pt-px main-card-container-box-padding">
                                <div class="flex flex-col gap-px w-full">
                                    <p class="text-10 text-t-lv4">공장전체</p>
                                    <div class="flex justify-between items-center w-full">
                                        <p class="flex h-[1.375rem] items-center text-22 font-bold text-sky-500">{{ main['factoryCnt'] }}</p>
                                        <IconLeftArrow class="fill-l-lv2"/>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </section>
                
                    <section class="col-span-6">
                        <div class="main-card-container-box">
                            <div class="main-card-tilte-box">
                                <h2 class="flex gap-2 justify-center items-center text-sm">
                                    <img src="@/assets/img/img-truck.svg" alt="배송 대기" title="배송 대기" class="w-[0.9375rem]"/>
                                    배송대기</h2>
                            </div>
                            <router-link to="/factory/list" class="flex items-end justify-between !pt-px main-card-container-box-padding">
                                <div class="flex flex-col gap-px w-full">
                                    <p class="flex items-center text-10 text-t-lv4">배송 대기</p>
                                    <div class="flex justify-between items-center w-full">
                                        <p class="text-22 font-bold items-center flex h-[1.375rem] text-yellow-300">0</p>
                                        <IconLeftArrow class="fill-l-lv2"/>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </section>
                </main>

                <!-- aside 섹션 -->
                <aside class="px-4 md:px-0">
                    <section class="col-span-12 w-full">
                    <div class="main-card-container-box">
                        <div class="main-card-tilte-box !mb-4">
                            <div class="flex gap-4 justify-center items-center">
                                <div class="flex justify-center items-center p-2 bg-yellow-300 rounded-full size-8">
                                    <img src="@/assets/img/icon-kakao.svg" alt="카카오톡" title="카카오톡" class="mx-auto"/>
                                </div>
                                
                                <div class="">
                                    <div class="flex gap-1 items-center">
                                        <h2 class="text-xs">플랜톡</h2>
                                        <span v-if="main['kakaoYn'] === 'N'" class="text-xs text-t-lv3">OFF</span>
                                        <span v-else class="text-xs text-sky-500 rounded-full">ON</span>
                                        <!-- <span v-if="main['kakaoYn'] === 'N'" class="px-1.5 text-xs text-white bg-red-500 rounded-full">OFF</span>
                                        <span v-else class="px-1.5 text-xs text-white bg-sky-400 rounded-full">ON</span> -->
                                    </div>
                                    <div v-if="main['kakaoYn'] === 'Y'" class="flex gap-2 text-10 !font-normal text-t-lv4">
                                        <span>0개 사용중</span>
                                        <span>|</span>
                                        <span>잔여 포인트 <span class="">50P</span></span>
                                    </div>
                                </div>
                            </div>
                            <Button v-if="main['kakaoYn'] === 'Y'" label="설정" severity="secondary" size="small" class="" @click="router.push({ path : '/plantalk' });"></Button>
                        </div>
                        <div class="main-card-container-box-padding">
                            <div v-if="main['kakaoYn'] === 'N'">
                                <p class="px-2.5 py-2 w-full bg-yellow-100 rounded text-10">일일이 세팅하지 말고, 꼭 필요한 예약 메시지를 자동으로 고객에게 전달해 보세요!</p>
                                <Button label="플랜톡 사용하기" class="w-full mt-[14px] *:!text-13 !border-none !py-[10.5px]" @click="getPlanTalk"></Button>
                            </div>        
                            <ul v-else class="grid grid-cols-2 gap-2 *:bg-gray-50 *:p-3 *:rounded-lg *:flex *:flex-col *:gap-px text-xs mt-[0.875rem]">
                                <li>
                                    <h5 class="font-bold">예약된 알림</h5>
                                    <div class="flex justify-between items-center">
                                        <p class="text-zinc-400">상세보기</p>
                                        <IconLeftArrow class="w-[0.4375rem] fill-l-lv2"/>
                                    </div>
                                </li>
                                <li>
                                    <h5 class="font-bold">보낸 알림</h5>
                                    <div class="flex justify-between items-center">
                                        <p class="text-zinc-400">
                                            오늘
                                            <span class="text-red-500">0건</span>
                                        </p>
                                        <IconLeftArrow class="w-[0.4375rem] fill-l-lv2"/>
                                    </div>
                                </li>
                            </ul>                            
                        
                        </div>
                    </div>
                </section>
                </aside>
            </div>
        </div>
    </div>
</div>  
</template>

<script setup lang="ts">
import { useConfirm } from "primevue/useconfirm";
import { onMounted } from 'vue';
import { useMainStore, useClientStore, useKakaoStore } from '@/store';
import { useRouter } from 'vue-router';
import IconAddCircle from '@/components/icons/IconAddCircle.vue';
import IconLeftArrow from '@/components/icons/IconLeftArrow.vue';

const confirm   = useConfirm();
const main      = useMainStore();
const client    = useClientStore();
const kakao     = useKakaoStore();
const router    = useRouter();

const getStCd = async (stCd: string) => {
    await client.getStCd(stCd);
    router.push({ path : '/customer/list' });
}

const getPlanTalk = () => {
    confirm.require({
        message     : '카카오톡을 사용하시겠습니까?',
        header      : '카카오톡',
        rejectProps : {
            label       : '취소',
            severity    : 'secondary',
            outlined    : true
        },
        acceptProps : {
            label: '확인'
        },
        accept : async () => {
            const data = await kakao.getKakaoActive();

            if(data['result'])
            {
                main.getData();
            }
        }
    });
}

onMounted(() => {
    main.getData();
})
</script>

<style lang="scss">

.scroll-bar-thin {
  scrollbar-width:thin;
}
</style>