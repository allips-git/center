<template>
    <div class="input-layout-box">
        <InputGroup>
            <IftaLabel class="w-full">
                <InputText id="username" class="w-full"/>
                <label for="emali">할인 금액 입력</label>
            </IftaLabel>
            <InputGroupAddon class="custom-InputGroupAddon">
                <SelectButton v-model="value" :options="options" class="custom-input-select-btn" />
            </InputGroupAddon>
        </InputGroup>
        <IftaLabel class="w-full">
            <Textarea  rows="3" cols="30" class="w-full" />
            <label for="emali">메모입력</label>
        </IftaLabel>
        <div class="btn-2-layout-box mt-2">
            <Button severity="secondary" label="취소"/>
            <Button label="확인"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IftaLabel from 'primevue/iftalabel';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';

import Textarea from 'primevue/textarea';

import SelectButton from 'primevue/selectbutton';

const value = ref('원');
const options = ref(['원', '%']);

</script>

<style lang="scss" >
.custom-input-select-btn{
    height: 100% !important;
    &.p-selectbutton .p-togglebutton:first-child{
        border-radius: 0 !important;
    }
}
.custom-InputGroupAddon{
    padding: 0 !important;
    flex:  none
}
</style>