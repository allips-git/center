<template>
    <main>
        <BackHeader :title="'발송 내역'"/>
        <div class="p-5 pt-0">
            <section class="flex justify-end w-full my-3">
                <!-- <Select class="w-40" size="small"/> -->
                <DatePicker v-model="kakao['searchDt']" view="month" dateFormat="yy년 mm'월'" :locale="'ko'" class="w-40" size="small" @update:modelValue="kakao.getKakaoSendList()"/>
            </section>
            <!-- 날짜 포함 v-for -->
            <section v-for="(date, index) in kakao['dateList']" :key="index" class="flex flex-col">
                <div class="flex items-center justify-center gap-4 text-sm">
                    <span class="w-full h-px bg-gray-200"></span>
                    <p class="flex-none font-bold text-gray-400">{{ getDateText(date) }}</p>
                    <span class="w-full h-px bg-gray-200"></span>
                </div>
                <template v-for="(item, key) in kakao['sendList']" :key="key">
                    <ul v-if="date === getConvertDate(new Date(item['regDt']), 'yyyy-mm-dd')" class="flex flex-col gap-0">
                        <li class="flex items-start justify-between gap-3 first:mt-2">
                            <IconAvatar class="size-8 fill-sky-300"/>
                            <div class="flex flex-col w-full gap-2">
                                <div class="flex justify-between w-full">
                                    <div>
                                        <h1 class="mb-1 font-bold">{{ item['clientNm'] }}</h1>
                                        <div class="flex items-center gap-1 text-sm">
                                            <img src="@/assets/img/icon-kakaologo.png" alt="" class="size-6">
                                            <span class="font-normal text-gray-400 ">{{ item['tel'] }}</span>
                                        </div>
                                    </div>
                                    <span class="text-sm text-gray-400">{{ getConvertDate(new Date(item['regDt']), 'a hh:ii') }}</span>
                                </div>
                                <div class="text-sm">
                                    <p class="flex-none">[카카오 알림톡] <span class="font-bold">{{ item['kdNm'] }}</span></p>
                                    <p v-if="getStCheck(item['resDt'])" class="font-bold text-yellow-400">발송준비</p>
                                    <p v-else class="font-bold text-green-500">발송완료</p>
                                </div>
                                <div class="flex gap-3 mt-1">
                                    <button class="flex items-center justify-center bg-gray-100 rounded-md size-8" @click.stop="getPopup('calendarEdit', item['khCd'], item['emCd'], item['ikey'])">
                                        <IconMessage class="size-4 fill-gray-600"/></button>
                                    <button class="flex items-center justify-center bg-gray-100 rounded-md size-8" @click.stop="getPopup('kakaoDetail', item['khCd'], item['emCd'], item['ikey'])">
                                        <IconNotice class="size-4 fill-gray-600"/></button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </template>
            </section> 
        </div>
    </main>
    <Dialog v-model:visible="popup['pop']['kakaoDetail']" header="발송내역" 
        :modal=true position="bottom" class="border-0 custom-dialog-bottom"
        @update:visible="getPopupClose('kakaoDetail', true)">
        <PlantalkMessage/>
    </Dialog>

    <Dialog v-model:visible="popup['pop']['calendarEdit']" header="일정" 
        :modal=true position="bottom" class="border-0 custom-dialog-bottom"
        @update:visible="getPopupClose('calendarEdit', true)">
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

const getStCheck = (resDt: null | string) => {
    if(kakao.resGb === 'Y')
    {
        if(!resDt)
        {
            return false;
        }

        const targetDate    = new Date(resDt.replace(' ', 'T'));
        const currentDate   = new Date();

        if(targetDate < currentDate)
        {
            return false;
        }
        else
        {
            return true;
        }
    }
    else
    {
        return false;
    }
}

onMounted(async () => {
    await kakao.getSendReset();
    kakao.getKakaoSendList();
});
</script>

<style lang="scss">

</style>