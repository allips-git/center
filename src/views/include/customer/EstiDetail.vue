<template>
    <main class="pb-24">
        <Dialog v-model:visible="popup['pop']['itemList']" header="제품선택" 
            :modal=true position="center" class="custom-dialog-full"
            @update:visible="getPopupClose('itemList', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose('itemList', true)" severity="contrast" text icon="pi pi-times"/>
                    <h2 class="modal-backheader-title">제품선택</h2>
                </div>
            </template>
            <ProductChoice/>
        </Dialog>
    
        <Dialog v-model:visible="popup['pop']['itemSet']" header="제품등록" 
            :modal=true position="center" class="custom-dialog-full"
            @update:visible="getPopupClose('itemSet', true)">
            <template #header>
                <div class="modal-fullheader change-button">
                    <Button @click="getPopupClose('itemSet', true)" severity="contrast" text icon="pi pi-arrow-left" class="flex justify-start"/>
                    <h2 class="modal-backheader-title">제품등록</h2>
                    <Button label="제품 변경" size="small" outlined @click="getItemChange" class="!z-[100] !bg-p-lv4 !text-white"/>
                </div>
            </template>
            <ProductRegister/>
        </Dialog>

        <Dialog v-model:visible="popup['pop']['clientSet']" header="고객 정보 수정" 
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopupClose('clientSet', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose('clientSet', true)" severity="contrast" text icon="pi pi-times" />
                    <h2 class="modal-backheader-title">고객 정보 수정</h2>
                </div>
            </template>
            <CustomerListSet/>

        </Dialog>

        <Dialog v-model:visible="popup['pop']['estiList']" header="명세서"
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopupClose('estiList', true)">
            <template #header>
                <div class="modal-fullheader change-button">
                    <Button @click="getPopupClose('estiList', true)" severity="contrast" text icon="pi pi-arrow-left" class="flex justify-start"/>
                    <h2 class="modal-backheader-title">명세서</h2>
                    <Button label="제품 추가 등록" size="small" outlined @click="getEstiAdd" class="!z-[100] !bg-p-lv4 !text-white esti-button"/>
                </div>
            </template>
            <EstiList/>
        </Dialog>

        <Dialog v-model:visible="popup['pop']['orderList']" header="발주서" 
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopupClose('orderList', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose('orderList', true)" severity="contrast" text icon="pi pi-times" />
                    <h2 class="modal-backheader-title">발주서</h2>
                </div>
            </template>
            <OrderList/>
        </Dialog>

        <Dialog v-model:visible="popup['pop']['chatRoom']" header="채팅방 목록" 
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopupClose('chatRoom', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose('chatRoom', true)" severity="contrast" text icon="pi pi-times" />
                    <h2 class="modal-backheader-title">채팅방</h2>
                </div>
            </template>
            <ChatRoomModal/>
        </Dialog>

        <Dialog v-model:visible="popup['pop']['estiMate']" header="견적서" 
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopupClose('estiMate', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose('estiMate', true)" severity="contrast" text icon="pi pi-times" />
                    <h2 class="modal-backheader-title">견적서</h2>
                </div>
            </template>
            <EstimateModal/>
        </Dialog>

        <Dialog v-model:visible="popup['pop']['conMate']" header="계약서" 
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopupClose('conMate', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose('conMate', true)" severity="contrast" text icon="pi pi-times" />
                    <h2 class="modal-backheader-title">계약서</h2>
                </div>
            </template>
            <ConmateModal/>
        </Dialog>

        <Dialog v-model:visible="popup['pop']['payList']" header="결제내역" 
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopupClose('payList', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose('payList', true)" severity="contrast" text icon="pi pi-times" />
                    <h2 class="modal-backheader-title">결제</h2>
                </div>
            </template>
            <CustomerPayList/>
        </Dialog>

        <Dialog v-model:visible="popup['pop']['outOrderMate']" header="외주 발주서" 
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopupClose('outOrderMate', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose('outOrderMate', true)" severity="contrast" text icon="pi pi-times" />
                    <h2 class="modal-backheader-title">외주 발주서</h2>
                </div>
            </template>
            <OutOrderMateModal/>
        </Dialog>
    </main>
</template>
    
<script setup lang="ts">
import ProductChoice from "@/views/include/ProductChoice.vue";
import ProductRegister from "@/views/include/ProductRegister.vue";
import CustomerListSet from '@/views/include/CustomerListSet.vue';
import ChatRoomModal from "@/views/customer/ChatRoomModal.vue";
import EstimateModal from "@/views/customer/EstimateModal.vue";
import ConmateModal from "@/views/customer/ConmateModal.vue";
import EstiList from '@/views/include/customer/EstiList.vue';
import OrderList from "@/views/customer/OrderList.vue";
import CustomerPayList from "@/views/customer/PayList.vue";
import OutOrderMateModal from "@/views/customer/OutOrderMateModal.vue";
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import { onMounted, onUnmounted } from 'vue';
import { usePopupStore, useClientStore, useEstiStore } from '@/store';
import { usePopup } from '@/assets/js/popup';

const popup     = usePopupStore();
const client    = useClientStore();
const esti      = useEstiStore();

const { getPopupOpen, getPopupClose } = usePopup();

const getItemChange = () => {
    getPopupClose(true, 'itemSet');
    getPopupOpen('itemList');
}

const getNewEsti = async () => {
    await esti.getReset();
    await esti.getType('N');
    await getPopupOpen('itemList');
}

const getEstiAdd = async () => {
    await esti.getType('I');
    await esti.getReset();
    await getPopupOpen('itemList');
}

onMounted(async () => {
    await client.getDetail();
})

onUnmounted(async () => {
    await client.getList();
})

</script>

<style lang="scss">

</style>