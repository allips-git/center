<template>
    <main>
        <div class="p-4">
            <div class="flex gap-2 py-[10px]">
                <IconField class="w-full table-search-input gray_input">
                <InputIcon class="flex justify-center">
                    <i class="pi pi-search" />
                </InputIcon>
                <InputText v-model="factory['sys']['itemSearch']" placeholder="제품명 검색" class="w-full" @keyup.enter="factory.getSysItemList()"/>
            </IconField>
            </div>

            <div class="flex flex-col">
                <MoreCard v-for="(item, index) in factory['sys']['itemList']" :key="index"
                    :itemNm="item['itemNm']" :size="item['size']" :unitNm="item['unitNm']" :saleAmt="item['saleAmt']" :purcAmt="item['purcAmt']"
                    @click="getItemDetail(item['itemCd'])"/>
            </div>
        </div>
    </main>
</template>


<script setup lang="ts">
import IconField from 'primevue/iconfield'; 
import InputText from 'primevue/inputtext'; 
import InputIcon from 'primevue/inputicon'; 
import MoreCard from "@/components/card/MoreCard.vue";
import { onMounted } from 'vue';
import { useFactoryStore } from '@/store';
import { usePopup } from '@/assets/js/popup';

const factory = useFactoryStore();
const { getPopupOpen } = usePopup();

const getItemDetail = async (itemCd: string) => {
    await factory.getSysItemCd(itemCd);
    await getPopupOpen('sysFactoryItemSet');
}

onMounted(() => {
    factory.getSysItemList();
});
</script>

<style lang="scss">

</style>