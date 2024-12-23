<template>
    <main>
        <BackHeader title="공장" />
       <!-- 배송 대기 테이블 -->
       <div class="custom-datatable">
           <DataTable 
           v-model:filters="filters" 
           :value="client['list']" 
           removableSort
           dataKey="clientCd" 
           filterDisplay="row"
           @row-click="(event) => getInfo(event.data.clientCd)"
           >
           <!-- 필터 검색 영역 -->
           <template #header>
               <div class="flex items-center justify-between no-print">
                   <div class="flex self-center justify-between w-full ">
                    <div class="flex w-full gap-2">
                        <div class="flex w-full gap-2 max-w-[90px]">
                            <!-- <Select v-model="selectedCategory" :options="category" optionLabel="name" optionValue="value" placeholder="그룹" class="w-full max-w-[100px]" />     -->
                            <Select v-model="client['stCd']" :options="data['clientStat']" optionLabel="name" optionValue="value" placeholder="상태" class="w-full" @change="getList"/>
                        </div>
                        
                        <IconField class="table-search-input w-full max-w-[300px]">
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="client['search']" placeholder="고객명,주소,전화번호로 검색해주세요." class="w-full" @keyup.enter="getList"/>
                        </IconField>
                    </div>
                        <Button label="고객 신규 등록" icon="pi pi-plus" class="!fixed flex-none bottom-4 right-4 md:bottom-0 md:right-0 md:!relative" @click="getPopOpen"/>                    
                   </div>
                </div>
           </template>
           <template #empty> 
               <p class="empty-data">데이터가 없습니다.</p>
           </template>
               <!-- 테이블 바디 -->
               <Column field="step" header="상태" sortable class="custom-table-column-min-w max-w-min w-[100px] min-w-[100px] *:justify-center">
                   <template #body="{ data }">
                    <div class="flex items-center justify-center w-full">
                        <p class="bg-blue-600 flex px-3 py-0.5 items-center justify-center rounded-full text-sm text-white">{{ data.step }}</p>
                    </div>
                   </template>
                   <template #filter="{ filterModel, filterCallback }">
                       <InputText class="w-full" size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
                   </template>
               </Column>

                <Column field="clientNm" header="고객명" sortable class="custom-table-column-min-w  min-w-[100px]">
                    <template #body="{ data }">
                        {{ data.clientNm }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText class="w-full" size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
                    </template>                
                </Column>

                <Column field="addr" header="주소" sortable class="custom-table-column-min-w" >
                   <template #body="{ data }">
                       {{ data.addr }}
                   </template>
                   <template #filter="{ filterModel, filterCallback }">
                       <InputText class="w-full" size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
                   </template>
               </Column>

               <Column field="addrDetail" header="상세주소" sortable class="custom-table-column-min-w">
                   <template #body="{ data }">
                       {{ data.addrDetail }}
                   </template>
                   <template #filter="{ filterModel, filterCallback }">
                       <InputText class="w-full" size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
                   </template>
               </Column>

               <Column field="tel" header="전화번호" sortable class="custom-table-column-min-w">
                   <template #body="{ data }">
                       {{ data.tel }}
                   </template>
                   <template #filter="{ filterModel, filterCallback }"> 
                       <InputText class="w-full" size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
                   </template>
               </Column>
   
               <Column field="date" header="등록일" sortable class="custom-table-column-min-w ">
                   <template #body="{ data }">
                       {{ data.date }}
                   </template>
                   <template #filter="{ filterModel, filterCallback }">
                       <InputText class="w-full" size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
                   </template>
               </Column>

               <Column field="amt" header="총매출" sortable class="custom-table-column-min-w ">
                   <template #body="{ data }">
                       {{ data.amt }}
                   </template>
                   <template #filter="{ filterModel, filterCallback }">
                       <InputText class="w-full" size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
                   </template>
               </Column>
           </DataTable>
       </div>
       <div>
        <Dialog v-model:visible="popup['pop']['clientSet']" 
        header="고객 등록" 
        :modal=true
        position="center"
        class="custom-dialog-bottom"
        @update:visible="getPopClose(true, 'clientSet')">
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

</script>