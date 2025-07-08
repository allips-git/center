<template>
<div class="grid grid-cols-4 gap-x-4 gap-y-5 mt-[14px] product-select">
    
        <IftaLabel class="col-span-2 w-full">
            <label>설치위치<span class="ml-1 text-red-600">*</span></label>
            <InputText v-model="esti['common']['location']" placeholder="기타" class="w-full"/>
        </IftaLabel>

        <IftaLabel class="col-span-2 w-full">
            <Select v-model="esti['blind']['division']" :options="data['division']" 
                optionLabel="name" optionValue="value" class="w-full" @change="esti.getDivisionSet()"/>
            <label>분할</label>
        </IftaLabel>
    

    
        <IftaLabel class="col-span-2 w-full">
            <label>가로 (CM)<span class="ml-1 text-red-600">*</span></label>
            <InputText v-keyfilter.int id="bWidth" v-model="esti['common']['width']" class="w-full" @update:modelValue="esti.getUnitCalc()"/>
            <small class="text-red-500">{{ esti['msg']['blind']['bWidth'] }}</small>
        </IftaLabel>

        <IftaLabel class="col-span-2 w-full">
            <label>세로 (CM)<span class="ml-1 text-red-600">*</span></label>
            <InputText v-keyfilter.int id="bHeight" v-model="esti['common']['height']" class="w-full" @update:modelValue="esti.getUnitCalc()"/>
            <small class="text-red-500">{{ esti['msg']['blind']['bHeight'] }}</small>
        </IftaLabel>
    


    <template class="flex overflow-visible col-span-4">
        <!-- 분할없음 -->
        <div class="flex gap-4 w-full" v-if="esti['blind']['division'] === 1">
            <IftaLabel class="w-full">
                <label>수량 (좌)</label>
                <InputNumber inputId="leftQty" v-model="esti['blind']['leftQty']" showButtons buttonLayout="horizontal" :step="1" fluid @update:modelValue="esti.getUnitCalc()">
                <template #incrementbuttonicon>
                    <span class="pi pi-plus" />
                </template>
                <template #decrementbuttonicon>
                    <span class="pi pi-minus" />
                </template>
            </InputNumber>
            <small class="text-red-500">{{ esti['msg']['blind']['leftQty'] }}</small>
            </IftaLabel>

            <IftaLabel class="w-full">
                <label>수량 (우)</label>
                <InputNumber inputId="rightQty" v-model="esti['blind']['rightQty']" showButtons buttonLayout="horizontal" :step="1" fluid @update:modelValue="esti.getUnitCalc()">
                <template #incrementbuttonicon>
                    <span class="pi pi-plus" />
                </template>
                <template #decrementbuttonicon>
                    <span class="pi pi-minus" />
                </template>
            </InputNumber>
            </IftaLabel>
        </div>
        <!-- 분할 있음 -->
        <div class="flex gap-3 w-full" v-if="esti['blind']['division'] > 1">
            <IftaLabel class="w-full">
                <label>수량</label>
                <InputNumber inputId="bQty" v-model="esti['blind']['bQty']" showButtons buttonLayout="horizontal" :step="1" fluid @update:modelValue="esti.getUnitCalc()">
                    <template #incrementbuttonicon>
                        <span class="pi pi-plus" />
                    </template>
                    <template #decrementbuttonicon>
                        <span class="pi pi-minus" />
                    </template>
                </InputNumber>
                <small class="text-red-500">{{ esti['msg']['blind']['bQty'] }}</small>
            </IftaLabel>
            <Button label="균등분할" class="w-full" @click="getEqual"/>
        </div>
    </template>
    <!-- 회베 분할 -->
    <template class="col-span-1" v-if="esti['blind']['division'] > 1">
        <!-- v-for -->
        <template class="flex col-span-4">
            <div class="w-full">
                <p class="mb-2.5 text-sm text-brand">분할 {{ esti['blind']['division'] }} 창 (아래값만 입력해주세요.)</p>
                <div class="flex flex-col gap-4 w-full">
                    <div v-for="(item, index) in esti['blind']['divSpec']" :key="index" class="flex gap-3 w-full">
                        <IftaLabel class="w-full">
                            <InputText v-keyfilter.int :id="'bWidth'+index" v-model="item['width']" class="w-full" @input="getDivBlindWidth(index)"/>
                        </IftaLabel>
                        <IftaLabel class="w-full">
                            <InputText v-keyfilter.int v-model="esti['common']['height']" class="w-full" @input="getEqual"/>
                        </IftaLabel>
                        <IftaLabel class="w-full">
                            <Select v-model="item['handle']" :options="data['handle']" optionLabel="name" optionValue="value" class="w-full" />
                        </IftaLabel>
                        <IftaLabel class="w-full">
                            <label for=""></label>
                            <InputText v-model="item['size']" class="w-full" disabled/>
                        </IftaLabel>
                    </div>
                    <small class="text-red-500">{{ esti['msg']['blind'][`bWidth${index}`] }}</small>
                </div>
            </div>
        </template>
    </template>
</div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'; 
import InputNumber from 'primevue/inputnumber';
import IftaLabel from 'primevue/iftalabel';
import { useDataStore, useEstiStore } from '@/store';

const data = useDataStore();
const esti = useEstiStore();

const getEqual = async () => {
    await esti.getEqual();
    await esti.getUnitCalc();
}

const getDivBlindWidth = async (index: number) => {
    await esti.getDivBlindWidth(index);
    await esti.getUnitCalc();
}

</script>