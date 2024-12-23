<template>
    <main>
        <div class="p-5">
            <div class="flex gap-2">
                <IconField class="table-search-input w-full">
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText v-model="factory['sys']['itemSearch']" placeholder="제품명 검색" class="w-full" @keyup.enter="factory.getSysItemList()"/>
                </IconField>
            </div>

            <div class="flex flex-col gap-4">
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

const getItemDetail = (itemCd: string) => {
    console.log(itemCd);
    getPopupOpen('sysFactoryItemSet');
}

onMounted(() => {
    factory.getSysItemList();
});
</script>

<style lang="scss">

</style>