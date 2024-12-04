<template>
    <main>
        <BackHeader title="고객상세" />
            <section class="p-5">
                <h1 class="text-2xl font-bold ">고객이름 !</h1>
                <ul class="flex flex-col gap-4 mt-5 rounded-md">
                    <li v-for="(item, index) in infoItems" :key="index" class="flex">
                        <p class="text-gray-600 w-24 whitespace-nowrap">{{ item.label }}</p>
                        <p>{{ item.value }}
                        </p>
                    </li>
                </ul>
            
            </section>
            <Tabs value="0" class="w-full">
                <TabList class="">
                    <Tab value="0" class="flex items-center justify-center gap-2 w-1/3">판매중 <span class="size-4 text-xs flex items-center justify-center bg-indigo-50 rounded-full ">1</span></Tab>
                    <Tab value="1" class="flex items-center justify-center gap-2 w-1/3">판매완료 <span class="size-4 text-xs flex items-center justify-center bg-indigo-50 rounded-full ">1</span></Tab>
                    <Tab value="2" class="flex items-center justify-center gap-2 w-1/3">판매취소<span class="size-4 text-xs flex items-center justify-center bg-indigo-50 rounded-full ">1</span></Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0">
                        <section class="p-5 !pb-20 flex flex-col gap-5">
                            <ProcessCard/>
                            <ProcessCard/>
                            <ProcessCard/>
                            <ProcessCard/>
                            <ProcessCard/>
                            <ProcessCard/>
                        </section>
                    </TabPanel>
                    <TabPanel value="1">
                        <section class="p-5 !pb-20 flex flex-col gap-5"></section>
                    </TabPanel>
                    <TabPanel value="2">
                        <section class="p-5 !pb-20 flex flex-col gap-5"></section>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <div class="fixed bottom-4 right-4">
                 <Button label="신규 명세표" icon="pi pi-plus" size="large" @click="ProductRegisterPop = true" />
            </div>
        </main>
    <Dialog
    v-model:visible="ProductRegisterPop" 
    header="제품선택" 
    :modal=true
    position="bottom"
    class="custom-dialog-bottom"
    >
    <ProductRegister/>
    </Dialog>

    <Dialog
    v-model:visible="OrderListPop" 
    header="발주서" 
    :modal=true
    position="bottom"
    class="custom-dialog-bottom"
    >
        <OrderList/>
    </Dialog>
</template>
    
<script setup lang="ts">
import { ref } from 'vue';
import BackHeader from '@/components/layouts/BackHeader.vue'
import ProcessCard from "@/components/card/ProcessCard.vue";
import ProductRegister from "@/views/include/ProductRegister.vue";
import OrderList from "@/views/include/customer/OrderList.vue";


import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import Badge from 'primevue/badge';


const ProductRegisterPop = ref (false)
const OrderListPop = ref (true)
// 정보 배열 정의
const infoItems = ref([
    {
    label: '전화번호',
    value: '11',
    },
    {
    label: '주소',
    value: '010-1234-5678',
    },

    {
    label: '상세주소',
    value: '부산 수영구 수영로 411-1',
    },

    {
    label: '등록일',
    value: '2024.04.19',
    },

    {
    label: '담당자',
    value: '김담당',
    },

    {
    label: '그룹명',
    value: 'VIP',
    },
]);

const orderItems = ref([
    {
    label: '판매중',
    value: '0',
    },
    {
    label: '판매완료',
    value: '0',
    },
    {
    label: '판매취소',
    value: '0',
    },
]);

</script>

<style lang="scss">

</style>