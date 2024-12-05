<template>
<div class="flex flex-col gap-3 *:flex *:gap-4">
    <div>
        <IftaLabel class="w-full">
            <label>설치위치<span class="ml-1 text-red-600">*</span></label>
            <InputText v-model="esti['common']['location']" placeholder="기타" class="w-full"/>    
        </IftaLabel>

        <IftaLabel class="w-full">
            <Select v-model="esti['blind']['division']" :options="data['division']" optionLabel="name" optionValue="value" class="w-full" />
            <label>분할</label>
        </IftaLabel>
    </div>

    <div>
        <IftaLabel class="w-full">
            <label>가로 (CM)<span class="ml-1 text-red-600">*</span></label>
        <InputText v-keyfilter.int v-model="esti['common']['width']" class="w-full"/>    
        </IftaLabel>

        <IftaLabel class="w-full">
            <label>세로 (CM)<span class="ml-1 text-red-600">*</span></label>
            <InputText v-keyfilter.int v-model="esti['common']['height']" class="w-full"/>    
        </IftaLabel>
    </div>


    <template class="">
        <!-- 분할없음 -->
        <div class="flex gap-3" v-if="esti['blind']['division'] === 1">
            <IftaLabel class="w-full">
                <label>수량 (좌)</label>
                <InputNumber v-model="esti['blind']['leftQty']" showButtons buttonLayout="horizontal" :step="1" fluid>
                <template #incrementbuttonicon>
                    <span class="pi pi-plus" />
                </template>
                <template #decrementbuttonicon>
                    <span class="pi pi-minus" />
                </template>
            </InputNumber>
            </IftaLabel>

            <IftaLabel class="w-full">
                <label>수량 (우)</label>
                <InputNumber v-model="esti['blind']['rightQty']" showButtons buttonLayout="horizontal" :step="1" fluid>
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
                <InputNumber v-model="esti['blind']['bQty']" showButtons buttonLayout="horizontal" :step="1" fluid>
                <template #incrementbuttonicon>
                    <span class="pi pi-plus" />
                </template>
                <template #decrementbuttonicon>
                    <span class="pi pi-minus" />
                </template>
            </InputNumber>
            </IftaLabel>
            <Button label="균등분할" class="w-full" @click="getEqual"/>
        </div>
    </template>
    <!-- 회베 분할 -->
    <template v-if="esti['blind']['division'] > 1">
        <!-- v-for -->
        <template>
            <div class="w-full">
                <p class="text-brand text-sm mb-2.5">분할 {{ esti['blind']['division'] }} 창 (아래값만 입력해주세요.)</p>
                <div class="w-full flex flex-col gap-4">
                    <div class=" flex gap-3 w-full">
                        <IftaLabel class="w-full">
                            <label>??<span class="ml-1 text-red-600">*</span></label>
                            <InputText id="emali" class="w-full"/>    
                        </IftaLabel>

                        <IftaLabel class="w-full">
                            <label>??<span class="ml-1 text-red-600">*</span></label>
                            <InputText id="emali" class="w-full"/>    
                        </IftaLabel>
                    </div>

                    <div class=" flex gap-3 w-full">
                        
                        <IftaLabel class="w-full">
                            <Select placeholder="선택" class="w-full" />
                            <label>??</label>
                        </IftaLabel>

                        <IftaLabel class="w-full">
                            <label>??<span class="ml-1 text-red-600">*</span></label>
                            <InputText id="emali" class="w-full"/>    
                        </IftaLabel>
                    </div>

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
import { getHebe, getPok, getYard } from '@/assets/js/order';

const data = useDataStore();
const esti = useEstiStore();

const getEqual = () => {
    const width    = Number(esti['common']['width']);
    const division = Number(esti['blind']['division']);

    let divisionWidth, nam, lastWidth;

    if(width > 0)
    {
        divisionWidth   = Number(Math.floor((width / division) * 10) / 10); /** 분할길이 */
        nam             = (divisionWidth * (division - 1)).toFixed(1);      /** 나머지 값 */
        lastWidth       = Number((width - nam).toFixed(1));                 /** 나머지 길이 */

        for(let i=0; i<division; i++)
        {
            esti['blind']['divSpec'][i]['width'] = (i === (division-1) ? lastWidth : divisionWidth);
            esti['blind']['divSpec'][i]['size']  = getHebe({
                width  : i === (division-1) ? lastWidth : divisionWidth,
                height : esti['common']['height'],
                size   : 0
            })
        }
    }

    // getUnitCalc();
}

</script>