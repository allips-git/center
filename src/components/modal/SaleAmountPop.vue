<template>
    <div class="input-layout-box">
        <InputGroup>
            <IftaLabel class="w-full">
                <InputNumber v-model="info['dcInfo']['val']" class="w-full" @update:modelValue="(value) => getDcInput(value)" />
                <label>할인 금액 입력</label>
            </IftaLabel>
            <InputGroupAddon class="custom-InputGroupAddon">
                <SelectButton v-model="info['dcInfo']['unit']" 
                    :options="data['discount']" optionLabel="label" optionValue="value" class="custom-input-select-btn" 
                    @change="getValCheck"/>
            </InputGroupAddon>
        </InputGroup>
        <IftaLabel class="w-full">
            <Textarea v-model="info['dcInfo']['memo']" rows="3" cols="30" class="w-full" />
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
import InputNumber from 'primevue/inputnumber';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Textarea from 'primevue/textarea';
import SelectButton from 'primevue/selectbutton';
import { useDataStore, useEstiStore, useOrderStore } from '@/store';

const props = defineProps({
    gubun : String
});

const emit  = defineEmits(['getApply', 'getClose']);
const data  = useDataStore();
const info  = props['gubun'] === 'E' ? useEstiStore() : useOrderStore();

const getDcInput = (amt: number) => {
    if(info['dcInfo']['unit'] === 'P' && amt > 100)
    {
        info['dcInfo']['val'] = 100;
    }
}

const getValCheck = () => {
    const value = info['dcInfo']['val'];

    info['dcInfo']['val'] = value > 100 ? 100 : value;
}

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