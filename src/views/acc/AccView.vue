<template>
<main class="h-full overflow-y-scroll">
        <BackHeader title="회계" />
        <main class="w-full">
            <section class="p-4 md:p-6">
            <div class="relative w-full bg-white ">
                <ul>
                    <li class="flex items-center gap-4">
                        <p class="text-gray-600">매출</p>
                        <p class="text-lg font-bold md:text-xl">{{ getAmt(acc['mainHeader']['saleAmt']) }}원</p>
                    </li>
                    <li class="flex items-center gap-4">
                        <p class="text-gray-600">매입</p>
                        <p class="text-lg font-bold md:text-xl">{{ getAmt(acc['mainHeader']['purcAmt']) }}원</p>
                    </li>
                    <li class="flex items-center gap-4">
                        <p class="text-gray-600 ">마진</p>
                        <p class="text-lg font-bold text-green-500 md:text-xl">{{ acc['mainHeader']['margin'] }}%</p>
                    </li>
                </ul>

                <Button label="전체 기록 보기" severity="secondary" class="!absolute right-0 top-0" size="large" @click="getPopupOpen('accMonth')"/>
            </div>
        </section>

        <div class="gray-bar"></div>
        <div>
 
    <div class="px-4 md:px-6">
        <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
      <div>
        <nav class="flex -mb-px space-x-8" aria-label="Tabs">
          <a v-for="tab in tabs" :key="tab.name" :href="tab.href" :class="[tab.current ? 'border-sky-500 border-b-4 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium']" :aria-current="tab.current ? 'page' : undefined">{{ tab.name }}</a>
        </nav>
      </div>
      <TabPanels>
            <TabPanel value="0">
                        
                            
                <template v-for="(date, dIndex) in acc.dateList" :key="dIndex">
                    <div class="flex items-center gap-4 pt-4">
                        <p class="flex-none text-gray-400">{{ date['stDt'] }}</p>
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
                            
                        
            </TabPanel>
            <TabPanel value="1">
                        <div class="hidden">
                            <div>
                                <template v-for="(date, dIndex) in acc.dateList" :key="dIndex">
                                    <div class="flex items-center gap-4 pt-4">
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
    </div>
  </div>
        <section class="hidden w-full custom-right-tab">
            <Tabs value="0" class="w-full">
                <TabList class="justify-end">
                    <Tab value="0" class="text-lg font-bold" @click="getTab('003')">계약</Tab>
                    <Tab value="1" class="text-lg font-bold" @click="getTab('012')">결제</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0">
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
})

const tabs = [
  { name: '계약', href: '#', current: true },
  { name: '결제', href: '#', current: false },

]

</script>

<style lang="scss">

</style>

