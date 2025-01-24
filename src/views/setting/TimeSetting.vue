<template>
    <div>
        <BackHeader title="시공시간 설정"/>
        <main class="pb-20 pc-contents-h-box">
            <section class="pt-5 pb-5 mx-5 border-b ">
                <h1 class="mb-2 text-sm font-bold text-t-lv1">기본시공 시간</h1>
                <p class="text-t-lv3 text-11">견적서 작성 진행시 중복되는 기본서비스 (인테리어 자재) 시간을 차감하여 정확한 전체 시공시간 계산을 도와주는 기능입니다.</p>
            </section>
            
            <section class="px-5 mt-3 form-gap-box !gap-8 pt-3 text-lv-1">
                <div class="relative flex items-center justify-center w-full">
                    <label class="w-[200px] flex-none text-sm text-t-lv3">커튼 (1개당)</label>
                    <InputText class="w-full !pr-0 font-bold text-right inputNumber-color !border-0 !border-b"/>
                    <span class="absolute right-0 font-bold translate-y-1/2 bottom-1/2">분</span>
                </div>

                <div class="relative flex items-center justify-center w-full">
                    <label class="w-[200px] flex-none text-sm text-t-lv3">블라인드 (1개당)</label>
                    <InputText class="w-full !pr-4 font-bold text-right inputNumber-color !border-0 !border-b"/>
                    <span class="absolute right-0 font-bold translate-y-1/2 bottom-1/2">분</span>
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