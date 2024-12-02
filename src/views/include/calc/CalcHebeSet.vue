<template>
<div class="flex flex-col gap-3 *:flex *:gap-4">
    <div>
        <IftaLabel class="w-full">
            <label for="emali">설치위치<span class="ml-1 text-red-600">*</span></label>
            <InputText id="emali" placeholder="" class="w-full"/>    
        </IftaLabel>

        <IftaLabel class="w-full">
            <Select placeholder="선택" class="w-full" />
            <label for="emali">분할</label>
        </IftaLabel>
    </div>

    <div>
        <IftaLabel class="w-full">
            <label for="emali">가로 (CM)<span class="ml-1 text-red-600">*</span></label>
            <InputText id="emali" placeholder="" class="w-full"/>    
        </IftaLabel>

        <IftaLabel class="w-full">
            <label for="emali">세로 (CM)<span class="ml-1 text-red-600">*</span></label>
            <InputText id="emali" placeholder="" class="w-full"/>    
        </IftaLabel>
    </div>


    <template class="">
        <!-- 분할없음 -->
        <div class="flex gap-3" v-if="division === '1'">
            <IftaLabel class="w-full">
                <label for="emali">수량 (좌)</label>
                <InputNumber inputId="horizontal-buttons" showButtons buttonLayout="horizontal" :step="1" fluid>
                <template #incrementbuttonicon>
                    <span class="pi pi-plus" />
                </template>
                <template #decrementbuttonicon>
                    <span class="pi pi-minus" />
                </template>
            </InputNumber>
            </IftaLabel>

            <IftaLabel class="w-full">
                <label for="emali">수량 (우)</label>
                <InputNumber inputId="horizontal-buttons" showButtons buttonLayout="horizontal" :step="1" fluid>
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
        <div class="flex gap-3 w-full" v-if="division === '2'">
            <IftaLabel class="w-full">
                <label for="emali">수량</label>
                <InputNumber inputId="horizontal-buttons" showButtons buttonLayout="horizontal" :step="1" fluid>
                <template #incrementbuttonicon>
                    <span class="pi pi-plus" />
                </template>
                <template #decrementbuttonicon>
                    <span class="pi pi-minus" />
                </template>
            </InputNumber>
            </IftaLabel>
            <Button label="균등분할" class="w-full"/>
        </div>
    </template>
    <!-- 회베 분할 -->
    <template v-if="division === '3'">
        <!-- v-for -->
        <template>
            <div class="w-full">
                <p class="text-brand text-sm mb-2.5">분할 ?? 창 (아래값만 입력해주세요.)</p>
                <div class="w-full flex flex-col gap-4">
                    <div class=" flex gap-3 w-full">
                        <IftaLabel class="w-full">
                            <label for="emali">??<span class="ml-1 text-red-600">*</span></label>
                            <InputText id="emali" placeholder="" class="w-full"/>    
                        </IftaLabel>

                        <IftaLabel class="w-full">
                            <label for="emali">??<span class="ml-1 text-red-600">*</span></label>
                            <InputText id="emali" placeholder="" class="w-full"/>    
                        </IftaLabel>
                    </div>

                    <div class=" flex gap-3 w-full">
                        
                        <IftaLabel class="w-full">
                            <Select placeholder="선택" class="w-full" />
                            <label for="emali">??</label>
                        </IftaLabel>

                        <IftaLabel class="w-full">
                            <label for="emali">??<span class="ml-1 text-red-600">*</span></label>
                            <InputText id="emali" placeholder="" class="w-full"/>    
                        </IftaLabel>
                    </div>

                </div>

            </div>
        </template>
    </template>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import InputText from 'primevue/inputtext'; 
import InputNumber from 'primevue/inputnumber';
import IftaLabel from 'primevue/iftalabel';

const division = ref ('3')

</script>