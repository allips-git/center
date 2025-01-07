<template>
<section class="p-4">
    <div class="flex items-center gap-2 mb-5">
        <IconAvatar class="size-12 fill-sky-400"/>
        <div class="w-full">
            <p class="text-xs text-sky-500">일정</p>
            <p class="flex items-center text-lg font-bold">{{ calendar['edit']['clientNm'] }} 
                <span class="flex items-center justify-center ml-2 text-sm text-gray-400 size-4" @click="getDetail">
                    <IconPlay class="size-2 fill-gray-400"/>
                </span>
            </p>
        </div>
        <p class="flex-none text-lg font-bold text-sky-500">
            {{ calendar['edit']['stCd'] === '006' ? '시공' : '견적' }}
        </p>
    </div>
    <div class="py-3">
        <Select v-model="calendar['edit']['stCd']" :options="getStCd()" optionLabel="label" optionValue="value" class="w-40 !rounded-full" size="small" />
    </div>
    <div class="flex flex-col items-start gap-2 text-gray-500">
        <p>{{ getDate() }}</p>
        <p class="px-3 py-px text-white rounded-full bg-sky-500">{{ calendar['edit']['tel'] }}</p>
        <p class="px-3 py-px text-white rounded-full bg-sky-500">{{ calendar['edit']['addr'] }}</p>
        <p>상세주소 : {{ calendar['edit']['addrDetail'] }}</p>
        <p v-if="calendar['edit']['stCd'] === '006'">설치 예상시간 : {{ calendar['edit']['insTime'] }}</p>
        <p v-if="calendar['edit']['stCd'] === '006'">설치 수량 : {{ calendar['edit']['insCnt'] }}</p>
    </div>
    <div class="w-full px-3 mt-4 mb-5 ml-4 border-l-2 border-gray-300 min-h-12">
        <p class="text-gray-400">{{ calendar['edit']['memo'] }}</p>
    </div>

    <div class="flex justify-end">
        <Iconpencil class="fill-gray-500 size-8"/>
    </div>
</section>
</template>

<script setup lang="ts">
import IconAvatar from '@/components/icons/IconAvatar.vue';
import IconPlay from '@/components/icons/IconPlay.vue';
import Iconpencil from '@/components/icons/Iconpencil.vue';
import { onMounted } from 'vue';
import { useDataStore, useCalendarStore } from '@/store';
import { getConvertDate } from '@/assets/js/function';
import { usePopup } from '@/assets/js/popup';

const data     = useDataStore();
const calendar = useCalendarStore();

const { getPopupOpen, getPopupClose } = usePopup();

const getDetail = async () => {
    await calendar.getDetailInfo();
    getPopupClose('calendarEdit', true)
    getPopupOpen('calendarSet');
}

const getDate = () => {
    return getConvertDate(new Date(calendar['edit']['stDt']), 'mm%dd%w% hh:ii');
}

const getStCd = () => {
    if(calendar['edit']['stCd'] === '006')
    {
        return data['stCd'].filter(item => item.value === '006' || item.value === '011');
    }
    else
    {
        return data['stCd'].filter(item => item.value === '001' || item.value === 'N');
    }
}

onMounted(() => {
    calendar.getEditInfo();
})
</script>

<style lang="scss"></style>