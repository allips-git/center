<template>
<main>
    
    <div class="bottom-modal-contents-box !pb-20">
        <div class="w-full flex justify-end">
            <Button label="제품 변경" outlined @click="getPopupClose(true, 'itemSet')"/>
        </div>    
        <div class="text-base font-bold flex justify-between bg-gray-50 p-2 px-4 rounded-lg border border-indigo-300">
            <h2>{{ esti['common']['itemNm'] }} {{ `${esti['common']['icNm'] === '' ? '' : '/'+esti['common']['icNm']}` }}</h2>
            <p class="text-indigo-600">({{ esti['common']['unitSize'] }}{{ esti['common']['unitNm'] }}) {{ getAmt(esti['common']['saleUnit']) }}원</p>
        </div>
        <!-- 입력 계산기 컴포넌트 -->
        <div class="">
            <!-- 회베 -->
            <CalcHebeSet v-if="esti['common']['unit'] === '001'"/>
            <!-- 폭 , 야드 -->
            <CalcWidthYardSet v-if="esti['common']['unit'] === '002' || esti['common']['unit'] === '003'"/>
            <!-- EA -->
            <CalcEASet v-if="esti['common']['unit'] === '004'"/>
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
            <CalculateCard title="총 단위" :showtitle="true" 
                :unit="esti['total']['totalUnitSize']+esti['common']['unitNm']"
                :calcs="esti['totalAmtInfo']" totalTitle="총 금액" :totalAmt="esti['total']['totalSaleAmt']" :showUnit="true"/>
        </div>
    </div>
    <div class="bottom-modal-absol-box">
        <Button type="button" label="저장" @click="getEstiSave" class="w-full"></Button>
    </div>    
</main>
</template>

<script setup lang="ts">
import Textarea from 'primevue/textarea';
import IftaLabel from 'primevue/iftalabel';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import CalculateCard from '@/components/card/CalculateCard.vue'
import CalcEASet from '@/views/include/calc/CalcEASet.vue'
import CalcHebeSet from '@/views/include/calc/CalcHebeSet.vue'
import CalcWidthYardSet from '@/views/include/calc/CalcWidthYardSet.vue'
import { useEstiStore } from '@/store';
import { getCommas } from '@/assets/js/function';
import { usePopup } from '@/assets/js/popup';
import { estiHebeMsg, estiEaMsg } from '@/assets/js/msg';

const esti = useEstiStore();
const { getPopupClose } = usePopup();

const getAmt = (amt: number) => {
    return getCommas(Number(amt));
}

const getEstiSave = () => {
    const checkParams = new Object();

    switch(esti['common']['unit'])
    {
        case '001':
        {
            checkParams['width']    = esti['common']['width'];
            checkParams['height']   = esti['common']['height'];
            checkParams['leftQty']  = esti['blind']['leftQty'];
            checkParams['rightQty'] = esti['blind']['rightQty'];
            checkParams['qty']      = esti['blind']['bQty'];
            checkParams['division'] = esti['blind']['division'];
            checkParams['divSpec']  = esti['blind']['divSpec'];

            const result = estiHebeMsg(checkParams);

            console.log(result);

            if(!result['state'])
            {
                esti.getMsgSet(result['msg'], result['id']);
                getFocus(result['id']);
                return false;
            }
        }            
        break;
        case '002':
        break;
        case '003':
        break;
        case '004':
        {
            checkParams['qty'] = esti['ea']['qty'];

            const result = estiEaMsg(checkParams);

            if(!result['state'])
            {
                esti.getMsgSet(result['msg'], result['id']);
                getFocus(result['id']);
                return false;
            }
        }
        break;
    }
}

const getFocus = (id: string) => {
    const inputElement = document.getElementById(id);
    if (inputElement) 
    {
        inputElement.focus();
    }
}

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