<template>
    <main>
        <BackHeader title="고객상세" />
        <section class="p-5 pb-0">
            <h1 class="text-2xl font-bold ">{{ client['detail']['clientNm'] }}</h1>
            <ul class="flex flex-col gap-4 mt-5 rounded-md">
                <li class="flex">
                    <p class="w-24 text-gray-600 whitespace-nowrap">전화번호</p>
                    <p>{{ client['detail']['tel'] }}</p>
                </li>
                <li class="flex">
                    <p class="w-24 text-gray-600 whitespace-nowrap">주소</p>
                    <p>({{ client['detail']['zip'] }}){{ client['detail']['addr'] }}</p>
                </li>
                <li class="flex">
                    <p class="w-24 text-gray-600 whitespace-nowrap">상세주소</p>
                    <p>{{ client['detail']['addrDetail'] }}</p>
                </li>
                <li class="flex">
                    <p class="w-24 text-gray-600 whitespace-nowrap">등록일</p>
                    <p>{{ client['detail']['regDt'] }}</p>
                </li>
                <li class="flex">
                    <p class="w-24 text-gray-600 whitespace-nowrap">담당자</p>
                    <p>{{ client['detail']['person'] }}</p>
                </li>
                <li class="flex">
                    <p class="w-24 text-gray-600 whitespace-nowrap">그룹명</p>
                    <p>{{ client['detail']['groupNm'] }}</p>
                </li>
            </ul>
        </section>
        <div class="gray-bar !mb-1"></div>
        <Tabs value="0" class="w-full">
            <TabList class="">
                <Tab value="0" class="flex items-center justify-center w-1/3 gap-2">판매중 <span class="flex items-center justify-center text-xs rounded-full size-4 bg-indigo-50 ">{{ client['detail']['cnt']['ing'] }}</span></Tab>
                <Tab value="1" class="flex items-center justify-center w-1/3 gap-2">판매완료 <span class="flex items-center justify-center text-xs rounded-full size-4 bg-indigo-50 ">{{ client['detail']['cnt']['comp'] }}</span></Tab>
                <Tab value="2" class="flex items-center justify-center w-1/3 gap-2">판매취소<span class="flex items-center justify-center text-xs rounded-full size-4 bg-indigo-50 ">{{ client['detail']['cnt']['cancel'] }}</span></Tab>
            </TabList>
            <TabPanels>
                <TabPanel value="0">
                    <div class="p-5 !pb-20 flex flex-col gap-5">
                        <section v-for="(item, index) in getList(1)" :key="index">
                            <ProcessCard :info="item"/>
                        </section>

                        <div class="flex flex-col items-center justify-center gap-2 py-10 text-center" v-if="getList(1).length === 0">
                            <div class="flex items-center justify-center rounded-full bg-red-50 size-16 "> <span class="!text-2xl text-red-500  pi pi-times"></span></div>
                            <p class="text-center">판매중인 항목이 없습니다.</p>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value="1">
                    <div class="p-5 !pb-20 flex flex-col gap-5">
                        <section v-for="(item, index) in getList(2)" :key="index">
                            <ProcessCard :info="item"/>
                        </section>
                        <div class="flex flex-col items-center justify-center gap-2 py-10 text-center" v-if="getList(2).length === 0">
                            <div class="flex items-center justify-center rounded-full bg-red-50 size-16 "> <span class="!text-2xl text-red-500  pi pi-times"></span></div>
                            <p class="text-center">판매완료된 항목이 없습니다.</p>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value="2">
                    <div class="p-5 !pb-20 flex flex-col gap-5">
                        <section v-for="(item, index) in getList(3)" :key="index">
                            <ProcessCard :info="item"/>
                        </section>

                        <div class="flex flex-col items-center justify-center gap-2 py-10 text-center" v-if="getList(3).length === 0">
                            <div class="flex items-center justify-center rounded-full bg-red-50 size-16 "> <span class="!text-2xl text-red-500  pi pi-times"></span></div>
                            <p class="text-center">판매취소된 항목이 없습니다.</p>
                        </div>
                        
                    </div>
                </TabPanel>
            </TabPanels>
        </Tabs>
        <div class="fixed bottom-4 right-4">
            <Button label="신규 명세표" icon="pi pi-plus" size="large" @click="getNewEsti" />
        </div>

        <Dialog v-model:visible="popup['pop']['itemList']" header="제품선택" 
            :modal=true position="center" class="custom-dialog-bottom"
            @update:visible="getPopClose(true, 'itemList')">
            <ProductChoice/>
        </Dialog>
    
        <Dialog v-model:visible="popup['pop']['itemSet']" header="제품등록" 
            :modal=true position="center" class="custom-dialog-bottom"
            @update:visible="getPopClose(true, 'itemSet')">
            <ProductRegister/>
        </Dialog>
        
    </main>
    <!-- <Dialog v-model:visible="popup['pop']['ordList']"  header="발주서" 
        :modal=true position="center" class="custom-dialog-bottom"
        @update:visible="getPopClose(true, 'ordList')">
        <OrderList/>
    </Dialog> -->
</template>
    
<script setup lang="ts">
import { ref } from 'vue' 
import BackHeader from '@/components/layouts/BackHeader.vue'
import ProcessCard from "@/components/card/ProcessCard.vue";
import ProductChoice from "@/views/include/ProductChoice.vue";
import ProductRegister from "@/views/include/ProductRegister.vue";

const de = ref (true)
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import { onMounted } from 'vue';
import { usePopupStore, useClientStore, useEstiStore } from '@/store';
import { usePopup } from '@/assets/js/popup';

const popup     = usePopupStore();
const client    = useClientStore();
const esti      = useEstiStore();

const { getPopupOpen, getPopupClose } = usePopup();

const getList = (tab: number) => {
    switch(tab)
    {
        case 1:
            return client['detail']['list'].filter(item => item.useYn !== 'N' && item.stCd !== '012');
        case 2:
            return client['detail']['list'].filter(item => item.stCd === '012');
        case 3:
            return client['detail']['list'].filter(item => item.useYn === 'N' && item.stCd !== '012');
    }
}

const getNewEsti = () => {
    esti.getReset();
    esti.getType('N');
    getPopupOpen('itemList');
}

const getPopClose = (gb: boolean, popNm: string) => {
    getPopupClose(popNm, gb);
}

onMounted(() => {
    client.getDetail();
})

</script>

<style lang="scss">

</style>