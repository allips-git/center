<template>
<main>
    <section class="p-6">
        <div class="flex items-center justify-between">
            <div class="flex items-center w-full gap-2">
                <IconAvatar class="text-indigo-300 !size-16"/>
                <div>
                    <p class="text-sm text-indigo-600">고객</p>
                    <h2 class="font-bold title-lg">{{ calendar['info']['clientNm'] }}</h2>
                </div>
            </div>
            <span class="pi pi-angle-right"></span>
        </div>
    </section>
    <div class="gray-bar"></div>
    <section class="p-6">
        <div class="form-gap-box">
            <IftaLabel class="w-full">
                <Select v-model="calendar['info']['estiPerson']" :options="calendar['person']" class="w-full"
                    optionLabel="label" optionValue="value" @update:modelValue="(value) => getModify('estiPerson', value)"/>
                <label>견적 담당</label>
            </IftaLabel>

            <IftaLabel class="label-input-box">
                <DatePicker v-model="calendar['info']['estiDt']" showIcon fluid iconDisplay="input" 
                    dateFormat="yy-mm-dd" showTime hourFormat="24" @hide="(value) => getModify('estiDt', value)"/>
                <label>견적일</label>
            </IftaLabel>

            <IftaLabel class="w-full">
                <Select v-model="calendar['info']['deliPerson']" :options="calendar['person']" class="w-full"
                    optionLabel="label" optionValue="value" :disabled="getStCheck()" @update:modelValue="(value) => getModify('deliPerson', value)"/>
                <label>시공담당</label>
            </IftaLabel>

            <IftaLabel class="label-input-box">
                <DatePicker v-model="calendar['info']['deliDt']" showIcon fluid iconDisplay="input" 
                    dateFormat="yy-mm-dd" showTime hourFormat="24" :disabled="getStCheck()" @hide="(value) => getModify('deliDt', value)"/>
                <label>시공일</label>
            </IftaLabel>
        </div>
        
    </section>
    <div class="gray-bar"></div>
    <section class="p-6">
        <h2 class="font-bold text-desc">수정기록</h2>
        <ul class="flex flex-col">
            <li v-for="(item, index) in calendar['info']['history']" :key="index" class="flex items-center gap-4 py-4 border-b first:mt-4">
            <IconAvatar class="text-indigo-300 !size-10"/>
            <div class="text-desc !text-t-lv1">
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
import { useCalendarStore } from '@/store';
import { getAxiosData, getConvertDate, getTokenOut } from '@/assets/js/function';

const calendar = useCalendarStore();

const getStCheck = () => {
    return calendar['edit']['stCd'] === 'Y' ? true : false
}

const getModify = async (target: string, value: string) => {
    const params = {
        emCd    : calendar['emCd'],
        target  : target,
        value   : target === 'estiPerson' || target === 'deliPerson' ? value : getConvertDate(calendar['info'][target], 'yyyy-mm-dd hh:ii')
    }

    console.log(params);
    
    try
    {
        const instance  = await getAxiosData();
        await instance.post(`https://data.planorder.kr/calendarV1/getModify`, params);
        await calendar.getDayData();
        await calendar.getMonthData();
    }
    catch(e)
    {
        console.log(e);
        if(e.response.status === 401)
        {
            getTokenOut();
        }
        else
        {
            alert('일정 상세 변경 처리 중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
        }
    }
}
</script>

<style lang="scss">

</style>
