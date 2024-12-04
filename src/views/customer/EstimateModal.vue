<template>
    <BackHeader title="견적서" />
    <main class="!pb-36">
        <div class="relative">
            <section class="aspect-video relative -z-10 overflow-hidden">
                <img src="@/assets/img/test.png" class="w-full aspect-video object-cover" alt="">
            </section>
        
            <section class="relative -top-4 rounded-t-xl overflow-hidden bg-white">
                <InfoCard :title="'공장이름?'" :info="info" />
                <div class="gray-bar"></div>

                <section class="px-5">
                    <div class="flex flex-col gap-5">
                        <TableCard title="어떤 텍스트?" />
                    </div>
                </section>
            </section>
            <section class="px-5">
                <CalculateCard  :showtitle="true" title="합계 금액" totalTitle="총 합계 금액"/>
            </section>
        </div>
    </main>
    <section class="fixed bg-white border-t border-gray-200 rounded-t-2xl p-5 bottom-0 w-full overflow-hidden">
        <div class="flex justify-between *:flex *:gap-2 *:items-center text-sm w-full">
            <div>
                <div class="label-checkbox-box">
                    <RadioButton />
                    <label for="">일반양식</label>
                </div>
                <div class="label-checkbox-box">
                    <RadioButton />
                    <label for="">엑셀양식</label>
                </div>
            </div>
            <div class="flex justify-between">
                <p>사이즈 숨김</p>
                <ToggleSwitch v-model="checked" />
            </div>
        </div>

        <div class="btn-2-layout-box pt-4">
            <Button label="견적서 미리보기" severity="secondary"/>
            <Button label="견적서 링크 발송"/>
        </div>
    </section>
    </template>
    
<script setup lang="ts">
import { ref } from 'vue';
import BackHeader from '@/components/layouts/BackHeader.vue'
import CalculateCard from "@/components/card/CalculateCard.vue";
import InfoCard from "@/components/card/InfoCard.vue";
import TableCard from "@/components/card/TableCard.vue";
import RadioButton from 'primevue/radiobutton';
import ToggleSwitch from 'primevue/toggleswitch';


const checked = ref(false)
// 정보 배열 정의
const info = ref([
    { label: '혜택', value: '11' },
    { label: '전화번호', value: '010-1234-5678' },
    { label: '영업시간', value: '09:00 - 18:00'},
    { label: '주소', value: '부산 수영구 수영로 411-1' },
    { label: '계좌', value: '123-456-7890123' },
]);

const orderItems = ref([
    {
    label: '주문',
    value: '0',
    },
    {
    label: '생산',
    value: '0',
    },
    {
    label: '생산완료',
    value: '0',
    },
    {
    label: '출고',
    value: '0',
    },
]);

</script>

<style lang="scss">

</style>