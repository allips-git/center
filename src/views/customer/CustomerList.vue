<template>
    <main class="relative pb-24  h-[90vh]">
        <BackHeader title="고객" />
        <section>
            <div class="flex justify-between items-center px-4 md:px-6 no-print">
                <div class="flex justify-between self-center w-full">
                    <div class="flex gap-2 w-full">
                        <Select v-model="client['stCd']" :options="data['clientStat']" optionLabel="name" optionValue="value" placeholder="상태" class="bg w-[36%]" @change="getList">
                            <template #dropdownicon>
                                <IconArrowDropDown class="w-4 h-4 text-l-lv0" />
                            </template>
                        </Select>
                        <IconField class="w-full bg">
                            <InputIcon class="z-10">
                                <IconSearch class="w-4 h-4 text-t-lv2" />
                            </InputIcon>
                            <InputText v-model="client['search']" placeholder="이름,주소,전화번호로 검색" class="w-full" @keyup.enter="getList"/>
                        </IconField>
                    </div>
                </div>
            </div>
                    
            <ul class="flex flex-col mt-[0.625rem]">
                <li v-for="(item, index) in client['list']" :key="index" class="flex items-center gap-[14px] flex-none w-full px-4 py-[0.625rem] md:px-6 cursor-pointer " @click="getInfo(item.clientCd)">
                    <!-- 상태 -->
                    <div :class="getStatusClass(item.step)" class="flex items-center justify-center flex-none font-bold text-white rounded-md text-xs md:text-sm w-[2.5rem] sm:w-[3rem] aspect-square">
                        {{ getStatusName(item.step) }}
                    </div>
                    <div class="flex gap-2 justify-between w-full pt-[0.125rem]">
                        <div class="flex flex-col flex-grow min-w-0">
                            <strong class="text-sm font-bold sm:text-base text-t-lv1">{{ item.clientNm }}</strong>
                            <div class="flex-1 text-xs sm:text-13 truncate text-t-lv4 whitespace-nowrap max-w-[200px] sm:max-w-[100%]">{{ item.addr }} {{ item.addrDetail }}</div>
                        </div>
                        <div class="flex flex-col whitespace-nowrap">
                            <div class="text-xs text-right sm:text-13 text-t-lv4">{{ item.date }}</div>
                            <strong class="text-sm font-medium text-right sm:text-base text-t-lv1">{{ getAmt(item.amt) }}원</strong>
                        </div>
                    </div>
                </li>
            </ul>
        </section>

        <div class="fixed bottom-14 right-4 xl:right-[calc((100vw-1280px)/2+8rem)] xl:bottom-14 2xl:right-[calc((100vw-1440px)/2+8rem) register-button"  @click="getPopOpen">
            <Button label="고객 등록" icon="pi pi-plus" size="large"  @click="getPopOpen"/>
        </div>

        <Dialog v-model:visible="popup['pop']['clientSet']" 
        header="고객 등록"
        :modal=true
        position="center"
        class="custom-dialog-full"
        @update:visible="getPopupClose('clientSet', true)">
        <template #header>
            <div class="modal-backheader">
                <Button @click="getPopupClose('clientSet', true)" severity="contrast" text icon="pi pi-times" iconPos="right"/>
                <h2 class="modal-backheader-title">고객등록</h2>
            </div>
        </template>
            <CustomerListSet/>
        </Dialog>

        <Dialog v-model:visible="popup['pop']['clientDetail']" header="고객 상세" 
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopupClose('clientDetail', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose('clientDetail', true)" severity="contrast" text icon="pi pi-times" />
                    <h2 class="modal-backheader-title">고객 상세</h2>
                </div>
            </template>
            <CustomerDetail/>
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
import { onMounted } from 'vue';
import { useDataStore, usePopupStore, useClientStore } from '@/store';
import { usePopup } from '@/assets/js/popup';
import { getCommas } from '@/assets/js/function';
import IconArrowDropDown from '@/components/icons/IconArrowDropDown.vue'
import IconSearch from '@/components/icons/IconSearch.vue'

const data      = useDataStore();
const popup     = usePopupStore();
const client    = useClientStore();

const { getPopupOpen, getPopupClose } = usePopup();

const getPopOpen = () => {
    getPopupOpen('clientSet');
    client.getReset();
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