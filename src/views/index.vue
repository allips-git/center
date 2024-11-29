<template>
<div class="w-full grid grid-cols-[1fr_300px] p-5 gap-8 items-start bg-gray-50 min-h-[calc(100vh-60px)]">
    <main class="w-full gap-y-5 gap-x-2.5 grid grid-cols-12">
        <section class="w-full col-span-12">
            <div class=" w-full overflow-hidden h-full rounded-md bg-indigo-50 py-5 px-10 relative">
                <p class="text-gray-600 mb-3"> #아주 쉬운 플랜오더 가이드 </p>
                <p class="text-3xl font-bold">모든 맴버 <br>일정 모아보기</p>
                <div class="text-indigo-600 text-4xl absolute  right-10 top-16 rounded-xl bg-slate-300 px-6 w-[200px] h-[400px]">
                </div>
                <div class="text-indigo-600 text-xl absolute top-8 right-16 rounded-2xl  bg-white shodow-md px-6 py-10 w-[200px] h-[400px]">
                    This is Banner! img
                </div>
            </div>
        </section>
    
        <section class="col-span-12">
            <div class="main-card-container-box">
                <div class="main-card-tilte-box">
                    <h2 class="flex items-center justify-center">전체 고객<span class="px-2 ml-2 font-normal text-white bg-indigo-600 rounded-full text-base">{{ main['clientCnt'] }}명</span></h2>
                    <Button label="더보기 >" text severity="secondary" size="small"></Button>
                </div>
                <ul class="main-card-container-box-padding grid grid-cols-5">
                    <li v-for="(item, index) in main['stCnt']" :key="index" class="flex flex-col items-center justify-center gap-2 border-r last:border-r-0">
                        <p class="text-gray-600">{{ item.label }}</p>
                        <p class="text-indigo-600 text-2xl font-bold">{{ item.count }}</p>
                    </li>
                </ul>
            </div>
        </section>
        

        <section class="col-span-6">
            <div class="main-card-container-box">
                <div class="main-card-tilte-box">
                    <h2 class="flex items-center justify-center gap-2">
                        <img src="@/assets/img/img-factory.svg" alt="공장" title="공장" class="size-6"/>
                        공장
                    </h2>
                    <Button label="더보기 >" text severity="secondary" size="small"></Button>
                </div>
                <div class="main-card-container-box-padding flex justify-between">
                    <div class="flex flex-col gap-1">
                        <p class="text-gray-600 text-sm">공장전체</p>
                        <p class="text-indigo-600 text-2xl font-bold">{{ main['factoryCnt'] }}</p>
                    </div>
                    <button class="text-xl font-bold text-gray-400">></button>
                </div>
            </div>
        </section>
    
        <section class="col-span-6">
            <div class="main-card-container-box">
                <div class="main-card-tilte-box">
                    <h2 class="flex items-center justify-center gap-2">
                        <img src="@/assets/img/img-truck.svg" alt="배송 대기" title="배송 대기" class="size-6"/>
                        배송대기</h2>
                    <Button label="더보기 >" text severity="secondary" size="small"></Button>
                </div>
                <div class="main-card-container-box-padding flex justify-between">
                    <div class="flex flex-col gap-1">
                        <p class="text-gray-600 text-sm">배송 대기</p>
                        <p class="text-indigo-600 text-2xl font-bold">0</p>
                    </div>
                    <button class="text-xl font-bold text-gray-400">></button>
                </div>
            </div>
        </section>

    </main>
    <aside class="w-full grid grid-cols-1 gap-5">
        <section class="w-full">
            <div class="main-card-container-box">
                <div class="main-card-tilte-box">
                    <h2 class="flex items-center justify-center gap-2">
                        <div class="bg-yellow-300 rounded-full size-6 flex items-center justify-center p-1.5">
                            <img src="@/assets/img/icon-kakao.svg" alt="카카오톡" title="카카오톡" class="mx-auto"/>
                        </div>
                        플랜톡
                        <span class="text-sm bg-red-500 text-white px-2 rounded-full">OFF</span>
                    </h2>
                    <Button label="none" text severity="secondary" size="small" class="opacity-0 pointer-events-none"></Button>
    
                </div>
                <div class="main-card-container-box-padding">
                    <div v-if="main['kakaoYn'] === 'N'">
                        <p class="bg-yellow-100 rounded py-2 px-2.5 text-xm w-full">일일이 세팅하지 말고, 꼭 필요한 예약 메시지를 자동으로 고객에게 전달해 보세요!</p>
                        <Button label="플랜톡 사용하기" class="w-full mt-5" ></Button>
                    </div>        
                    <ul v-else class="grid grid-cols-2 gap-2 *:bg-gray-50 *:p-3 *:rounded-lg *:flex *:flex-col *:gap-1">
                        <li>
                            <h5 class="font-bold">예약된 알림</h5>
                            <div class="flex justify-between items-center">
                                <p class="text-zinc-400">상세보기 <span class="text-sm">></span> </p>
                            </div>
                        </li>
                        <li>
                            <h5 class="font-bold">보낸 알림</h5>
                            <div class="flex justify-between items-center">
                                <p class="text-zinc-400">
                                    오늘
                                    <span class="text-red-500">0건</span>
                                </p>
                                <IconNext class="fill-neutral-300"/>
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
                    <li v-for="(item, index) in main['msgList']" :key="index" class="w-full flex justify-between items-center py-3 border-b last:border-b-0 scroll-">
                        <p class="font-bold mr-2 w-6 flex-none">{{ index + 1 }}</p> <!-- 인덱스 표시 -->
                        <div class="flex flex-col w-full gap-1">
                            <p class="font-bold text-sm">{{ item.title }}</p>
                            <p class="mt-0.5 text-base text-gray-900 truncate">{{ item.description }}</p>
                        </div>
                        <p>></p>
                    </li>
                </ul>
                    
            </div>
        </section>
    </aside>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { useLoginStore, useMainStore } from '@/store';

const login = useLoginStore();
const main  = useMainStore();

const kakaoYn = ref(false)

const storeMsg = ref([
    { title: '제목', description: '내용입니다아아아아ㅏ아아아아아ㅏ아아' },
    { title: '제목', description: '내용입니다아아아아ㅏ아아아아아ㅏ아아' },
    { title: '제목', description: '내용입니다아아아아ㅏ아아아아아ㅏ아아' },
    { title: '제목', description: '내용입니다아아아아ㅏ아아아아아ㅏ아아' },
    { title: '제목', description: '내용입니다아아아아ㅏ아아아아아ㅏ아아' },
    
])

onMounted(() => {
    console.log(login.token);
    main.getData();
})
</script>

<style lang="scss">

.scroll-bar-thin {
  scrollbar-width:thin;
}
</style>