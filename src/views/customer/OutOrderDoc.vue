<template>
    <!-- <BackHeader :title="mate['ceNm']+' 발주서'" /> -->
    <p class="pt-6 text-xl font-bold text-center">{{ mate['ceNm']+' 발주서' }}</p>
    <main class="!pb-36">
        <div class="relative">
            <section class="relative overflow-hidden bg-white rounded-t-xl">
                <InfoCard :title="'수신 : '+mate['faNm']" :info="mate['headers']" />
                <div class="gray-bar"></div>

                <section class="px-5">
                    <div class="flex flex-col gap-5">
                        <TableCard v-for="(table, index) in mate['list']" :key="index" :title="table.title" :cards="table.cardLists"
                            :columns="table.columns" :rows="table.rows" :tags="table.tags" :showTag="table.showTag"
                            :showButton="table.showButton"/>
                    </div>
                </section>
            </section>
        </div>
    </main>
</template>
    
<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import InfoCard from "@/components/card/InfoCard.vue";
import TableCard from "@/components/card/TableCard.vue";
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useOutOrderMateStore } from '@/store';

const route = useRoute();
const mate  = useOutOrderMateStore();

onMounted(() => {
    console.log(atob(route.query.cd));
    mate.getInfo({ edCd : atob(route.query.cd) });
})
</script>

<style lang="scss">

</style>