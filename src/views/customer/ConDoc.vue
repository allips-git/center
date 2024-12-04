<template>
    <BackHeader title="계약서 공유화면" />
    <main class="!pb-5">
        <div class="relative">
            <section class="relative rounded-t-xl overflow-hidden bg-white">
                <InfoCard :title="'공장이름?'" :info="info" />
                <div class="gray-bar"></div>

                <section class="px-5">
                    <div class="flex flex-col gap-5">
                        <TableCard title="어떤 텍스트?" />
                    </div>
                </section>
            </section>
            
            <div class="gray-bar"></div>

            <section class="px-5">
                <CalculateCard  :showtitle="true" title="합계 금액" totalTitle="총 합계 금액"/>
            </section>
        </div>
    </main>
</template>
    
<script setup lang="ts">
import { ref } from 'vue';
import BackHeader from '@/components/layouts/BackHeader.vue'
import CalculateCard from "@/components/card/CalculateCard.vue";
import InfoCard from "@/components/card/InfoCard.vue";
import TableCard from "@/components/card/TableCard.vue";


const checked = ref(false)
// 정보 배열 정의
const info = ref([
    { label: '혜택', value: '11' },
    { label: '전화번호', value: '010-1234-5678' },
    { label: '영업시간', value: '09:00 - 18:00'},
    { label: '주소', value: '부산 수영구 수영로 411-1' },
    { label: '계좌', value: '123-456-7890123' },
]);
</script>

<style lang="scss">

</style>