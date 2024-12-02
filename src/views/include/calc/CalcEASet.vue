<template>
    <div class="flex gap-4">
        <IftaLabel class="w-full">
            <label for="emali">설치위치 <span class="ml-1 text-red-600">*</span></label>
            <InputText id="emali" placeholder="" class="w-full"/>    
        </IftaLabel>

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
    </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'; 
import InputNumber from 'primevue/inputnumber';
import IftaLabel from 'primevue/iftalabel';
</script>