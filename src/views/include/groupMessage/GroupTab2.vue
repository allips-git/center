<template>
<main>
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
                        <template #empty> 
                            <p class="empty-data">데이터가 없습니다.</p>
                        </template>
                            <!-- 테이블 바디 -->
                            <Column field="sentTime" header="발송시간" sortable class="custom-table-column-min-w max-w-min w-[100px] min-w-[100px]">
    <template #body="{ data }">
        <div class="flex items-center justify-center w-full">
            {{ data.sentTime }}
        </div>
    </template>
    <template #filter="{ filterModel, filterCallback }">
        <InputText class="w-full" size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
    </template>
</Column>

<Column field="messageType" header="메세지 종류" sortable class="custom-table-column-min-w min-w-[100px] justify-center">
    <template #body="{ data }">
        <div class="flex items-center justify-center">
            <p class="border flex px-3 py-0.5 items-center justify-center rounded-full text-sm text-gray-600 gap-2">
                <span class="bg-blue-600 rounded-full size-2"></span>
                {{ data.messageType }}</p>
        </div>
    </template>
    <template #filter="{ filterModel, filterCallback }">
        <InputText class="w-full" size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
    </template>                
</Column>

<Column field="messageContent" header="메세지 내용" sortable class="custom-table-column-min-w">
    <template #body="{ data }">
        {{ data.messageContent }}
    </template>
    <template #filter="{ filterModel, filterCallback }">
        <InputText class="w-full" size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
    </template>
</Column>

<Column field="recipient" header="수신고객" sortable class="custom-table-column-min-w">
    <template #body="{ data }">
        {{ data.recipient }}
    </template>
    <template #filter="{ filterModel, filterCallback }">
        <InputText class="w-full" size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
    </template>
</Column>

<Column field="deliveryStatus" header="발송 상태" sortable class="custom-table-column-min-w">
    <template #body="{ data }">
        {{ data.deliveryStatus }}
    </template>
    <template #filter="{ filterModel, filterCallback }"> 
        <InputText class="w-full" size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
    </template>
</Column>

<Column field="deductedPoints" header="차감된 포인트" sortable class="custom-table-column-min-w">
    <template #body="{ data }">
        {{ data.deductedPoints }}
    </template>
    <template #filter="{ filterModel, filterCallback }">
        <InputText class="w-full" size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
    </template>
</Column>

<Column field="sentBy" header="발송한 멤버" sortable class="custom-table-column-min-w">
    <template #body="{ data }">
        {{ data.sentBy }}
    </template>
    <template #filter="{ filterModel, filterCallback }">
        <InputText class="w-full" size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
    </template>
</Column>

                        </DataTable>
                    </div>
                    </section>
</main>
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
    sentTime: { value: null, matchMode: FilterMatchMode.EQUALS },
    messageType: { value: null, matchMode: FilterMatchMode.CONTAINS },
    messageContent: { value: null, matchMode: FilterMatchMode.CONTAINS },
    recipient: { value: null, matchMode: FilterMatchMode.CONTAINS },
    deliveryStatus: { value: null, matchMode: FilterMatchMode.CONTAINS },
    deductedPoints: { value: null, matchMode: FilterMatchMode.CONTAINS },
    sentBy: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const products = ref<Product[]>([]);

// 더미 데이터
const ProductService = {
    getProductsData(): Product[] {
        return [
        {
        sentTime: '2024-01-01',
        messageType: '완료',
        messageContent: '이영희가 보낸 대박적 메세지',
        recipient: '서울특별시 강남구 테헤란로 123',
        deliveryStatus: '발송 완료',
        deductedPoints: '010-1234-5678',
        sentBy: '홍길동',
    },
    {
        sentTime: '2024-01-02',
        messageType: '진행 중',
        messageContent: '이영희가 보낸 대박적 메세지',
        recipient: '부산광역시 해운대구 우동 789',
        deliveryStatus: '발송 대기',
        deductedPoints: '010-9876-5432',
        sentBy: '홍길동',
    },
    {
        sentTime: '2024-01-03',
        messageType: '취소',
        messageContent: '이영희가 보낸 대박적 메세지',
        recipient: '대구광역시 중구 동성로 234',
        deliveryStatus: '발송 취소',
        deductedPoints: '010-3456-7890',
        sentBy: '홍길동',
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