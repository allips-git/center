<template>
<main class="p-5 !pb-32">
    
    <div class="flex justify-end">
            <Button label="제품 삭제" size="small" severity="danger" />
        </div>
    <div class="input-layout-box">
        <div class="flex justify-between w-full items-center">
            <h1 class="font-bold">제품명<span class="ml-0.5 text-red-500">*</span></h1>
        </div>
        <IftaLabel class="w-full">
            <InputText id="username" class="w-full"/>
            <label for="emali">제품 이름</label>
        </IftaLabel>

        <h1 class="mt-4 font-bold">색상 추가<span class="ml-0.5 text-red-500">*</span></h1>
        <div class="flex gap-2">
            <IftaLabel class="w-full">
                <InputText id="username" class="w-full"/>
                <label for="emali">색상이름</label>
            </IftaLabel>
            <Button label="색상 추가" class="w-28"/>
        </div>

        <div class="flex gap-2">
            <IftaLabel class="w-full">
                <InputText id="username" class="w-full"/>
                <label for="emali">색상이름</label>
            </IftaLabel>
            <Button label="삭제" class="w-28" severity="danger" outlined />
        </div>

        <h1 class="mt-4 font-bold">옵션 설정<span class="ml-0.5 text-red-500">*</span></h1>
        <InputGroup>
            <IftaLabel class="w-full flex gap-2">
                <InputText id="username" class="w-full"/>
                <label for="emali">기본 단위</label>
            </IftaLabel>
            <Select class="!w-40 !border-l-[0.5px] !focus:border-l-2 custom_select" v-model="selectedUnit" :options="unit" optionLabel="name" />
        </InputGroup>

        <InputGroup>
            <IftaLabel class="w-full flex gap-2">
                <InputText id="username" class="w-full"/>
                <label for="emali">기본 높이</label>
            </IftaLabel>
            <InputGroupAddon>cm</InputGroupAddon>
        </InputGroup>

        <InputGroup>
            <IftaLabel class="w-full flex gap-2">
                <InputText id="username" class="w-full"/>
                <label for="emali">매입 가격</label>
            </IftaLabel>
            <InputGroupAddon>원</InputGroupAddon>
        </InputGroup>

        <InputGroup>
            <IftaLabel class="w-full flex gap-2">
                <InputText id="username" class="w-full"/>
                <label for="emali">판매 가격</label>
            </IftaLabel>
            <InputGroupAddon>원</InputGroupAddon>
        </InputGroup>

        <div class="bottom-fixed-btn-box">
            <Button label="저장" size="large"/>
        </div>
    </div>
</main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IftaLabel from 'primevue/iftalabel';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';


const selectedUnit = ref('회베');
const unit = ref([
    { name: '회베' },

]);

</script>

<style lang="scss">
.custom_select{
    .p-select-label{
        display: flex;
        align-items: center;
        justify-content: center;
    }
}


</style>