<template>
<main class="xl:h-[90vh]">
    <!-- @TODO Header fixed -->
    <BackHeader title="공장" />
    <div class="relative px-4 md:px-6 custom-left-tab">
        <Tabs value="0">
            <TabList>
                <Tab value="0" class="tab-header">플랜오더 공장</Tab>
                <Tab value="1" class="tab-header">외주 공장</Tab>
            </TabList>
            <TabPanels>
                <TabPanel value="0">
                    <div class="pb-20">
                        <button class="fixed z-50 pointer-events-auto bottom-14 right-4 xl:right-[calc((100vw-1280px)/2+6rem)] xl:bottom-14 2xl:right-[calc((100vw-1440px)/2+6rem)] register-button" >
                            <Button label="공장코드 추가" icon="pi pi-plus" size="large" @click="getPopOpen('sysFactorySearch')"/>
                        </button>
                        <ul class="w-full">
                            <li class="flex gap-3 py-[1rem] border-b border-l-lv4" v-for="(item, index) in factory['sys']['list']" :key="index" @click="getSysDetail(item.faCd, item.appGb)">
                                <img :src="getImage(item.imgUrl)" class="block w-[4rem] sm:w-[5rem] aspect-[1/1] rounded-lg object-cover" alt="">
                                <div class="relative flex-1 pt-1.5">
                                    <strong class="pr-14 text-sm sm:text-base font-bold leading-tight mb-[0.25rem] text-t-lv1">{{ item.faNm }}</strong>
                                    <div class="absolute top-0 right-0 text-desc text-right *:px-2 *:py-1 *:rounded-full font-bold">
                                        <p v-if="item['appGb'] === 'E'" class="text-p-lv3">승인 대기</p>
                                        <p v-if="item['appGb'] === 'N'" class="text-orange-500">반려</p>
                                    </div>
                                    <div class="text-xs text-t-lv1 sm:text-13">{{ item.tel }}</div>
                                    <div class="text-xs text-t-lv2 sm:text-13">{{ item.addr + ' ' + item.addrDetail }}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </TabPanel>
                <TabPanel value="1">
                    <div class="pb-20">
                        <div class="fixed bottom-14 right-4 xl:right-[calc((100vw-1280px)/2+6rem)] xl:bottom-14 2xl:right-[calc((100vw-1440px)/2+6rem)] register-button">
                            <Button label="외주공장 추가" icon="pi pi-plus" size="large" @click="getPopOpen('outFactorySet')" />
                        </div>
                        <ul class="w-full">
                            <li class="flex flex-col py-[1rem] px-1 border-b border-l-lv4" v-for="(item, index) in factory['out']['list']" :key="index" @click="getOutDetail(item.fcCd)">
                                <strong class="text-sm sm:text-base font-bold leading-tight mb-[0.25rem] text-t-lv1">{{ item.faNm }}</strong>
                                <div class="text-xs text-t-lv1 sm:text-13">{{ item.tel }}</div>
                                <div class="text-xs text-t-lv2 sm:text-13">{{ item.addr + ' ' + item.addrDetail }}</div>
                            </li>
                        </ul>
                    </div>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>

    <!-- 공장 코드 추가 다이얼로그 -->

    <Dialog v-model:visible="popup['pop']['sysFactorySearch']" 
        header="공장코드 추가"
        :modal=true
        position="center"
        class="custom-dialog-full"
        @update:visible="getPopClose(true, 'sysFactorySearch')">
        <template #header>
            <div class="modal-backheader">
                <Button @click="getPopClose(true, 'sysFactorySearch')" severity="contrast" text icon="pi pi-times" iconPos="right"/>
                <h2 class="modal-backheader-title">공장 코드 추가</h2>
            </div>
        </template>
            <FactorySearch/>
    </Dialog>

    <!-- 외주 공장 저장 다이얼로그 -->
    <!-- <Dialog v-model:visible="popup['pop']['outFactorySet']" header="외주공장 등록" 
        :modal=true position="bottom" :dismissableMask="true" class="custom-dialog-bottom"
        @update:visible="getPopClose(true, 'outFactorySet')">
        <OutFactorySet/>
    </Dialog> -->

    <Dialog v-model:visible="popup['pop']['outFactorySet']" 
        header="외주공장 등록"
        :modal=true
        position="center"
        class="custom-dialog-full"
        @update:visible="getPopClose(true, 'outFactorySet')">
        <template #header>
            <div class="modal-backheader">
                <Button @click="getPopClose(true, 'outFactorySet')" severity="contrast" text icon="pi pi-times" iconPos="right"/>
                <h2 class="modal-backheader-title">외주 공장 등록</h2>
            </div>
        </template>
            <OutFactorySet/>
    </Dialog>

    <Dialog v-model:visible="popup['pop']['sysFactoryDetail']" 
        header="공장 상세"
        :modal=true
        position="center"
        class="custom-dialog-full"
        @update:visible="getPopClose(true, 'sysFactoryDetail')">
        <template #header>
            <div class="modal-backheader">
                <Button @click="getPopClose(true, 'sysFactoryDetail')" severity="contrast" text icon="pi pi-times" iconPos="right"/>
                <h2 class="modal-backheader-title">공장 상세</h2>
            </div>
        </template>
            <SysFactoryDetail/>
    </Dialog>

    <Dialog v-model:visible="popup['pop']['outFactoryDetail']" 
        header="공장 상세"
        :modal=true
        position="center"
        class="custom-dialog-full"
        @update:visible="getPopClose(true, 'outFactoryDetail')">
        <template #header>
            <div class="modal-backheader">
                <Button @click="getPopClose(true, 'outFactoryDetail')" severity="contrast" text icon="pi pi-times" iconPos="right"/>
                <h2 class="modal-backheader-title">공장 상세</h2>
            </div>
        </template>
            <OutFactoryDetail/>
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
import SysFactoryDetail from "@/views/factory/FactoryDetail.vue";
import OutFactoryDetail from "@/views/factory/OutDetail.vue";
import { onMounted } from 'vue';
import { usePopupStore, useFactoryStore } from '@/store';
import { usePopup } from '@/assets/js/popup';

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

const getSysDetail = async (faCd: string, appGb: string) => {
    if(appGb === 'Y')
    {
        await factory.getSysFaCd(faCd);
        getPopupOpen('sysFactoryDetail');
    }
}

const getOutDetail = async (fcCd: string) => {
    await factory.getOutFcCd(fcCd);
    getPopupOpen('outFactoryDetail');
}

onMounted(() => {
    factory.getList();
})
</script>

<style lang="scss">

</style>