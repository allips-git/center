<template>
    <BackHeader title="시공시간 설정"/>
    <main class="pb-20">
        <section class="px-5 pt-5">
            <h1 class="mb-2 text-xl font-bold">기본시공 시간</h1>
            <p class="text-sm text-gray-400">견적서 작성 진행시 중복되는 기본서비스 (인테리어 자재) 시간을 차감하여 정확한 전체 시공시간 계산을 도와주는 기능입니다.</p>
        </section>
        <section class="px-5 mt-8 form-gap-box">
            <IftaLabel class="w-full">
                <InputText id="username" class="w-full"/>
                <label for="emali">커튼 1개당 시공시간 (분)</label>
            </IftaLabel>

            <IftaLabel class="w-full">
                <InputText id="username" class="w-full"/>
                <label for="emali">블라인드 1개당 시공시간 (분)</label>
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