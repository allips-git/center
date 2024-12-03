<template>
<main class="main-bottom-fixed-pd">
    <div class="relative w-full">
        <BackHeader title="명세서" />
        <Button label="제품 추가 등록" size="small" class="!absolute right-4 top-1/2 -translate-y-1/2"/>
    </div>
    <section class="px-5">
        <div class="flex flex-col gap-5">
            <TableCard title="어떤 텍스트?" />
            <TableCard title="어떤 텍스트?" />
            <TableCard title="어떤 텍스트?" />
            <TableCard title="어떤 텍스트?" />
        </div>
    </section>
    <div class="gray-bar"></div>
    <section class="px-5">
        <CalculateCard title="제품 결제 내역"/>
    </section>
    
</main>
<div class="bottom-fixed-btn-box">
    <Button label="계약서 이동" severity="secondary" size="large"/>
    <Button label="견적서 저장" size="large"/>
</div>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import TableCard from '@/components/card/TableCard.vue'
import CalculateCard from "@/components/card/CalculateCard.vue";



</script>
