<template>
    <div>
        <BackHeader title="매장 설정"/>
        <main class="pt-3 pb-28">
            <section class="px-5">
                <div class="flex flex-col gap-1">
                    <p class="text-10 text-t-lv3">프로필 사진</p>
                    <div class="relative size-[95px] ">
                        <div class="relative flex items-center justify-center overflow-hidden border border-gray-200 rounded-lg size-[95px]">
                            <img src="../../assets/img/test.png" class="aspect-square size-full" alt="">
                            <!-- <i class="!text-4xl pi pi-image text-gray-400" /> -->
                        </div>
                        <div class="absolute z-10 flex items-center justify-center overflow-hidden bg-white rounded-[10px] blur-back -bottom-1 -right-1 size-[29px]">
                            <IconPlus/>
                        </div>
                    </div>
                </div>
            </section>
            <!-- <div class="gray-bar"></div> -->
            <section class="px-4 form-gap-box mt-[30px]">
                <IftaLabel class="w-full">
                    <InputText id="username" class="w-full"/>
                    <label for="emali">매장이름<span class="ml-0.5 text-red-500">*</span></label>
                </IftaLabel>

                <IftaLabel>
                    <IconField>
                        <InputText  class="w-full" readonly placeholder="주소를 입력해주세요."/>
                        <InputIcon>
                            <IconSpot/>
                        </InputIcon>
                    </IconField>
                    <label>주소<span class="ml-0.5 text-red-500">*</span></label>
                    <!-- <small class="text-red-500">ㅁㄴㅁ</small> -->
                </IftaLabel>

                <IftaLabel class="label-input-box">
                    <InputText id="addrDetail"/>
                    <label>상세주소<span class="ml-0.5 text-red-500">*</span></label>
                </IftaLabel>
    
                <IftaLabel class="w-full">
                    <div class="w-full custom-select-arrow">
                        <Select id="username" class="w-full"/>
                        <IconPlay class="absolute rotate-90 top-3 right-2 *:fill-gray-400 -z-10"/>
                    </div>
                    <label for="emali">서비스 분야<span class="ml-0.5 text-red-500">*</span></label>
                </IftaLabel>

                <IftaLabel class="label-input-box">
                    <InputText id="addrDetail"/>
                    <label>대표 화물 지점</label>
                </IftaLabel>

                <IftaLabel class="label-input-box">
                    <InputText id="addrDetail"/>
                    <label>홍보 홈페이지 URL</label>
                </IftaLabel>

                <div class="relative ifta-label-box">
                    <ul class="flex justify-center gap-3 mt-2 font-bold">
                        <li 
                        v-for="(day, index) in days" 
                        :key="day" 
                        @click="toggleDay(index)" 
                        :class="{'bg-sky-500 text-white': selectedDays[index], 'bg-transparent': !selectedDays[index]}" 
                        class="py-2.5 px-2 transition-colors duration-300 border border-gray-200 rounded-full cursor-pointer text-xs"
                        >{{ day }}
                    </li>
                    </ul>
                    <label class="absolute left-1.5 ifta-label -top-1 !text-10 !text-[#999999]">매장운영일</label>
                </div>

                <IftaLabel class="label-input-box">
                    <div class="w-full custom-select-arrow">
                        <Select class="w-full"/>
                        <IconPlay class="absolute rotate-90 top-3 right-2 *:fill-gray-400 -z-10"/>
                    </div>
                    <label for="">매장 운영시간</label>
                </IftaLabel>

    
                <IftaLabel class="w-full">
                    <label for="emali">매장 설명</label>
                    <Textarea  autoResize rows="3" cols="30" class="w-full" />
                </IftaLabel>

                <IftaLabel class="label-input-box">
                    <InputText id="addrDetail"/>
                    <label>추천공장 코드</label>
                </IftaLabel>

            </section>
        </main>
        <div class="mobile-fiex-bottom">
            <Button label="저장" size="large" />
        </div>
    </div>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import IftaLabel from 'primevue/iftalabel';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Textarea from 'primevue/textarea';
import FileUpload from 'primevue/fileupload';

import { ref } from 'vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import IconSpot from '@/components/icons/IconSpot.vue';
import IconPlay from '@/components/icons/IconPlay.vue';

const days = ['월', '화', '수', '목', '금', '토', '일'];
const selectedDays = ref(Array(days.length).fill(false)); // 초기값을 false로 설정한 배열

const toggleDay = (index) => {
  selectedDays.value[index] = !selectedDays.value[index]; // 해당 인덱스의 선택 상태를 토글
};
</script>

<style lang="scss">
.blur-back{
    backdrop-filter: blur(20px);
    background-color: rgba(169, 173, 168, 0.3) ;
}
</style>