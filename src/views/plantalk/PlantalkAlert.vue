<template>
    <main>
        <BackHeader :title="currentTitle"/>
        <div class="p-5 pt-0">
            <section class="flex justify-end w-full my-3">
                <Select class="w-40" size="small"/>
            </section>
            <!-- 날짜 포함 v-for -->
           <section class="flex flex-col">
            <div class="flex items-center justify-center gap-4 text-sm">
                <span class="w-full h-px bg-gray-200"></span>
                <p class="flex-none font-bold text-gray-400">2022.12.24일 (오늘)</p>
                <span class="w-full h-px bg-gray-200"></span>
            </div>
            <ul class="flex flex-col gap-0">
                <!-- 메세지 v-for -->
                <li class="flex items-start justify-between gap-3 first:mt-2" @click="toggleMessagePopover">
                    <IconAvatar class="size-8 fill-sky-300"/>
                    <div class="flex flex-col w-full gap-2">
                        <div class="flex justify-between w-full">
                            <div>
                                <h1 class="mb-1 font-bold">하현재</h1>
                                <div class="flex items-center gap-1 text-sm">
                                    <img src="@/assets/img/icon-kakaologo.png" alt="" class="size-6">
                                    <span class="font-normal text-gray-400 ">010-3445-2105</span>
                                </div>
                            </div>
                            <span class="text-sm text-gray-400">오후 06:21</span>
                        </div>
                        <div class="text-sm">
                            <p class="flex-none">[카카오 알림톡] <span class="font-bold">시공일 알림</span></p>
                            <p v-if="currentTitle == '예약된 알림'"  class="font-bold text-yellow-400">발송준비</p>
                            <p v-if="currentTitle == '발송 메시지보기'"  class="font-bold text-green-500">발송완료</p>
                        </div>
                        <div class="flex gap-3 mt-1">
                            <button class="flex items-center justify-center bg-gray-100 rounded-md size-8">
                                <IconMessage class="size-4 fill-gray-600"/></button>
                            <button class="flex items-center justify-center bg-gray-100 rounded-md size-8" @click.stop="plantalkMessagePop = true">
                                <IconNotice class="size-4 fill-gray-600"/></button>
                        </div>
                    </div>
                </li>                
            </ul>
           </section> 
        </div>
    </main>
    <Dialog
    v-model:visible="plantalkMessagePop" 
    header="발송내역" 
    :modal=true
    position="bottom"
    class="custom-dialog-bottom"
    :style="{ zIndex: 5000!}"
    >
        <PlantalkMessage/>
    </Dialog>

    <Popover ref="messagePopover" class="max-w-[calc(100%-32px)]">
        <section>
            <CalenaderEdit/>
        </section>
    </Popover>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PlantalkMessage from "@/views/include/plantalk/PlantalkMessage.vue";
import IconAvatar from '@/components/icons/IconAvatar.vue';
import IconMessage from '@/components/icons/IconMessage.vue';
import IconNotice from '@/components/icons/IconNotice.vue';
import BackHeader from '@/components/layouts/BackHeader.vue';
import Popover from 'primevue/popover';
import CalenaderEdit from '../include/calendar/CalenaderEdit.vue';

const plantalkMessagePop = ref(false)
const currentTitle = ref(''); // 제목을 저장할 변수
const messagePopover = ref();


const toggleMessagePopover = (event) => {
    if (messagePopover.value) {
        messagePopover.value.toggle(event); // toggleMessagePopover 대신 toggle 사용
    }
}

onMounted(() => {
    const storedTitle = localStorage.getItem('pageTitle');
    if (storedTitle) {
        currentTitle.value = storedTitle;
    }
});
</script>

<style lang="scss">

</style>