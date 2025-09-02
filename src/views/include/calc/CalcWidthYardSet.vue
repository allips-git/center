<template>
    <div class="flex flex-col gap-8 py-4">
        <div class="grid grid-cols-4 gap-3">
            <IftaLabel class="col-span-2">
                <label>설치위치<span class="ml-0.5 text-red-500">*</span></label>
                <InputText v-model="esti['common']['location']" placeholder="기타" class="w-full"/> 
            </IftaLabel>
            <IftaLabel>
                <Select v-model="esti['curtain']['split']" :options="data['split']" optionLabel="name" optionValue="value" class="w-full">
                    <template #dropdownicon>
                        <IconArrowDropDown class="w-4 h-4 text-l-lv0" />
                    </template>
                </Select>
                <label>분할</label>
            </IftaLabel>
            <IftaLabel>
                <label>수량</label>
                <InputNumber inputId="cQty" v-model="esti['curtain']['cQty']" showButtons buttonLayout="horizontal" :step="1" fluid class="custom-input-number" @update:modelValue="esti.getUnitCalc()">
                    <template #incrementbuttonicon><span class="pi pi-plus" /></template>
                    <template #decrementbuttonicon><span class="pi pi-minus" /></template>
                </InputNumber>
                <small class="text-msg">{{ esti['msg']['curtain'][`cQty`] }}</small>
            </IftaLabel>
        </div>
        <div class="grid grid-cols-4 gap-3">
            <IftaLabel>
                <label>가로(CM)<span class="ml-0.5 text-red-500">*</span></label>
                <InputText v-keyfilter.money inputmode="decimal" id="cWidth" v-model="esti['common']['width']" class="w-full text-lg text-center" @update:modelValue="esti.getUnitCalc()" />
                <small class="whitespace-nowrap text-msg">{{ esti['msg']['curtain'][`cWidth`] }}</small>
            </IftaLabel>

            <IftaLabel>
                <label>세로(CM)</label>
                <InputText v-keyfilter.money inputmode="decimal" id="cHeight" v-model="esti['common']['height']" class="w-full text-lg text-center" @update:modelValue="esti.getUnitCalc()" />
                <small class="whitespace-nowrap text-msg">{{ esti['msg']['curtain'][`cHeight`] }}</small>
            </IftaLabel>

            <IftaLabel class="">
                <Select v-model="esti['curtain']['use']" :options="data['usage']" optionLabel="name" optionValue="value" class="w-full text-lg select-use-custom" @update:modelValue="esti.getUnitCalc()">
                    <template #dropdownicon>
                        <IconArrowDropDown class="w-4 h-4 text-l-lv0" />
                    </template>
                </Select>
                <label class="whitespace-nowrap">사용량({{ getUsageVal() }})</label>
            </IftaLabel>

            <div>
                <div class="relative">
                    <IftaLabel class="flex-1 min-w-0">
                    <label class="accent">최종({{ getRealSize() + esti['common']['unitNm'] }})</label>
                    <InputText v-keyfilter.money inputmode="decimal" id="cSize" v-model="esti['curtain']['size']" class="w-full text-lg text-center text-sky-500" @input="esti.getUnitCalc('Y')" />
                </IftaLabel>
                <!-- <span class="absolute right-2.5 bottom-[0.625rem] text-xs text-t-lv1">{{ esti['common']['unitNm'] }}</span> -->
                </div>
                <small class="text-msg">{{ esti['msg']['curtain'][`cSize`] }}</small>
            </div>
        </div>

        <!-- Toggle Group -->
        <div class="flex-1 pt-0.5 pb-1 sm:px-4 toggle-group-box">
            <h3 class="title text-10 text-t-lv3">가공 옵션</h3>
            <div class="flex flex-wrap w-full">
                <div class="basis-1/4 toggle-set">
                    <label for="switch3" class="font-medium text-11 text-t-lv2">투톤 색상</label>
                    <ToggleSwitch v-model="esti['curtain']['addColor']" :trueValue="'T'" :falseValue="'O'"/>
                </div>
                <div v-if="getOptionCheck('B')" class="basis-1/4 toggle-set">
                    <label for="switch4" class="font-medium text-11 text-t-lv2">리드밴드</label>
                    <ToggleSwitch v-model="esti['curtain']['bproc']" :trueValue="'002'" :falseValue="'001'" @change="getBproc"/>
                </div>
                <div v-if="getOptionCheck('P')" class="basis-1/4 toggle-set">
                    <label for="switch1" class="font-medium text-11 text-t-lv2">나비주름</label>
                    <ToggleSwitch v-model="esti['curtain']['proc']" :trueValue="'001'" :falseValue="'002'" @change="getProc"/>
                </div>
                <div v-if="getOptionCheck('S')" class="basis-1/4 toggle-set">
                    <label for="switch2" class="font-medium text-11 text-t-lv2">형상</label>
                    <ToggleSwitch v-model="esti['curtain']['shape']" :trueValue="'Y'" :falseValue="'N'" @change="getShape"/>
                </div>
            </div>
        </div>
        <!-- //Toggle Group -->

        <div v-if="esti['curtain']['addColor'] === 'T'" class="flex flex-col gap-3 pt-5 pb-6 border-dashed border-y border-l-lv2">
            <h2 class="mb-1 font-medium text-sky-500 text-11">안쪽 컬러를 선택해주세요.</h2>
            <div class="grid grid-cols-4 gap-3">
                <IftaLabel class="col-span-3 w-full">
                    <label>안쪽컬러</label>
                    <Select v-model="esti['curtain']['inColor']" :options="esti.inColorList" optionLabel="icNm" optionValue="icCd" placeholder="안쪽 컬러를 선택해주세요." class="w-full" >
                        <template #dropdownicon>
                            <IconArrowDropDown class="w-4 h-4 text-l-lv0" />
                        </template>
                    </Select>
                </IftaLabel>
                <div class="col-span-1 w-full">
                    <div class="relative">
                        <IftaLabel class="w-full">
                        <InputText v-keyfilter.int id="inSize" v-model="esti['curtain']['inSize']" class="w-full !pr-8 text-left !text-sky-500 text-lg" />
                    </IftaLabel>
                    <span class="absolute right-2.5 bottom-[0.625rem] text-xs">{{ esti['common']['unitNm'] }}</span>
                    </div>
                    <small v-if="esti['msg']['curtain'][`inColor`] !== ''" class="text-red-500 text-msg">{{ esti['msg']['curtain'][`inColor`] }}</small>
                    <small v-if="esti['msg']['curtain'][`inSize`] !== ''" class="text-red-500 text-msg">{{ esti['msg']['curtain'][`inSize`] }}</small>
                </div>
            </div>
            <div class="grid grid-cols-4 gap-3">
                <IftaLabel class="col-span-3 w-full">
                    <label>기둥 컬러</label>
                    <InputText :value="`${esti['common']['itemNm']} / ${esti['common']['icNm']}`" class="w-full" disabled/>
                </IftaLabel>
                <div class="col-span-1 w-full">
                    <div class="relative">
                        <IftaLabel class="w-full">
                            <InputText v-model="esti.outSize" class="w-full !pr-8 text-left !text-sky-500 text-lg" disabled/>
                        </IftaLabel>
                        <span class="absolute right-2.5 bottom-[0.625rem] text-xs">{{ esti['common']['unitNm'] }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'; 
import InputNumber from 'primevue/inputnumber';
import IftaLabel from 'primevue/iftalabel';
import ToggleSwitch from 'primevue/toggleswitch';
import { useDataStore, useEstiStore } from '@/store';
import IconArrowDropDown from '@/components/icons/IconArrowDropDown.vue'

const data      = useDataStore();
const esti      = useEstiStore();

const getOptionCheck = (gb: string) => {
    const option = esti['common']['options'].find(item => item.gb === gb);

    return option ? (option.useYn === 'N' ? false : true) : true;
}

const getRealSize = () => {
    switch(esti['common']['unit'])
    {
        case '003': case '005':
            {
                const width         = Number(esti['common']['width']);
                const uselMaterial  = Number(esti['curtain']['use']);
                const los           = Number(esti['curtain']['los']);
                const pokSpec       = Number(esti['curtain']['pokSpec']);

                const value = width === 0 ? 0 : ((width * uselMaterial + los) / pokSpec);

                return value.toFixed(2);
            }
        case '002':
            {
                const width         = Number(esti['common']['width']);
                const uselMaterial  = Number(esti['curtain']['use']);
                const los           = Number(esti['curtain']['los']);

                const value = width === 0 ? 0 : (width * uselMaterial + los) / 90;

                return value.toFixed(2);
            }
        case '006':
            {
                return Number(esti['common']['width']);
            }
        
    }
}

const getProc = () => {
    if(esti['curtain']['proc'] === '001')
    {
        esti.common.options.forEach(item => {
            if(item.gb === 'P')
            {
                item.delYn = 'N';
            }
        });
    }
    else
    {
        esti.common.options.forEach(item => {
            if(item.gb === 'P')
            {
                item.delYn = 'Y';
            }
        });
    }

    esti.getUnitCalc('Y');
}

const getBproc = () => {
    if(esti['curtain']['bproc'] === '002')
    {
        esti.common.options.forEach(item => {
            if(item.gb === 'B')
            {
                item.delYn = 'N';
            }
        });
    }
    else
    {
        esti.common.options.forEach(item => {
            if(item.gb === 'B')
            {
                item.delYn = 'Y';
            }
        });
    }

    esti.getUnitCalc('Y');
}

const getShape = () => {
    if(esti['curtain']['shape'] === 'Y')
    {
        esti.common.options.forEach(item => {
            if(item.gb === 'S')
            {
                item.delYn = 'N';
            }
        });
    }
    else
    {
        esti.common.options.forEach(item => {
            if(item.gb === 'S')
            {
                item.delYn = 'Y';
            }
        });
    }

    esti.getUnitCalc('Y');
}

const getUsageVal = () => {
    let size = 0;
    if(esti['common']['unit'] === '003')
    {
        const width         = Number(esti['common']['width']);
        const uselMaterial  = Number(esti['curtain']['use']);
        const los           = esti['curtain']['proc'] === '001' ? (Number(esti['curtain']['los']) * 2) : Number(esti['curtain']['los']);
        const pokSpec       = Number(esti['curtain']['pokSpec']);

        const value = width === 0 ? 0 : ((width * uselMaterial + los) / pokSpec);

        size = value.toFixed(2);
    }
    else
    {
        const width         = Number(esti['common']['width']);
        const uselMaterial  = Number(esti['curtain']['use']);
        const los           = esti['curtain']['proc'] === '001' ? (Number(esti['curtain']['los']) * 2) : Number(esti['curtain']['los']);

        const value = width === 0 ? 0 : (width * uselMaterial + los) / 90;

        size = value.toFixed(2);
    }

    const val  = (Number(size) * Number(esti['curtain']['pokSpec'])) / Number(esti['common']['width']);

    return Math.round(val * 10) / 10;
}

// const getInColor = () => {
//     const selectedOption    = esti.inColorList.find(item => item.icCd === esti.curtain.inColor);
//     esti.curtain.inColorNm  = selectedOption.icNm;
// }

// const getSize = () => {
//     const value = event.target.value;

//     esti['curtain']['size'] = value;
// }

</script>

<style lang="scss">
.select-use-custom {
    .p-select-label {
        padding-inline: 0;
        text-align: center;
        letter-spacing: -0.02em;
    }
}
</style>