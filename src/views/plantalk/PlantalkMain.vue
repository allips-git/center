<template>
    <main>
        <main>
            <BackHeader title="플랜톡"/>
            <div class="py-5">
                <section class="px-5">
                    <div class="flex items-center gap-1">
                        <h1 class="text-lg font-bold">플랜톡</h1>
                        <div class="text-base">
                            <p v-if="!kakaoUseYn" class="font-extrabold text-red-500">OFF</p>
                            <p v-if="kakaoUseYn" class="font-extrabold text-sky-500">ON</p>            
                        </div>
                    </div>
                    <p class="mt-2 text-sm text-gray-400">알림 <span class="font-bold text-sky-500">4</span>종을 사용중입니다.</p>
                    <ul class="grid grid-cols-2 gap-3 mt-2 *:p-4 *:rounded-lg text-sm">
                        <li class="flex items-center justify-between col-span-2 bg-yellow-50">
                            <p>플랜톡 잔여 포인트</p>
                            <Button label="충전하기" size="small" />
                        </li>
                        <li class="col-span-1 bg-gray-50" @click="goToPage('예약된 알림', '/plantalk/res')">
                            <div class="flex items-center justify-between">
                                <div class="flex flex-col gap-1">
                                    <h5 class="font-bold ">예약된 알림</h5>
                                    <p class="text-zinc-400">상세보기</p>
                                </div>
                                <IconPlay class="size-2.5 fill-gray-400"/>
                            </div>
                        </li>
                        <li class="col-span-1 bg-gray-50" @click="goToPage('발송 메시지보기', '/plantalk/res')">
                            <div class="flex items-center justify-between">
                                <div class="flex flex-col gap-1">
                                    <h5 class="text-sm font-bold">발송 메시지보기</h5>
                                    <p class="text-zinc-400">오늘<span class="ml-1 font-extrabold text-sky-500">0건</span></p>
                                </div>
                                <IconPlay class="size-2.5 fill-gray-400"/>
                            </div>
                        </li>
                    </ul>
                </section>
        
                <div class="gray-bar"></div>
        
                <section class="">
                    <h1 class="px-5 text-lg font-bold">알림</h1>
                    <ul class="flex flex-col py-3 *:border-b *:px-5  *:py-4  *:border-gray-200">
                        <li v-for="(item, index) in notifications" :key="index" class="flex items-center justify-between" @click="goToDetail(item.title, item.description, '/plantalk/detail')">
                            <div>
                                <div class="flex items-center gap-2">
                                    <p class="font-bold">{{ item.title }}</p>
                                    <img src="@/assets/img/icon-kakaologo.png" alt="kakao" title="kakao" class="size-6"/>
                                </div>
                                <p class="mt-2 text-sm text-gray-400">{{ item.description }}</p>
                            </div>
                            <div class="flex items-center gap-2">
                                <Badge v-if="!item.kakaoUseYn" value="OFF" severity="danger" class="!rounded-full"></Badge>
                                <Badge v-if="item.kakaoUseYn" value="ON" severity="success" class="!rounded-full"></Badge>            
                                <IconPlay class="size-2.5 fill-gray-400"/>
                            </div>
                        </li>
                    </ul>
                </section>
            </div>                       
        </main>
        
        <Dialog
            v-model:visible="plantalkDetailPop" 
            header="플랜톡 설정" 
            :modal=true
            position="bottom"
            class="custom-dialog-bottom"
            >
            <ScheduleAlert/>
        </Dialog>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import Badge from 'primevue/badge';
import BackHeader from '@/components/layouts/BackHeader.vue'
import ScheduleAlert from "@/views/plantalk/ScheduleAlert.vue";
import IconPlay from '@/components/icons/IconPlay.vue';

const router = useRouter();

const goToPage = (title: string, path: string) => {
    // 제목을 localStorage에 저장
    localStorage.setItem('pageTitle', title);
    // 페이지 이동
    router.push(path);
};

const goToDetail = (title: string, description: string, path: string) => {
    // 제목과 설명을 localStorage에 저장
    localStorage.setItem('pageTitle', title);
    localStorage.setItem('pageDescription', description);
    // 페이지 이동
    router.push(path);
}


const kakaoUseYn = ref()

const notifications = ref([
    { title: '견적일정 알림', description: '고객등록 > 견적일정 등록 완료 후 견적 알림이 발송됩니다.', kakaoUseYn: true },
    { title: '계약완료 알림', description: '계약완료 시 계약서 공유 알림이 발송됩니다.', kakaoUseYn: true },
    { title: '시공일 알림', description: '시공 당일 아침 9시에 방문 알림이 발송됩니다.', kakaoUseYn: false },
    { title: '결제요청 알림', description: '시공 완료 시 잔금 결제요청 알림이 발송됩니다.', kakaoUseYn: false },
    { title: 'A/S일정 알림', description: 'A/S 발생 시 재방문 알림이 발송됩니다.', kakaoUseYn: false },
]);

const plantalkDetailPop = ref(false)
const plantalkMessagePop = ref(false)
const plantalkAlertPop = ref(false)

 </script>
