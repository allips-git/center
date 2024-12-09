<template>
    <BackHeader title="단체메시지"/>
    <main>
        <Tabs value="0">
            <TabList>
                <Tab value="0">문자 메세지</Tab>
                <Tab value="1">발송 내역</Tab>
            </TabList>
            <TabPanels>
                <TabPanel value="0">
                    <h2 class="px-5 mt-5 mb-3 text-lg font-bold">단체 메시지</h2>
                    <div class="w-full px-5">
                        <GroupTab1 />                    
                    </div>
                </TabPanel>
                <TabPanel value="1">
                    <div class="flex items-center justify-between px-5 py-3">
                        <h2 class="text-lg font-bold ">단체 메시지</h2>
                        <Select placeholder="전체" size="small"/>
                    </div>
                    <GroupTab2 />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </main>

    <Dialog
    v-model:visible="GroupMessagePop" 
    header="발송 상세 내역" 
    :modal=true
    position="bottom"
    class="custom-dialog-bottom"
    >
        <GroupMessagePopup/>
    </Dialog>
</template>

<script setup lang="ts">
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import GroupTab1 from "@/views/include/groupMessage/GroupTab1.vue";
import GroupTab2 from "@/views/include/groupMessage/GroupTab2.vue";
import GroupMessagePopup from "@/views/include/groupMessage/GroupMessagePopup.vue";


import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import BackHeader from '@/components/layouts/BackHeader.vue'


const GroupMessagePop = ref (true)
 
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