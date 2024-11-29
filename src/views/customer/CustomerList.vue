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
           :loading="loading"
           >
           <!-- 필터 검색 영역 -->
           <template #header>
               <div class="flex justify-between items-center no-print">
                   <div class="flex justify-start self-center w-full gap-6">
                       <IconField class="table-search-input w-full max-w-[300px]">
                           <InputIcon>
                               <i class="pi pi-search" />
                           </InputIcon>
                           <InputText v-model="client['search']" placeholder="고객명,주소,전화번호로 검색해주세요." class="w-full" @keyup.enter="getList"/>
                       </IconField>
                       <div class="flex w-full gap-2">
                           <!-- <Select v-model="selectedCategory" :options="category" optionLabel="name" optionValue="value" placeholder="그룹" class="w-full max-w-[100px]" />     -->
                           <Select v-model="client['stCd']" :options="data['clientStat']" optionLabel="name" optionValue="value" placeholder="상태" class="w-full max-w-[100px]" @change="getList"/>
                       </div>

                        <Button label="고객 신규 등록" class="flex-none" />                    
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
       <Toast position="top-center" group="headless" @close="visible = true">
            <template #container="{ message, closeCallback }">
                <section class="flex flex-col p-4 gap-4 w-full bg-primary/70 rounded-xl">
                    <div class="flex items-center gap-5">
                        <i class="pi pi-cloud-upload text-white dark:text-black text-2xl"></i>
                        <span class="font-bold text-base text-white dark:text-black">토큰 만료다</span>
                    </div>
                    <div class="flex gap-4 mb-4 justify-end">
                        <Button label="확인" size="small" @click="closeCallback"></Button>
                    </div>
                </section>
            </template>
        </Toast>
    </main>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Popover from 'primevue/popover';
import DatePicker from 'primevue/datepicker';
import Select from 'primevue/select';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import IconField from 'primevue/iconfield'; 
import InputText from 'primevue/inputtext'; 
import InputIcon from 'primevue/inputicon'; 
import BackHeader from '@/components/layouts/BackHeader.vue'
import Toast from 'primevue/toast';
import { ref, onMounted, defineEmits } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { useDataStore, useClientStore } from '@/store';

const data      = useDataStore();
const client    = useClientStore();
const loading   = ref(false);

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

const getList = async () => {
    loading.value = true;
    await client.getList();
    loading.value = false;
}

onMounted(() => {
    getList();
})

</script>