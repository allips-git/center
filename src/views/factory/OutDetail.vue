<template>
    <BackHeader title="공장이름?~" />
    <main class="!pb-36">
        <div class="relative">
            <section class="relative rounded-t-xl overflow-hidden bg-white">
                <InfoCard :title="'공장 정보'" :info="info" />
            </section>

            <div class="gray-bar"></div>

            <section class="px-5">
                <CalculateCard  :showtitle="true" title="매입 거래원장" totalTitle="총 결제 금액"/>
            </section>
        </div>
    </main>
    <div class="bottom-fixed-btn-box flex-col border-t">
        <div class="flex font-bold text-lg mb-1 justify-between">
            <p >총 제품</p>
            <p class="text-indigo-600">0개</p>
        </div>
        <Button label="제품 설정하기" size="large" @click="OutProductPop = true"/>
    </div>

    <Dialog
    v-model:visible="OutProductPop" 
    header="외주공장 이름 제품정보" 
    :modal=true
    position="bottom"
    class="custom-dialog-bottom"
    >
    <OutProduct/>
    </Dialog>
</template>
    
<script setup lang="ts">
import { ref } from 'vue';
import BackHeader from '@/components/layouts/BackHeader.vue'
import CalculateCard from "@/components/card/CalculateCard.vue";
import InfoCard from "@/components/card/InfoCard.vue";
import OutProduct from "@/views/include/factory/OutProduct.vue";

const OutProductPop = ref(false)
const checked = ref(false)

// 정보 배열 정의
const info = ref([
    { label: '공장명', value: '11' },
    { label: '전화번호', value: '010-1234-5678' },
    { label: '주소', value: '부산 수영구 수영로 611-1 1층'},
    { label: '계좌', value: '1231-4111-1112 신한은행' },
    { label: '메모', value: '집에 가고 싶어요' },
]);
</script>

<style lang="scss">

</style>