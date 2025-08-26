<template>
    <div class="flex flex-col gap-8 py-4">
        <div class="grid grid-cols-4 gap-3">
            <IftaLabel class="col-span-2">
                <label>설치위치<span class="ml-0.5 text-red-500">*</span></label>
                <InputText v-model="esti['common']['location']" placeholder="기타" class="w-full"/>
            </IftaLabel>
            <IftaLabel class="col-span-2">
                <Select v-model="esti['blind']['division']" :options="data['division']" 
                    optionLabel="name" optionValue="value" class="w-full" @change="esti.getDivisionSet()">
                    <template #dropdownicon>
                        <IconArrowDropDown class="w-4 h-4 text-l-lv0" />
                    </template>
                </Select>
                <label>분할</label>
            </IftaLabel>
        </div>
        <div v-if="esti['blind']['division'] !== 'A'" class="grid grid-cols-4 gap-3">
            <IftaLabel>
                <label>가로 (CM)<span class="ml-0.5 text-red-500">*</span></label>
                <InputText v-keyfilter.money inputmode="numeric" id="bWidth" v-model="esti['common']['width']" class="w-full text-lg text-center" @update:modelValue="esti.getUnitCalc()"/>
                <small class="whitespace-nowrap text-msg">{{ esti['msg']['blind']['bWidth'] }}</small>
            </IftaLabel> 
            <IftaLabel>
                <label>세로 (CM)<span class="ml-0.5 text-red-500">*</span></label>
                <InputText v-keyfilter.money inputmode="numeric" id="bHeight" v-model="esti['common']['height']" class="w-full text-lg text-center" @update:modelValue="esti.getUnitCalc()"/>
                <small class="whitespace-nowrap text-msg">{{ esti['msg']['blind']['bHeight'] }}</small>
            </IftaLabel>
            <!-- 분할없음 -->
            <div class="grid grid-cols-2 col-span-2 gap-3" v-if="esti['blind']['division'] === 1">
                <IftaLabel>
                    <label>수량 (좌)</label>
                    <InputNumber inputId="leftQty" v-model="esti['blind']['leftQty']" showButtons buttonLayout="horizontal" :step="1" fluid @update:modelValue="esti.getUnitCalc()">
                        <template #incrementbuttonicon>
                            <span class="pi pi-plus" />
                        </template>
                        <template #decrementbuttonicon>
                            <span class="pi pi-minus" />
                        </template>
                    </InputNumber>
                    <small class="whitespace-nowrap text-msg">{{ esti['msg']['blind']['leftQty'] }}</small>
                </IftaLabel>
                <IftaLabel>
                    <label>수량 (우)</label>
                    <InputNumber inputId="rightQty" v-model="esti['blind']['rightQty']" showButtons buttonLayout="horizontal" :step="1" fluid @update:modelValue="esti.getUnitCalc()">
                    <template #incrementbuttonicon>
                        <span class="pi pi-plus" />
                    </template>
                    <template #decrementbuttonicon>
                        <span class="pi pi-minus" />
                    </template>
                </InputNumber>
                </IftaLabel>
            </div>
            <!-- 분할 있음 -->
            <div class="grid grid-cols-2 col-span-2 gap-3" v-if="esti['blind']['division'] > 1">
                <IftaLabel>
                    <label>수량</label>
                    <InputNumber inputId="bQty" v-model="esti['blind']['bQty']" showButtons buttonLayout="horizontal" :step="1" fluid @update:modelValue="esti.getUnitCalc()">
                        <template #incrementbuttonicon>
                            <span class="pi pi-plus" />
                        </template>
                        <template #decrementbuttonicon>
                            <span class="pi pi-minus" />
                        </template>
                    </InputNumber>
                    <small class="whitespace-nowrap text-msg">{{ esti['msg']['blind']['bQty'] }}</small>
                </IftaLabel>
                <Button label="균등분할" class="w-full btn-md h-[2.5rem] *:whitespace-nowrap" @click="getEqual"/>
            </div>
        </div>
    </div>

    <!-- 회베 분할 -->
    <template v-if="esti['blind']['division'] > 1">
        <!-- v-for -->
        <template class="block">
            <p class="mb-2.5 font-medium text-sky-500 text-11">분할<strong class="px-[1px]">{{ esti['blind']['division'] }}</strong>창 (아래값만 입력해주세요.)</p>
            <div class="flex flex-col gap-3 w-full">
                <div v-for="(item, index) in esti['blind']['divSpec']" :key="index" class="grid grid-cols-4 gap-3 fgrid">
                    <IftaLabel class="w-full">
                        <label v-if="index === 0">가로(CM)<span class="ml-0.5 text-red-500">*</span></label>
                        <InputText v-keyfilter.money inputmode="numeric" :id="'bWidth'+index" v-model="item['width']" class="w-full text-lg text-center" @input="getDivBlindWidth(index)"/>
                    </IftaLabel>
                    <IftaLabel class="w-full">
                        <label v-if="index === 0">세로(CM)<span class="ml-0.5 text-red-500">*</span></label>
                        <InputText v-keyfilter.money inputmode="numeric" v-model="esti['common']['height']" class="w-full text-lg text-center" @input="getDivBlindWidth(index)"/>
                    </IftaLabel>
                    <IftaLabel class="w-full">
                        <Select v-model="item['handle']" :options="data['handle']" optionLabel="name" optionValue="value" class="w-full">
                            <template #dropdownicon>
                                <IconArrowDropDown class="w-4 h-4 text-l-lv0" />
                            </template>
                        </Select>
                    </IftaLabel>
                    <!-- <IftaLabel>
                        <label v-if="index === 0">수량<span class="ml-0.5 text-red-500">*</span></label>
                        <InputNumber inputId="divQty" v-model="item.qty" showButtons buttonLayout="horizontal" :step="1" fluid @update:modelValue="getDivBlindWidth(index)">
                            <template #incrementbuttonicon >
                                <span class="pi pi-plus" />
                            </template>
                            <template #decrementbuttonicon>
                                <IconDelete class="text-[#000]"/>
                            </template>
                        </InputNumber>
                    </IftaLabel> -->
                    <IftaLabel class="w-full">
                        <label v-if="index === 0">회배</label>
                        <InputText v-model="item['size']" class="w-full text-lg text-center" disabled/>
                    </IftaLabel>
                </div>
                <small class="text-msg">{{ esti['msg']['blind']['divWidth'] }}</small>
                <!-- <div class="flex justify-center items-center my-1 w-full">
                    <Button :label="'사이즈 추가'" class="btn-md" @click="esti.getDivisionAdd()"/>
                </div> -->
            </div>
        </template>
    </template>
    <template v-if="esti['blind']['division'] === 'A'">
        <div class="flex flex-col gap-3 w-full">
            <div v-for="(item, index) in esti['blind']['divSpec']" :key="index" class="grid grid-cols-4 gap-3 fgrid">
                <IftaLabel class="w-full">
                    <label v-if="index === 0">가로(CM)<span class="ml-0.5 text-red-500">*</span></label>
                    <InputText v-keyfilter.money inputmode="numeric" :id="'bWidth'+index" v-model="item['width']" class="w-full text-lg text-center" @input="getDivBlindWidth(index)"/>
                </IftaLabel>
                <IftaLabel class="w-full">
                    <label v-if="index === 0">세로(CM)<span class="ml-0.5 text-red-500">*</span></label>
                    <InputText v-keyfilter.money inputmode="numeric" :id="'bHeight'+index" v-model="item['height']" class="w-full text-lg text-center" @input="getDivBlindHeight(index)"/>
                </IftaLabel>
                <IftaLabel class="w-full">
                    <Select v-model="item['handle']" :options="data['handle']" optionLabel="name" optionValue="value" class="w-full">
                        <template #dropdownicon>
                            <IconArrowDropDown class="w-4 h-4 text-l-lv0"/>
                        </template>
                    </Select>
                </IftaLabel>
                <!-- @PB 수정 요청 2025-08-26 -->
                <IftaLabel>
                    <label v-if="index === 0">수량<span class="ml-0.5 text-red-500">*</span></label>
                    <div class="input-number-custom">
                        <Button class="decrement" @click="esti.getDivDelete(index)">
                            <IconDelete class="text-[#000]"/>
                        </Button>
                        <InputNumber inputId="divQty" v-model="item.qty" buttonLayout="horizontal" :step="1" fluid @update:modelValue="getDivBlindWidth(index)" class="flex-1 *:text-center" />
                        <Button class="increment" @click="getQty(index)">
                            <span class="pi pi-plus" />
                        </Button>
                    </div>
                </IftaLabel>
            </div>
            <small class="text-msg">{{ esti['msg']['blind']['divWidth'] }}</small>
            <div class="flex justify-center items-center my-1 w-full">
                <Button :label="'사이즈 추가'" class="btn-md" @click="esti.getDivisionAdd()"/>
            </div>
        </div>
    </template>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'; 
import InputNumber from 'primevue/inputnumber';
import IftaLabel from 'primevue/iftalabel';
import { useDataStore, useEstiStore } from '@/store';
import IconArrowDropDown from '@/components/icons/IconArrowDropDown.vue'
import IconDelete from '@/components/icons/IconDelete.vue'

const data = useDataStore();
const esti = useEstiStore();

const getEqual = async () => {
    await esti.getEqual();
    await esti.getUnitCalc();
}

const getDivBlindWidth = async (index: number) => {
    await esti.getDivBlindWidth(index);
    await esti.getUnitCalc();
}

const getDivBlindHeight = async (index: number) => {
    await esti.getDivBlindHeight(index);
    await esti.getUnitCalc();
}

const getQty = async (index: number) => {
    await esti.getDivQty(index);
    await esti.getUnitCalc();
}

</script>

<style scoped>
.case-calculator > .grid:not(:first-child) .p-iftalabel label {
    display: none;
}
</style>