<template>
<div class="flex flex-col w-full h-full gap-[14px] bg-gray-100 md:p-4 md:gap-4 overflow-y-scroll">
    <section class="w-full col-span-12">
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
    <main class="grid w-full grid-cols-12 gap-x-[10px] gap-y-[14px] px-4 md:px-0">
    
        <section class="col-span-12">
            <div class="flex flex-col gap-3 main-card-container-box">
                <div class="main-card-tilte-box">
                    <h2 class="flex items-center justify-center text-base">전체 고객</h2>
                    <div class="flex items-center gap-3.5">
                        <div class="flex items-center text-22">
                            <span class="flex items-center text-t-lv1">{{ main['clientCnt'] }}
                            </span>
                            <p class="">명</p>

                        </div>
                        <div class="block w-px h-5 bg-gray-200"></div>
                            <IconAddCircle @click="getStCd('')"/>
                        </div>
                </div>
                <ul class="grid grid-cols-5 pt-3 main-card-container-box-padding">
                    <li v-for="(item, index) in main['stCnt']" :key="index" class="flex flex-col items-center justify-center border-r h-[2.4375rem] gap-[0.3125rem] last:border-r-0" @click="getStCd(item['stCd'])">
                        <p class="text-data text-sky-500 h-[1.4375rem] flex items-center">{{ item.count }}</p>
                        <p class="text-caption">{{ item.label }}</p>
                    </li>
                </ul>
            </div>
        </section>
        <section class="col-span-6 ">
            <div class="main-card-container-box">
                <div class="main-card-tilte-box">
                    <h2 class="flex items-center justify-center gap-2 text-sm">
                        <img src="@/assets/img/img-factory.svg" alt="공장" title="공장" class="w-[0.9375rem]"/>
                        공장
                    </h2>
                </div>
                <router-link to="/factory/list" class="flex items-end justify-between !pt-px main-card-container-box-padding">
                    <div class="flex flex-col w-full gap-px">
                        <p class="text-10 text-t-lv4">공장전체</p>
                        <div class="flex items-center justify-between w-full">
                            <p class="flex h-[1.375rem] items-center text-22 font-bold text-sky-500">{{ main['factoryCnt'] }}</p>
                            <IconLeftArrow class="fill-l-lv2"/>
                        </div>
                    </div>
                </router-link>
            </div>
        </section>
    
        <section class="col-span-6 ">
            <div class="main-card-container-box">
                <div class="main-card-tilte-box">
                    <h2 class="flex items-center justify-center gap-2 text-sm">
                        <img src="@/assets/img/img-truck.svg" alt="배송 대기" title="배송 대기" class="w-[0.9375rem]"/>
                        배송대기</h2>
                </div>
                <router-link to="/factory/list" class="flex items-end justify-between !pt-px main-card-container-box-padding">
                    <div class="flex flex-col w-full gap-px">
                        <p class="flex items-center text-10 text-t-lv4">배송 대기</p>
                        <div class="flex items-center justify-between w-full">
                            <p class="text-22 font-bold items-center flex h-[1.375rem] text-yellow-300">0</p>
                            <IconLeftArrow class="fill-l-lv2"/>
                        </div>
                    </div>
                </router-link>
            </div>
        </section>
    </main>
    <aside class="col-span-12 px-4 pb-4 md:px-0">
        <section class="w-full col-span-12">
        <div class="main-card-container-box">
            <div class="main-card-tilte-box !mb-4">
                <div class="flex items-center justify-center gap-4">
                    <div class="flex items-center justify-center p-2 bg-yellow-300 rounded-full size-8">
                        <img src="@/assets/img/icon-kakao.svg" alt="카카오톡" title="카카오톡" class="mx-auto"/>
                    </div>
                    
                    <div class="">
                        <div class="flex items-center gap-1">
                            <h2 class="text-xs">플랜톡</h2>
                            <span v-if="main['kakaoYn'] === 'N'" class="text-xs text-t-lv3">OFF</span>
                            <span v-else class="text-xs rounded-full text-sky-500">ON</span>
                            <!-- <span v-if="main['kakaoYn'] === 'N'" class="px-1.5 text-xs text-white bg-red-500 rounded-full">OFF</span>
                            <span v-else class="px-1.5 text-xs text-white rounded-full bg-sky-400">ON</span> -->
                        </div>
                        <div v-if="main['kakaoYn'] === 'Y'" class="flex gap-2 text-10 !font-normal text-t-lv4">
                            <span>0개 사용중</span>
                            <span>|</span>
                            <span>잔여 포인트 <span class="">50P</span></span>
                        </div>
                    </div>
                </div>
                <Button label="설정" severity="secondary" size="small" class=""></Button>
            </div>
            <div class="main-card-container-box-padding">
                <div v-if="main['kakaoYn'] === 'N'">
                    <p class="bg-yellow-100 rounded py-2 px-2.5 text-10 w-full ">일일이 세팅하지 말고, 꼭 필요한 예약 메시지를 자동으로 고객에게 전달해 보세요!</p>
                    <Button label="플랜톡 사용하기" class="w-full mt-[14px] *:!text-13 !border-none !py-[10.5px]" @click="getPlanTalk"></Button>
                </div>        
                <ul v-else class="grid grid-cols-2 gap-2 *:bg-gray-50 *:p-3 *:rounded-lg *:flex *:flex-col *:gap-px text-xs mt-[0.875rem]">
                    <li>
                        <h5 class="font-bold">예약된 알림</h5>
                        <div class="flex items-center justify-between">
                            <p class="text-zinc-400">상세보기</p>
                            <IconLeftArrow class="w-[0.4375rem] fill-l-lv2"/>
                        </div>
                    </li>
                    <li>
                        <h5 class="font-bold">보낸 알림</h5>
                        <div class="flex items-center justify-between">
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
    <aside class="grid hidden w-full grid-cols-1 gap-5 px-4 md:px-0">
        <section class="w-full">
            <div class="main-card-container-box">
                <div class="main-card-tilte-box">
                    <div class="flex items-center justify-center gap-2">
                        <div class="flex items-center justify-center p-2 bg-yellow-300 rounded-full size-8">
                            <img src="@/assets/img/icon-kakao.svg" alt="카카오톡" title="카카오톡" class="mx-auto"/>
                        </div>
                        
                        <div class="">
                            <div class="flex items-center gap-0.5">
                                <h2 class="text-xs">플랜톡</h2>
                                <span v-if="main['kakaoYn'] === 'N'" class="text-xs text-t-lv3">OFF</span>
                                <span v-else class="text-xs rounded-full text-sky-500">ON</span>
                                <!-- <span v-if="main['kakaoYn'] === 'N'" class="px-1.5 text-xs text-white bg-red-500 rounded-full">OFF</span>
                                <span v-else class="px-1.5 text-xs text-white rounded-full bg-sky-400">ON</span> -->
                            </div>
                            <div v-if="main['kakaoYn'] === 'Y'" class="flex gap-2 font-normal text-t-lv4 text-10">
                                <span>0개 사용중</span>
                                <span>|</span>
                                <span>잔여 포인트 <span class="font-bold">50P</span></span>
                            </div>
                        </div>
                    </div>
                    <Button v-if="main['kakaoYn'] === 'Y'" label="설정" severity="secondary" size="small" class="" @click="router.push({ path : '/plantalk' });"></Button>
                </div>
                <div class="main-card-container-box-padding">
                    <div v-if="!main['kakaoYn'] || main['kakaoYn'] === 'N'">
                        <p class="bg-yellow-100 rounded py-2 px-2.5 text-sm w-full ">일일이 세팅하지 말고, 꼭 필요한 예약 메시지를 자동으로 고객에게 전달해 보세요!</p>
                        <Button label="플랜톡 사용하기" class="w-full mt-5" @click="getPlanTalk"></Button>
                    </div>        
                    <ul v-else class="grid grid-cols-2 gap-2 *:bg-gray-50 *:p-3 *:rounded-lg *:flex *:flex-col *:gap-px text-10 mt-[0.875rem]">
                        <li>
                            <h5 class="font-bold">예약된 알림</h5>
                            <div class="flex items-center justify-between">
                                <p class="text-zinc-400">상세보기</p>
                                <IconLeftArrow class="w-[0.4375rem] fill-l-lv2"/>
                            </div>
                        </li>
                        <li>
                            <h5 class="font-bold">보낸 알림</h5>
                            <div class="flex items-center justify-between">
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
        <!-- <section class="">
            <div class="main-card-container-box pt-[1.375rem] px-4 !pb-[1.875rem]">
                <div class="main-card-tilte-box">
                    <h2 class="flex items-center justify-center gap-2 text-18">
                        매장전용 메세지</h2>
                    <Button label="메세지 추가" size="small"></Button>
                </div>
                <ul class="main-card-container-box-padding max-h-[500px] overflow-y-auto !py-1 scroll-bar-thin flex flex-col gap-6 mt-7">
                    <li v-for="(item, index) in main['msgList']" :key="index" class="flex items-center justify-between flex-none w-full last:border-b-0 scroll-">
                        <p class="flex-none w-6 mr-2 font-bold text-t-lv2">{{ index + 1 }}</p>
                        <div class="flex flex-col w-[calc(100%-60px)] gap-1">
                            <p class="text-xs font-bold">{{ item.title }}</p>
                            <p class="mt-0.5 text-10 text-t-lv4 truncate w-full">{{ item.description }}</p>
                        </div>
                        <button class="flex items-center justify-center flex-none size-7">
                            <IconLeftArrow class="w-3 fill-l-lv3"/>
                        </button>
                    </li>
                </ul>
            </div>
        </section> -->
    </aside>
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