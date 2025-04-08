<template>
    <div class="input-layout-box">
        <h1 class="mb-4 font-medium text-center">추가 금액</h1>
        <InputGroup>
            <InputGroupAddon class="custom-InputGroupAddon !overflow-hidden !rounded-sm">
                <SelectButton v-model="value" :options="options" class="custom-input-select-btn" disabled/>
            </InputGroupAddon>
            <IftaLabel class="w-full">
                <InputNumber v-model="info['addInfo']['val']" class="w-full"/>
            </IftaLabel>
        </InputGroup>
        <IftaLabel class="w-full">
            <Textarea v-model="info['addInfo']['memo']" autoResize cols="30" rows="1"  class="w-full" placeholder="메모입력" />
        </IftaLabel>
        
        <div class="mt-2 btn-2-layout-box">
            <Button severity="secondary" label="취소" @click="emit('getClose')"/>
            <Button label="확인" @click="emit('getApply')"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import IftaLabel from 'primevue/iftalabel';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import SelectButton from 'primevue/selectbutton';
import { ref } from 'vue'
import { useEstiStore, usePayStore } from '@/store';

const props = defineProps({
    gubun : String
});

const info  = props['gubun'] === 'E' ? useEstiStore() : usePayStore();
const emit  = defineEmits(['getApply', 'getClose']);

const value   = ref('원');
const options = ref(['원']);

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