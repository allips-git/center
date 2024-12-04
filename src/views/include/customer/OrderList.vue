<template>
    <main class="main-bottom-fixed-pd">
        <div class="flex flex-col gap-5 px-4">
            <TableCard />
            <TableCard />
            <TableCard />
        </div>
        <div class="gray-bar"></div>
        <section class="px-5">
            <CalculateCard :showtitle="true" title="제품 결제 내역" totalTitle="총 결제 금액"/>
        </section>
        <div class="gray-bar"></div>
        <section class="px-5">
            <div class="border-gray-200 border text-sm rounded p-4 mt-5">
            <div class="flex flex-col gap-2">
                <dl class="flex items-center justify-between">
                    <dt class="text-gray-600">견적일</dt>
                    <dd class="font-bold">2024-12-12</dd>
                </dl>
                <dl class="flex items-center justify-between">
                    <dt class="text-gray-600">계약일</dt>
                    <dd class="font-bold">2024-12-12</dd>
                </dl>
                <dl class="flex items-center justify-between">
                    <dt class="text-gray-600">시공일</dt>
                    <dd class="font-bold">2024-12-12</dd>
                </dl>
                <dl class="flex items-center justify-between">
                    <dt class="text-gray-600">설치 예상시간</dt>
                    <dd class="font-bold">10분</dd>
                </dl>
                <dl class="flex items-center justify-between">
                    <dt class="text-gray-600">시공 담당자</dt>
                    <dd class="font-bold">김뭐시기</dd>
                </dl>
            </div>
            </div>
        </section>
    </main>
    <div class="bottom-fixed-btn-box">
        <Button label="확인" size="large" severity="secondary" />
        <Button label="최종 결제 입력" size="large"/>
    </div>


    

</template>

<script setup lang="ts">

import TableCard from '@/components/card/TableCard.vue'
import CalculateCard from "@/components/card/CalculateCard.vue";

</script>

<style lang="scss">

</style>