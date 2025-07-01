<template>
    <main class="!pb-36">
        <div class="relative p-4">
            <section class="overflow-hidden relative bg-white rounded-t-xl">
                <InfoCard :title="mate['ceNm']" :info="mate['headers']" />
                <div class="my-4 gray-bar"></div>

                <section class="">
                    <div class="flex flex-col gap-5">
                        <TableCard v-for="(table, index) in mate['list']" :key="index" :title="table.title" :cards="table.cardLists"
                       :columns="table.columns" :rows="table.rows" :tags="table.tags" :showTag="table.showTag"
                       :showButton="table.showButton"/>
                    </div>
                </section>
            </section>
            
            <div class="my-4 gray-bar"></div>

            <section class="py-4">
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
import { useConMateStore } from '@/store';
import { useRoute } from 'vue-router';
import { getAmt } from '@/assets/js/function';

const route = useRoute();
const mate  = useConMateStore();

onMounted(() => {
    mate.getInfo({ emCd : atob(route.query.cd) }, 'N');
})
</script>

<style lang="scss">

</style>