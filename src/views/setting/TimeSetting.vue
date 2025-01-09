<template>
    <div>
        <BackHeader title="시공시간 설정"/>
        <main class="pb-20 pc-contents-h-box">
            <section class="pt-5 pb-5 mx-5 border-b ">
                <h1 class="mb-2 text-lg font-bold">기본시공 시간</h1>
                <p class="text-sm text-gray-400">견적서 작성 진행시 중복되는 기본서비스 (인테리어 자재) 시간을 차감하여 정확한 전체 시공시간 계산을 도와주는 기능입니다.</p>
            </section>
            
            <section class="px-5 mt-3 form-gap-box !gap-8 pt-3">
                <div class="relative flex items-center justify-center w-full">
                    <label class="w-[200px] flex-none">커튼 1개당 시공시간 (분)</label>
                    <InputText class="w-full !pr-8 font-bold text-right inputNumber-color !border-0 !border-b"/>
                    <span class="absolute font-bold  translate-y-1/2 right-3.5 bottom-1/2">분</span>
                </div>

                <div class="relative flex items-center justify-center w-full">
                    <label class="w-[200px] flex-none">블라인드 1개당 시공시간 (분)</label>
                    <InputText class="w-full !pr-8 font-bold text-right inputNumber-color !border-0 !border-b"/>
                    <span class="absolute font-bold  translate-y-1/2 right-3.5 bottom-1/2">분</span>
                </div>
            </section>
            <div class="bottom-fixed-btn-box md:!absolute">
                <Button label="저장" size="large"/>
            </div>
        </main>
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