<template>
    <main>
        <BackHeader title="고객" />
        <section class="">
            <div class="flex items-center justify-between px-4 mb-2 md:px-6 no-print">
                <div class="flex self-center justify-between w-full ">
                    <div class="flex w-full gap-2">
                        <div class="flex relative w-full gap-2 max-w-[90px] bg-gray-100 h-8 *:!border-0">
                            <Select v-model="client['stCd']" :options="data['clientStat']" optionLabel="name" optionValue="value" placeholder="상태" class="relative z-10 w-full mini_select" @change="getList"/>
                            <IconPlay class="absolute rotate-90 top-2 right-2 *:fill-gray-400"/>
                        </div>
                        
                        <IconField class="table-search-input w-full  sm:max-w-full h-8 !bg-gray-100 *:!border-0">
                            <InputIcon class="flex items-center justify-center !translate-y-1/4">
                                <i class="pi pi-search !text-11 text-gray-600 !font-balck" />
                            </InputIcon>
                            <InputText v-model="client['search']" placeholder="이름,주소,전화번호로 검색" class="w-full h-8 mini_input !bg-gray-100 !pl-[35px]" @keyup.enter="getList"/>
                        </IconField>
                    </div>
                </div>
            </div>
                    
            <ul class="flex flex-col">
                <li v-for="(item, index) in client['list']" :key="index" class="flex items-center justify-between flex-none w-full p-4 md:px-6" @click="getInfo(item.clientCd)">
                    <!-- 상태 -->
                    <div :class="getStatusClass(item.step)" class="flex items-center justify-center flex-none mr-4 text-sm font-bold text-white rounded-md size-11">
                        {{ getStatusName(item.step) }}
                    </div>
                    <div class="flex justify-between gap-2 w-[calc(100%-3.75rem)]">
                        <div class="flex flex-col flex-grow min-w-0">
                            <p class="font-bold">{{ item.clientNm }}</p>
                            <span class="flex-1 text-xs text-gray-400 truncate">{{ item.addr }} {{ item.addrDetail }}</span>
                        </div>
                        <div class="flex flex-col whitespace-nowrap">
                            <span class="text-sm text-right text-gray-400">{{ item.date }}</span>
                            <p class="font-bold text-right">{{ getAmt(item.amt) }}원</p>
                        </div>
                    </div>
                </li>
            </ul>
        </section>

        <div class="fixed bottom-20 right-4 md:bottom-4">
            <Button label="고객 신규 등록" icon="pi pi-plus" size="large" @click="getPopOpen"/>
        </div>
        <Dialog v-model:visible="popup['pop']['clientSet']" 
        header="고객 등록"
        :modal=true
        position="center"
        class="custom-dialog-bottom backPopup"
        @update:visible="getPopClose(true, 'clientSet')">
        <template #header>
            <div class="modal-backheader">
                <Button @click="getPopClose(true, 'clientSet')" severity="contrast" text icon="pi pi-times" iconPos="right"/>
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
import IconPlay from '@/components/icons/IconPlay.vue';

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