<template>
    <div class="flex flex-col px-4 py-1">
        <div class="flex flex-col gap-5 md:pt-4">
            <div class="flex gap-2">
                <Select v-model="product['fcCd']" placeholder="브랜드 선택" :options="product['option']" optionLabel="label" optionValue="value" @change="getList" class="bg">
                    <template #dropdownicon>
                        <IconArrowDropDown class="w-4 h-4 text-l-lv0" />
                    </template>
                </Select>
                <IconField class="w-full bg">
                    <InputIcon class="z-10">
                        <IconSearch class="w-4 h-4 text-t-lv2" />
                    </InputIcon>
                    <InputText v-model="product['search']" placeholder="제품명 검색" class="w-full" @keyup.enter="getList"/>
                </IconField>
            </div>
        </div>
        <div class="flex w-full gap-[0.625rem] mt-2.5 py-2">
            <Button label="실측 불러보기" size="small"/>
            <Button label="커튼 실측" size="small" @click="getExItem('EX000001')"/>
            <Button label="블라인드 실측" size="small" @click="getExItem('EX000002')"/>
        </div>
        <ul class="flex flex-col">
            <li v-for="(item, index) in product['list']" :key="index" class="border-b">
                <div class="flex flex-col gap-1 items-center py-6" @click="toggleSubList(index, item['itemCd'])">
                    <div :for="item['itemCd']" class="items-center w-full">
                        <!-- <RadioButton :inputId="item['itemCd']" v-model="product['itemCd']" :value="item['itemCd']"/> -->
                        <label :for="item['itemCd']" class="flex justify-between items-center w-full text-base font-bold">
                            <span class="flex items-center">
                                {{ item.itemNm }} 
                                <span v-if="item['noUsed']" class="ml-2 text-red-500">(주문불가)</span>
                            </span>
                            <span class="text-sm font-normal text-gray-500">{{ item['alNm'] }}</span>
                        </label>
                    </div>
                    <p class="w-full text-sm text-gray-400">{{ item['unit'] }}</p>
                    <p class="w-full text-sm">{{ getAmt(item['amt']) }}원</p>
                </div>
                <ul class="bg-gray-50" v-if="isActive(index) && !item['noUsed']">
                    <li v-for="(color, colorIndex) in item.colorLists" :key="colorIndex" :class="color" class="px-5 py-4 text-center border-b border-gray-200 last:border-b-0">
                        <div class="" @click="getItemChoice(color['icCd'])">
                            <!-- <RadioButton /> -->
                            <label class="flex justify-center items-center w-full text-sm text-center" :class="{ 'text-red-500': color['useYn'] === 'N' }">
                                {{ color['icNm'] }}
                                <span v-if="color['useYn'] === 'N'">(주문불가)</span>
                                <!-- <Badge  value="주문불가" severity="danger" class="ml-2"></Badge> -->
                            </label>
                        </div>
                    </li>
                </ul>
            </li>
            <div ref="loadMoreTrigger" class="h-1"></div>
        </ul>        
    </div>
</template>

<script setup lang="ts">
import IconField from 'primevue/iconfield'; 
import InputText from 'primevue/inputtext'; 
import InputIcon from 'primevue/inputicon'; 
import { ref, onMounted, onUnmounted } from 'vue'
import { useProductStore, useEstiStore } from '@/store';
import { getCommas } from '@/assets/js/function';
import { usePopup } from '@/assets/js/popup';
import IconArrowDropDown from '@/components/icons/IconArrowDropDown.vue'
import IconSearch from '@/components/icons/IconSearch.vue'

const product = useProductStore();
const esti    = useEstiStore();
const { getPopupOpen } = usePopup();

// 현재 열려 있는 하위 목록의 인덱스
const activeIndex       = ref<number | null>(null);
const loadMoreTrigger   = ref(null);
const observer          = ref(null);

// 하위 목록 토글 함수
const toggleSubList = (index: number, itemCd: string) => {
    product['itemCd'] = itemCd;
    activeIndex.value = index;
};

// 현재 인덱스가 활성화되어 있는지 확인하는 함수
const isActive = (index: number) => {
    return activeIndex.value === index;
};

const getItemChoice = async (icCd: string) => {
    product['icCd'] = icCd;
    await esti.getOptionReset();
    
    getPopupOpen('itemSet');
    
    const result = await product.getInfo();
    if(result['calc'])
    {
        switch(product['info']['unit'])
        {
            case '001':
                await esti.getBlindSet(result['calc']);
            break;
            case '002': case '003': case '005': case '006':
                await esti.getCurtainSet(result['calc']);
            break;
        }
    }
    await esti.getCommonSet(product['info']);
    await esti.getUnitCalc();
}

const getExItem = async (itemCd: string) => {
    getPopupOpen('itemSet');

    await product.getEx(itemCd);
    await esti.getCommonSet(product['info']);
    await esti.getUnitCalc();
}

const getAmt = (amt: number) => {
    return getCommas(amt);
}

const getList = async () => {
    await product.getListReset();
    await product.getList();
}

onMounted(async () => {
    await product.getReset();
    await product.getFactory();

    observer.value = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && product.loading &&product.list.length !== 0) 
        {
            product.getList();
        }
    })
    
    if (loadMoreTrigger.value) 
    {
        observer.value.observe(loadMoreTrigger.value)
    }
})

onUnmounted(() => {
    if (observer.value) 
    {
        observer.value.disconnect()
    }
})

</script>

<style lang="scss">
.p-inputnumber-button{
    width: 56px !important;
    overflow: visible !important;
}
</style>