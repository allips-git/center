<template>
    <BackHeader title="결제서" />
    <main class="main-bottom-fixed-pd">
        <div class="flex flex-col gap-5 px-4">
            <TableCard v-for="(table, index) in pay['list']" :key="index" :title="table.title" :cards="table.cardLists"
                :columns="table.columns" :rows="table.rows" :tags="table.tags" :showTag="table.showTag" :showButton="table.showButton"/>
        </div>
        <div class="gray-bar"></div>
        <section class="px-5">
            <CalculateCard title="제품 결제 내역" :calcs="pay['payList']" totalTitle="총 결제 금액" :totalAmt="getAmt(pay['payList'], 'total')" :showtoggle="true" />
        </section>
        <div class="gray-bar"></div>
        <section class="px-5">
            <div class="p-4 mt-5 text-sm border border-gray-200 rounded">
            <div class="flex flex-col gap-2">
                <h1 class="text-base" >세부정보</h1>
                <dl class="flex items-center justify-between">
                    <dt class="text-gray-500">견적일</dt>
                    <dd class="">{{ pay['info']['estiDt'] }}</dd>
                </dl>
                <dl class="flex items-center justify-between">
                    <dt class="text-gray-500">계약일</dt>
                    <dd class="">{{ pay['info']['conDt'] }}</dd>
                </dl>
                <dl class="flex items-center justify-between">
                    <dt class="text-gray-500">시공일</dt>
                    <dd class="">{{ pay['info']['deliDt'] }}</dd>
                </dl>
                <dl class="flex items-center justify-between">
                    <dt class="text-gray-500">설치 예상시간</dt>
                    <dd class="">{{ pay['info']['insTime'] }}</dd>
                </dl>
                <dl class="flex items-center justify-between">
                    <dt class="text-gray-500">시공 담당자</dt>
                    <dd class="">{{ pay['info']['insUser'] }}</dd>
                </dl>
            </div>
            </div>
        </section>
    </main>
    <div class="bottom-fixed-btn-box">
        <Button v-if="pay['info']['stCd'] !== '011'" label="확인" size="large" severity="secondary" @click="router.go(-1)"/>
        <Button v-if="pay['info']['stCd'] === '011'" label="최종 결제 입력" size="large" @click="getPopupOpen('paymentSet')"/>
    </div>

    <Dialog v-model:visible="popup['pop']['paymentSet']"  header="최종 결제 입력" 
        :modal=true position="bottom" class="custom-dialog-bottom"
        @update:visible="getPopupClose('paymentSet', true)">
        <PaymentModal/>
    </Dialog>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import TableCard from '@/components/card/TableCard.vue'
import CalculateCard from "@/components/card/CalculateCard.vue";
import PaymentModal from "@/views/include/customer/PaymentModal.vue";
import { onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { usePopupStore, useEstiStore, usePayStore } from '@/store';
import { usePopup } from '@/assets/js/popup';
import { getAmt } from '@/assets/js/function';

const popup     = usePopupStore();
const esti      = useEstiStore();
const pay       = usePayStore();
const router    = useRouter();

const { getPopupOpen, getPopupClose } = usePopup();

onMounted(async () => {
    await pay.getReset();
    await pay.getList({ emCd : esti['emCd'] });
})

</script>

<style lang="scss">

</style>