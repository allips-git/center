<template>
    <main class="pb-32">
        <section class="flex justify-center pt-5">
            <div class="flex justify-center items-center w-[132px] h-[132px] rounded-md" :style="{ backgroundColor: msg.info.color }">
                <div class="imoji-shadow text-[48px]">{{ msg.info.emoji }}</div>
            </div>
        </section>
        <section class="flex flex-col gap-3 px-4 mt-8">
            <IftaLabel class="mb-1 w-full">
                <InputText id="title" v-model="msg.info.title" class="w-full" placeholder="제목을 입력해주세요." />
                <label>제목</label>
            </IftaLabel>
            <div class="flex justify-between items-center">
                <label class="pl-0.5 text-sm font-medium text-t-lv3">아이콘</label>
                <Button class="btn-select" variant="outlined" @click="getPopupOpen('emojiPickerPop')">
                    <div class="emoji-size">
                        {{ msg.info.emoji }}
                    </div>
                    <IconArrowDropDown />
                </Button>
            </div>
            <div class="flex justify-between items-center">
                <label class="pl-0.5 text-sm font-medium text-t-lv3">배경 색상</label>
                <Button class="btn-select" variant="outlined" @click="getPopupOpen('colorPickerPop')">
                    <div class="w-[1.875rem] h-[1.875rem] mr-[1px] rounded-full" :style="{ backgroundColor: msg.info.color }"></div>
                    <IconArrowDropDown />
                </Button>
            </div>
        </section>
    </main>
    <div class="z-10 flex-col bottom-fixed-btn-box">
        <Button size="large" label="메세지 저장" @click="getSave"/>
    </div>

    <Dialog v-model:visible="popup['pop']['emojiPickerPop']"
        :modal=true position="bottom" class="custom-dialog-util"
        @update:visible="getPopupClose('emojiPickerPop', true)" pt:mask:class="custom-dialog-util-wrap">
        <div class="modal-backheader">
            <Button @click="getPopupClose('emojiPickerPop', true)" severity="contrast" text icon="pi pi-times" />
            <h2 class="modal-backheader-title">이모지 선택</h2>
        </div>
        <div class="p-0">
            <EmojiPicker :native="true" @select="onSelectEmoji" />
        </div>
    </Dialog>

    <Dialog v-model:visible="popup['pop']['colorPickerPop']"
        :modal=true position="bottom" class="custom-dialog-util"
        @update:visible="getPopupClose('colorPickerPop', true)" pt:mask:class="custom-dialog-util-wrap">
        <div class="modal-backheader">
            <Button @click="getPopupClose('colorPickerPop', true)" severity="contrast" text icon="pi pi-times" />
            <h2 class="modal-backheader-title">배경 색상</h2>
        </div>
        <div class="p-4 pb-8">
            <div class="grid grid-cols-6 gap-2 sm:grid-cols-8 color-chips">
                <div v-for="color in colorList" :key="color" class="chip"
                    :class="{ 'border-2 border-p-lv4': msg.info.color === color }"
                    :style="{ backgroundColor: msg.info.color }" @click="pickColor(color)">
                </div>
            </div>
        </div>
    </Dialog>

</template>

<script setup lang="ts">
import IftaLabel from 'primevue/iftalabel';
import InputText from 'primevue/inputtext'; 
import Button from 'primevue/button';
import Dialog from "primevue/dialog";
import IconArrowDropDown from '@/components/icons/IconArrowDropDown.vue'
import { useConfirm } from "primevue/useconfirm";
import { usePopupStore, useMainStore, useMsgStore } from '@/store';
import { usePopup } from '@/assets/js/popup';
import { useRouter } from 'vue-router';
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
import { getAxiosData } from '@/assets/js/function';

const confirm   = useConfirm();
const main      = useMainStore();
const msg       = useMsgStore();
const popup     = usePopupStore();
const router    = useRouter();

const { getPopupOpen, getPopupClose } = usePopup();
const colorList = [
  "#eef0f2",
  "#FEEDEA",
  "#FFF5EC",
  "#fefae0",
  "#E7F3FF",
  "#F4F1FE",
  "#FFD2D5",
  "#FFE0DD",
  "#FFE5CC",
  "#FFF2B4",
  "#E9FBB6",
  "#C7F7CE",
  "#CAF6E5",
  "#EDF1FF",
  "#FFE6FB",
  "#CEF3F5",
  "#CAF1FF",
  "#E3E9F3",
  "#F1F0E8",
  "#edede9",
];

const pickColor = (color: string) => {
    msg.info.color = color;
    getPopupClose("colorPickerPop", true);
}

const onSelectEmoji = (emoji: { i: string }) => {
    msg.info.emoji = emoji.i;
    getPopupClose("emojiPickerPop", true);
}

const getSave = () => {
    if(msg.info.title === '')
    {

        msg.getMsgSet('문자 제목을 입력해주세요.', 'title');
        getFocus('title');
        return false;
    }

    confirm.require({
        message     : '해당 메세지를 저장하시겠습니까?',
        header      : '메세지 저장',
        rejectProps : {
            label       : '취소',
            severity    : 'secondary',
            outlined    : true
        },
        acceptProps : {
            label: '저장'
        },
        accept : async () => {
            const params = {
                type        : msg.type,
                emoji       : msg.info.emoji,
                color       : msg.info.color,
                title       : msg.info.title,
                contents    : msg.info.contents,
            }

            if(msg.type === 'U')
            {
                params['msCd'] = msg.msCd;
            }

            status.value = true;

            try
            {
                const instance  = await getAxiosData();
                await instance.post(`https://data.planorder.kr/msgV1/getResult`, params);

                await main.getData();
                await getPopupClose("messageSave", true);
                router.go(-1);
            }
            catch(e)
            {
                console.log(e);
            }

            status.value = false;
        }
    });
}

const getFocus = (id: string) => {
    const inputElement = document.getElementById(id);
    if (inputElement) 
    {
        inputElement.focus();
    }
}

</script>

<style lang="scss">
</style>

