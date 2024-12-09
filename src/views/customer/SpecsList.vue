<template>
    <div class="relative w-full">
        <BackHeader title="명세서" />
        <Button label="제품 추가 등록" size="small" class="!absolute right-4 top-1/2 -translate-y-1/2"/>
    </div>
<main class="main-bottom-fixed-pd">
    <section class="px-5">
        <div class="flex flex-col gap-5">
            <TableCard v-for="(table, index) in esti['list']" :key="index" :title="table.title" :cards="table.cardLists"
                :columns="table.columns" :rows="table.rows" :tags="table.tags" :showTag="table.showTag" :showButton="table.showButton"
                @get-modify="getEstiModify"/>
        </div>
    </section>
    <div class="gray-bar"></div>
    <section class="px-5">
        <CalculateCard title="제품 결제 내역" totalTitle="총 결제 금액" :showtoggle="true">
            <div class="flex flex-col gap-5 mt-3">                    
                <InputGroup @click="SaleAmountPopup = true">
                    <IftaLabel class="w-full">
                        <InputText id="username" class="w-full"/>
                        <label for="emali">할인 금액</label>
                    </IftaLabel>
                    <InputGroupAddon><span class="text-blue-600 text-sm">원</span></InputGroupAddon>
                </InputGroup>
        
                <InputGroup @click="AddAmountPopup = true">
                    <IftaLabel class="w-full">
                        <InputText id="username" class="w-full"/>
                        <label for="emali">추가 금액</label>
                    </IftaLabel>
                    <InputGroupAddon><span class="text-red-600 text-sm">원</span></InputGroupAddon>
                </InputGroup>

                <div class="flex justify-between">
                    <p>천원단위 절삭</p>
                    <ToggleSwitch v-model="checked" />
                </div>
            </div>
        </CalculateCard>
    </section>
</main>
<div class="bottom-fixed-btn-box">
    <Button label="계약서 이동" severity="secondary" size="large"/>
    <Button label="견적서 저장" size="large"/>
</div>

<Dialog
    v-model:visible="SaleAmountPopup" 
    header="할인 가격 입력" 
    :modal=true
    position="center"
    class="min-w-96 custom-dialog-center"
    :dismissableMask="true"
    >
    <div class="pt-3">
        <SaleAmountPop/>
    </div>
</Dialog>

<Dialog
    v-model:visible="AddAmountPopup" 
    header="추가 가격 입력" 
    :modal=true
    position="center"
    class="min-w-96 custom-dialog-center"
    :dismissableMask="true"
    >
    <div class="pt-3">
        <AddAmountPop/>
    </div>
    </Dialog>

<Dialog
    v-model:visible="SaleAmountPopup" 
    header="할인 가격 입력" 
    :modal=true
    position="center"
    class="custom-dialog-bottom"
    :dismissableMask="true"
    >
    <div class="pt-3">
        <SaleAmountPop/>
    </div>
</Dialog>

    <Dialog v-model:visible="popup['pop']['itemList']" header="제품선택" 
        :modal=true position="bottom" class="custom-dialog-bottom"
        @update:visible="getPopClose(true, 'itemList')">
        <ProductChoice/>
    </Dialog>

    <Dialog v-model:visible="popup['pop']['itemSet']" header="제품등록" 
        :modal=true position="bottom" class="custom-dialog-bottom"
        @update:visible="getPopClose(true, 'itemSet')">
        <ProductRegister/>
    </Dialog>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import TableCard from '@/components/card/TableCard.vue'
import CalculateCard from "@/components/card/CalculateCard.vue";
import IftaLabel from 'primevue/iftalabel';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Dialog from 'primevue/dialog';
import SaleAmountPop from '@/components/modal/SaleAmountPop.vue'
import AddAmountPop from '@/components/modal/addAmountPop.vue'
import ProductChoice from "@/views/include/ProductChoice.vue";
import ProductRegister from "@/views/include/ProductRegister.vue";
import ToggleSwitch from 'primevue/toggleswitch';
import { ref, onMounted } from 'vue'
import { usePopupStore, useEstiStore } from '@/store';
import { usePopup } from '@/assets/js/popup';

const popup = usePopupStore();
const esti  = useEstiStore();

const { getPopupOpen } = usePopup();

const getEstiModify = (edCd: string) => {
    esti.getEdCd(edCd);
    getPopupOpen('itemSet');
}

const SaleAmountPopup = ref (false)
const AddAmountPopup = ref (false)

const checked = ref(false);

onMounted(() => {
    esti.getList();
});
</script>
