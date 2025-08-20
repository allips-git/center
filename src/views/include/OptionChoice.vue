<template>
    <div class="flex flex-col px-4 py-1">
        <div class="flex flex-col gap-5 py-[10px] md:pt-4">
            <div class="flex gap-2 mini_select">
                <IconField class="w-full table-search-input mini_input">
                    <InputIcon class="z-10">
                        <i class="z-10 pi pi-search" />
                    </InputIcon>
                    <InputText v-model="option['search']" placeholder="옵션명 검색" class="w-full !h-10 choice-input"/>
                </IconField>
            </div>
        </div>
        <ul class="flex flex-col">
            <li v-for="(item, index) in option['list']" :key="index" class="border-b">
                <div class="flex flex-col items-center gap-1 py-6" @click="toggleSubList(index, item['itemCd'])">
                    <div :for="item['itemCd']" class="items-center w-full">
                        <label :for="item['itemCd']" class="flex items-center text-base font-bold">
                            {{ item.itemNm }} 
                            <span v-if="item['noUsed']" class="ml-2 text-red-500">(주문불가)</span>
                        </label>
                    </div>
                    <p class="w-full text-sm">{{ getAmt(item['amt']) }}원</p>
                </div>
                <ul class="bg-gray-50" v-if="isActive(index) && !item['noUsed']">
                    <li v-for="(color, colorIndex) in item.colorLists" :key="colorIndex" :class="color" class="px-5 py-4 text-center border-b border-gray-200 last:border-b-0">
                        <div class="" @click="getItemChoice(color['icCd'])">
                            <!-- <RadioButton /> -->
                            <label class="flex items-center justify-center w-full text-sm text-center" :class="{ 'text-red-500': color['useYn'] === 'N' }">
                                {{ color['icNm'] }}
                                <span v-if="color['useYn'] === 'N'">(주문불가)</span>
                            </label>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>        
    </div>
</template>

<script setup lang="ts">
import IconField from 'primevue/iconfield'; 
import InputText from 'primevue/inputtext'; 
import InputIcon from 'primevue/inputicon'; 
import { ref, onMounted } from 'vue';
import { useProductStore, useOptionStore, useEstiStore } from '@/store';
import { getCommas } from '@/assets/js/function';
import { usePopup } from '@/assets/js/popup';

const product = useProductStore();
const option  = useOptionStore();
const esti    = useEstiStore();
const { getPopupClose } = usePopup();

// 현재 열려 있는 하위 목록의 인덱스
const activeIndex = ref<number | null>(null);

// 하위 목록 토글 함수
const toggleSubList = (index: number, itemCd: string) => {
    option['itemCd'] = itemCd;
    activeIndex.value = index;
};

// 현재 인덱스가 활성화되어 있는지 확인하는 함수
const isActive = (index: number) => {
    return activeIndex.value === index;
};

const getItemChoice = async (icCd: string) => {
    if(esti.common.options.find(item => item.icCd === icCd))
    {
        alert('이미 선택된 옵션입니다.');
        return;
    }
    else
    {
        option['icCd'] = icCd;
        await getPopupClose('optionList', true);

        const result = await option.getInfo(product.info.fcCd);

        if(result.info)
        {
            await esti.getOptionSet(result.info);
            await esti.getUnitCalc();
        }
    }
}

const getAmt = (amt: number) => {
    return getCommas(amt);
}

onMounted(async () => {
    await option.getReset();
    await option.getList(esti.common.ogCd);
})

</script>

<style lang="scss">
.p-inputnumber-button{
    width: 56px !important;
    overflow: visible !important;
}
.p-iftalabel {
    label{
        z-index: 10 !important;
        // background-color: white !important;
        // padding: 1px 0 1px 0;
    }
}
</style>