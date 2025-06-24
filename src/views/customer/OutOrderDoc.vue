<template>
    <!-- <BackHeader :title="mate['ceNm']+' 발주서'" /> -->
    <p class="pt-6 font-bold text-center text-18">{{ mate['ceNm']+' 발주서' }}</p>
    <main class="!pb-36">
        <div class="relative p-4">
            <section class="overflow-hidden relative bg-white rounded-t-xl">
                <InfoCard :title="'수신 : '+mate['faNm']" :info="mate['headers']" />
                <div class="my-4 gray-bar"></div>

                <section class="">
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
import InfoCard from "@/components/card/InfoCard.vue";
import TableCard from "@/components/card/TableCard.vue";
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useOutOrderMateStore } from '@/store';

const route = useRoute();
const mate  = useOutOrderMateStore();

onMounted(() => {
    mate.getInfo({ edCd : atob(route.query.cd) }, 'N');
})
</script>

<style lang="scss">

</style>