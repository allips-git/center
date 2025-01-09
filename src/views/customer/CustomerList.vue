<template>
    <main>
        <BackHeader title="고객" />
        <section class="">
            <div class="flex items-center justify-between px-4 mt-5 mb-2 no-print">
                <div class="flex self-center justify-between w-full ">
                    <div class="flex w-full gap-2">
                        <div class="flex w-full gap-2 max-w-[90px]">
                            <Select v-model="client['stCd']" :options="data['clientStat']" optionLabel="name" optionValue="value" placeholder="상태" class="w-full" @change="getList"/>
                        </div>
                        
                        <IconField class="table-search-input w-full max-w-[300px]">
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="client['search']" placeholder="고객명,주소,전화번호로 검색해주세요." class="w-full" @keyup.enter="getList"/>
                        </IconField>
                    </div>
                </div>
            </div>
                    
            <ul class="flex flex-col">
                <li v-for="(item, index) in client['list']" :key="index" class="flex items-center justify-between w-full px-5 py-3" @click="getInfo(item.clientCd)">
                    <!-- 상태 -->
                    <div :class="getStatusClass(item.step)" class="flex items-center justify-center mr-4 text-sm font-bold text-white rounded-md size-10">
                        {{ getStatusName(item.step) }}
                    </div>
                    <div class="flex justify-between gap-2 w-[calc(100%-40px)]">
                        <div class="flex flex-col">
                            <p class="font-bold">{{ item.clientNm }}</p>
                            <span class="text-xs text-gray-400">{{ item.addr }} {{ item.addrDetail }}</span>
                        </div>
                        <div class="flex flex-col">
                            <span class="text-sm text-right text-gray-400">{{ item.date }}</span>
                            <p class="font-bold text-right">{{ getAmt(item.amt) }}원</p>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
        <Button label="고객 신규 등록" icon="pi pi-plus" class="!fixed flex-none bottom-4 right-4" size="large" @click="getPopOpen"/>
        <Dialog v-model:visible="popup['pop']['clientSet']" 
        header="고객 등록" 
        :modal=true
        position="bottom"
        class="custom-dialog-bottom backPopup"
        @update:visible="getPopClose(true, 'clientSet')">
        <template #header>
            <div class="modal-backheader">
                <Button @click="popup['pop']['clientSet'] = false" severity="contrast" text icon="pi pi-arrow-left"/>
                <h2 class="modal-backheader-title">고객등록</h2>
            </div>
        </template>
            <CustomerListSet/>
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
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDataStore, usePopupStore, useClientStore } from '@/store';
import { usePopup } from '@/assets/js/popup';
import { getCommas } from '@/assets/js/function';

const data      = useDataStore();
const popup     = usePopupStore();
const client    = useClientStore();
const router    = useRouter();

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
    router.push('/customer/detail');
}

onMounted(() => {
    getList();
})
</script>