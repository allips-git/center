<template>
    <main>
        <BackHeader title="공장" />
       <!-- 배송 대기 테이블 -->
       <div class="custom-datatable">
           <DataTable 
           v-model:filters="filters" 
           :value="products" 
           removableSort
           dataKey="index" 
           filterDisplay="row"
           :loading="loading"
           :globalFilterFields="['facilityName']"
           selectionMode="single"
           >
           <!-- 필터 검색 영역 -->
           <template #header>
               <div class="flex justify-between items-center no-print">
                   <div class="flex justify-start self-center w-full gap-6">
                       <IconField class="table-search-input w-full max-w-[300px]">
                           <InputIcon>
                               <i class="pi pi-search" />
                           </InputIcon>
                           <InputText v-model="filters['global'].value" placeholder="고객명,주소,전화번호로 검색해주세요." class="w-full" />
                       </IconField>
                       <div class="flex w-full gap-2">
                           <Select v-model="selectedCategory" :options="category" optionLabel="name" placeholder="그룹" class="w-full max-w-[100px]" />    
                           <Select v-model="selectedCategory" :options="category" optionLabel="name" placeholder="상태" class="w-full max-w-[100px]" />    
                       </div>

                        <Button label="고객 신규 등록" class="flex-none"  @click="CustomerListSetPop = true"/>                    
                   </div>
                </div>
           </template>
           <template #empty> 
               <p class="empty-data">데이터가 없습니다.</p>
           </template>
               <!-- 테이블 바디 -->
               <Column field="status" header="상태" sortable class="custom-table-column-min-w max-w-min w-[100px] min-w-[100px] *:justify-center">
                   <template #body="{ data }">
                    <div class="flex items-center justify-center w-full">
                        <p class="bg-blue-600 flex px-3 py-0.5 items-center justify-center rounded-full text-sm text-white">{{ data.status }}</p>
                    </div>
                   </template>
                   <template #filter="{ filterModel, filterCallback }">
                       <InputText class="w-full" size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
                   </template>
               </Column>

                <Column field="cusNm" header="고객명" sortable class="custom-table-column-min-w  min-w-[100px]">
                    <template #body="{ data }">
                        {{ data.cusNm }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText class="w-full" size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
                    </template>                
                </Column>

                <Column field="address" header="주소" sortable class="custom-table-column-min-w" >
                   <template #body="{ data }">
                       {{ data.address }}
                   </template>
                   <template #filter="{ filterModel, filterCallback }">
                       <InputText class="w-full" size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
                   </template>
               </Column>

               <Column field="adDt" header="상세주소" sortable class="custom-table-column-min-w">
                   <template #body="{ data }">
                       {{ data.adDt }}
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
   
               <Column field="Dt" header="등록일" sortable class="custom-table-column-min-w ">
                   <template #body="{ data }">
                       {{ data.Dt }}
                   </template>
                   <template #filter="{ filterModel, filterCallback }">
                       <InputText class="w-full" size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
                   </template>
               </Column>
   
               <Column field="group" header="그룹" sortable class="custom-table-column-min-w ">
                   <template #body="{ data }">
                       {{ data.group }}
                   </template>
                   <template #filter="{ filterModel, filterCallback }">
                       <InputText class="w-full" size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
                   </template>
               </Column>

               <Column field="totalAMt" header="총매출" sortable class="custom-table-column-min-w ">
                   <template #body="{ data }">
                       {{ data.totalAMt }}
                   </template>
                   <template #filter="{ filterModel, filterCallback }">
                       <InputText class="w-full" size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
                   </template>
               </Column>
           </DataTable>
       </div>
       <div>
        <Dialog
        v-model:visible="CustomerListSetPop" 
        header="고객 등록" 
        :modal=true
        position="bottom"
        class="custom-dialog-bottom">
            <CustomerListSet/>
        </Dialog>
       </div>
    </main>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';

import Button from 'primevue/button';
import DatePicker from 'primevue/datepicker';
import Select from 'primevue/select';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import IconField from 'primevue/iconfield'; 
import InputText from 'primevue/inputtext'; 
import InputIcon from 'primevue/inputicon'; 
import BackHeader from '@/components/layouts/BackHeader.vue'
import Dialog from 'primevue/dialog';
import CustomerListSet from '@/views/include/CustomerListSet.vue'




const posCenter = ref('center')
const CustomerListSetPop = ref(false);
const openCustomerListSetPop = () => {
    CustomerListSetPop.value = true; // 다이얼로그 열기
};


const loading = ref(false);

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    cusNm: { value: null, matchMode: FilterMatchMode.CONTAINS },
    address: { value: null, matchMode: FilterMatchMode.CONTAINS },
    adDt: { value: null, matchMode: FilterMatchMode.CONTAINS },
    tel: { value: null, matchMode: FilterMatchMode.CONTAINS },
    Dt: { value: null, matchMode: FilterMatchMode.CONTAINS },
    group: { value: null, matchMode: FilterMatchMode.CONTAINS },
    totalAMt: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const products = ref<Product[]>([]);

// 더미 데이터
const ProductService = {
    getProductsData(): Product[] {
        return [
    {
        status  : "견적",
        cusNm   : "홍길동",
        address : "부산광역시 수영구 수영로 411-1",
        adDt    : "광안자이 아파트 2단지 102동 1004호",
        tel     : "010-3445-2105",
        Dt      : "2022.07.14(목)",
        group   : "공동구매",
        totalAMt: "99,999,999"
    },
    {
        status  : "견적",
        cusNm   : "홍길동",
        address : "부산광역시 수영구 수영로 411-1",
        adDt    : "광안자이 아파트 2단지 102동 1004호",
        tel     : "010-3445-2105",
        Dt      : "2022.07.14(목)",
        group   : "공동구매",
        totalAMt: "99,999,999"
    },
    {
        status  : "견적",
        cusNm   : "홍길동",
        address : "부산광역시 수영구 수영로 411-1",
        adDt    : "광안자이 아파트 2단지 102동 1004호",
        tel     : "010-3445-2105",
        Dt      : "2022.07.14(목)",
        group   : "공동구매",
        totalAMt: "99,999,999"
    },

        ];
    },
    getProductsMini(): Promise<Product[]> {
        return Promise.resolve(this.getProductsData().slice(0, 50));
    },
};

onMounted(() => {
    loading.value = true;
    ProductService.getProductsMini().then((data) => {
        products.value = data;
    }).finally(() => {
        loading.value = false;
    });
});


function updateActiveStatus(data: Product) {
    console.log(`ID: ${data.index}, Active Status: ${data.isActive}`);
}


</script>