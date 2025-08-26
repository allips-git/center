<template>
<div class="flex flex-col h-full">
    <div class="flex-1 min-h-0">
        <div class="overflow-y-auto h-full">
            <div class="flex flex-col gap-[14px] bg-gray-100 md:p-4 md:gap-4 pb-12 h-full">
                <!-- 배너 섹션 -->
                <section class="w-full">
                    <div class="relative w-full px-5 overflow-hidden bg-blue-100 md:rounded-md h-[9.1875rem] flex justify-between items-center">
                        <div class="flex flex-col">
                            <p class="mb-3 text-t-lv3 text-11">아주 쉬운 플랜오더 가이드 #1</p>
                            <p class="font-bold text-18 leading-[1.3]">모든 맴버 일정 <br>모아보기</p>
                        </div>
                    
                        <div class="flex gap-2">
                            <img src="/src/assets/img/banner_01.png" class="w-[3.375rem]" alt="">
                            <img src="/src/assets/img/banner_02.png" class="w-[3.375rem]" alt="">
                        </div>
                    </div>
                </section>

                <!-- 메인 그리드 섹션 -->
                <main class="flex flex-col w-full gap-[14px] px-3 md:px-0">
                    <div class="flex flex-col gap-2 w-full main-card-container-box">
                        <div class="pt-1 pl-2 sm:pt-0 main-card-tilte-box">
                            <h2 class="flex justify-center items-center text-base">전체 고객</h2>
                            <div class="flex gap-2 items-center" @click="getStCd('')">
                                <div class="flex items-center text-lg text-t-lv1 gap-[1px] mr-[1px]">
                                    <strong>{{ main['clientCnt'] }}</strong>
                                    <span class="text-19">명</span>
                                </div>
                                <div class="block w-px h-5 bg-gray-200" />
                                <IconAddCircle class="cursor-pointer"/>
                            </div>
                        </div>
                        <ul class="grid grid-cols-5 mx-[-0.25rem] pt-3 pb-1.5 main-card-container-box-padding">
                            <li v-for="(item, index) in main['stCnt']" :key="index" class="flex flex-col items-center cursor-pointer justify-center border-r h-[2.25rem] gap-[0.125rem] last:border-r-0" @click="getStCd(item['stCd'])">
                                <strong class="text-data text-sky-500 h-[1.4375rem] flex items-center">{{ item.count }}</strong>
                                <div class="text-caption">{{ item.label }}</div>
                            </li>
                        </ul>
                    </div>
                    <div class="flex w-full gap-[10px] md:gap-[14px] justify-between items-center">
                        <router-link to="/factory/list" class="block flex-1 main-card-container-box">
                            <h2 class="flex gap-2 justify-start items-center text-sm font-bold sm:text-base">
                                <img src="@/assets/img/img-factory.svg" alt="공장" title="공장" class="w-[1rem] sm:w-[1.375rem]"/>
                                공장
                            </h2>
                            <div class="mt-[0.125rem] text-11 sm:text-13 text-t-lv4">공장전체</div>
                            <div class="mt-[0.125rem] flex justify-between items-center w-full">
                                <strong class="flex h-[1.375rem] pl-[1px] items-center text-22 font-bold text-sky-500">{{ main['factoryCnt'] }}</strong>
                                <IconLeftArrow class="fill-l-lv2"/>
                            </div>
                        </router-link>
                        
                        <div class="block flex-1 main-card-container-box" @click="getChatOpen">
                            <h2 class="flex gap-1.5 justify-start items-center text-sm font-bold sm:text-base">
                                <img src="@/assets/img/img-chat.svg" alt="고객채팅" title="고객채팅" class="w-[1rem] sm:w-[1.375rem]"/>
                                고객채팅
                            </h2>
                            <div class="mt-[0.125rem] text-11 sm:text-13 text-t-lv4">안읽은 채팅방</div>
                            <div class="mt-[0.125rem] flex justify-between items-center w-full">
                                <strong class="flex h-[1.375rem] pl-[1px] items-center text-22 font-bold text-[#07DABF]">0</strong>
                                <IconLeftArrow class="fill-l-lv2"/>
                            </div>
                        </div>
                       
                        <router-link to="/factory/list" class="block flex-1 main-card-container-box">
                            <h2 class="flex gap-2 justify-start items-center text-sm font-bold sm:text-base">
                                <img src="@/assets/img/img-truck.svg" alt="배송대기" title="배송 대기" class="w-[1rem] sm:w-[1.375rem] m-[-1px]"/>
                                배송대기
                            </h2>
                            <div class="mt-[0.125rem] text-11 sm:text-13 text-t-lv4">배송 대기</div>
                            <div class="mt-[0.125rem] flex justify-between items-center w-full">
                                <strong class="flex h-[1.375rem] pl-[1px] items-center text-22 font-bold text-yellow-300">0</strong>
                                <IconLeftArrow class="fill-l-lv2"/>
                            </div>
                        </router-link>
                    </div>
                </main>
                <!-- aside 섹션 -->
                <aside class="px-3 md:px-0">
                    <section class="col-span-12 w-full">
                    <div class="main-card-container-box">
                        <div class="main-card-tilte-box !mb-2">
                            <div class="flex gap-2.5 justify-center items-center">
                                <div class="flex justify-center items-center p-2 bg-yellow-300 rounded-full size-8">
                                    <img src="@/assets/img/icon-kakao.svg" alt="카카오톡" title="카카오톡" class="mx-auto"/>
                                </div>
                                
                                <div class="">
                                    <div class="flex gap-1 items-center">
                                        <h2 class="text-xs sm:text-sm">플랜톡</h2>
                                        <span v-if="main['kakaoYn'] === 'N'" class="text-xs text-t-lv3">OFF</span>
                                        <span v-else class="text-xs text-sky-500 rounded-full">ON</span>
                                        <!-- <span v-if="main['kakaoYn'] === 'N'" class="px-1.5 text-xs text-white bg-red-500 rounded-full">OFF</span>
                                        <span v-else class="px-1.5 text-xs text-white bg-sky-400 rounded-full">ON</span> -->
                                    </div>
                                    <div v-if="main['kakaoYn'] === 'Y'" class="flex gap-2 text-11 sm:text-13 !font-normal text-t-lv4 mt-[-0.125rem]">
                                        <span>0개 사용중</span>
                                        <span>|</span>
                                        <span>잔여 포인트 <span class="">50P</span></span>
                                    </div>
                                </div>
                            </div>
                            <Button v-if="main['kakaoYn'] === 'Y'" label="설정" severity="secondary" size="small" class="!px-3 !py-2  !bg-bg-lv2 *:!text-xs *:!text-t-lv2" @click="router.push({ path : '/plantalk' });"></Button>
                        </div>
                        <div class="main-card-container-box-padding">
                            <div v-if="main['kakaoYn'] === 'N'">
                                <p class="px-3 py-2 w-full bg-[#FFFBE2] border border-yellow-100 rounded text-11 leading-[1.3]">일일이 세팅하지 말고, 꼭 필요한 예약 메시지를 자동으로 고객에게 전달해 보세요!</p>
                                <Button label="플랜톡 사용하기" class="w-full mt-[14px] *:!text-sm !border-none !py-[0.625rem] *:!font-semibold" @click="getPlanTalk"></Button>
                            </div>        
                            <ul v-else class="grid grid-cols-2 gap-2 *:bg-bg-lv1 *:p-3 *:rounded-lg *:flex *:flex-col *:gap-px text-xs mt-[0.875rem]">
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
                <!-- <section class="">
                    <div class="main-card-container-box pt-[1.375rem] px-4 !pb-[1.875rem]">
                        <div class="main-card-tilte-box">
                            <h2 class="flex gap-2 justify-center items-center text-18">
                                매장전용 메세지</h2>
                            <Button label="메세지 추가" size="small"></Button>
                        </div>
                        <ul class="main-card-container-box-padding max-h-[500px] overflow-y-auto !py-1 scroll-bar-thin flex flex-col gap-6 mt-7">
                            <li v-for="(item, index) in main['msgList']" :key="index" class="flex flex-none justify-between items-center w-full last:border-b-0 scroll-">
                                <p class="flex-none mr-2 w-6 font-bold text-t-lv2">{{ index + 1 }}</p>
                                <div class="flex flex-col w-[calc(100%-60px)] gap-1">
                                    <p class="text-xs font-bold">{{ item.title }}</p>
                                    <p class="mt-0.5 w-full truncate text-10 text-t-lv4">{{ item.description }}</p>
                                </div>
                                <button class="flex flex-none justify-center items-center size-7">
                                    <IconLeftArrow class="w-3 fill-l-lv3"/>
                                </button>
                            </li>
                        </ul>
                    </div>
                </section> -->
                </aside>
            </div>
        </div>
    </div>
    <Dialog v-model:visible="popup['pop']['chatRoom']" header="채팅방 목록" 
        :modal=true position="center" class="custom-dialog-full" 
        @update:visible="getPopupClose('chatRoom', true)">
        <template #header>
            <div class="modal-backheader">
                <Button @click="getPopupClose('chatRoom', true)" severity="contrast" text icon="pi pi-times" />
                <h2 class="modal-backheader-title">채팅방</h2>
            </div>
        </template>
        <ChatRoomModal/>
    </Dialog>
</div>  
</template>

<script setup lang="ts">
import { useConfirm } from "primevue/useconfirm";
import { onMounted } from 'vue';
import { useMainStore, usePopupStore, useClientStore, useKakaoStore, useChatStore } from '@/store';
import { useRouter } from 'vue-router';
import IconAddCircle from '@/components/icons/IconAddCircle.vue';
import IconLeftArrow from '@/components/icons/IconLeftArrow.vue';
import ChatRoomModal from "@/views/customer/ChatRoomModal.vue";
import { usePopup } from '@/assets/js/popup';

const confirm   = useConfirm();
const main      = useMainStore();
const popup     = usePopupStore();
const client    = useClientStore();
const kakao     = useKakaoStore();
const chat      = useChatStore();
const router    = useRouter();

const { getPopupOpen, getPopupClose } = usePopup();

const getChatOpen = async () => {
    await chat.getCrCdNull();
    await chat.getRoom();

    console.log(chat.crCd);
    await getPopupOpen('chatRoom');
}

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