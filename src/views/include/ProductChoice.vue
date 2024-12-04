<template>
    <div>
        <div class="p-4 flex flex-col gap-5">
            <div class="flex gap-2">
                <Select v-model="product['fcCd']" placeholder="브랜드 선택" :options="product['option']" optionLabel="label" optionValue="value" @change="getList"/> 
                <IconField class="table-search-input w-full">
                    <InputIcon class="z-10">
                        <i class="pi pi-search z-10" />
                    </InputIcon>
                    <InputText v-model="product['itemNm']" placeholder="제품명 검색" class="w-full" @keyup.enter="getList"/>
                </IconField>
            </div>
        </div>
        <div class="flex gap-2 px-4 pb-2 w-full">
            <Button label="실측 둘러보기" outlined rounded />
            <Button label="커튼 실측" outlined rounded @click="ProductRegisterPop = true" />
            <Button label="블라인드 실측" outlined rounded  @click="ProductRegisterPop = true" />
        </div>
        <ul class="flex flex-col">
            <li v-for="(item, index) in product['list']" :key="index" class="border-b">
            <div class="flex justify-between items-center px-5 py-4">
                <div class="label-checkbox-box  items-center" @click="toggleSubList(index)">
                    <RadioButton />
                    <label class="flex items-center">
                        {{ item.itemNm }} 
                        <Badge v-if="item['noUsed']" value="주문불가" severity="danger" class="ml-2"></Badge>
                    </label>
                </div>
                <p class="text-sm flex-none">폭 111,111,212원</p>
            </div>
                <ul class="bg-gray-50" v-if="isActive(index) && !item['noUsed']">
                    <li v-for="(color, colorIndex) in item.colorLists" :key="colorIndex" :class="color" class="pl-10 py-4 border-b border-gray-200 last:border-b-0">
                    <div class="label-checkbox-box">
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
    <Dialog
    v-model:visible="ProductRegisterPop" 
    header="제품선택" 
    :modal=true
    position="bottom"
    class="custom-dialog-bottom"
    >
        <ProductRegister/>
    </Dialog>
</template>

<script setup lang="ts">
import IconField from 'primevue/iconfield'; 
import InputText from 'primevue/inputtext'; 
import InputIcon from 'primevue/inputicon'; 
import Badge from 'primevue/badge';
import RadioButton from 'primevue/radiobutton';
import ProductRegister from "@/views/include/ProductRegister.vue";
import { ref, onMounted } from 'vue';
import { usePopupStore, useProductStore } from '@/store';

const product = useProductStore();

const ProductRegisterPop = ref(false) 


const unit = ref ('003')

// 상위 항목과 하위 항목을 함께 정의
const items = ref([
  {
    label: '아르키디아 1',
    colors: ['r-화이트', '그레이', '블루', '다크그레이'],
  },
  {
    label: '아르키디아 2',
    colors: ['r-화이트', '그레이', '블루', '다크그레이'],
  },
  {
    label: '아르키디아 3',
    colors: ['r-화이트', '그레이', '블루', '다크그레이'],
  },
  {
    label: '아르키디아 4',
    colors: ['r-화이트', '그레이', '블루', '다크그레이'],
  },
  {
    label: '아르키디아 5',
    colors: ['r-화이트', '그레이', '블루', '다크그레이'],
  },
]);

// 현재 열려 있는 하위 목록의 인덱스
const activeIndex = ref<number | null>(null);

// 하위 목록 토글 함수
const toggleSubList = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

// 현재 인덱스가 활성화되어 있는지 확인하는 함수
const isActive = (index: number) => {
  return activeIndex.value === index;
};

const getList = () => {
    if(product.fcCd !== '')
    {
        product.getList();
    }
}

onMounted(() => {
    product.getFactory();
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