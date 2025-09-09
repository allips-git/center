<template>
  <div class="input-layout-box">
    <div class="flex flex-col gap-2 mt-2">
      <Button class="w-full" size="large" label="커튼 실측" @click="getEx('EX000001')" />
      <Button class="w-full" size="large" label="블라인드 실측" @click="getEx('EX000002')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore, useEstiStore, useActualStore } from '@/store'
import { usePopup } from '@/assets/js/popup'

const product = useProductStore();
const esti    = useEstiStore();
const actual  = useActualStore();

const { getPopupOpen, getPopupClose } = usePopup();

const getEx = async (itemCd: string) => {
    await product.getEx(itemCd, 'N');
    await esti.getReset();
    await esti.getCommonSet(product['info']);
    await esti.getUnitCalc();
    
    getPopupClose('actualChoice', true);
    getPopupOpen('itemSet');
}
</script>

<style lang="scss"></style>
