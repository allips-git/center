<template>
    <BackHeader title="사업자 인증"/>
    <main class="relative pb-5 pc-contents-h-box">
    <section class="flex flex-col gap-1 px-5 pt-3">
            <p class="text-sm font-bold">사업자 인증</p>    
            <p class="text-t-lv3 text-11">사업자등록증 정보를 인증해 보세요.<br/>인증 시 "사업자 인증 마크와" <br> 매입 공장들과 자동으로 사업자등록증이 공유됩니다.</p>
    </section>
    
    <!-- <div class="gray-bar"></div> -->
        
    <section class="px-4 form-gap-box pt-[30px]">

    <section class="">
        <div class="flex flex-col gap-1">
            <p class="text-10 text-t-lv3">사업자 등록증 사진</p>
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

    <div class="!justify-start label-checkbox-box">
        <RadioButton class="pt-1" />
        <div class="flex flex-col ">
            <label class="text-xs" for="">사업자 등록번호 없음 <br> <span class="text-xs text-gray-400">사업자번호 확인이 어려우시면 체크해주세요</span></label>
        </div>
    </div>
    
        <div class="flex gap-3">
            <IftaLabel class="w-full">
                <InputText id="username" class="w-full"/>
                <label for="emali">사업자 등록번호 조회</label>
            </IftaLabel>
            <Button label="검증" class="flex-none w-[74px] h-10" />    
        </div>
        
                <IftaLabel class="w-full">
                    <InputText id="username" class="w-full"/>
                    <label for="emali">사업자 명</label>
                </IftaLabel>

                <IftaLabel class="w-full">
                    <InputText id="username" class="w-full"/>
                    <label for="emali">대표자</label>
                </IftaLabel>

                <IftaLabel class="w-full">
                    <InputText id="username" class="w-full"/>
                    <label for="emali">업태</label>
                </IftaLabel>

                <IftaLabel class="w-full">
                    <InputText id="username" class="w-full"/>
                    <label for="emali">종목</label>
                </IftaLabel>

                <IftaLabel class="w-full">
                    <InputText id="username" class="w-full"/>
                    <label for="emali">세금계산서 이메일</label>
                </IftaLabel>
            </section>
            <div class="bottom-fixed-btn-box md:!absolute">
                <Button label="저장" size="large"/>
            </div>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BackHeader from '@/components/layouts/BackHeader.vue'
import IftaLabel from 'primevue/iftalabel';
import RadioButton from 'primevue/radiobutton';
import IconPlus from '@/components/icons/IconPlus.vue';


</script>

<style lang="scss">

</style>