<template>
<main>
    <BackHeader title="플랜톡"/>
    <div class="py-5">
        <section class="px-5">
            <div class="flex items-center gap-2">
                <h1 class="text-xl font-bold">플랜톡</h1>
                <Badge v-if="!kakaoUseYn" value="OFF" severity="danger"></Badge>
                <Badge v-if="kakaoUseYn" value="ON" severity="success"></Badge>            
            </div>
            <p class="mt-2 text-sm text-gray-400">알림 <span class="font-bold text-indigo-600">3</span>종을 사용중입니다.</p>
            <ul class="grid grid-cols-2 gap-2 mt-2 *:p-4 *:rounded-lg">
                <li class="flex items-center justify-between col-span-2 bg-yellow-50">
                    <p>플랜톡 잔여 포인트</p>
                    <Button label="충전하기" size="small" />
                </li>
                <li class="col-span-1 bg-gray-50" @click="plantalkAlertPop = true">
                    <h5 class="font-bold">예약된 알림</h5>
                    <div class="flex items-center justify-between">
                        <p class="text-zinc-400">상세보기 <span class="text-sm">></span> </p>
                    </div>
                </li>
                <li class="col-span-1 bg-gray-50" @click="plantalkMessagePop = true">
                    <h5 class="font-bold">보낸 알림</h5>
                    <div class="flex items-center justify-between">
                        <p class="text-zinc-400">
                            오늘
                            <span class="text-indigo-500">0건</span>
                        </p>
                        <p class="text-zinc-400">상세보기 <span class="text-sm">></span> </p>
                    </div>
                </li>
            </ul>
        </section>

        <div class="gray-bar"></div>

        <section class="">
            <h1 class="px-5 text-xl font-bold">알림</h1>
            <ul class="flex flex-col py-3 *:border-b *:p-4 *:border-gray-200">
                <li v-for="(item, index) in notifications" :key="index" class="flex items-center justify-between" @click="plantalkDetailPop = true">
                    <div>
                        <div class="flex gap-2">
                            <p class="font-bold">{{ item.title }}</p>
                            <div class="bg-yellow-300 rounded-full size-6 flex items-center justify-center p-1.5">
                                <img src="@/assets/img/icon-kakao.svg" alt="카카오톡" title="카카오톡" class="mx-auto"/>
                            </div>
                        </div>
                        <p class="mt-2 text-sm text-gray-400">{{ item.description }}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <Badge v-if="!item.kakaoUseYn" value="OFF" severity="danger"></Badge>
                        <Badge v-if="item.kakaoUseYn" value="ON" severity="success"></Badge>            
                        <span class="pi pi-angle-right"></span>
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

<Dialog
    v-model:visible="plantalkMessagePop" 
    header="예약된 알림" 
    :modal=true
    position="bottom"
    class="custom-dialog-bottom"
    >
    <PlantalkMessage/>
</Dialog>

<Dialog
    v-model:visible="plantalkAlertPop" 
    header="예약된 알림" 
    :modal=true
    position="bottom"
    class="custom-dialog-bottom"
    >
    <PlantalkAlert/>
</Dialog>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import Badge from 'primevue/badge';
import BackHeader from '@/components/layouts/BackHeader.vue'
import ScheduleAlert from "@/views/include/plantalk/ScheduleAlert.vue";
import PlantalkMessage from "@/views/include/plantalk/PlantalkMessage.vue";
import PlantalkAlert from "@/views/include/plantalk/PlantalkAlert.vue";


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
