<template>
<main>
    <BackHeader title="공장" />
    <div class="relative">
        <Tabs value="0">
            <TabList>
                <Tab value="0">플랜오더 공장</Tab>
                <Tab value="1">외주공장</Tab>
            </TabList>
            <TabPanels>
                <TabPanel value="0">
                    <div class="w-full flex justify-end px-5 pt-3">
                        <Button label="공장코드 추가" icon="pi pi-plus" size="small" @click="getPopOpen('sysFactorySearch')"/>
                    </div>
                    <ul>
                        <li class="border-b py-3 flex flex-col" v-for="(item, index) in factory['sys']['list']" :key="index" >
                        <p class="font-bold mb-1">{{ item.faNm }}</p>
                        <p class="text-sm text-gray-600">{{ item.tel }}</p>
                        <p class="text-sm text-gray-400">{{ item.addr + ' ' + item.addrDetail }}</p>
                        </li>
                    </ul>
                </TabPanel>
                <TabPanel value="1">
                    <div class="w-full flex justify-end px-5 pt-3">
                        <Button label="외주공장 추가" icon="pi pi-plus" size="small" @click="getPopOpen('outFactorySet')" />
                    </div>
                    <ul>
                        <li class="border-b py-3 px-4 flex flex-col" v-for="(item, index) in factory['out']['list']" :key="index" >
                            <p class="font-bold mb-1">{{ item.faNm }}</p>
                            <p class="text-sm text-gray-600">{{ item.tel }}</p>
                            <p class="text-sm text-gray-400">{{ item.addr + ' ' + item.addrDetail }}</p>
                        </li>
                    </ul>
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
    <Dialog v-model:visible="popup['pop']['outFactorySet']" header="외주공장 저장" 
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
import BackHeader from '@/components/layouts/BackHeader.vue'
import FactorySearch from '@/views/include/factory/FactorySearch.vue'
import OutFactorySet from '@/views/include/factory/OutFactorySet.vue'
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

onMounted(() => {
    factory.getList();
})
</script>

<style lang="scss">

</style>