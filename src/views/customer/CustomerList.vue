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
            <li v-for="(item, index) in list" :key="index" class="flex items-center justify-between w-full px-5 py-2">
                <!-- 상태 -->
                <div :class="getStatusClass(item.status)" class="flex items-center justify-center mr-4 text-sm font-bold text-white rounded-md size-10">
                    {{ item.status }}
                </div>
            
                    <div class="flex justify-between gap-2 w-[calc(100%-40px)]">
                        <div class="flex flex-col">
                            <p class="font-bold">{{ item.clientNm }}</p>
                            <span class="text-xs text-gray-400">{{ item.addr }} {{ item.addrDetail }}</span>
                        </div>
                        <div class="flex flex-col">
                            <span class="text-sm text-right text-gray-400">{{ item.date }}</span>
                            <p class="font-bold">{{ item.amt }}원</p>
                        </div>
                    </div>
            </li>
        </ul>
       </section>
       <Button label="고객 신규 등록" icon="pi pi-plus" class="!fixed flex-none bottom-4 right-4" size="large" @click="getPopOpen"/>                    

       작업 다하고 아래 지워주세요!
       <div class="custom-datatable">
           <DataTable 
           v-model:filters="filters" 
           :value="client['list']" 
           removableSort
           dataKey="clientCd" 
           filterDisplay="row"
           @row-click="(event) => getInfo(event.data.clientCd)"
           >
                <Column field="clientNm" header="고객명" sortable class="custom-table-column-min-w  min-w-[100px]">
                    <template #body="{ data }">
                        {{ data.clientNm }}
                    </template>
                </Column>
           </DataTable>
       </div>
       <div>
        <Dialog v-model:visible="popup['pop']['clientSet']" 
        header="고객 등록" 
        :modal=true
        position="center"
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
       </div>
    </main>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Select from 'primevue/select';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import IconField from 'primevue/iconfield'; 
import InputText from 'primevue/inputtext'; 
import InputIcon from 'primevue/inputicon'; 
import BackHeader from '@/components/layouts/BackHeader.vue'
import Dialog from 'primevue/dialog';
import CustomerListSet from '@/views/include/CustomerListSet.vue'
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { FilterMatchMode } from '@primevue/core/api';
import { useDataStore, usePopupStore, useClientStore } from '@/store';
import { usePopup } from '@/assets/js/popup';

const data      = useDataStore();
const popup     = usePopupStore();
const client    = useClientStore();
const router    = useRouter();

const { getPopupOpen, getPopupClose } = usePopup();

const filters = ref({
    step        : { value: null, matchMode: FilterMatchMode.EQUALS },
    clientCd    : { value: null, matchMode: FilterMatchMode.CONTAINS },
    clientNm    : { value: null, matchMode: FilterMatchMode.CONTAINS },
    tel         : { value: null, matchMode: FilterMatchMode.CONTAINS },
    addr        : { value: null, matchMode: FilterMatchMode.CONTAINS },
    addrDetail  : { value: null, matchMode: FilterMatchMode.CONTAINS },
    date        : { value: null, matchMode: FilterMatchMode.CONTAINS },
    amt         : { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const getPopOpen = () => {
    getPopupOpen('clientSet');
    client.getReset();
}

const getPopClose = (gb: boolean, popNm: string) => {
    getPopupClose(popNm, gb);
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



const list = ref([
    { 
        status: '대기', 
        clientNm: '고객1', 
        addr: '서울시 강남구', 
        addrDetail: '역삼동 123-45', 
        date: '22.04.22', 
        amt: '100,000' 
    },
    { 
        status: '견적', 
        clientNm: '고객1', 
        addr: '서울시 강남구', 
        addrDetail: '역삼동 123-45', 
        date: '22.04.22', 
        amt: '100,000' 
    },
    { 
        status: '발주',
        clientNm: '고객2', 
        addr: '부산시 해운대구', 
        addrDetail: '우동 67', 
        date: '22.04.23', 
        amt: '200,000' 
    },
    { 
        status: '시공',
        clientNm: '고객3', 
        addr: '대구시 중구', 
        addrDetail: '동인동 89', 
        date: '22.04.24', 
        amt: '150,000' 
    },
    { 
        status: '결제',
        clientNm: '고객4', 
        addr: '인천시 연수구', 
        addrDetail: '송도동 45', 
        date: '22.04.25', 
        amt: '250,000' 
    },
    { 
        status: 'A/S',
        clientNm: '고객5', 
        addr: '광주시 서구', 
        addrDetail: '농성동 12', 
        date: '22.04.26', 
        amt: '300,000' 
    },
]);

// 상태에 따른 배경색 클래스 반환
const getStatusClass = (status) => {
    switch (status) {
        case '대기':
            return 'bg-blue-300';
        case '견적':
            return 'bg-blue-400';
        case '발주':
            return 'bg-blue-500';
        case '시공':
            return 'bg-blue-700';
        case '결제':
            return 'bg-blue-800';
        case 'A/S':
            return 'bg-red-500';
        default:
            return 'bg-gray-500';
    }
};
</script>