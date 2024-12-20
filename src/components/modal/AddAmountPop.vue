<template>
    <div class="input-layout-box">
        <InputGroup>
            <IftaLabel class="w-full">
                <InputNumber v-model="esti['addInfo']['val']" class="w-full"/>
                <label>할인 금액 입력</label>
            </IftaLabel>
            <InputGroupAddon class="custom-InputGroupAddon">
                <SelectButton v-model="value" :options="options" class="custom-input-select-btn" disabled/>
            </InputGroupAddon>
        </InputGroup>
        <IftaLabel class="w-full">
            <Textarea v-model="esti['addInfo']['memo']" rows="3" cols="30" class="w-full" />
            <label>메모입력</label>
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
import { useEstiStore } from '@/store';

const esti  = useEstiStore();
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