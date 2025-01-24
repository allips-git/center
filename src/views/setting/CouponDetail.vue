<template>
    <div>
        <BackHeader title="쿠폰 메뉴 설정"/>
        <main class="px-4 pb-32 pc-contents-h-box">
        <div class="relative mt-2 custom-left-tab">
            <Tabs value="0">
                <TabList>
                    <Tab value="0">금액</Tab>
                    <Tab value="1">퍼센트</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0">
                        <section class="mt-3 form-gap-box !gap-8 pt-3">
                            <div class="relative flex items-center justify-between w-full text-sm">
                                <label class="w-[150px] flex-none text-t-lv3">쿠폰이름</label>
                                <InputText class="w-full font-medium text-right !border-0 !border-b max-w-[124px] !pr-0" placeholder="쿠폰이름 입력"/>
                            </div>

                            <div class="relative flex items-center justify-between w-full text-sm">
                                <label class="w-[100px] flex-none text-t-lv3">할인 금액 입력</label>
                                <InputNumber class="w-full font-bold *!text-right inputNumber-color *:!border-0 *:!border-b *:w-full max-w-[124px] *:!pr-4" />
                                <span class="absolute right-0 font-bold translate-y-1/2 bottom-1/2">원</span>
                            </div>
                        </section>
                    </TabPanel>
                    <TabPanel value="1">
                        <section class="mt-3 form-gap-box !gap-8 pt-3">
                            <div class="relative flex items-center justify-between w-full text-sm">
                                <label class="w-[150px] flex-none text-t-lv3">쿠폰이름</label>
                                <InputText class="w-full font-medium text-right !border-0 !border-b max-w-[124px] !pr-0" placeholder="쿠폰이름 입력"/>
                            </div>

                            <div class="relative flex items-center justify-between w-full text-sm">
                                <label class="w-[100px] flex-none text-t-lv3">할인율</label>
                                <InputNumber class="w-full font-bold *!text-right inputNumber-color *:!border-0 *:!border-b *:w-full max-w-[124px] *:!pr-4" />
                                <span class="absolute right-0 font-bold translate-y-1/2 bottom-1/2">%</span>
                            </div>
                        </section>
                    </TabPanel>
                </TabPanels>
            </Tabs>   
        </div>
            <div class="bottom-fixed-btn-box md:!absolute">
                <route-link to="/setting/coupon_detail">
                    <Button label="쿠폰 추가" size="large" class="w-full"/>
                </route-link>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import IftaLabel from 'primevue/iftalabel';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputNumber from 'primevue/inputnumber';
import SelectButton from 'primevue/selectbutton';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

import { ref } from 'vue'

const options = ref(['원', '%']);
const value   = ref('%');



</script>


<style lang="scss" >
.custom-input-select-btn{
    height: 100% !important;
    &.p-selectbutton .p-togglebutton:first-child{
        border-radius: 0 !important;
    }
    > button{
        height: 100%;
    }
}
.custom-InputGroupAddon{
    padding: 0 !important;
    flex:  none
}
</style>