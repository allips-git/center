<template>
    <main class="pb-20">
        <BackHeader title="발주서" />
        <TableCard />
        <div class="bottom-fixed-absol-box">
            <Button label="확인" size="large" severity="secondary" />
            <Button label="최종 결제 입력" size="large"/>
        </div>
    </main>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import TableCard from '@/components/card/TableCard.vue'

</script>

<style lang="scss">

</style>