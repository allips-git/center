<template>
<main>
    <section class="px-5">
        <div class="flex items-center justify-between">
            <div class="flex items-center w-full gap-2">
                <IconAvatar class="text-indigo-300 !size-16"/>
                <div>
                    <p class="text-sm text-indigo-600">고객</p>
                    <h2 class="text-xl font-bold">{{ calendar['info']['clientNm'] }}</h2>
                </div>
            </div>
            <span class="pi pi-angle-right"></span>
        </div>
    </section>
    <div class="gray-bar"></div>
    <section class="px-5">
        <div class="form-gap-box">
            <IftaLabel class="w-full">
                <Select v-model="calendar['info']['estiPerson']" :options="calendar['person']" class="w-full"
                    optionLabel="label" optionValue="value" @update:modelValue="(value) => getModify('estiDt', value)"/>
                <label>견적 담당</label>
            </IftaLabel>

            <IftaLabel class="label-input-box">
                <DatePicker v-model="calendar['info']['estiDt']" showIcon fluid iconDisplay="input" 
                    dateFormat="yy-mm-dd" showTime hourFormat="24" @update:modelValue="(value) => getModify('estiDt', value)"/>
                <label>견적일</label>
            </IftaLabel>

            <IftaLabel class="w-full">
                <Select v-model="calendar['info']['deliPerson']" :options="calendar['person']" class="w-full"
                    optionLabel="label" optionValue="value" :disabled="getStCheck" @update:modelValue="(value) => getModify('deliDt', value)"/>
                <label>시공담당</label>
            </IftaLabel>

            <IftaLabel class="label-input-box">
                <DatePicker v-model="calendar['info']['deliDt']" showIcon fluid iconDisplay="input" 
                    dateFormat="yy-mm-dd" showTime hourFormat="24" :disabled="getStCheck"/>
                <label>시공일</label>
            </IftaLabel>
        </div>
        
    </section>
    <div class="gray-bar"></div>
    <section class="">
        <h2 class="px-5 text-lg font-bold">수정기록</h2>
        <ul class="flex flex-col">
            <li v-for="(item, index) in calendar['info']['history']" :key="index" class="flex items-center gap-2 px-4 py-4 border-b first:mt-2">
            <IconAvatar class="text-indigo-300 !size-10"/>
            <div>
                <div class="flex items-center gap-1">
                <b>{{ item.name }}</b>
                <span>・</span>
                <p class="text-sm text-gray-400">{{ item.stDt }}</p>
                </div>
                <p>{{ item.stNm }} 처리되었습니다.</p>
            </div>
            </li>
        </ul>
    </section>
</main>
</template>

<script setup lang="ts">
import DatePicker from 'primevue/datepicker';
import IftaLabel from 'primevue/iftalabel';
import IconAvatar from '@/components/icons/IconAvatar.vue';
import { useConfirm } from "primevue/useconfirm";
import { useCalendarStore } from '@/store';
import { getAxiosData, getConvertDate, getTokenOut } from '@/assets/js/function';
import { usePopup } from '@/assets/js/popup';

const confirm   = useConfirm();
const calendar  = useCalendarStore();

const getStCheck = () => {
    return calendar['info']['stCd'] !== '006' ? false : true
}

const getModify = (target: string, value: string) => {
    console.log(value);
}
</script>

<style lang="scss">

</style>
