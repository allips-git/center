<template>
    <main class="pb-24">
        <!-- <BackHeader title="고객상세" /> -->
        <section class="p-4">
            <div class="flex justify-between items-center">
                <h2 class="text-base font-black">{{ client['detail']['clientNm'] }}</h2>
                <Button label="정보수정" outlined severity="secondary" size="small" @click="getClientModify" class="outlined-button"/>
            </div>
            <ul class="flex flex-col gap-[12px] mt-3 rounded-md text-xs !text-t-lv2">
                <li class="flex items-center">
                    <p class="w-24 whitespace-nowrap">전화번호</p>
                    <p class="capsuel_sky" @click="getNavi('tel', client['detail']['tel'])">{{ client['detail']['tel'] }}</p>
                </li>
                <li class="flex items-center">
                    <p class="w-24 whitespace-nowrap">주소</p>
                    <p class="capsuel_sky" :data-address="client['detail']['addr']" @click="getNavi('addr', client['detail']['addr'])">({{ client['detail']['zip'] }}) {{ client['detail']['addr'] }}</p>
                </li>
                <li class="flex">
                    <p class="w-24 whitespace-nowrap">상세주소</p>
                    <p class="font-medium text-t-lv1">{{ client['detail']['addrDetail'] }}</p>
                </li>
                <li class="flex">
                    <p class="w-24 whitespace-nowrap">등록일</p>
                    <p class="font-medium text-t-lv1">{{ client['detail']['regDt'] }}</p>
                </li>
                <li class="flex">
                    <p class="w-24 whitespace-nowrap">담당자</p>
                    <p class="font-medium text-t-lv1"> {{ client['detail']['person'] }}</p>
                </li>
                <li class="flex">
                    <p class="w-24 whitespace-nowrap">그룹명</p>
                    <p class="font-medium text-t-lv1">{{ client['detail']['groupNm'] }}</p>
                </li> 
            </ul>
        </section>
        <div class="gray-bar !mb-[10px]"></div>
        <div class="custom-customer-tab">
            <Tabs value="0" class="overflow-hidden px-4 py-[10px] w-full">
                <TabList class="w-full border border-[#E4E5E9] rounded overflow-hidden">
                    <Tab value="0" class="flex flex-col gap-1 justify-center items-center w-1/3 !text-13 tab-header"><span class="text-lg font-bold text-p-lv2">{{ client['detail']['cnt']['ing'] }}</span>판매중 </Tab>
                    <Tab value="1" class="flex flex-col gap-1 justify-center items-center w-1/3 !text-13 tab-header"><span class="text-lg font-bold text-p-lv2">{{ client['detail']['cnt']['comp'] }}</span>판매완료 </Tab>
                    <Tab value="2" class="flex flex-col gap-1 justify-center items-center w-1/3 !text-13 tab-header"><span class="text-lg font-bold text-p-lv2">{{ client['detail']['cnt']['cancel'] }}</span>판매취소</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0">
                        <div class="flex flex-col gap-5 py-4">
                            <section v-for="(item, index) in getList(1)" :key="index">
                                <ProcessCard :info="item"/> 
                            </section>
    
                            <div class="flex flex-col gap-2 justify-center items-center py-10 text-center" v-if="getList(1).length === 0">
                                <div class="flex justify-center items-center bg-red-50 rounded-full size-16"> <span class="!text-2xl text-red-500  pi pi-times"></span></div>
                                <p class="text-center">판매중인 항목이 없습니다.</p>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value="1">
                        <div class="flex flex-col gap-5 p-4">
                            <section v-for="(item, index) in getList(2)" :key="index">
                                <ProcessCard :info="item"/>
                            </section>
                            <div class="flex flex-col items-center justify-center gap-2 py-10 text-center h-[312px]" v-if="getList(2).length === 0">
                                <div class="flex justify-center items-center bg-red-50 rounded-full size-16"> <span class="!text-2xl text-red-500  pi pi-times"></span></div>
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
                                <div class="flex justify-center items-center bg-red-50 rounded-full size-16"> <span class="!text-2xl text-red-500  pi pi-times"></span></div>
                                <p class="text-center">판매취소된 항목이 없습니다.</p>
                            </div>
                            
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
        <!-- <div class="flex justify-center pb-5">
            <Button label="신규 명세표" icon="pi pi-plus" size="large" @click="getNewEsti" />
        </div> -->

        <div class="fixed right-4 bottom-14 md:bottom-14 register-button">
            <Button label="신규 명세표" icon="pi pi-plus" size="large" @click="getNewEsti"/>
        </div>

        <Dialog v-model:visible="popup['pop']['itemList']" header="제품선택" 
            :modal=true position="center" class="custom-dialog-full"
            @update:visible="getPopupClose('itemList', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose('itemList', true)" severity="contrast" text icon="pi pi-times"/>
                    <h2 class="modal-backheader-title">제품선택</h2>
                </div>
            </template>
            <ProductChoice/>
        </Dialog>
    
        <Dialog v-model:visible="popup['pop']['itemSet']" header="제품등록" 
            :modal=true position="center" class="custom-dialog-full"
            @update:visible="getPopupClose('itemSet', true)">
            <template #header>
                <div class="modal-fullheader change-button">
                    <Button @click="getPopupClose('itemSet', true)" severity="contrast" text icon="pi pi-arrow-left" class="flex justify-start"/>
                    <h2 class="modal-backheader-title">제품등록</h2>
                    <Button label="제품 변경" size="small" outlined @click="getItemChange" class="!z-[100] !bg-p-lv4 !text-white"/>
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
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopupClose('clientSet', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose('clientSet', true)" severity="contrast" text icon="pi pi-times" />
                    <h2 class="modal-backheader-title">고객 정보 수정</h2>
                </div>
            </template>
            <CustomerListSet/>

        </Dialog>

        <Dialog v-model:visible="popup['pop']['estiList']" header="명세서"
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopupClose('estiList', true)">
            <template #header>
                <div class="modal-fullheader change-button">
                    <Button @click="getPopupClose('estiList', true)" severity="contrast" text icon="pi pi-arrow-left" class="flex justify-start"/>
                    <h2 class="modal-backheader-title">명세서</h2>
                    <Button label="제품 추가 등록" size="small" outlined @click="getEstiAdd" class="!z-[100] !bg-p-lv4 !text-white esti-button"/>
                </div>
            </template>
            <EstiList/>
        </Dialog>

        <Dialog v-model:visible="popup['pop']['orderList']" header="발주서" 
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopupClose('orderList', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose('orderList', true)" severity="contrast" text icon="pi pi-times" />
                    <h2 class="modal-backheader-title">발주서</h2>
                </div>
            </template>
            <OrderList/>
        </Dialog>

        <Dialog v-model:visible="popup['pop']['estiMate']" header="견적서" 
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopupClose('estiMate', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose('estiMate', true)" severity="contrast" text icon="pi pi-times" />
                    <h2 class="modal-backheader-title">견적서</h2>
                </div>
            </template>
            <EstimateModal/>
        </Dialog>

        <Dialog v-model:visible="popup['pop']['conMate']" header="계약서" 
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopupClose('conMate', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose('conMate', true)" severity="contrast" text icon="pi pi-times" />
                    <h2 class="modal-backheader-title">계약서</h2>
                </div>
            </template>
            <ConmateModal/>
        </Dialog>

        <Dialog v-model:visible="popup['pop']['payList']" header="결제내역" 
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopupClose('payList', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose('payList', true)" severity="contrast" text icon="pi pi-times" />
                    <h2 class="modal-backheader-title">계약서</h2>
                </div>
            </template>
            <CustomerPayList/>
        </Dialog>

        <Dialog v-model:visible="popup['pop']['outOrderMate']" header="외주 발주서" 
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopupClose('outOrderMate', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose('outOrderMate', true)" severity="contrast" text icon="pi pi-times" />
                    <h2 class="modal-backheader-title">외주 발주서</h2>
                </div>
            </template>
            <OutOrderMateModal/>
        </Dialog>
    </main>
</template>
    
<script setup lang="ts">
import ProcessCard from "@/components/card/ProcessCard.vue";
import ProductChoice from "@/views/include/ProductChoice.vue";
import ProductRegister from "@/views/include/ProductRegister.vue";
import CustomerListSet from '@/views/include/CustomerListSet.vue';
import EstimateModal from "@/views/customer/EstimateModal.vue";
import ConmateModal from "@/views/customer/ConmateModal.vue";
import EstiList from '@/views/include/customer/EstiList.vue';
import OrderList from "@/views/customer/OrderList.vue";
import CustomerPayList from "@/views/customer/PayList.vue";
import OutOrderMateModal from "@/views/customer/OutOrderMateModal.vue";
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import { onMounted, onUnmounted } from 'vue';
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

const getEstiAdd = () => {
    esti.getType('I');
    esti.getReset();
    getPopupOpen('itemList');
}

const getClientModify = async () => {
    getPopupOpen('clientSet');
    await client.getReset();
    await client.getInfo();
}

onMounted(async () => {
    await client.getDetail();
})

onUnmounted(async () => {
    await client.getList();
})

</script>

<style lang="scss">

</style>