<template>
    <main>
        <BackHeader title="고객상세" />
            <section class="p-5">
                <h1 class="text-2xl font-bold ">{{ client['detail']['clientNm'] }}</h1>
                <ul class="flex flex-col gap-4 mt-5 rounded-md">
                    <li class="flex">
                        <p class="text-gray-600 w-24 whitespace-nowrap">전화번호</p>
                        <p>{{ client['detail']['tel'] }}</p>
                    </li>
                    <li class="flex">
                        <p class="text-gray-600 w-24 whitespace-nowrap">주소</p>
                        <p>({{ client['detail']['zip'] }}){{ client['detail']['addr'] }}</p>
                    </li>
                    <li class="flex">
                        <p class="text-gray-600 w-24 whitespace-nowrap">상세주소</p>
                        <p>{{ client['detail']['addrDetail'] }}</p>
                    </li>
                    <li class="flex">
                        <p class="text-gray-600 w-24 whitespace-nowrap">등록일</p>
                        <p>{{ client['detail']['regDt'] }}</p>
                    </li>
                    <li class="flex">
                        <p class="text-gray-600 w-24 whitespace-nowrap">담당자</p>
                        <p>{{ client['detail']['person'] }}</p>
                    </li>
                    <li class="flex">
                        <p class="text-gray-600 w-24 whitespace-nowrap">그룹명</p>
                        <p>{{ client['detail']['groupNm'] }}</p>
                    </li>
                </ul>
            
            </section>
            <Tabs value="0" class="w-full">
                <TabList class="">
                    <Tab value="0" class="flex items-center justify-center gap-2 w-1/3">판매중 <span class="size-4 text-xs flex items-center justify-center bg-indigo-50 rounded-full ">{{ client['detail']['cnt']['ing'] }}</span></Tab>
                    <Tab value="1" class="flex items-center justify-center gap-2 w-1/3">판매완료 <span class="size-4 text-xs flex items-center justify-center bg-indigo-50 rounded-full ">{{ client['detail']['cnt']['comp'] }}</span></Tab>
                    <Tab value="2" class="flex items-center justify-center gap-2 w-1/3">판매취소<span class="size-4 text-xs flex items-center justify-center bg-indigo-50 rounded-full ">{{ client['detail']['cnt']['cancel'] }}</span></Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0">
                        <section class="p-5 !pb-20 flex flex-col gap-5">
                            <ProcessCard :list="client['detail']['list']"/>
                        </section>
                    </TabPanel>
                    <TabPanel value="1">
                        <section class="p-5 !pb-20 flex flex-col gap-5"></section>
                    </TabPanel>
                    <TabPanel value="2">
                        <section class="p-5 !pb-20 flex flex-col gap-5"></section>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <div class="fixed bottom-4 right-4">
                 <Button label="신규 명세표" icon="pi pi-plus" size="large" @click="ProductRegisterPop = true" />
            </div>
        </main>
    <Dialog
    v-model:visible="ProductRegisterPop" 
    header="제품선택" 
    :modal=true
    position="bottom"
    class="custom-dialog-bottom"
    >
    <ProductRegister/>
    </Dialog>
</template>
    
<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import ProcessCard from "@/components/card/ProcessCard.vue";
import ProductRegister from "@/views/include/ProductRegister.vue";
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import Badge from 'primevue/badge';
import { ref, onMounted } from 'vue';
import { usePopupStore, useClientStore } from '@/store';

const client = useClientStore();
const ProductRegisterPop = ref (false)

onMounted(() => {
    client.getDetail();
})

</script>

<style lang="scss">

</style>