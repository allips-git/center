<template>
    <div>
        <div class="p-4 flex flex-col gap-5">
            <div class="flex gap-2">
                <Select v-model="product['fcCd']" placeholder="브랜드 선택" :options="product['option']" optionLabel="label" optionValue="value" @change="getList"/> 
                <IconField class="table-search-input w-full">
                    <InputIcon class="z-10">
                        <i class="pi pi-search z-10" />
                    </InputIcon>
                    <InputText v-model="product['search']" placeholder="제품명 검색" class="w-full" @keyup.enter="getList"/>
                </IconField>
            </div>
        </div>
        <div class="flex gap-2 px-4 pb-2 w-full">
            <Button label="실측 둘러보기" outlined rounded />
            <Button label="커튼 실측" outlined rounded @click="getExItem('EX000001')"/>
            <Button label="블라인드 실측" outlined rounded @click="getExItem('EX000002')"/>
        </div>
        <ul class="flex flex-col">
            <li v-for="(item, index) in product['list']" :key="index" class="border-b">
                <div class="flex justify-between items-center px-5 py-4">
                    <div :for="item['itemCd']" class="label-checkbox-box  items-center" @click="toggleSubList(index, item['itemCd'])">
                        <RadioButton :inputId="item['itemCd']" v-model="product['itemCd']" :value="item['itemCd']"/>
                        <label :for="item['itemCd']" class="flex items-center">
                            {{ item.itemNm }} 
                            <Badge v-if="item['noUsed']" value="주문불가" severity="danger" class="ml-2"></Badge>
                        </label>
                    </div>
                    <p class="text-sm flex-none">{{ item['unit'] }} {{ getAmt(item['amt']) }}원</p>
                </div>
                <ul class="bg-gray-50" v-if="isActive(index) && !item['noUsed']">
                    <li v-for="(color, colorIndex) in item.colorLists" :key="colorIndex" :class="color" class="pl-10 py-4 border-b border-gray-200 last:border-b-0">
                        <div class="label-checkbox-box" @click="getItemChoice(color['icCd'])">
                            <RadioButton />
                            <label class="flex items-center">
                                {{ color['icNm'] }}
                                <Badge v-if="color['useYn'] === 'N'" value="주문불가" severity="danger" class="ml-2"></Badge>
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
import Badge from 'primevue/badge';
import RadioButton from 'primevue/radiobutton';
import { ref, onMounted } from 'vue';
import { useProductStore, useEstiStore } from '@/store';
import { getCommas } from '@/assets/js/function';
import { usePopup } from '@/assets/js/popup';

const product = useProductStore();
const esti    = useEstiStore();
const { getPopupOpen } = usePopup();

// 현재 열려 있는 하위 목록의 인덱스
const activeIndex = ref<number | null>(null);

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
    getPopupOpen('itemSet');
    
    const result = await product.getInfo();

    await esti.getCommonSet(product['info']);
    await esti.getUnitCalc();
    
    if(product['info']['ordGb'] === 'S')
    {
        /** 연동된 공장의 특수계산기 정보를 적용 */
        switch(product['info']['unit'])
        {
            case '001':
                esti.getBlindSet(result['calc']);
            break;
            case '002': case '003':
                esti.getCurtainSet(result['calc']);
            break;
        }
    }
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

const getList = () => {
    product.getList();
}

onMounted(async () => {
    await product.getReset();
    await product.getFactory();
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