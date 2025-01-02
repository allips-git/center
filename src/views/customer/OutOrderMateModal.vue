<template>
    <BackHeader :title="mate['ceNm']+' 발주서'" />
    <main class="!pb-36">
        <div class="relative">
            <section class="relative rounded-t-xl overflow-hidden bg-white">
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
    <section class="fixed bg-white border-t border-gray-200 rounded-t-2xl p-5 bottom-0 w-full overflow-hidden">
        <div class="flex justify-between *:flex *:gap-2 *:items-center text-sm w-full">
            <div>
                <div class="label-checkbox-box">
                    <RadioButton />
                    <label for="">일반양식</label>
                </div>
                <div class="label-checkbox-box">
                    <RadioButton />
                    <label for="">엑셀양식</label>
                </div>
            </div>
        </div>

        <div class="pt-4 btn-2-layout-box">
            <InputText :value="''+domain+'/customer/outOrderDoc?cd='+edCd+''" readonly @click="getOutOrderDoc"/>
        </div>
        <div class="btn-2-layout-box pt-4">
            <Button label="링크 발주" severity="success"/>
        </div>
    </section>
</template>
    
<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import InfoCard from "@/components/card/InfoCard.vue";
import TableCard from "@/components/card/TableCard.vue";
import RadioButton from 'primevue/radiobutton';
import { onMounted } from 'vue';
import { useOrderStore, useOutOrderMateStore } from '@/store';

const ord       = useOrderStore();
const mate      = useOutOrderMateStore();
const domain    = window.location.origin;
const edCd      = btoa(ord['edCd']);

const getOutOrderDoc = () => {
    const value = event.target.value;

    window.open(value, '_blank');
}

onMounted(() => {
    mate.getInfo({ edCd : ord['edCd'] });
})
</script>

<style lang="scss">

</style>