<template>
    <BackHeader title="발주서" />
    <main class="main-bottom-fixed-pd">
        <div class="flex flex-col gap-5 px-4">
            <TableCard v-for="(table, index) in ord['list']" :key="index" :title="table.title" :cards="table.cardLists"
                :columns="table.columns" :rows="table.rows" :tags="table.tags" :showTag="table.showTag" :showButton="table.showButton"/>
        </div>
        <div class="gray-bar"></div>
        <section class="px-5">
            <CalculateCard title="제품 결제 내역" :calcs="ord['payList']" totalTitle="총 결제 금액" :totalAmt="getAmt(ord['payList'], 'total')" :showtoggle="true" />
        </section>
        <div class="gray-bar"></div>
        <section class="px-5">
            <div class="p-4 mt-5 text-sm border border-gray-200 rounded">
            <div class="flex flex-col gap-2">
                <h1 class="text-base" >세부정보</h1>
                <dl class="flex items-center justify-between">
                    <dt class="text-gray-500">견적일</dt>
                    <dd class="">{{ ord['info']['estiDt'] }}</dd>
                </dl>
                <dl class="flex items-center justify-between">
                    <dt class="text-gray-500">계약일</dt>
                    <dd class="">{{ ord['info']['conDt'] }}</dd>
                </dl>
                <dl class="flex items-center justify-between">
                    <dt class="text-gray-500">시공일</dt>
                    <dd class="">{{ ord['info']['deliDt'] }}</dd>
                </dl>
                <dl class="flex items-center justify-between">
                    <dt class="text-gray-500">설치 예상시간</dt>
                    <dd class="">{{ ord['info']['insTime'] }}</dd>
                </dl>
                <dl class="flex items-center justify-between">
                    <dt class="text-gray-500">시공 담당자</dt>
                    <dd class="">{{ ord['info']['insUser'] }}</dd>
                </dl>
            </div>
            </div>
        </section>
    </main>
    <div class="bottom-fixed-btn-box">
        <Button v-if="ord['info']['stCd'] !== '011'" label="확인" size="large" severity="secondary" @click="router.go(-1)"/>
        <Button v-if="ord['info']['stCd'] === '011'" label="최종 결제 입력" size="large" @click="getPopupOpen('paymentSet')"/>
    </div>

    <Dialog v-model:visible="popup['pop']['sysOrderSet']"  header="시스템 발주 정보" 
        :modal=true position="center" class="custom-dialog-bottom"
        @update:visible="getPopupClose('sysOrderSet', true)">
        <SysOrderInfo/>
    </Dialog>

    <Dialog v-model:visible="popup['pop']['outOrderSet']"  header="외주 발주 정보" 
        :modal=true position="center" class="custom-dialog-bottom"
        @update:visible="getPopupClose('outOrderSet', true)">
        <OutOrderInfo/>
    </Dialog>

    <Dialog v-model:visible="popup['pop']['paymentSet']"  header="최종 결제 입력" 
        :modal=true position="center" class="custom-dialog-bottom"
        @update:visible="getPopupClose('paymentSet', true)">
        <PaymentModal/>
    </Dialog>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import TableCard from '@/components/card/TableCard.vue'
import CalculateCard from "@/components/card/CalculateCard.vue";
import SysOrderInfo from "@/views/include/customer/SysOrderInfo.vue";
import OutOrderInfo from "@/views/include/customer/OutOrderInfo.vue";
import PaymentModal from "@/views/include/customer/PaymentModal.vue";
import { onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { usePopupStore, useEstiStore, useOrderStore } from '@/store';
import { usePopup } from '@/assets/js/popup';
import { getAmt } from '@/assets/js/function';

const router    = useRouter();
const popup     = usePopupStore();
const esti      = useEstiStore();
const ord       = useOrderStore();

const { getPopupOpen, getPopupClose } = usePopup();

onMounted(async () => {
    await ord.getReset();
    await ord.getList({ emCd : esti['emCd'] });
})

</script>

<style lang="scss">

</style>