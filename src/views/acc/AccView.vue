<template>
    <BackHeader title="회계" />
    <main class="w-full">
        <section class="px-5 pt-5">
        <div class="relative w-full p-4 bg-white border border-gray-200 rounded-md">
            <ul v-for="(item, index) in salesData" :key="index">
                <li class="flex items-center gap-2">
                    <p class="w-20 text-gray-600">{{ item.title }}</p>
                    <p class="text-lg font-bold" :class="{ 'text-green-500': item.title === '마진' }">{{ item.amount }}원</p>
                </li>
            </ul>
            <Button label="전체 기록 보기" outlined class="!absolute right-4 top-4" size="small" @click="AccMonthPop = true"/>
        </div>
    </section>

    <div class="gray-bar"></div>
    <section class="w-full">
        <div class="w-full custom-datatable">
           <DataTable 
           v-model:filters="filters" 
           :value="products" 
           removableSort
           dataKey="index" 
           filterDisplay="row"
           :globalFilterFields="['facilityName']"
           selectionMode="single"
        
           class="w-full"
           >
           <!-- 필터 검색 영역 -->
           <template #header>
               <div class="flex items-center justify-between w-full no-print">
                   <div class="flex self-center justify-start w-full gap-2">
                       <IconField class="table-search-input w-full max-w-[300px]">
                           <InputIcon>
                               <i class="pi pi-search" />
                           </InputIcon>
                           <InputText v-model="filters['global'].value" placeholder="고객명,주소,전화번호로 검색해주세요." class="w-full" />
                       </IconField>
                        <Select optionLabel="name" placeholder="그룹" class="w-full max-w-[100px]" />    
                   </div>
                </div>
           </template>
           <template #empty> 
               <p class="empty-data">데이터가 없습니다.</p>
           </template>
               <!-- 테이블 바디 -->
               <Column field="updateDt" header="등록일" sortable class="custom-table-column-min-w max-w-min w-[100px] min-w-[100px]">
                   <template #body="{ data }">
                    <div class="flex items-center justify-center w-full">
                        {{ data.updateDt }}
                    </div>
                   </template>
                   <template #filter="{ filterModel, filterCallback }">
                       <InputText class="w-full" size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
                   </template>
               </Column>

                <Column field="status" header="상태" sortable class="custom-table-column-min-w min-w-[100px] *:justify-center">
                    <template #body="{ data }">
                        <div class="flex items-center justify-center">
                            <p class="border flex px-3 py-0.5 items-center justify-center rounded-full text-sm text-gray-600 gap-2">
                                <span class="bg-blue-600 rounded-full size-2"></span>
                                {{ data.status }}</p>
                        </div>
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText class="w-full" size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
                    </template>                
                </Column>

                <Column field="cusNm" header="고객명" sortable class="custom-table-column-min-w" >
                   <template #body="{ data }">
                       {{ data.cusNm }}
                   </template>
                   <template #filter="{ filterModel, filterCallback }">
                       <InputText class="w-full" size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
                   </template>
               </Column>

               <Column field="address" header="주소" sortable class="custom-table-column-min-w">
                   <template #body="{ data }">
                       {{ data.address }}
                   </template>
                   <template #filter="{ filterModel, filterCallback }">
                       <InputText class="w-full" size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
                   </template>
               </Column>

               <Column field="addDt" header="상세주소" sortable class="custom-table-column-min-w">
                   <template #body="{ data }">
                       {{ data.addDt }}
                   </template>
                   <template #filter="{ filterModel, filterCallback }"> 
                       <InputText class="w-full" size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
                   </template>
               </Column>
   
               <Column field="tel" header="전화번호" sortable class="custom-table-column-min-w ">
                   <template #body="{ data }">
                       {{ data.tel }}
                   </template>
                   <template #filter="{ filterModel, filterCallback }">
                       <InputText class="w-full" size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
                   </template>
               </Column>
   
               <Column field="sale" header="매출" sortable class="custom-table-column-min-w ">
                   <template #body="{ data }">
                       {{ data.sale }}
                   </template>
                   <template #filter="{ filterModel, filterCallback }">
                       <InputText class="w-full" size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
                   </template>
               </Column>

               <Column field="purc" header="매입" sortable class="custom-table-column-min-w ">
                   <template #body="{ data }">
                       {{ data.purc }}
                   </template>
                   <template #filter="{ filterModel, filterCallback }">
                       <InputText class="w-full" size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
                   </template>
               </Column>


               <Column field="purcCnt" header="수익" sortable class="custom-table-column-min-w ">
                   <template #body="{ data }">
                       {{ data.purcCnt }}
                   </template>
                   <template #filter="{ filterModel, filterCallback }">
                       <InputText class="w-full" size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
                   </template>
               </Column>

               <Column field="margin" header="마진율" sortable class="custom-table-column-min-w ">
                   <template #body="{ data }">
                       {{ data.margin }}
                   </template>
                   <template #filter="{ filterModel, filterCallback }">
                       <InputText class="w-full" size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
                   </template>
               </Column>
           </DataTable>
       </div>
    </section>
</main>

<Dialog
    v-model:visible="AccMonthPop" 
    header="월간 분석" 
    :modal=true
    position="center"
    class="custom-dialog-bottom"
    >
    <AccMonth/>
</Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import BackHeader from '@/components/layouts/BackHeader.vue'
import AccMonth from '@/views/include/acc/AccMonth.vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import IconField from 'primevue/iconfield'; 
import InputText from 'primevue/inputtext'; 
import InputIcon from 'primevue/inputicon'; 

const AccMonthPop = ref (false)
 
const loading = ref(false);
const globalFilter = ref('');

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    updateDt: { value: null, matchMode: FilterMatchMode.EQUALS },
    status: { value: null, matchMode: FilterMatchMode.CONTAINS },
    cusNm: { value: null, matchMode: FilterMatchMode.CONTAINS },
    address: { value: null, matchMode: FilterMatchMode.CONTAINS },
    addDt: { value: null, matchMode: FilterMatchMode.CONTAINS },
    tel: { value: null, matchMode: FilterMatchMode.CONTAINS },
    sale: { value: null, matchMode: FilterMatchMode.CONTAINS },
    purc: { value: null, matchMode: FilterMatchMode.CONTAINS },
    purcCnt: { value: null, matchMode: FilterMatchMode.CONTAINS },
    margin: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const products = ref<Product[]>([]);

// 더미 데이터
const ProductService = {
    getProductsData(): Product[] {
        return [
        {
        updateDt: '2024-01-01',
        status: '완료',
        cusNm: '홍길동',
        address: '서울특별시 강남구 테헤란로 123',
        addDt: '서울특별시 강남구 삼성동 456',
        tel: '010-1234-5678',
        sale: 200000,
        purc: 150000,
        purcCnt: 50000,
        margin: '25%',
    },
    {
        updateDt: '2024-01-02',
        status: '대기',
        cusNm: '김철수',
        address: '부산광역시 해운대구 해운대해변로 789',
        addDt: '부산광역시 해운대구 우동 101',
        tel: '010-9876-5432',
        sale: 300000,
        purc: 200000,
        purcCnt: 100000,
        margin: '33%',
    },
    {
        updateDt: '2024-01-03',
        status: '취소',
        cusNm: '이영희',
        address: '대구광역시 수성구 수성로 321',
        addDt: '대구광역시 수성구 범어동 654',
        tel: '010-1111-2222',
        sale: 150000,
        purc: 100000,
        purcCnt: 50000,
        margin: '33%',
    },
    {
        updateDt: '2024-01-04',
        status: '완료',
        cusNm: '박지민',
        address: '인천광역시 남동구 만수동 123',
        addDt: '인천광역시 남동구 만수로 456',
        tel: '010-3333-4444',
        sale: 250000,
        purc: 200000,
        purcCnt: 50000,
        margin: '20%',
    },
    {
        updateDt: '2024-01-05',
        status: '대기',
        cusNm: '최유리',
        address: '광주광역시 서구 화정동 789',
        addDt: '광주광역시 서구 유덕로 101',
        tel: '010-5555-6666',
        sale: 180000,
        purc: 120000,
        purcCnt: 60000,
        margin: '33%',
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

const salesData = ref([
    { title: '매출', amount: 131000 },
    { title: '환불', amount: 50000 },
    { title: '마진', amount: 81000 },
]);

</script>

<style lang="scss">

</style>

