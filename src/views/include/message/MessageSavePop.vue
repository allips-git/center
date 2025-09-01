<template>
    <main class="pb-32">
        <section class="flex justify-center pt-5">
            <div class="flex justify-center items-center w-[132px] h-[132px] bg-[#eef0f2] rounded-md">
                <div class="imoji-shadow text-[34px]">😊</div>
            </div>
        </section>
        <section class="flex flex-col gap-3 px-4 mt-8">
            <IftaLabel class="mb-1 w-full">
                <InputText id="title" v-model="msg.info.title" class="w-full" placeholder="제목을 입력해주세요." />
                <label>제목</label>
            </IftaLabel>
            <div class="flex justify-between items-center">
                <label class="pl-0.5 text-sm font-medium text-t-lv3">아이콘</label>
                <Button class="btn-select" variant="outlined">
                    <div class="text-[1.875rem]">😊</div>
                    <IconArrowDropDown />
                </Button>
            </div>
            <div class="flex justify-between items-center">
                <label class="pl-0.5 text-sm font-medium text-t-lv3">색상</label>
                <Button class="btn-select" variant="outlined" @click="getPopupOpen('colorPickerPop')">
                    <div class="w-[1.875rem] h-[1.875rem] mr-[1px] rounded-full bg-[#eef0f2]"></div>
                    <IconArrowDropDown />
                </Button>
            </div>
        </section>
    </main>
    <div class="z-10 flex-col bottom-fixed-btn-box">
        <Button size="large" label="저장" @click="getPopupClose('aaa', true)"
        />
    </div>

    <Dialog v-model:visible="popup['pop']['colorPickerPop']"
        :modal=true position="bottom" class="custom-dialog-util"
        @update:visible="getPopupClose('colorPickerPop', true)" pt:mask:class="custom-dialog-util-wrap">
        <div class="modal-backheader">
            <Button @click="getPopupClose('colorPickerPop', true)" severity="contrast" text icon="pi pi-times" />
            <h2 class="modal-backheader-title">배경 색상</h2>
        </div>
        <div class="p-4">
            <div class="grid grid-cols-6 gap-2 sm:grid-cols-8 color-chips">
                <div class="chip bg-[#eef0f2] border-2 border-p-lv4"></div>
                <div class="chip bg-[#FEEDEA]"></div>
                <div class="chip bg-[#FFF5EC]"></div>
                <div class="chip bg-[#fefae0]"></div>
                <div class="chip bg-[#E7F3FF]"></div>
                <div class="chip bg-[#F4F1FE]"></div>
                <div class="chip bg-[#FFD2D5]"></div>
                <div class="chip bg-[#FFE0DD]"></div>
                <div class="chip bg-[#FFE5CC]"></div>
                <div class="chip bg-[#FFF2B4]"></div>
                <div class="chip bg-[#E9FBB6]"></div>
                <div class="chip bg-[#C7F7CE]"></div>
                <div class="chip bg-[#CAF6E5]"></div>
                <div class="chip bg-[#EDF1FF]"></div>
                <div class="chip bg-[#FFE6FB]"></div>
                <div class="chip bg-[#FFE6FB]"></div>
                <div class="chip bg-[#CEF3F5]"></div>
                <div class="chip bg-[#CAF1FF]"></div>
                <div class="chip bg-[#E3E9F3]"></div>
                <div class="chip bg-[#F1F0E8]"></div>
                <div class="chip bg-[#edede9]"></div>
            </div>
            <Button size="large" class="mt-4 !py-2.5 w-full *:text-15" label="배경색으로 선택" @click="getPopupClose('aaa', true)"
            />
        </div>
    </Dialog>

</template>

<script setup lang="ts">
import IftaLabel from 'primevue/iftalabel';
import InputText from 'primevue/inputtext'; 
import Button from 'primevue/button';
import Dialog from "primevue/dialog";
import IconArrowDropDown from '@/components/icons/IconArrowDropDown.vue'
import { useDataStore, usePopupStore, useMsgStore } from '@/store';
import { usePopup } from '@/assets/js/popup';


const msg    = useMsgStore();
const popup     = usePopupStore();
const { getPopupOpen, getPopupClose } = usePopup();


</script>

<style lang="scss">
</style>

