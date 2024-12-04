<template>
<main>
    
    <div class="bottom-modal-contents-box !pb-20">
        <div class="w-full flex justify-end">
            <Button label="제품 변경" outlined/>
        </div>    
        <div class="text-base font-bold flex justify-between bg-gray-50 p-2 px-4 rounded-lg border border-indigo-300">
            <h2>제품 이름 (하위 분류)</h2>
            <p class="text-indigo-600">(0폭) 0원</p>
        </div>
        <!-- 입력 계산기 컴포넌트 -->
        <div class="">
            <!-- 폭 , 야드 -->
            <CalcWidthYardSet v-if="unit==='001'"/>
            <!-- 회베 -->
            <CalcHebeSet v-if="unit==='002'"/>
            <!-- EA -->
            <CalcEASet v-if="unit==='003'"/>
        </div>

        <!-- 옵션 더보기 -->
        <section class="">
            <div class="custom_accordion w-full">
                <Accordion value="0">
                    <AccordionPanel class="*:pb-0 " value="0" >
                        <AccordionHeader class="!gap-2 !justify-end">
                            <p class="font-bold text-sm pb-0">옵션 더보기</p>
                            </AccordionHeader>
                        <AccordionContent class="w-full">
                            <div class="flex flex-col gap-5">
                                <div class="flex w-full mt-3 gap-4">
                                    <IftaLabel class="w-full">
                                        <Select placeholder="선택" class="w-full" />
                                        <label for="emali">옵션명</label>
                                    </IftaLabel>

                                    <IftaLabel class="w-full">
                                        <Select placeholder="선택" class="w-full" />
                                        <label for="emali">옵션 세부명</label>
                                    </IftaLabel>
                                </div>

                                <IftaLabel class="w-full">
                                    <label for="emali">지시사항</label>
                                    <Textarea id="over_label" rows="3" cols="30" style="resize: none" class="w-full" />
                                </IftaLabel>
                            </div>
                        </AccordionContent>
                    </AccordionPanel>
                </Accordion>
            </div>
        </section>
        <div class="">
            <CalculateCard title="총 단위" :showtitle="true"/>
        </div>
    </div>
    <div class="bottom-modal-absol-box">
        <Button type="button" label="저장" @click="outsourcePop = false" class="w-full"></Button>
    </div>    
</main>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Textarea from 'primevue/textarea';
import IftaLabel from 'primevue/iftalabel';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import RadioButton from 'primevue/radiobutton';

import CalculateCard from '@/components/card/CalculateCard.vue'

import CalcEASet from '@/views/include/calc/CalcEASet.vue'
import CalcHebeSet from '@/views/include/calc/CalcHebeSet.vue'
import CalcWidthYardSet from '@/views/include/calc/CalcWidthYardSet.vue'



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