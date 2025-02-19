<template>
    <div class="relative">
        <BackHeader title="고정비용 등록"/>
        <Button label="비용 삭제" size="small" severity="danger" outlined class="!absolute  right-4 bottom-1/2 translate-y-1/2 z-[90]"/>
    </div>
    <main class="p-5 pb-20">
        <section class="form-gap-box">
            <IftaLabel class="w-full">
                <InputText id="username" class="w-full"/>
                <label for="emali">고정비용 이름</label>
            </IftaLabel>

            <IftaLabel class="w-full">
                <DatePicker showIcon fluid iconDisplay="input" dateFormat="yy-mm-dd"  showTime hourFormat="24">
                <template #inputicon="slotProps" class="!pl-1">
                    <IconCalendarDot class=" !fill-gray-500"/>
                </template>
                </DatePicker>
                <label for="emali">고정 지출 일자</label>
            </IftaLabel>

            <IftaLabel class="w-full">
                <InputText id="username" class="w-full"/>
                <label for="emali">금액</label>
            </IftaLabel>

            <IftaLabel class="w-full">
                <div class="h-10 custom-select-arrow">
                    <Select class="w-full"/>
                    <IconPlay class="absolute rotate-90 top-3 right-2 *:fill-gray-400 -z-10"/>
                </div>
                <label for="emali">분류선택</label>
            </IftaLabel>

            <IftaLabel class="w-full">
                <label for="emali">메모</label>
                <Textarea  autoResize rows="3" cols="30" class="w-full" />
            </IftaLabel>
        </section>
    </main>
    <div class="bottom-fixed-btn-box">
        <Button label="저장" size="large"/>
    </div>

</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import IftaLabel from 'primevue/iftalabel';
import DatePicker from 'primevue/datepicker';
import Textarea from 'primevue/textarea';
import IconCalendarDot from '@/components/icons/IconCalendarDot.vue';
import IconPlay from '@/components/icons/IconPlay.vue';


</script>

<style lang="scss">

</style>