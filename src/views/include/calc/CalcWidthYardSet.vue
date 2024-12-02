<template>
    <div class="flex flex-col gap-3 *:flex *:gap-4">

        <div>
            <IftaLabel class="w-full">
                <label for="emali">설치위치 <span class="ml-1 text-red-600">*</span></label>
                <InputText id="emali" placeholder="" class="w-full"/>    
            </IftaLabel>
    
            <IftaLabel class="w-full">
                <Select placeholder="선택" class="w-full" />
                <label for="emali">가공방법</label>
            </IftaLabel>
        </div>

        <div>
            <IftaLabel class="w-full">
            <Select placeholder="선택" class="w-full" />
                <label for="">색상추가</label>
            </IftaLabel>
    
            <IftaLabel class="w-full">
                <Select placeholder="선택" class="w-full" />
                <label for="">형상선택</label>
            </IftaLabel>
        </div>
        <div>
            <IftaLabel class="w-full">
            <Select placeholder="선택" class="w-full" />
                <label for="">분할</label>
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

        <div>
            <IftaLabel class="w-full">
                <label for="emali">가로(CM)<span class="ml-1 text-red-600">*</span></label>
                <InputText id="emali" placeholder="" class="w-full"/>    
            </IftaLabel>
    
            <IftaLabel class="w-full">
                <label for="emali">세로(CM)</label>
                <InputText id="emali" placeholder="" class="w-full"/>    
            </IftaLabel>
        </div>

        <div>
            <IftaLabel class="w-full">
                <Select placeholder="선택" class="w-full" />
                <label for="emali">원단 사용량</label>
            </IftaLabel>
    
            <InputGroup>
            <IftaLabel class="w-full">
                <label class="!text-indigo-600 !font-bold" for="emali">최종계산</label>
                <InputText id="emali" placeholder="" class="w-full"/>    
            </IftaLabel>
            <InputGroupAddon>
                <span class="!text-indigo-600 !font-bold">폭</span>
            </InputGroupAddon>
        </InputGroup>
        </div>
    
        <div class="py-5 flex-col border-y mt">
        <h2 class="text-sm text-indigo-600 font-bold">안쪽 컬러를 선택해주세요.</h2>
        <div class="flex gap-4">
            <IftaLabel class="w-full">
                <label for="emali">안쪽컬러 <span class="ml-1 text-red-600">*</span></label>
                <InputText id="emali" placeholder="" class="w-full"/>    
            </IftaLabel>
    
            <InputGroup class="max-w-[200px]">
                <IftaLabel class="w-full">
                    <label class="!text-indigo-600 !font-bold" for="emali">최종계산</label>
                    <InputText id="emali" placeholder="" class="w-full"/>    
                </IftaLabel>
                <InputGroupAddon>
                    <span class="!text-indigo-600 !font-bold">폭</span>
                </InputGroupAddon>
            </InputGroup>
        </div>
    
        <div class="flex gap-4">
            <IftaLabel class="w-full">
                <label for="emali">기둥 컬러<span class="ml-1 text-red-600">*</span></label>
                <InputText id="emali" placeholder="" class="w-full"/>    
            </IftaLabel>
    
            <InputGroup class="max-w-[200px]">
                <IftaLabel class="w-full">
                    <label class="!text-indigo-600 !font-bold" for="emali">최종계산</label>
                    <InputText id="emali" placeholder="" class="w-full"/>    
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

</script>