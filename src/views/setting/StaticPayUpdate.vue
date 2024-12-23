<template>
    <BackHeader title="사업자 인증"/>
    <main class="p-5 pb-20">
        <section class="form-gap-box">
            <IftaLabel class="w-full">
                <InputText id="username" class="w-full"/>
                <label for="emali">고정비용 이름</label>
            </IftaLabel>

            <IftaLabel class="w-full">
                <DatePicker showIcon fluid iconDisplay="input" dateFormat="yy-mm-dd"  showTime hourFormat="24"/>
                <label for="emali">고정 지출 일자</label>
            </IftaLabel>

            <IftaLabel class="w-full">
                <InputText id="username" class="w-full"/>
                <label for="emali">금액</label>
            </IftaLabel>

            <IftaLabel class="w-full">
                <Select class="w-full"/>
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


</script>

<style lang="scss">

</style>