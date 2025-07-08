<template>
    <div class="flex gap-4 product-select">
        <IftaLabel class="w-full">
            <label>설치위치 <span class="ml-1 text-red-600">*</span></label>
            <InputText v-model="esti['common']['location']" placeholder="기타" class="w-full"/>
        </IftaLabel>

        <IftaLabel class="flex-none w-full max-w-24 custom-center-number">
            <label>수량</label>
            <InputNumber inputId="qty" v-model="esti['ea']['qty']" showButtons buttonLayout="horizontal" :step="1" fluid @update:modelValue="esti.getUnitCalc()">
            <template #incrementbuttonicon>
                <span class="pi pi-plus" />
            </template>
            <template #decrementbuttonicon>
                <span class="pi pi-minus" />
            </template>
        </InputNumber>
        <small class="text-red-500">{{ esti['msg']['ea']['qty'] }}</small>
        </IftaLabel>
    </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'; 
import InputNumber from 'primevue/inputnumber';

import IftaLabel from 'primevue/iftalabel';
import { useEstiStore } from '@/store';

const esti = useEstiStore();
</script>