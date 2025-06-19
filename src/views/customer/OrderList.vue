<template>
    <main class="pb-[130px] md:pb-32" ref="mainRef">
        <BackHeader title="발주서" />
        <main class="main-bottom-fixed-pd">
            <section class="px-4">
                <div class="flex flex-col gap-5">
                    <TableCard v-for="(table, index) in ord['list']" :key="index" :title="table.title" :cards="table.cardLists"
                        :columns="table.columns" :rows="table.rows" :tags="table.tags" :showTag="table.showTag" :showButton="table.showButton"/>
                </div>
            </section>
            <div class="gray-bar my-[14px]"></div>
            <section class="px-4">
                <CalculateCard title="제품 결제 내역" :calcs="ord['payList']" totalTitle="총 결제 금액" :totalAmt="ord.totalAmt" :showtoggle="true" />
            </section>
        </main>
<!-- 
        <div class="!bottom-[56px] md:!bottom-0 md:!left-[200px] bottom-fixed-btn-box sm:!w-full md:!w-[calc(100vw-200px)]" >
            <Button label="확인" size="large" severity="secondary" @click="router.go(-1)"/>
        </div> -->

        <div :style="{width: mainWidth + 'px', left: mainLeft + 'px',  
            }" class="bottom-fixed-btn-box" 
            >
            <Button label="확인" size="large" severity="secondary" @click="router.go(-1)"/>
        </div>
    
        <Dialog v-model:visible="popup['pop']['sysOrderSet']"  header="시스템 발주 정보" 
            :modal=true position="bottom" class="custom-dialog-bottom"
            @update:visible="getPopupClose('sysOrderSet', true)">
            <SysOrderInfo/>
        </Dialog>
    
        <!-- <Dialog v-model:visible="popup['pop']['outOrderSet']"  header="외주 발주 정보" 
            :modal=true position="bottom" class="custom-dialog-bottom"
            @update:visible="getPopupClose('outOrderSet', true)">
            <OutOrderInfo/>
        </Dialog> -->

        <Dialog v-model:visible="popup['pop']['outOrderSet']" 
        header="외주 발주 정보"
        :modal=true
        position="center"
        class="custom-dialog-bottom backPopup"
        @update:visible="getPopupClose(true, 'outOrderSet')">
        <template #header>
            <div class="modal-backheader">
                <Button @click="getPopupClose(true, 'outOrderSet')" severity="contrast" text icon="pi pi-times" iconPos="right"/>
                <h2 class="modal-backheader-title">외주발주정보</h2>
            </div>
        </template>
         <OutOrderInfo/>

        </Dialog>
    </main>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import TableCard from '@/components/card/TableCard.vue'
import CalculateCard from "@/components/card/CalculateCard.vue";
import SysOrderInfo from "@/views/include/customer/SysOrderInfo.vue";
import OutOrderInfo from "@/views/include/customer/OutOrderInfo.vue";
import { ref } from 'vue';
import { onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { usePopupStore, useEstiStore, useOrderStore } from '@/store';
import { usePopup } from '@/assets/js/popup';

const mainRef = ref(null);
const mainWidth = ref(0);
const mainLeft = ref(0)

onMounted(() => {
    const updateMainSize = () => {
        if (mainRef.value) {
            mainWidth.value = mainRef.value.offsetWidth
            mainLeft.value = mainRef.value.offsetLeft
        }
    }

    updateMainSize()

    const observer = new ResizeObserver(() => updateMainSize())
    observer.observe(mainRef.value)
});

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