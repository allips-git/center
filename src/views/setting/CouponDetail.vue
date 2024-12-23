<template>
    <div>
        <BackHeader title="쿠폰 메뉴 설정"/>
        <main class="pt-5 pb-32 pc-contents-h-box">
            <p class="px-5 text-lg font-bold">쿠폰 설정</p>
            <section class="px-5 mt-3 form-gap-box">
                <IftaLabel class="w-full ">
                    <InputText class="w-full"/>
                    <label>쿠폰이름</label>
                </IftaLabel>

                <InputGroup>
                    <IftaLabel class="w-full">
                        <InputNumber class="w-full"/>
                        <label>할인 금액 입력</label>
                    </IftaLabel>
                    <InputGroupAddon class="custom-InputGroupAddon">
                        <SelectButton v-model="value" :options="options" class="custom-input-select-btn"/>
                    </InputGroupAddon>
                </InputGroup>
            </section>
            
            <div class="bottom-fixed-btn-box md:!absolute">
                <route-link to="/setting/coupon_detail">
                    <Button label="쿠폰 만들기" size="large" class="w-full"/>
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