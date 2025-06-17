<template>
<main class="h-full overflow-y-scroll pb-14">
        <BackHeader title="회계" />
        <main class="w-full">
            <section class="p-4 md:p-6">
            <div class="relative w-full bg-white ">
                <ul>
                    <li class="flex items-center gap-4">
                        <p class="text-13 !text-t-lv3">매출</p>
                        <p class="font-bold text-18 text-t-lv1">{{ getAmt(acc['mainHeader']['saleAmt']) }}원</p>
                    </li>
                    <li class="flex items-center gap-4">
                        <p class="text-13 !text-t-lv3">매입</p>
                        <p class="font-bold text-18 text-t-lv1">{{ getAmt(acc['mainHeader']['purcAmt']) }}원</p>
                    </li>
                    <li class="flex items-center gap-4">
                        <p class="text-13 !text-t-lv3">마진</p>
                        <p class="font-bold text-green-500 text-18">{{ acc['mainHeader']['margin'] }}%</p>
                    </li>
                </ul>
                <div class="accbutton">
                    <Button label="전체 기록 보기" severity="secondary" class="!absolute right-0 top-0" size="large" @click="getPopupOpen('accMonth')"/>
                </div>
            </div>
        </section>

        <div class="gray-bar"></div>
  
 
   
    <div class="px-4 md:px-6">

        <section class="w-full custom-right-tab">
            <Tabs value="0" class="w-full">
                <TabList class="justify-end pt-2">
                    <Tab value="0" class="tab-header" @click="getTab('003')">계약</Tab>
                    <Tab value="1" class="tab-header" @click="getTab('012')">결제</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0">
                        <div class="">
                            <div>
                                <template v-for="(date, dIndex) in acc.dateList" :key="dIndex">
                                    <div class="flex items-center gap-2">
                                        <p class="flex-none text-desc">{{ date['stDt'] }}</p>
                                        <div class="w-full h-px bg-gray-200"></div>
                                    </div>
                                    <template v-for="(item, index) in acc.list" :key="index">
                                        <AccountList v-if="date['stDt'] === item.stDt" 
                                            :clientNm="item.clientNm" 
                                            :stNm="'계약'" 
                                            :addr="item.addr + ' ' + item.addrDetail"
                                            :saleAmt="getAmt(item.totalSaleAmt)" 
                                            :purcAmt="getAmt(item.totalPurcAmt)" 
                                            :rev="getAmt(item.rev)" />
                                    </template>
                                </template>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value="1">
                        <div class="">
                            <div>
                                <template v-for="(date, dIndex) in acc.dateList" :key="dIndex">
                                    <div class="flex items-center gap-2 px-4 py-2">
                                        <p class="flex-none text-gray-400">{{ date['stDt'] }}</p>
                                        <div class="w-full h-px bg-gray-200"></div>
                                    </div>
                                    <template v-for="(item, index) in acc.list" :key="index">
                                        <AccountList v-if="date['stDt'] === item.stDt" 
                                            :clientNm="item.clientNm" 
                                            :stNm="'결제'" 
                                            :addr="item.addr + ' ' + item.addrDetail"
                                            :saleAmt="getAmt(item.totalSaleAmt)" 
                                            :purcAmt="getAmt(item.totalPurcAmt)" 
                                            :rev="getAmt(item.rev)" />
                                    </template>
                                </template>
                            </div>
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </section>
    </div>
    </main>

    <!-- <Dialog v-model:visible="popup['pop']['accMonth']" header="월간 분석" 
        :modal=true position="center" class="custom-dialog-bottom"
        @update:visible="getPopupClose('accMonth', true)">
        <AccMonth/>
    </Dialog> -->

    <Dialog v-model:visible="popup['pop']['accMonth']" 
        header="월간 분석"
        :modal=true
        position="center"
        class="custom-dialog-bottom backPopup"
        @update:visible="getPopupClose('accMonth', true)">
        <template #header>
            <div class="modal-backheader">
                <Button @click="getPopupClose('accMonth', true)" severity="contrast" text icon="pi pi-times" iconPos="right"/>
                <h2 class="modal-backheader-title">월간 분석</h2>
            </div>
        </template>
            <AccMonth/>
        </Dialog>
</main>
</template>

<script setup lang="ts">
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import BackHeader from '@/components/layouts/BackHeader.vue'
import AccMonth from '@/views/include/acc/AccMonth.vue'
import AccountList from '@/components/list/AccountList.vue'
import { onMounted } from 'vue';
import { usePopupStore, useAccStore } from '@/store';
import { usePopup } from '@/assets/js/popup';
import { getCommas } from '@/assets/js/function';

const popup = usePopupStore();
const acc   = useAccStore();

const { getPopupOpen, getPopupClose } = usePopup();

const getAmt = (amt: number) => {
    return getCommas(Number(amt));
}

const getTab = async (stCd: string) => {
    await acc.getStCd(stCd);
    await acc.getAccAll();
}

onMounted(() => {
    acc.getAccAll();
});

</script>

<style lang="scss">

</style>

