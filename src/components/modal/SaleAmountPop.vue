<template>
    <div class="input-layout-box">
        <IftaLabel class="w-full">
            <Select v-model="info['dcInfo']['cpCd']" :options="data['coupon']" optionLabel="label" optionValue="value" class="w-full" placeholder="쿠폰선택" @change="getCoupon"/>
        </IftaLabel>
        <InputGroup class="">
            <InputGroupAddon class="custom-InputGroupAddon !overflow-hidden !rounded-sm">
                <SelectButton v-model="info['dcInfo']['unit']" 
                    :options="data['discount']" optionLabel="label" optionValue="value" class="custom-input-select-btn" 
                    @change="getValCheck"/>
            </InputGroupAddon>
            <IftaLabel class="w-full btn-input-set">
                <InputNumber v-model="info['dcInfo']['val']" class="w-full" @update:modelValue="(value) => getDcInput(value)" />
            </IftaLabel>
        </InputGroup>
        <IftaLabel class="w-full">
            <Textarea v-model="info['dcInfo']['memo']" autoResize cols="30" rows="1" class="w-full" placeholder="메모" />
        </IftaLabel>
        <div class="grid grid-cols-2 gap-2 justify-between mt-2">
            <Button severity="secondary" label="취소" @click="emit('getClose')"/>
            <Button label="확인" @click="emit('getApply')"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import Select from 'primevue/select';
import IftaLabel from 'primevue/iftalabel';
import InputNumber from 'primevue/inputnumber';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Textarea from 'primevue/textarea';
import SelectButton from 'primevue/selectbutton';
import { useDataStore, useEstiStore, useOrderStore, usePayStore } from '@/store';

const props = defineProps({
    gubun : String
});

const emit  = defineEmits(['getApply', 'getClose']);
const data  = useDataStore();
const info  = props['gubun'] === 'E' ? useEstiStore() : ( props['gubun'] === 'O' ? useOrderStore() : usePayStore() );

const getCoupon = () => {
    const coupon        = info['dcInfo']['cpCd'];
    const couponData    = data['coupon'].find((item) => item.value === coupon);

    if(couponData)
    {
        info['dcInfo']['val']   = couponData.val;
        info['dcInfo']['unit']  = couponData.unit;
    }
}

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

.custom-InputGroupAddon{
    border-radius: 0 !important;

    .p-selectbutton .p-togglebutton{
        border-width: 0px !important;
    }
    &.p-inputgroupaddon:first-child{
        border-radius: 0 !important; 
    }
}
.btn-input-set{
    border-radius: 0px !important;
    .p-inputnumber{
        border-radius: 0px !important;
        input{
            border-radius: 0px !important;
            
        }
    }
}


.custom-input-select-btn{
    height: 100% !important;
    border-radius: 0 !important;
    
    &.p-selectbutton .p-togglebutton:first-child{
        border-radius: 0 !important;
    }
    
    > button{
        height: 100%;
    }
    &.p-selectbutton .p-togglebutton:last-child{
        border-radius: 0 !important;
    }
    .p-togglebutton{
        background-color: transparent;
    }
    .p-togglebutton-checked{
        background-color: var(--p-primary-500) !important; 
        &:before{
        background-color: var(--p-primary-500) !important; 
        
        }
        .p-togglebutton-content{
            color: white;
        }
    }
}
.custom-InputGroupAddon{
    padding: 0 !important;
    flex:  none
}
</style>