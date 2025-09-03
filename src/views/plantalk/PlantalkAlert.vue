<template>
    <main>
        <BackHeader :title="'발송 내역'"/>
        <div class="p-4 pt-0">
            <section class="flex justify-end mb-3 w-full">
                <!-- <Select class="w-40" size="small"/> -->
                <DatePicker v-model="kakao['searchDt']" view="month" dateFormat="yy년 mm'월'" :locale="'ko'" showIcon fluid iconDisplay="input" class="w-40 basic-datepicker" size="small" @update:modelValue="kakao.getKakaoSendList()"/>
            </section>
            <!-- 날짜 포함 v-for -->
            <section v-for="(date, index) in kakao['dateList']" :key="index" class="flex flex-col">
                <div class="flex gap-2 justify-center items-center text-sm">
                    <span class="w-full h-px bg-l-lv4"></span>
                    <p class="flex-none font-bold text-11 text-t-lv3">{{ getDateText(date) }}</p>
                    <span class="w-full h-px bg-l-lv4"></span>
                </div>
                <template v-for="(item, key) in kakao['sendList']" :key="key">
                    <ul v-if="date === getConvertDate(new Date(item['regDt']), 'yyyy-mm-dd')" class="flex flex-col gap-0">
                        <li class="flex gap-3 justify-between items-start first:mt-2">
                            <IconAvatar class="size-10 flex-none fill-[#78BBFF]"/>
                            <div class="flex flex-col gap-2 w-full">
                                <div class="flex justify-between w-full">
                                    <div>
                                        <h1 class="mb-1 font-bold text-15 sm:text-base">{{ item['clientNm'] }}</h1>
                                        <div class="flex gap-1 items-center">
                                            <img src="@/assets/img/icon-kakaologo.png" alt="" class="w-[1.25rem]">
                                            <span class="font-normal text-t-lv2 text-13 sm:text-sm">{{ item['tel'] }}</span>
                                        </div>
                                    </div>
                                    <span class="text-xs text-t-lv2">{{ getConvertDate(new Date(item['regDt']), 'a hh:ii') }}</span>
                                </div>
                                <div class="text-13 sm:text-sm">
                                    <p class="flex-none">[카카오 알림톡] <span class="font-bold">{{ item['kdNm'] }}</span></p>
                                    <p v-if="item['status'] === 'R'" class="font-bold text-yellow-400">발송준비</p>
                                    <p v-else class="font-bold text-green-500">발송완료</p>
                                </div>
                                <div class="flex gap-2 mt-1">
                                    <button class="flex justify-center items-center rounded-md bg-bg-lv3 size-8" @click.stop="getPopup('calendarEdit', item['khCd'], item['emCd'], item['ikey'])">
                                        <IconMessage class="size-4 fill-l-lv0"/>
                                    </button>
                                    <button class="flex justify-center items-center rounded-md bg-bg-lv3 size-8" @click.stop="getPopup('kakaoDetail', item['khCd'], item['emCd'], item['ikey'])">
                                        <IconNotice class="size-4 fill-l-lv0"/>
                                    </button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </template>
            </section> 
        </div>
    </main>
    <Dialog v-model:visible="popup['pop']['kakaoDetail']" header="발송내역" 
        :modal=true position="center" class="border-0 custom-dialog-bottom"
        @update:visible="getPopupClose('kakaoDetail', true)">
        <template #header>
            <div class="modal-backheader line">
                <Button @click="getPopupClose('kakaoDetail', true)" severity="contrast" text icon="pi pi-times"/>
                <h2 class="modal-backheader-title">발송내역</h2>
            </div>
        </template>
        <PlantalkMessage/>
    </Dialog>

    <Dialog v-model:visible="popup['pop']['calendarEdit']" 
        :modal=true position="center" class="editPopup" pt:mask:class="editPopup-wrap" :dismissableMask="true"
        @update:visible="getPopupClose('calendarEdit', true)">
        <!-- <template #header>
            <div class="modal-backheader line">
                <Button @click="getPopupClose('calendarEdit', true)" severity="contrast" text icon="pi pi-times"/>
                <h2 class="modal-backheader-title">일정</h2>
            </div>
        </template> -->
        <CalenaderEdit/>
    </Dialog>



</template>

<script setup lang="ts">
import PlantalkMessage from "@/views/include/plantalk/PlantalkMessage.vue";
import IconAvatar from '@/components/icons/IconAvatar.vue';
import IconMessage from '@/components/icons/IconMessage.vue';
import IconNotice from '@/components/icons/IconNotice.vue';
import BackHeader from '@/components/layouts/BackHeader.vue';
import DatePicker from 'primevue/datepicker';
import CalenaderEdit from '../include/calendar/CalenaderEdit.vue';
import { onMounted } from 'vue';
import { usePopupStore, useCalendarStore, useKakaoStore } from '@/store';
import { usePopup } from '@/assets/js/popup';
import { getConvertDate } from '@/assets/js/function';

const popup     = usePopupStore();
const calendar  = useCalendarStore();
const kakao     = useKakaoStore();

const { getPopupOpen, getPopupClose } = usePopup();

const getDateText = (date: string) => {
    return date === getConvertDate(new Date(), 'yyyy-mm-dd') ? (date+' (오늘)') : date;
}

const getPopup = async (popNm: string, khCd: string, emCd: string, ikey: string) => {
    await kakao.getKhCd(khCd);
    await calendar.getIkey(ikey);
    await calendar.getEmCd(emCd);
    getPopupOpen(popNm);
}

onMounted(async () => {
    await kakao.getSendReset();
    kakao.getKakaoSendList();
});
</script>

<style lang="scss">

</style>