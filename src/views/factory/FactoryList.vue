<template>
<main>
    <BackHeader title="공장" />
    <div class="relative px-4 mt-2 custom-left-tab">
        <Tabs value="0">
            <TabList>
                <Tab value="0">플랜오더 공장</Tab>
                <Tab value="1">외주 공장</Tab>
            </TabList>
            <TabPanels>
                <TabPanel value="0">
                    <div class="pt-3 pb-20">
                        <div class="fixed flex justify-end w-full pt-3 md:px-5 bottom-4 right-4">
                            <Button label="공장코드 추가" icon="pi pi-plus" size="large" @click="getPopOpen('sysFactorySearch')"/>
                        </div>
                        <ul class="w-full">
                            <li class="flex gap-3 py-4 border-b" v-for="(item, index) in factory['sys']['list']" :key="index" @click="getSysDetail(item.faCd, item.appGb)">
                                    <img :src="getImage(item.imgUrl)" class="w-full max-w-[78px] h-[87px] rounded-lg object-cover" alt="">
                                
                                <div class="w-[calc(100%-78px)]">
                                    <div class="flex justify-between">
                                        <p class="mb-1 font-bold">{{ item.faNm }}</p>
                                        <div class="text-sm text-right *:px-3 *:py-1 *:rounded-full font-bold">
                                            <p v-if="item['appGb'] === 'E'" class="text-blue-500 ">승인 대기</p>
                                            <p v-if="item['appGb'] === 'N'" class="text-orange-500">반려</p>
                                        </div>
                                    </div>
                                    <p class="text-sm text-gray-600">{{ item.tel }}</p>
                                    <p class="text-sm text-gray-400">{{ item.addr + ' ' + item.addrDetail }}</p>
                                    <!-- <div class="flex flex-wrap gap-1 mt-2">
                                        <Tag value="블라인드" severity="info" class="*:!text-xs"></Tag>
                                        <Tag value="블라인드" severity="info" class="*:!text-xs"></Tag>
                                    </div> -->
                                </div>
                            </li>
                        </ul>
                    </div>
                </TabPanel>
                <TabPanel value="1">
                    <div class="pt-3 pb-20">
                        <div class="fixed flex justify-end w-full pt-3 md:px-5 bottom-4 right-4">
                            <Button label="외주공장 추가" icon="pi pi-plus" size="large" @click="getPopOpen('outFactorySet')" />
                        </div>
                    <ul>
                        <li class="flex flex-col py-4 border-b" v-for="(item, index) in factory['out']['list']" :key="index" @click="getOutDetail(item.fcCd)">
                            <p class="mb-1 text-sm font-bold">{{ item.faNm }}</p>
                            <p class="text-t-lv-1 text-10">{{ item.tel }}</p>
                            <p class="text-gray-400 text-10">{{ item.addr + ' ' + item.addrDetail }}</p>
                        </li>
                    </ul>
                    </div>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>

    <!-- 공장 코드 추가 다이얼로그 -->
    <Dialog v-model:visible="popup['pop']['sysFactorySearch']" header="공장코드 추가" 
        :modal=true position="bottom" class="custom-dialog-bottom"
        @update:visible="getPopClose(true, 'sysFactorySearch')">
        <FactorySearch/>
    </Dialog>

    <!-- 외주 공장 저장 다이얼로그 -->
    <Dialog v-model:visible="popup['pop']['outFactorySet']" header="외주공장 등록" 
        :modal=true position="bottom" :dismissableMask="true" class="custom-dialog-bottom"
        @update:visible="getPopClose(true, 'outFactorySet')">
        <OutFactorySet/>
    </Dialog>
</main>
</template>

<script setup lang="ts">
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
// import Tag from 'primevue/tag';
import BackHeader from '@/components/layouts/BackHeader.vue'
import FactorySearch from '@/views/include/factory/FactorySearch.vue'
import OutFactorySet from '@/views/include/factory/OutFactorySet.vue'
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePopupStore, useFactoryStore } from '@/store';
import { usePopup } from '@/assets/js/popup';

const router    = useRouter();
const popup     = usePopupStore();
const factory   = useFactoryStore();

const { getPopupOpen, getPopupClose } = usePopup();

const getPopOpen = (popNm: string) => {
    getPopupOpen(popNm);

    if(popNm === 'sysFactorySearch')
    {
        factory.getSysInfoReset();
    }
    else
    {
        factory.getOutInfoReset();
    }
}

const getPopClose = (gb: boolean, popNm: string) => {
    getPopupClose(popNm, gb);
}

const getImage = (imgUrl: string) => {
    return 'https://elasticbeanstalk-ap-northeast-2-627549176645.s3.ap-northeast-2.amazonaws.com/' + imgUrl;
}

const getSysDetail = (faCd: string, appGb: string) => {
    if(appGb === 'Y')
    {
        factory.getSysFaCd(faCd);
        router.push({ name: 'FactoryDetail' });
    }
}

const getOutDetail = (fcCd: string) => {
    factory.getOutFcCd(fcCd);
    router.push({ name: 'OutDetail' });
}

onMounted(() => {
    factory.getList();
})
</script>

<style lang="scss">

</style>