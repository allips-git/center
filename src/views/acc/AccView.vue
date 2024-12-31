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
    <section class="w-full custom-right-tab">
        <Tabs value="0" class="w-full">
            <TabList class="justify-end">
                <Tab value="0" class="text-lg font-bold ">계약 9건</Tab>
                <Tab value="1" class="text-lg font-bold">결제 12건</Tab>
            </TabList>
            <TabPanels>
                <TabPanel value="0">
                    <div class="">
                        <div>
                        <div class="flex items-center gap-2 px-4 py-2">
                            <p class="flex-none text-gray-400">{{ getDate(acc.searchDt) }}</p>
                            <div class="w-full h-px bg-gray-200"></div>
                        </div>
                        <template v-for="(item, index) in acc.dayList" :key="index">
                            <AccountList 
                                :clientNm="item.clientNm" 
                                :stNm="item.stNm" 
                                :addr="item.addr + ' ' + item.addrDetail"
                                :saleAmt="getAmt(item.saleAmt)" 
                                :purcAmt="getAmt(item.purcAmt)" 
                                :rev="getAmt(item.rev)" 
                            />
                        </template>
                    </div>
                    </div>
                </TabPanel>
                <TabPanel value="0"></TabPanel>
            </TabPanels>
        </Tabs>
    </section>
</main>

<Dialog v-model:visible="AccMonthPop" header="월간 분석" 
    :modal=true position="center" class="custom-dialog-bottom"
    @update:visible="getPopupClose('sysFactoryItemList', true)">
    <AccMonth/>
</Dialog>
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
import { ref, onMounted } from 'vue';
import { usePopupStore, useAccStore } from '@/store';
import { usePopup } from '@/assets/js/popup';

const popup = usePopupStore();
// const acc   = useAccStore();

const { getPopupOpen, getPopupClose } = usePopup();

const AccMonthPop = ref (false)
const loading = ref(false);



const salesData = ref([
    { title: '매출', amount: 131000 },
    { title: '환불', amount: 50000 },
    { title: '마진', amount: 81000 },
]);

const acc = ref({
    searchDt: '2023-12-31', // 예시 날짜
    dayList: [
        {
            clientNm: '고객1',
            stNm: '대기',
            addr: '서울시 강남구',
            addrDetail: '역삼동 123-45',
            saleAmt: 100000,
            purcAmt: 50000,
            rev: 50000,
        },
        {
            clientNm: '고객2',
            stNm: '결제',
            addr: '부산시 해운대구',
            addrDetail: '우동 67',
            saleAmt: 200000,
            purcAmt: 100000,
            rev: 100000,
        },
        {
            clientNm: '고객3',
            stNm: '발주',
            addr: '대구시 중구',
            addrDetail: '동인동 89',
            saleAmt: 150000,
            purcAmt: 75000,
            rev: 75000,
        },
        {
            clientNm: '고객4',
            stNm: '시공',
            addr: '인천시 연수구',
            addrDetail: '송도동 45',
            saleAmt: 250000,
            purcAmt: 125000,
            rev: 125000,
        },
        {
            clientNm: '고객5',
            stNm: 'A/S',
            addr: '광주시 서구',
            addrDetail: '농성동 12',
            saleAmt: 300000,
            purcAmt: 150000,
            rev: 150000,
        },
    ],
});

// 더미 함수 예시
const getDate = (date) => {
    // 날짜 포맷팅 로직 추가 (예: 'YYYY-MM-DD' 형식)
    return new Date(date).toLocaleDateString();
};

const getAmt = (amount) => {
    // 금액 포맷팅 로직 추가 (예: 통화 형식으로 변환)
    return amount.toLocaleString('ko-KR') + ' 원';
};

</script>

<style lang="scss">

</style>

