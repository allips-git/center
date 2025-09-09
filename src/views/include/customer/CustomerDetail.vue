<template>
    <main class="pb-24">
        <!-- <BackHeader title="고객상세" /> -->
        <section class="px-4 mb-6 sm:px-8">
            <div class="flex justify-between items-center py-1 sm:pt-5">
                <h2 class="font-bold text-15 sm:text-base text-t-lv1">{{ client['detail']['clientNm'] }}</h2>
                <Button label="정보수정" outlined size="small" severity="secondary" @click="getClientModify" />
            </div>
            <div class="mt-2 info-list">
                <dl class="info-set">
                    <dt class="title">
                        전화번호
                    </dt>
                    <dd class="desc">
                        <div v-if="client['detail']['tel']" class="capsuel_sky !inline-flex" @click="getNavi('tel', client['detail']['tel'])">
                            {{ client['detail']['tel'] }}
                        </div>
                    </dd>
                </dl>
                <dl class="info-set">
                    <dt class="title">
                        주소
                    </dt>
                    <dd class="desc">
                        <p v-if="client['detail']['addr']" class="capsuel_sky !inline-flex" :data-address="client['detail']['addr']" @click="getNavi('addr', client['detail']['addr'])">
                            <!-- ({{ client['detail']['zip'] }}) -->
                            {{ client['detail']['addr'] }}
                        </p>
                    </dd>
                </dl>
                <dl class="info-set">
                    <dt class="title">
                        상세주소
                    </dt>
                    <dd class="desc">
                        {{ client['detail']['addrDetail'] }}
                    </dd>
                </dl>
                <dl class="info-set">
                    <dt class="title">
                        등록일
                    </dt>
                    <dd class="desc">
                        {{ client['detail']['regDt'] }}
                    </dd>
                </dl>
                <dl class="info-set">
                    <dt class="title">
                        담당자
                    </dt>
                    <dd class="desc">
                        {{ client['detail']['person'] }}
                    </dd>
                </dl>
                <dl class="info-set">
                    <dt class="title">
                        그룹명
                    </dt>
                    <dd class="desc">
                        {{ client['detail']['groupNm'] }}
                    </dd>
                </dl>
            </div>
        </section>
        <div class="gray-bar" />
        <div class="px-4 my-6 sm:px-8 custom-customer-tab">
            <Tabs value="0" class="overflow-hidden w-full">
                <TabList class="overflow-hidden w-full rounded border border-l-lv4">
                    <Tab value="0" class="text-xs sm:text-13">
                        <strong class="text-lg count">{{ client['detail']['cnt']['ing'] }}</strong>판매중
                    </Tab>
                    <hr class="divider" />
                    <Tab value="1" class="text-xs sm:text-13">
                        <strong class="text-lg count">{{ client['detail']['cnt']['comp'] }}</strong>판매완료
                    </Tab>
                    <hr class="divider" />
                    <Tab value="2" class="text-xs sm:text-13">
                        <strong class="text-lg count">{{ client['detail']['cnt']['cancel'] }}</strong>판매취소
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0">
                        <div class="flex flex-col gap-5 py-4">
                            <section v-for="(item, index) in getList(1)" :key="index">
                                <ProcessCard :info="item"/> 
                            </section>
                            <div class="flex flex-col gap-2 items-center pt-2 text-center h-[280px]" v-if="getList(1).length === 0">
                                <div class="flex flex-col items-center">
                                    <div class="w-[6rem] opacity-75">
                                        <img src="/src/assets/img/img-empty.png" class="block w-full" alt="" />
                                    </div>
                                    <p class="text-sm font-medium text-center text-t-lv4">판매중인 항목이 없습니다.</p>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value="1">
                        <div class="flex flex-col gap-5 py-4">
                            <section v-for="(item, index) in getList(2)" :key="index">
                                <ProcessCard :info="item"/>
                            </section>
                            <div class="flex flex-col gap-2 items-center pt-2 text-center h-[280px]" v-if="getList(2).length === 0">
                                <div class="flex flex-col items-center">
                                    <div class="w-[6rem] opacity-75">
                                        <img src="/src/assets/img/img-empty.png" class="block w-full" alt="" />
                                    </div>
                                    <p class="text-sm font-medium text-center text-t-lv4">판매완료된 항목이 없습니다.</p>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value="2">
                        <div class="flex flex-col gap-5 py-4">
                            <section v-for="(item, index) in getList(3)" :key="index">
                                <ProcessCard :info="item"/>
                            </section>
                            <div class="flex flex-col gap-2 items-center pt-2 text-center h-[280px]" v-if="getList(3).length === 0">
                                <div class="flex flex-col items-center">
                                    <div class="w-[6rem] opacity-75">
                                        <img src="/src/assets/img/img-empty.png" class="block w-full" alt="" />
                                    </div>
                                    <p class="text-sm font-medium text-center text-t-lv4">판매취소된 항목이 없습니다.</p>
                                </div>
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
                <div class="modal-fullheader">
                    <Button @click="getPopupClose('itemSet', true)" severity="contrast" text icon="pi pi-arrow-left" class="flex justify-start"/>
                    <h2 class="modal-backheader-title">제품등록</h2>
                    <Button label="제품 변경" size="small" @click="getItemChange" class="!z-[100]"/>
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
                    <Button label="제품 추가 등록" size="small" @click="getEstiAdd('I')" class="!z-[100]"/>
                </div>
            </template>
            <EstiList/>
        </Dialog>

        <Dialog v-model:visible="popup['pop']['orderList']" header="발주서" 
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopupClose('orderList', true)">
            <template #header>
                <div class="modal-fullheader change-button">
                    <Button @click="getPopupClose('orderList', true)" severity="contrast" text icon="pi pi-arrow-left" class="flex justify-start" />
                    <h2 class="modal-backheader-title">발주서</h2>
                    <Button label="제품 추가 등록" size="small" @click="getEstiAdd('O')" class="!z-[100]"/>
                </div>
            </template>
            <OrderList/>
        </Dialog>

        <Dialog v-model:visible="popup['pop']['chatRoom']" header="채팅방 목록" 
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopupClose('chatRoom', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose('chatRoom', true)" severity="contrast" text icon="pi pi-times" />
                    <h2 class="modal-backheader-title">채팅방</h2>
                </div>
            </template>
            <ChatRoomModal/>
        </Dialog>

        <Dialog v-model:visible="popup['pop']['estiMate']" header="견적서 미리보기" 
            :modal=true position="center" class="custom-dialog-bottom" 
            @update:visible="getPopupClose('estiMate', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose(true, 'estiMate')" severity="contrast" text icon="pi pi-times"/>
                    <h2 class="modal-backheader-title">견적서 미리보기</h2>
                </div>
            </template>
            <ContractPreview/>
        </Dialog>
    
        <!-- <Dialog v-model:visible="popup['pop']['estiMate']" header="견적서" 
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopupClose('estiMate', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose('estiMate', true)" severity="contrast" text icon="pi pi-times" />
                    <h2 class="modal-backheader-title">견적서</h2>
                </div>
            </template>
            <EstimateModal/>
        </Dialog> -->

        <Dialog v-model:visible="popup['pop']['conMate']" header="계약서" 
            :modal=true position="center" class="custom-dialog-bottom" 
            @update:visible="getPopupClose('conMate', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose(true, 'conMate')" severity="contrast" text icon="pi pi-times"/>
                    <h2 class="modal-backheader-title">계약서 미리보기</h2>
                </div>
            </template>
            <ContractPreview/>
        </Dialog>

        <!-- <Dialog v-model:visible="popup['pop']['conMate']" header="계약서" 
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopupClose('conMate', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose('conMate', true)" severity="contrast" text icon="pi pi-times" />
                    <h2 class="modal-backheader-title">계약서</h2>
                </div>
            </template>
            <ConmateModal/>
        </Dialog> -->

        <Dialog v-model:visible="popup['pop']['payList']" header="결제내역" 
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopupClose('payList', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose('payList', true)" severity="contrast" text icon="pi pi-times" />
                    <h2 class="modal-backheader-title">결제서</h2>
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
import ChatRoomModal from "@/views/customer/ChatRoomModal.vue";
// import EstimateModal from "@/views/customer/EstimateModal.vue";
import ContractPreview from "@/views/include/setting/ContractPreview.vue";
// import ConmateModal from "@/views/customer/ConmateModal.vue";
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

const getNewEsti = async () => {
    await esti.getReset();
    await esti.getType('N');
    await getPopupOpen('itemList');
}

const getEstiAdd = async (type : 'I' | 'O') => {
    await esti.getType(type);
    await esti.getReset();
    await getPopupOpen('itemList');
}

const getClientModify = async () => {
    getPopupOpen('clientSet');
    await client.getReset();
    await client.getGb('Y');
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