<template>
<div class="w-full md:grid md:grid-cols-[1fr_300px] gap-8 items-start bg-gray-100 min-h-[calc(100vh-60px)] pb-[60px]">
    <main class="w-full gap-y-5 gap-x-2.5 grid grid-cols-12">
        <section class="w-full col-span-12">
            <div class="relative w-full h-full px-10 py-5 overflow-hidden bg-blue-100 rounded-md">
                <p class="mb-3 text-gray-600"> #아주 쉬운 플랜오더 가이드 </p>
                <p class="text-3xl font-bold">모든 맴버 <br>일정 모아보기</p>
                <div class="text-indigo-600 text-4xl absolute  right-10 top-16 rounded-xl bg-slate-300 px-6 w-[100px] md:w-[200px] h-[400px]">
                </div>
                <div class="text-indigo-600 text-xl absolute top-8 right-16 rounded-2xl  bg-white shodow-md px-6 py-10 w-[100px] md:w-[200px] h-[400px]">
                    This is Banner! img
                </div>
            </div>
        </section>
    
        <section class="col-span-12 px-5">
            <div class="main-card-container-box">
                <div class="main-card-tilte-box">
                    <h2 class="flex items-center justify-center">전체 고객</h2>
                    <div class="flex items-center gap-2">
                        <span class="text-xl font-bold">{{ main['clientCnt'] }}명</span>
                        <div class="block w-px h-5 bg-gray-200"></div>
                        <div class="overflow-hidden rounded-full">
                            <router-link to="/customer/list" class="flex items-center justify-center size-6 bg-sky-500">
                                <span class="text-white pi pi-plus"></span>
                            </router-link>
                        </div>
                    </div>
                </div>
                <ul class="grid grid-cols-5 main-card-container-box-padding">
                    <li v-for="(item, index) in main['stCnt']" :key="index" class="flex flex-col items-center justify-center gap-2 border-r last:border-r-0">
                        <p class="text-xl font-bold text-sky-500">{{ item.count }}</p>
                        <p class="text-sm text-gray-400">{{ item.label }}</p>
                    </li>
                </ul>
            </div>
        </section>
        <section class="col-span-6 pl-5 mb-5 md:mb-0 md:pl-0">
            <div class="main-card-container-box">
                <div class="main-card-tilte-box">
                    <h2 class="flex items-center justify-center gap-2">
                        <img src="@/assets/img/img-factory.svg" alt="공장" title="공장" class="size-6"/>
                        공장
                    </h2>
                </div>
                <div class="flex items-end justify-between main-card-container-box-padding">
                    <div class="flex flex-col gap-1">
                        <p class="text-sm text-gray-600">공장전체</p>
                        <p class="text-2xl font-bold text-sky-500">{{ main['factoryCnt'] }}</p>
                    </div>
                    <button class="text-xl font-bold text-gray-300">></button>
                </div>
            </div>
        </section>
    
        <section class="col-span-6 pr-5 md:pr-0">
            <div class="main-card-container-box">
                <div class="main-card-tilte-box">
                    <h2 class="flex items-center justify-center gap-2">
                        <img src="@/assets/img/img-truck.svg" alt="배송 대기" title="배송 대기" class="size-6"/>
                        배송대기</h2>
                </div>
                <div class="flex items-end justify-between main-card-container-box-padding">
                    <div class="flex flex-col gap-1">
                        <p class="text-sm text-gray-600">배송 대기</p>
                        <p class="text-2xl font-bold text-yellow-300">0</p>
                    </div>
                    <button class="text-xl font-bold text-gray-300">></button>
                </div>
            </div>
        </section>

    </main>
    <aside class="grid w-full grid-cols-1 gap-5 px-5 md:px-0">
        <section class="w-full">
            <div class="main-card-container-box">
                <div class="main-card-tilte-box">
                    <div class="flex items-center justify-center gap-2">
                        <div class="flex items-center justify-center p-2 bg-yellow-300 rounded-full size-10">
                            <img src="@/assets/img/icon-kakao.svg" alt="카카오톡" title="카카오톡" class="mx-auto"/>
                        </div>
                        
                        <div class="ml-1.5">
                            <div class="flex items-center gap-2">
                                <h2>플랜톡</h2>
                                <span v-if="main['kakaoYn'] === 'N'" class="px-1.5 text-xs text-white bg-red-500 rounded-full">OFF</span>
                                <span v-else class="px-1.5 text-xs text-white rounded-full bg-sky-400">ON</span>
                            </div>
                            <div v-if="main['kakaoYn'] === 'Y'" class="flex gap-2 text-sm text-gray-400">
                                <span>0개 사용중</span>
                                <span>|</span>
                                <span>잔여 포인트<span class="font-bold">50P</span></span>
                            </div>
                        </div>
                        
                    </div>
                    <Button label="none" text severity="secondary" size="small" class="opacity-0 pointer-events-none"></Button>
    
                </div>
                <div class="main-card-container-box-padding">
                    <div v-if="main['kakaoYn'] === 'N'">
                        <p class="bg-yellow-100 rounded py-2 px-2.5 text-sm w-full ">일일이 세팅하지 말고, 꼭 필요한 예약 메시지를 자동으로 고객에게 전달해 보세요!</p>
                        <Button label="플랜톡 사용하기" class="w-full mt-5" ></Button>
                    </div>        
                    <ul v-else class="grid grid-cols-2 gap-2 *:bg-gray-50 *:p-3 *:rounded-lg *:flex *:flex-col *:gap-1">
                        <li>
                            <h5 class="font-bold">예약된 알림</h5>
                            <div class="flex items-center justify-between">
                                <p class="text-zinc-400">상세보기</p>
                                <button class="text-xl font-bold text-gray-300">></button>
                            </div>
                        </li>
                        <li>
                            <h5 class="font-bold">보낸 알림</h5>
                            <div class="flex items-center justify-between">
                                <p class="text-zinc-400">
                                    오늘
                                    <span class="text-red-500">0건</span>
                                </p>
                                <button class="text-xl font-bold text-gray-300">></button>
                            </div>
                        </li>
                    </ul>                            
                
                </div>
            </div>
        </section>
        <section class="">
            <div class="main-card-container-box">
                <div class="main-card-tilte-box !py-3">
                    <h2 class="flex items-center justify-center gap-2">
                        매장전용 메세지</h2>
                    <Button label="메세지 추가 >" size="small" class="!py-0.5"></Button>
                </div>
                <ul class="main-card-container-box-padding max-h-[500px] overflow-y-auto !py-1 scroll-bar-thin">
                    <li v-for="(item, index) in main['msgList']" :key="index" class="flex items-center justify-between flex-none w-full py-3 border-b last:border-b-0 scroll-">
                        <p class="flex-none w-6 mr-2 font-bold">{{ index + 1 }}</p> <!-- 인덱스 표시 -->
                        <div class="flex flex-col w-[calc(100%-40px)] gap-1">
                            <p class="text-sm font-bold">{{ item.title }}</p>
                            <p class="mt-0.5 text-sm text-gray-900 truncate w-full">{{ item.description }}</p>
                        </div>
                        <button class="text-lg font-bold text-gray-300">></button>
                    </li>
                </ul>
                    
            </div>
        </section>
    </aside>
</div>  
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useMainStore } from '@/store';

const main  = useMainStore();

onMounted(() => {
    main.getData();
})
</script>

<style lang="scss">

.scroll-bar-thin {
  scrollbar-width:thin;
}
</style>