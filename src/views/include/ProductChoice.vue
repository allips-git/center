<template>
    <div>
        <div class="p-4 flex flex-col gap-5">
            <div class="flex gap-2">
                <Select placeholder="브랜드 선택" /> 
                
                    <IconField class="table-search-input w-full">
                        <InputIcon class="z-10">
                            <i class="pi pi-search z-10" />
                        </InputIcon>
                        <InputText placeholder="제품명 검색" class="w-full" />
                    </IconField>
                    
            </div>
        </div>
        <div class="flex gap-2 px-4 pb-2 w-full">
            <Button label="실측 둘러보기" outlined  rounded  />
            <Button label="커튼 실측" outlined rounded @click="ProductRegisterPop = true" />
            <Button label="블라인드 실측" outlined rounded  @click="ProductRegisterPop = true" />
        </div>
        <ul class="flex flex-col">
            <li
            v-for="(item, index) in items"
            :key="index"
            class="border-b"
            >
            <div class="label-checkbox-box px-5 py-4" @click="toggleSubList(index)">
                <RadioButton />
                <label>{{ item.label }}</label>
            </div>
                <ul class="bg-gray-50" v-if="isActive(index)">
                    <li
                    v-for="(color, colorIndex) in item.colors"
                    :key="colorIndex"
                    :class="color"
                    class="pl-10 py-4 border-b border-gray-200 last:border-b-0"
                    >
                    <div class="label-checkbox-box">
                        <RadioButton />
                        {{ color }}
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
import { ref } from 'vue';

import IconField from 'primevue/iconfield'; 
import InputText from 'primevue/inputtext'; 
import InputIcon from 'primevue/inputicon'; 
import InputGroup from 'primevue/inputgroup';

import RadioButton from 'primevue/radiobutton';
import ProductRegister from "@/views/include/ProductRegister.vue";

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