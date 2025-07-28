<template>
    <div class="flex flex-col gap-6 *:flex">

        <div class="space-x-[12px] product-select">
            <IftaLabel class="w-full">
                <label>설치위치 <span class="ml-1 text-red-600">*</span></label>
                <InputText v-model="esti['common']['location']" placeholder="기타" class="w-full"/> 
            </IftaLabel>
    
            <IftaLabel class="w-full">
                <Select v-model="esti['curtain']['bproc']" :options="data['bproc']" optionLabel="name" optionValue="value" class="w-full" />
                <label>하단 가공법</label>
            </IftaLabel>
            <IftaLabel class="w-full">
                <Select v-model="esti['curtain']['proc']" :options="data['proc']" optionLabel="name" optionValue="value" class="w-full" />
                <label>가공법</label>
            </IftaLabel>
        </div>
    
        <div class="flex flex-col gap-8">
            <div class="flex gap-[10px] product-select">
                <IftaLabel class="flex-1 min-w-0">
                <Select v-model="esti['curtain']['addColor']" :options="data['addColor']" optionLabel="name" optionValue="value" class="w-full product-select" />
                <label>색상추가</label>
                </IftaLabel>

                <IftaLabel class="flex-1 min-w-0">
                <Select v-model="esti['curtain']['shape']" :options="data['shape']" optionLabel="name" optionValue="value" class="w-full" />
                <label>형상선택</label>
                </IftaLabel>

                <IftaLabel class="flex-1 min-w-0">
                <Select v-model="esti['curtain']['split']" :options="data['split']" optionLabel="name" optionValue="value" class="w-full" />
                <label>분할</label>
                </IftaLabel>

                <IftaLabel class="flex-1 min-w-0">
                <label>수량</label>
                <InputNumber inputId="cQty" v-model="esti['curtain']['cQty']" showButtons buttonLayout="horizontal" :step="1" fluid class="custom-input-number" @update:modelValue="esti.getUnitCalc()">
                    <template #incrementbuttonicon><span class="pi pi-plus" /></template>
                    <template #decrementbuttonicon><span class="pi pi-minus" /></template>
                </InputNumber>
                <small class="text-red-500">{{ esti['msg']['curtain'][`cQty`] }}</small>
                </IftaLabel>
            </div>

            <div class="flex gap-[10px] product-select fabric-select">
                <IftaLabel class="flex-1 min-w-0">
                <label>가로(CM)<span class="ml-1 text-red-600">*</span></label>
                <InputText v-keyfilter.int id="cWidth" v-model="esti['common']['width']" class="w-full !font-bold" @update:modelValue="esti.getUnitCalc()" />
                <small class="text-red-500">{{ esti['msg']['curtain'][`cWidth`] }}</small>
                </IftaLabel>

                <IftaLabel class="flex-1 min-w-0">
                <label>세로(CM)</label>
                <InputText v-keyfilter.int id="cHeight" v-model="esti['common']['height']" class="w-full !font-bold" @update:modelValue="esti.getUnitCalc()" />
                <small class="text-red-500">{{ esti['msg']['curtain'][`cHeight`] }}</small>
                </IftaLabel>

                <IftaLabel class="flex-1 min-w-0">
                <Select v-model="esti['curtain']['use']" :options="data['usage']" optionLabel="name" optionValue="value" class="w-full !font-bold " @update:modelValue="esti.getUnitCalc()" />
                <label>원단 사용량</label>
                </IftaLabel>

                <div class="relative flex-1 min-w-0">
                <IftaLabel class="flex-1 min-w-0">
                    <label class="!font-bold">최종계산</label>
                    <InputText v-keyfilter.int id="cSize" :value="esti['curtain']['size']" class="w-full text-left !text-sky-500 !font-bold custom-input-text" @input="getSize" />
                </IftaLabel>
                <span class="absolute right-2 bottom-1/2 text-sm translate-y-1/2">{{ esti['common']['unitNm'] }}</span>
                <small class="text-red-500">{{ esti['msg']['curtain'][`cSize`] }}</small>
                </div>
            </div>
        </div>

    
        <div v-if="esti['curtain']['addColor'] === 'T'" class="flex-col gap-4 py-5 border-dashed border-y">
            <h2 class="mb-2 text-sm text-sky-500">안쪽 컬러를 선택해주세요.</h2>
            <div class="grid grid-cols-4 gap-2">
                <IftaLabel class="col-span-3 w-full">
                    <label>안쪽컬러</label>
                    <Select v-model="esti['curtain']['inColor']" :options="esti.inColorList" optionLabel="icNm" optionValue="icCd" placeholder="안쪽 컬러를 선택해주세요." class="w-full" />
                </IftaLabel>
                <div class="relative col-span-1 w-full">
                    <IftaLabel class="w-full">
                        <InputText v-keyfilter.int id="inSize" v-model="esti['curtain']['inSize']" class="w-full !pr-8 text-left !text-sky-500 !font-bold" />
                    </IftaLabel>
                    <span class="absolute right-4 bottom-1/2 text-sm translate-y-1/2">{{ esti['common']['unitNm'] }}</span>
                    <small v-if="esti['msg']['curtain'][`inColor`] !== ''" class="text-red-500">{{ esti['msg']['curtain'][`inColor`] }}</small>
                    <small v-if="esti['msg']['curtain'][`inSize`] !== ''" class="text-red-500">{{ esti['msg']['curtain'][`inSize`] }}</small>
                </div>
            </div>
            
        
            <div class="grid grid-cols-4 gap-2">
                <IftaLabel class="col-span-3 w-full">
                    <label>기둥 컬러</label>
                    <InputText :value="`${esti['common']['itemNm']} / ${esti['common']['icNm']}`" class="w-full" disabled/>
                </IftaLabel>
                <div class="relative col-span-1 w-full">
                    <IftaLabel class="w-full">
                        <InputText v-model="esti.outSize" class="w-full !pr-8 text-left !text-sky-500 !font-bold" disabled/>
                    </IftaLabel>
                    <span class="absolute right-4 bottom-1/2 text-sm translate-y-1/2">{{ esti['common']['unitNm'] }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'; 
import InputNumber from 'primevue/inputnumber';
import IftaLabel from 'primevue/iftalabel';
import { useDataStore, useEstiStore } from '@/store';

const data      = useDataStore();
const esti      = useEstiStore();

const getSize = () => {
    const value = event.target.value;

    esti['curtain']['size'] = value;
}
</script>

<style scoped>
.custom-input-number {
    font-size: 0.75rem; /* text-xs */
}

.custom-input-number :deep(.p-inputnumber-input) {
    padding: 0 !important;
    font-size: 0.75rem;
    text-align: center !important;
}

.custom-input-number :deep(.p-inputnumber-button) {
    padding: 0.25rem !important;
}

.custom-input-text {
    padding: 0.625rem !important;
    font-size: 0.875rem;
}
</style>