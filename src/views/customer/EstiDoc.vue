<template>
    <BackHeader title="견적서 공유화면" />
    <main class="!pb-5">
        <div class="relative">
            <section class="relative rounded-t-xl overflow-hidden bg-white">
                <InfoCard :title="mate['ceNm']" :info="mate['headers']" />
                <div class="gray-bar"></div>

                <section class="px-5">
                    <div class="flex flex-col gap-5">
                        <TableCard v-for="(table, index) in mate['list']" :key="index" :title="table.title" :cards="table.cardLists"
                       :columns="table.columns" :rows="table.rows" :tags="table.tags" :showTag="table.showTag"
                       :showButton="table.showButton"/>
                    </div>
                </section>
            </section>
            <section class="px-5">
                <CalculateCard  :showtitle="true" :calcs="mate['payList']" title="합계 금액" totalTitle="총 합계 금액" :totalAmt="getAmt(mate['payList'], 'total')"/>
            </section>
        </div>
    </main>
</template>
    
<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import CalculateCard from "@/components/card/CalculateCard.vue";
import InfoCard from "@/components/card/InfoCard.vue";
import TableCard from "@/components/card/TableCard.vue";
import { onMounted } from 'vue';
import { useEstiMateStore } from '@/store';
import { useRoute } from 'vue-router';
import { getAmt } from '@/assets/js/function';

const route = useRoute();
const mate  = useEstiMateStore();

onMounted(() => {
    mate.getInfo({ emCd : atob(route.query.cd) }, 'N');
})
</script>

<style lang="scss">

</style>