<template>
    <main class="relative pb-24  h-[90vh]">
        <BackHeader title="고객" />
        <section class="">
            <div class="flex items-center justify-between px-4 py-[10px] md:px-6 no-print ">
                <div class="flex justify-between self-center w-full">
                    <div class="flex gap-2 w-full">
                        <div class="flex relative w-full gap-2 max-w-[90px] bg-gray-100 *:!border-0  mini_select">
                            <Select v-model="client['stCd']" :options="data['clientStat']" optionLabel="name" optionValue="value" placeholder="상태" class="relative z-10 w-full md:*:text-xs" @change="getList"/>
                        </div>
                        
                        <IconField class="table-search-input w-full  sm:max-w-full !bg-gray-100 *:!border-0 mini_input h-8">
                            <InputIcon class="flex items-center justify-center !translate-y-1/4">
                                <i class="pi pi-search !text-11 text-gray-600 !font-black" />
                            </InputIcon>
                            <InputText v-model="client['search']" placeholder="이름,주소,전화번호로 검색" class="w-full !pl-[35px] !*:text-[#7D7C78]" @keyup.enter="getList"/>
                        </IconField>
                    </div>
                </div>
            </div>
                    
            <ul class="flex flex-col">
                <li v-for="(item, index) in client['list']" :key="index" class="flex items-center gap-[14px] flex-none w-full px-4 py-[10px] md:px-6 cursor-pointer " @click="getInfo(item.clientCd)">
                    <!-- 상태 -->
                    <div :class="getStatusClass(item.step)" class="flex items-center justify-center flex-none font-bold text-white rounded-md text-11 md:text-sm w-[11.4%] aspect-square sm:size-10">
                        {{ getStatusName(item.step) }}
                    </div>
                    <div class="flex gap-2 justify-between w-full">
                        <div class="flex flex-col flex-grow min-w-0">
                            <p class="font-bold text-13">{{ item.clientNm }}</p>
                            <span class="flex-1 text-10 truncate text-t-lv4 whitespace-nowrap max-w-[200px] sm:max-w-[100%]">{{ item.addr }} {{ item.addrDetail }}</span>
                        </div>
                        <div class="flex flex-col whitespace-nowrap">
                            <span class="text-xs text-right text-t-lv4">{{ item.date }}</span>
                            <p class="text-sm font-bold text-right">{{ getAmt(item.amt) }}원</p>
                        </div>
                    </div>
                </li>
            </ul>
        </section>

        <div class="fixed bottom-14 right-4 xl:right-[calc((100vw-1280px)/2+6rem)] xl:bottom-14 2xl:right-[calc((100vw-1440px)/2+6rem)] register-button"  @click="getPopOpen">
            <Button label="고객 신규 등록" icon="pi pi-plus" size="large"  @click="getPopOpen"/>
        </div>

        <Dialog v-model:visible="popup['pop']['clientSet']" 
        header="고객 등록"
        :modal=true
        position="center"
        class="custom-dialog-full"
        @update:visible="getPopClose(true, 'clientSet')">
        <template #header>
            <div class="modal-backheader">
                <Button @click="getPopClose(true, 'clientSet')" severity="contrast" text icon="pi pi-times" iconPos="right"/>
                <h2 class="modal-backheader-title">고객등록</h2>
            </div>
        </template>
            <CustomerListSet/>
        </Dialog>

        <Dialog v-model:visible="popup['pop']['clientDetail']" header="고객 상세" 
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopClose('clientDetail', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose(true, 'clientDetail')" severity="contrast" text icon="pi pi-times" />
                    <h2 class="modal-backheader-title">고객 상세</h2>
                </div>
            </template>
            <CustomerDetail/>
        </Dialog>

        <Dialog v-model:visible="popup['pop']['estiList']" header="명세서" 
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopClose('estiList', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose(true, 'estiList')" severity="contrast" text icon="pi pi-times" />
                    <h2 class="modal-backheader-title">명세서</h2>
                </div>
            </template>
            <EstiList/>
        </Dialog>

        <Dialog v-model:visible="popup['pop']['orderList']" header="발주서" 
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopClose('orderList', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose(true, 'orderList')" severity="contrast" text icon="pi pi-times" />
                    <h2 class="modal-backheader-title">발주서</h2>
                </div>
            </template>
            <OrderList/>
        </Dialog>

        <Dialog v-model:visible="popup['pop']['estiMate']" header="견적서" 
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopClose('estiMate', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose(true, 'estiMate')" severity="contrast" text icon="pi pi-times" />
                    <h2 class="modal-backheader-title">견적서</h2>
                </div>
            </template>
            <EstimateModal/>
        </Dialog>

        <Dialog v-model:visible="popup['pop']['conMate']" header="계약서" 
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopClose('conMate', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose(true, 'conMate')" severity="contrast" text icon="pi pi-times" />
                    <h2 class="modal-backheader-title">계약서</h2>
                </div>
            </template>
            <ConmateModal/>
        </Dialog>

        <Dialog v-model:visible="popup['pop']['payList']" header="결제내역" 
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopClose('payList', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose(true, 'payList')" severity="contrast" text icon="pi pi-times" />
                    <h2 class="modal-backheader-title">계약서</h2>
                </div>
            </template>
            <CustomerPayList/>
        </Dialog>

        <Dialog v-model:visible="popup['pop']['outOrderMate']" header="외주 발주서" 
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopClose('outOrderMate', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose(true, 'outOrderMate')" severity="contrast" text icon="pi pi-times" />
                    <h2 class="modal-backheader-title">외주 발주서</h2>
                </div>
            </template>
            <OutOrderMateModal/>
        </Dialog>
    </main>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Select from 'primevue/select';
import IconField from 'primevue/iconfield'; 
import InputText from 'primevue/inputtext'; 
import InputIcon from 'primevue/inputicon'; 
import BackHeader from '@/components/layouts/BackHeader.vue'
import Dialog from 'primevue/dialog';
import CustomerListSet from '@/views/include/CustomerListSet.vue'
import CustomerDetail from '@/views/include/customer/CustomerDetail.vue'
import EstimateModal from "@/views/customer/EstimateModal.vue";
import ConmateModal from "@/views/customer/ConmateModal.vue";
import EstiList from '@/views/include/customer/EstiList.vue';
import OrderList from "@/views/customer/OrderList.vue";
import CustomerPayList from "@/views/customer/PayList.vue";
import OutOrderMateModal from "@/views/customer/OutOrderMateModal.vue";
import { onMounted } from 'vue';
import { useDataStore, usePopupStore, useClientStore } from '@/store';
import { usePopup } from '@/assets/js/popup';
import { getCommas } from '@/assets/js/function';

const data      = useDataStore();
const popup     = usePopupStore();
const client    = useClientStore();

const { getPopupOpen, getPopupClose } = usePopup();

const getPopOpen = () => {
    getPopupOpen('clientSet');
    client.getReset();
}

const getPopClose = (gb: boolean, popNm: string) => {
    getPopupClose(popNm, gb);
}

const getAmt = (amt: number) => {
    return getCommas(Number(amt));
}

const getStatusClass = (step: number) => {
    switch (step) 
    {
        case 1:
            return 'bg-blue-300';
        case 2:
            return 'bg-blue-400';
        case 3:
            return 'bg-blue-500';
        case 4:
            return 'bg-blue-700';
        case 5:
            return 'bg-blue-800';
        case 6:
            return 'bg-red-500';
        default:
            return 'bg-gray-500';
    }
};

const getStatusName = (step: number) => {
    switch (step) 
    {
        case 1:
            return '대기';
        case 2:
            return '견적';
        case 3:
            return '발주';
        case 4:
            return '시공';
        case 5:
            return '결제';
        case 6:
            return '취소';
        default:
            return '';
    }
}

const getList = async () => {
    await client.getList();
}

const getInfo = async (clientCd: string) => {
    await client.getDataSet(clientCd); 
    getPopupOpen('clientDetail');
}

onMounted(() => {
    getList();
})
</script>