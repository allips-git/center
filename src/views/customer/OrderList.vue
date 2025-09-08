<template>
    <main class="pb-[130px] md:pb-32" ref="mainRef">
        <main class="main-bottom-fixed-pd">
            <section class="p-4">
                <div class="flex flex-col gap-5">
                    <TableCard v-for="(table, index) in ord['list']" :key="index" :title="table.title" :cards="table.cardLists"
                        :columns="table.columns" :rows="table.rows" :tags="table.tags" :showTag="table.showTag" :showButton="table.showButton"
                        @get-modify="getEstiModify"/>
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

        <Dialog v-model:visible="popup['pop']['itemList']" header="제품선택" 
            :modal=true position="center" class="custom-dialog-full"
            @update:visible="getPopupClose('itemList', true)">
            <template #header>
                <div class="modal-fullheader">
                    <h2 class="modal-backheader-title">제품선택</h2>
                    <Button @click="getPopupClose('itemList', true)" severity="contrast" text icon="pi pi-arrow-left"/>
                </div>
            </template>
            <ProductChoice/>
        </Dialog>

        <Dialog v-model:visible="popup['pop']['itemSet']" header="제품등록" 
            :modal=true position="center" class="custom-dialog-bottom backPopup"
            @update:visible="getPopupClose('itemSet', true)">
            <template #header>
                <div class="modal-fullheader change-button">
                    <Button @click="getPopupClose('itemSet', true)" severity="contrast" text icon="pi pi-arrow-left"/>
                    <h2 class="modal-backheader-title">제품등록</h2>
                    <Button label="제품 변경" size="small" @click="getItemChange" class="!z-[100] !bg-p-lv4 !text-white"/>
                </div>
            </template>
            <ProductRegister/>
        </Dialog>
    
        <Dialog v-model:visible="popup['pop']['sysOrderSet']"  header="시스템 발주 정보" 
            :modal=true position="center" class="custom-dialog-bottom backPopup"
            @update:visible="getPopupClose('sysOrderSet', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose(true, 'sysOrderSet')" severity="contrast" text icon="pi pi-times" />
                    <h2 class="modal-backheader-title">시스템 발주 정보</h2>
                </div>
            </template>
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
import TableCard from '@/components/card/TableCard.vue'
import CalculateCard from "@/components/card/CalculateCard.vue";
import SysOrderInfo from "@/views/include/customer/SysOrderInfo.vue";
import OutOrderInfo from "@/views/include/customer/OutOrderInfo.vue";
import ProductChoice from "@/views/include/ProductChoice.vue";
import ProductRegister from "@/views/include/ProductRegister.vue";
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

const { getPopupOpen, getPopupClose } = usePopup();

const getItemChange = () => {
    getPopupClose(true, 'itemSet');
    getPopupOpen('itemList');
}

const getEstiModify = async (edCd: string) => {
    const data = ord.list.flatMap(item => item.cardLists).find(card => card.edCd === edCd);
    
    // 데이터가 없거나 발주 대기 상태가 아니면 무시
    if (!data || data.detailStCd !== '005') 
    {
        return;
    }

    await esti.getReset();
    await esti.getEdCd(edCd, 'O');
    await esti.getInfo();
    getPopupOpen('itemSet');
}

onMounted(async () => {
    await ord.getReset();
    await ord.getList({ emCd : esti['emCd'] });
})

</script>

<style lang="scss">

</style>