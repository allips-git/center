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
                        <Button label="공장코드 추가" icon="pi pi-plus" size="small" @click="factoryCodePop = true"/>
                    </div>
                    <ul>
                        <li class="border-b py-3 flex flex-col" v-for="(factory, index) in factories" :key="index" >
                        <p class="font-bold mb-1">{{ factory.name }}</p>
                        <p class="text-sm text-gray-600">{{ factory.phone }}</p>
                        <p class="text-sm text-gray-400">{{ factory.address }}</p>
                        </li>
                    </ul>
                </TabPanel>
                <TabPanel value="1">
                    <div class="w-full flex justify-end">
                        <Button label="외주공장 추가" icon="pi pi-plus" size="small" @click="outsourcePop = true" />
                    </div>
                    <ul>
                        <li class="border-b py-3 flex flex-col" v-for="(outsource, index) in outsourcelist" :key="index" >
                            <p class="font-bold mb-1">{{ outsource.name }}</p>
                            <p class="text-sm text-gray-600">{{ outsource.phone }}</p>
                            <p class="text-sm text-gray-400">{{ outsource.address }}</p>
                        </li>
                    </ul>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>

    <!-- 공장 코드 추가 다이얼로그 -->
    <Dialog v-model:visible="factoryCodePop" 
    header="공장코드 추가" 
    :modal=true
    position="bottom"
    class="custom-dialog-bottom"
    >
        <div class="p-5">
            <div class="form-gap-box">
                    <IftaLabel>
                        <IconField>
                            <InputText id="username" placeholder=""  class="w-full"/>
                            <InputIcon class="pi pi-search" />
                        </IconField>
                        <label for="username">공장 코드</label>
                    </IftaLabel>

                        <IftaLabel class="w-full">
                            <label for="emali">공장 이름</label>
                            <InputText id="emali" placeholder="" class="w-full"/>    
                        </IftaLabel>

                        <IftaLabel class="w-full">
                            <label for="emali">종목</label>
                            <InputText id="emali" placeholder="" class="w-full"/>    
                        </IftaLabel>

                        <IftaLabel class="w-full">
                            <label for="emali">담당자 성명</label>
                            <InputText id="emali" placeholder="" class="w-full"/>    
                        </IftaLabel>
                    </div>
            <div class="w-full sticky bottom-0 mt-10">
                <Button type="button" label="거래신청" @click="alarmDetailsPop = false" class="w-full"></Button>
            </div>
        </div>
    </Dialog>

    <!-- 외주 공장 저장 다이얼로그 -->
    <Dialog v-model:visible="outsourcePop" 
    header="외주공장 저장" 
    :modal=true
    position="bottom"
    class="custom-dialog-bottom"
    >
        <div class="p-5">
            <div class="form-gap-box">
                    <IftaLabel>
                        <InputText id="username" placeholder=""  class="w-full"/>
                        <label for="username">공장 이름</label>
                    </IftaLabel>

                        <IftaLabel class="w-full">
                            <label for="emali">전화번호</label>
                            <InputText id="emali" placeholder="" class="w-full"/>    
                        </IftaLabel>

                        <IftaLabel>
                        <IconField>
                            <InputText id="username" placeholder=""  class="w-full"/>
                            <InputIcon class="pi pi-search" />
                        </IconField>
                        <label for="username">주소</label>
                    </IftaLabel>

                        <IftaLabel class="w-full">
                            <label for="emali">상세 주소</label>
                            <InputText id="emali" placeholder="" class="w-full"/>    
                        </IftaLabel>

                        <IftaLabel class="w-full">
                            <label for="emali">입금 계좌 정보</label>
                            <InputText id="emali" placeholder="" class="w-full"/>    
                        </IftaLabel>

                        <IftaLabel class="w-full">
                            <label for="emali">카카오톡 연동 전화번호</label>
                            <InputText id="emali" placeholder="" class="w-full"/>    
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
import { ref } from 'vue';

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


const factoryCodePop = ref(false)
const outsourcePop = ref(false)

const factories = ref([
  {
    name: '공장이름1',
    phone: '010-9182-1212',
    address: '부산 수영구 수영로 411-1 수영로',
  },
  {
    name: '공장이름2',
    phone: '010-1234-5678',
    address: '부산 해운대구 해운대해변로 123',
  },

]);

const outsourcelist = ref([
  {
    name: '외주 이름1',
    phone: '010-9182-1212',
    address: '부산 수영구 수영로 411-1 수영로',
  },
  {
    name: '외주 이름2',
    phone: '010-1234-5678',
    address: '부산 해운대구 해운대해변로 123',
  },
  // 추가 공장 정보...
]);


</script>

<style lang="scss">

</style>