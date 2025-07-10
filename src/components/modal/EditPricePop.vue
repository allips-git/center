<template>
    <div class="input-layout-box">
        <IftaLabel class="w-full">
            <label>현재가격</label>
            <InputNumber v-model="esti['common']['saleUnit']" class="w-full" disabled/>
        </IftaLabel>

        <IftaLabel class="w-full">
            <label>수정가격</label>
            <InputNumber v-model="price" class="w-full" />
        </IftaLabel>

        <div class="grid grid-cols-2 gap-2 justify-between mt-2 btn-2-layout-box">
            <Button severity="secondary" label="취소" @click="getPopupClose('priceChange', true)"/>
            <Button label="확인" @click="getApply"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import IftaLabel from 'primevue/iftalabel';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import { ref, onMounted } from 'vue';
import { useEstiStore } from '@/store';
import { usePopup } from '@/assets/js/popup';

const { getPopupClose } = usePopup();

const price = ref(null);
const esti  = useEstiStore();

const getApply = async () => {
    await esti.getUnitSet(price.value);
    await esti.getUnitCalc();
    getPopupClose('priceChange');
}

onMounted(() => {
    price.value = null;
})
</script>