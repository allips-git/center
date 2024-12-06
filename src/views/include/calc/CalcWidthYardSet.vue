<template>
    <div class="flex flex-col gap-3 *:flex *:gap-4">

        <div>
            <IftaLabel class="w-full">
                <label>설치위치 <span class="ml-1 text-red-600">*</span></label>
                <InputText v-model="esti['common']['location']" placeholder="기타" class="w-full"/> 
            </IftaLabel>
    
            <IftaLabel class="w-full">
                <Select v-model="esti['curtain']['proc']" :options="data['proc']" optionLabel="name" optionValue="value" class="w-full" />
                <label>가공방법</label>
            </IftaLabel>
        </div>

        <div>
            <IftaLabel class="w-full">
            <Select v-model="esti['curtain']['addColor']" :options="data['addColor']" optionLabel="name" optionValue="value" class="w-full" />
                <label>색상추가</label>
            </IftaLabel>
    
            <IftaLabel class="w-full">
                <Select v-model="esti['curtain']['shape']" :options="data['shape']" optionLabel="name" optionValue="value" class="w-full" />
                <label>형상선택</label>
            </IftaLabel>
        </div>
        <div>
            <IftaLabel class="w-full">
            <Select v-model="esti['curtain']['split']" :options="data['split']" optionLabel="name" optionValue="value" class="w-full" />
                <label>분할</label>
            </IftaLabel>

            <IftaLabel class="w-full">
                <label>수량</label>
                <InputNumber v-model="esti['curtain']['cQty']" showButtons buttonLayout="horizontal" :step="1" fluid @update:modelValue="esti.getUnitCalc()">
                <template #incrementbuttonicon>
                    <span class="pi pi-plus" />
                </template>
                <template #decrementbuttonicon>
                    <span class="pi pi-minus" />
                </template>
            </InputNumber>
            </IftaLabel>
        </div>

        <div>
            <IftaLabel class="w-full">
                <label>가로(CM)<span class="ml-1 text-red-600">*</span></label>
                <InputText v-keyfilter.int v-model="esti['common']['width']" class="w-full" @update:modelValue="esti.getUnitCalc()"/>
            </IftaLabel>
    
            <IftaLabel class="w-full">
                <label>세로(CM)</label>
                <InputText v-keyfilter.int v-model="esti['common']['height']" class="w-full" @update:modelValue="esti.getUnitCalc()"/>
            </IftaLabel>
        </div>

        <div>
            <IftaLabel class="w-full">
                <Select v-model="esti['curtain']['use']" :options="data['usage']" optionLabel="name" optionValue="value" class="w-full" @update:modelValue="esti.getUnitCalc()"/>
                <label>원단 사용량</label>
            </IftaLabel>
    
            <InputGroup>
            <IftaLabel class="w-full">
                <label class="!text-indigo-600 !font-bold">최종계산</label>
                <InputText v-keyfilter.int v-model="esti['curtain']['size']" class="w-full"/>    
            </IftaLabel>
            <InputGroupAddon>
                <span class="!text-indigo-600 !font-bold">{{ esti['common']['unitNm'] }}</span>
            </InputGroupAddon>
        </InputGroup>
        </div>
    
        <div v-if="esti['curtain']['addColor'] === 'T'" class="py-5 flex-col border-y mt">
            <h2 class="text-sm text-indigo-600 font-bold">안쪽 컬러를 선택해주세요.</h2>
            <div class="flex gap-4">
                <IftaLabel class="w-full">
                    <label>안쪽컬러 <span class="ml-1 text-red-600">*</span></label>
                    <InputText placeholder="" class="w-full"/>    
                </IftaLabel>
        
                <InputGroup class="max-w-[200px]">
                    <IftaLabel class="w-full">
                        <label class="!text-indigo-600 !font-bold">최종계산</label>
                        <InputText placeholder="" class="w-full"/>    
                    </IftaLabel>
                    <InputGroupAddon>
                        <span class="!text-indigo-600 !font-bold">폭</span>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        
            <div class="flex gap-4">
                <IftaLabel class="w-full">
                    <label>기둥 컬러<span class="ml-1 text-red-600">*</span></label>
                    <InputText placeholder="" class="w-full"/>    
                </IftaLabel>
        
                <InputGroup class="max-w-[200px]">
                    <IftaLabel class="w-full">
                        <label class="!text-indigo-600 !font-bold">최종계산</label>
                        <InputText placeholder="" class="w-full"/>    
                    </IftaLabel>
                    <InputGroupAddon>
                        <span class="!text-indigo-600 !font-bold">폭</span>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'; 
import InputNumber from 'primevue/inputnumber';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import IftaLabel from 'primevue/iftalabel';
import { useDataStore, useEstiStore } from '@/store';

const data = useDataStore();
const esti = useEstiStore();
</script>