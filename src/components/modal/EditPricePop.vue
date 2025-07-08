<template>
    <div class="input-layout-box">
        <IftaLabel class="w-full">
            <label>현재가격</label>
            <InputNumber class="w-full" />
        </IftaLabel>

        <IftaLabel class="w-full">
            <label>수정가격</label>
            <InputNumber class="w-full" />
        </IftaLabel>


        <div class="grid grid-cols-2 gap-2 justify-between mt-2 btn-2-layout-box">
            <Button severity="secondary" label="취소" @click="getClose"/>
            <Button label="확인" @click="getApply"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import IftaLabel from 'primevue/iftalabel';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';

const emit = defineEmits(['getClose', 'getApply']);

const getClose = () => {
    emit('getClose');
}

const getApply = () => {
    emit('getApply');
}
    
</script>