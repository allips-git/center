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
                    <div class="w-full flex justify-end">
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
                    <div class="w-full flex justify-end">
                        <Button label="외주공장 추가" icon="pi pi-plus" size="small" @click="getPopupOpen('outFactorySet')" />
                    </div>
                    <ul>
                        <li class="border-b py-3 flex flex-col" v-for="(item, index) in factory['out']['list']" :key="index" >
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
    <Dialog v-model:visible="popup['pop']['sysFactorySearch']" 
        header="공장코드 추가" 
        :modal=true
        position="bottom"
        class="custom-dialog-bottom"
        @update:visible="getPopClose(true, 'sysFactorySearch')"
    >
        <div class="p-5">
            <div class="form-gap-box">
                <IftaLabel>
                    <IconField>
                        <InputText v-model="factory['sys']['serachFaCd']" class="w-full" @keyup.enter="getSearch"/>
                        <InputIcon class="pi pi-search" />
                    </IconField>
                    <label for="faCd">공장 코드</label>
                </IftaLabel>

                <IftaLabel class="w-full">
                    <label for="faNm">공장 이름</label>
                    <InputText v-model="factory['sys']['info']['faNm']" class="w-full" disabled/>
                </IftaLabel>

                <IftaLabel class="w-full">
                    <label for="einItem">종목</label>
                    <InputText v-model="factory['sys']['info']['einItem']" class="w-full" disabled/>    
                </IftaLabel>

                <IftaLabel class="w-full">
                    <label for="person">담당자 성명</label>
                    <InputText v-model="factory['sys']['info']['person']" class="w-full" disabled/>    
                </IftaLabel>
            </div>
            <div class="w-full sticky bottom-0 mt-10">
                <Button type="button" label="거래신청" @click="getSysFactoryResult" class="w-full"></Button>
            </div>
        </div>
    </Dialog>

    <!-- 외주 공장 저장 다이얼로그 -->
    <Dialog v-model:visible="popup['pop']['outFactorySet']" 
    header="외주공장 저장" 
    :modal=true
    position="bottom"
    class="custom-dialog-bottom"
    @update:visible="getPopClose(true, 'outFactorySet')"
    >
        <div class="p-5">
            <div class="form-gap-box">
                    <IftaLabel>
                        <InputText id="username"   class="w-full"/>
                        <label for="username">공장 이름</label>
                    </IftaLabel>

                        <IftaLabel class="w-full">
                            <label for="emali">전화번호</label>
                            <InputText id="emali"  class="w-full"/>    
                        </IftaLabel>

                        <IftaLabel>
                        <IconField>
                            <InputText id="username"   class="w-full"/>
                            <InputIcon class="pi pi-search" />
                        </IconField>
                        <label for="username">주소</label>
                    </IftaLabel>

                        <IftaLabel class="w-full">
                            <label for="emali">상세 주소</label>
                            <InputText id="emali"  class="w-full"/>    
                        </IftaLabel>

                        <IftaLabel class="w-full">
                            <label for="emali">입금 계좌 정보</label>
                            <InputText id="emali"  class="w-full"/>    
                        </IftaLabel>

                        <IftaLabel class="w-full">
                            <label for="emali">카카오톡 연동 전화번호</label>
                            <InputText id="emali"  class="w-full"/>    
                        </IftaLabel>

                        <IftaLabel class="w-full">
                            <label for="emali">메모</label>
                            <Textarea id="over_label" rows="3" cols="30" style="resize: none" class="w-full" />
                        
                        </IftaLabel>
                    </div>
            <div class="w-full sticky bottom-0 mt-10">
                <Button type="button" label="저장" @click="alarmDetailsPop = false" class="w-full"></Button>
            </div>
        </div>
    </Dialog>

</main>
</template>

<script setup lang="ts">
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import IftaLabel from 'primevue/iftalabel';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Textarea from 'primevue/textarea';
import BackHeader from '@/components/layouts/BackHeader.vue'
import { ref, onMounted } from 'vue';
import { usePopupStore, useFactoryStore } from '@/store';
import { usePopup } from '@/assets/js/popup';

const popup   = usePopupStore();
const factory = useFactoryStore();

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

const getSearch = async () => {
    const result = await factory.getSysFactorySearch();

    console.log(result);
}

onMounted(() => {
    factory.getList();
})
</script>

<style lang="scss">

</style>