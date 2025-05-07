<template>
    <main class="pb-[56px]">
        <BackHeader title="고객상세" />
        <section class="p-4 md:p-6">
            <div class="flex items-center justify-between">
                <h2 class="font-bold">{{ client['detail']['clientNm'] }}</h2>
                <Button label="정보수정" outlined severity="secondary" size="small" @click="getClientModify"/>
            </div>
            <ul class="flex flex-col gap-3 mt-3 text-sm rounded-md">
                <li class="flex items-center">
                    <p class="w-24 text-gray-500 whitespace-nowrap">전화번호</p>
                    <p class="capsuel_sky" @click="getNavi('tel', client['detail']['tel'])">{{ client['detail']['tel'] }}</p>
                </li>
                <li class="flex items-center">
                    <p class="w-24 text-gray-500 whitespace-nowrap">주소</p>
                    <p class="capsuel_sky" :data-address="client['detail']['addr']" @click="getNavi('addr', client['detail']['addr'])">({{ client['detail']['zip'] }}) {{ client['detail']['addr'] }}</p>
                </li>
                <li class="flex">
                    <p class="w-24 text-gray-500 whitespace-nowrap">상세주소</p>
                    <p>{{ client['detail']['addrDetail'] }}</p>
                </li>
                <li class="flex">
                    <p class="w-24 text-gray-500 whitespace-nowrap">등록일</p>
                    <p>{{ client['detail']['regDt'] }}</p>
                </li>
                <li class="flex">
                    <p class="w-24 text-gray-500 whitespace-nowrap">담당자</p>
                    <p>{{ client['detail']['person'] }}</p>
                </li>
                <li class="flex">
                    <p class="w-24 text-gray-500 whitespace-nowrap">그룹명</p>
                    <p>{{ client['detail']['groupNm'] }}</p>
                </li>
            </ul>
        </section>
        <div class="gray-bar !mb-1"></div>
        <Tabs value="0" class="w-full">
            <TabList class="">
                <Tab value="0" class="flex items-center justify-center w-1/3 gap-2 text-sm md:text-base">판매중 <span class="flex items-center justify-center text-xs rounded-full size-4 bg-indigo-50 ">{{ client['detail']['cnt']['ing'] }}</span></Tab>
                <Tab value="1" class="flex items-center justify-center w-1/3 gap-2 text-sm md:text-base">판매완료 <span class="flex items-center justify-center text-xs rounded-full size-4 bg-indigo-50 ">{{ client['detail']['cnt']['comp'] }}</span></Tab>
                <Tab value="2" class="flex items-center justify-center w-1/3 gap-2 text-sm md:text-base">판매취소<span class="flex items-center justify-center text-xs rounded-full size-4 bg-indigo-50 ">{{ client['detail']['cnt']['cancel'] }}</span></Tab>
            </TabList>
            <TabPanels>
                <TabPanel value="0">
                    <div class="flex flex-col gap-5 p-4 md:p-6">
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
                    <div class="flex flex-col gap-5 p-4 md:p-6">
                        <section v-for="(item, index) in getList(2)" :key="index">
                            <ProcessCard :info="item"/>
                        </section>
                        <div class="flex flex-col items-center justify-center gap-2 py-10 text-center h-[312px]" v-if="getList(2).length === 0">
                            <div class="flex items-center justify-center rounded-full bg-red-50 size-16 "> <span class="!text-2xl text-red-500  pi pi-times"></span></div>
                            <p class="text-center">판매완료된 항목이 없습니다.</p>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value="2">
                    <div class="flex flex-col gap-5 p-5">
                        <section v-for="(item, index) in getList(3)" :key="index">
                            <ProcessCard :info="item"/>
                        </section>

                        <div class="flex flex-col items-center justify-center gap-2 py-10 text-center h-[312px]" v-if="getList(3).length === 0">
                            <div class="flex items-center justify-center rounded-full bg-red-50 size-16 "> <span class="!text-2xl text-red-500  pi pi-times"></span></div>
                            <p class="text-center">판매취소된 항목이 없습니다.</p>
                        </div>
                        
                    </div>
                </TabPanel>
            </TabPanels>
        </Tabs>
        <div class="flex justify-center pb-5">
            <Button label="신규 명세표" icon="pi pi-plus" size="large" @click="getNewEsti" />
        </div>

        <Dialog v-model:visible="popup['pop']['itemList']" header="제품선택" 
            :modal=true position="center" class="custom-dialog-full"
            @update:visible="getPopClose(true, 'itemList')">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopClose(true, 'itemList')" severity="contrast" text icon="pi pi-times"/>
                    <h2 class="modal-backheader-title">제품선택</h2>
                </div>
            </template>
            <ProductChoice/>
        </Dialog>
    
        <Dialog v-model:visible="popup['pop']['itemSet']" header="제품등록" 
            :modal=true position="center" class="custom-dialog-bottom"
            @update:visible="getPopClose(true, 'itemSet')">
            <template #header>
                <div class="modal-fullheader">
                    <Button @click="getPopClose(true, 'itemSet')" severity="contrast" text icon="pi pi-arrow-left" class="flex justify-start"/>
                    <h2 class="modal-backheader-title">제품등록</h2>
                    <Button label="제품 변경" size="small" outlined @click="getItemChange" class="!z-[100]"/>
                </div>
            </template>
            <ProductRegister/>
        </Dialog>

        <!-- <Dialog v-model:visible="popup['pop']['clientSet']" header="고객 정보 수정" 
            :modal=true position="center" class="custom-dialog-bottom"
            @update:visible="getPopClose(true, 'clientSet')">
            <CustomerListSet/>
        </Dialog> -->

        <Dialog v-model:visible="popup['pop']['clientSet']" header="고객 정보 수정" 
            :modal=true position="center" class="custom-dialog-bottom" 
            @update:visible="getPopClose('clientSet', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose(true, 'kakaoDetail')" severity="contrast" text icon="pi pi-times" />
                    <h2 class="modal-backheader-title">고객 정보 수정</h2>
                </div>
            </template>
            <CustomerListSet/>

        </Dialog>
    </main>
</template>
    
<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import ProcessCard from "@/components/card/ProcessCard.vue";
import ProductChoice from "@/views/include/ProductChoice.vue";
import ProductRegister from "@/views/include/ProductRegister.vue";
import CustomerListSet from '@/views/include/CustomerListSet.vue'
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

const getItemChange = () => {
    getPopupClose(true, 'itemSet');
    getPopupOpen('itemList');
}

const getNavi = (name: string, val: string) => {
    if(name === 'addr')
    {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type : 'address' , value : val}));
    }
    else if(name === 'tel')
    {
        const phoneNumber   = val;
        const telHref       = 'tel:' + phoneNumber;

        window.location.href = telHref;
    }
}

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

const getClientModify = async () => {
    getPopupOpen('clientSet');
    await client.getReset();
    await client.getInfo();
}

onMounted(async () => {
    await client.getDetail();
})

</script>

<style lang="scss">

</style>