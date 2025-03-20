<template>
    <BackHeader title="발주서" />
    <main class="main-bottom-fixed-pd">
        <div class="flex flex-col gap-5 px-4">
            <TableCard v-for="(table, index) in ord['list']" :key="index" :title="table.title" :cards="table.cardLists"
                :columns="table.columns" :rows="table.rows" :tags="table.tags" :showTag="table.showTag" :showButton="table.showButton"/>
        </div>
        <div class="gray-bar"></div>
        <section class="px-5">
            <CalculateCard title="제품 결제 내역" :calcs="ord['payList']" totalTitle="총 결제 금액" :totalAmt="ord.totalAmt" :showtoggle="true" />
        </section>
        <div class="gray-bar"></div>
    </main>
    <div class="bottom-fixed-btn-box">
        <Button label="확인" size="large" severity="secondary" @click="router.go(-1)"/>
    </div>

    <Dialog v-model:visible="popup['pop']['sysOrderSet']"  header="시스템 발주 정보" 
        :modal=true position="bottom" class="custom-dialog-bottom"
        @update:visible="getPopupClose('sysOrderSet', true)">
        <SysOrderInfo/>
    </Dialog>

    <Dialog v-model:visible="popup['pop']['outOrderSet']"  header="외주 발주 정보" 
        :modal=true position="bottom" class="custom-dialog-bottom"
        @update:visible="getPopupClose('outOrderSet', true)">
        <OutOrderInfo/>
    </Dialog>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import TableCard from '@/components/card/TableCard.vue'
import CalculateCard from "@/components/card/CalculateCard.vue";
import SysOrderInfo from "@/views/include/customer/SysOrderInfo.vue";
import OutOrderInfo from "@/views/include/customer/OutOrderInfo.vue";
import { onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { usePopupStore, useEstiStore, useOrderStore } from '@/store';
import { usePopup } from '@/assets/js/popup';

const router    = useRouter();
const popup     = usePopupStore();
const esti      = useEstiStore();
const ord       = useOrderStore();

const { getPopupClose } = usePopup();

onMounted(async () => {
    await ord.getReset();
    await ord.getList({ emCd : esti['emCd'] });
})

</script>

<style lang="scss">

</style>