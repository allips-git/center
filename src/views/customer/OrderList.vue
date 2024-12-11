<template>
    <BackHeader title="발주서" />
    <main class="main-bottom-fixed-pd">
        <div class="flex flex-col gap-5 px-4">
            <TableCard />
        </div>
        <div class="gray-bar"></div>
        <section class="px-5">
            <CalculateCard :showtitle="true" title="제품 결제 내역" totalTitle="총 결제 금액"/>
        </section>
        <div class="gray-bar"></div>
        <section class="px-5">
            <div class="p-4 mt-5 text-sm border border-gray-200 rounded">
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

    <Dialog v-model:visible="sysOrderInfoPop"  header="발주 정보" 
        :modal=true position="bottom" class="custom-dialog-bottom"
        >
        <SysOrderInfo/>
    </Dialog>

    <Dialog v-model:visible="outOrderInfoPop"  header="발주 정보" 
        :modal=true position="bottom" class="custom-dialog-bottom"
        >
        <OutOrderInfo/>
    </Dialog>

    <Dialog v-model:visible="paymentModalPop"  header="최종 결제 입력" 
        :modal=true position="bottom" class="custom-dialog-bottom"
        >
        <PaymentModal/>
    </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BackHeader from '@/components/layouts/BackHeader.vue'
import TableCard from '@/components/card/TableCard.vue'
import CalculateCard from "@/components/card/CalculateCard.vue";
import SysOrderInfo from "@/views/include/customer/SysOrderInfo.vue";
import OutOrderInfo from "@/views/include/customer/OutOrderInfo.vue";
import PaymentModal from "@/views/include/customer/PaymentModal.vue";

const sysOrderInfoPop = ref (false)
const outOrderInfoPop = ref (false)
const paymentModalPop = ref (false)

</script>

<style lang="scss">

</style>