<template>
<main>
    <div class="bottom-modal-contents-box !px-0 !pb-20 z-10">
        <div class="absolute !z-[100] flex justify-end top-[8px] right-[8px]">
            <Button label="제품 변경" size="small" outlined @click="getItemChange" class="!z-[100]"/>
        </div>    
        <div class="flex justify-between px-5 text-base font-bold">
            <h2 class="px-3 rounded-full pypx bg-cyan-100 text-cyan-600">{{ esti['common']['itemNm'] }} {{ `${esti['common']['icNm'] === '' ? '' : '/'+esti['common']['icNm']}` }}</h2>
            <p class="">({{ esti['common']['unitSize'] }}{{ esti['common']['unitNm'] }}) {{ getAmt(esti['common']['saleUnit']) }}원</p>
        </div>
        <div class="gray-bar !my-0"></div>
        <!-- 입력 계산기 컴포넌트 -->
        <div class="px-5">
            <!-- 회베 -->
            <CalcHebeSet v-if="esti['common']['unit'] === '001'"/>
            <!-- 폭 , 야드 -->
            <CalcWidthYardSet v-if="esti['common']['unit'] === '002' || esti['common']['unit'] === '003'"/>
            <!-- EA -->
            <CalcEASet v-if="esti['common']['unit'] === '004'"/>
        </div>

        <!-- 옵션 더보기 -->
        <section class="px-5">
            <div class="w-full custom_accordion">
                <Accordion value="0">
                    <AccordionPanel class="*:pb-0 " value="0" >
                        <AccordionHeader class="!gap-2 !justify-end">
                            <p class="pb-0 text-sm font-bold">옵션 더보기</p>
                            </AccordionHeader>
                        <AccordionContent class="w-full">
                            <div class="flex flex-col gap-5">
                                <div class="flex w-full gap-4 mt-3">
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
                                    <Textarea v-model="esti['common']['memo']" rows="3" cols="30" style="resize: none" class="w-full" />
                                </IftaLabel>
                            </div>
                        </AccordionContent>
                    </AccordionPanel>
                </Accordion>
            </div>
        </section>
        <div class="gray-bar !my-0"></div>
        <div class="px-5">
            <CalculateCard title="총 단위" :showtitle="true" 
                :unit="esti['total']['totalUnitSize']+esti['common']['unitNm']"
                :calcs="esti['totalAmtInfo']" totalTitle="총 금액" :totalAmt="esti['total']['totalSaleAmt'] + esti['total']['totalSaleTax']" :showUnit="true"/>
        </div>
    </div>
    <div class="bottom-modal-absol-box">
        <Button type="button" label="저장" @click="getEstiSave" :disabled="status" size="large" class="w-full"></Button>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useConfirm } from "primevue/useconfirm";
import { useClientStore, useEstiStore } from '@/store';
import { getCommas } from '@/assets/js/function';
import { usePopup } from '@/assets/js/popup';
import { estiBlindMsg, estiCurtainMsg, estiEaMsg } from '@/assets/js/msg';
import { getBlindParams, getCurtainParams, getEaParams } from '@/assets/js/calcAndProcess';
import { getAxiosData } from '@/assets/js/function';

const router    = useRouter();
const confirm   = useConfirm();
const client    = useClientStore();
const esti      = useEstiStore();
const status    = ref(false);
const { getPopupOpen, getPopupClose } = usePopup();

const getItemChange = () => {
    getPopupClose(true, 'itemSet');
    getPopupOpen('itemList');
}

const getAmt = (amt: number) => {
    return getCommas(Number(amt));
}

const getEstiSave = () => {
    const checkParams = new Object();

    switch(esti['common']['unit'])
    {
        case '001':
        {
            checkParams['ordGb']        = esti['common']['ordGb'];
            checkParams['maxWidth']     = esti['blind']['maxWidth'];
            checkParams['maxHeight']    = esti['blind']['maxHeight'];
            checkParams['minWidth']     = esti['blind']['minWidth'];
            checkParams['minHeight']    = esti['blind']['minHeight'];
            checkParams['width']        = esti['common']['width'];
            checkParams['height']       = esti['common']['height'];
            checkParams['leftQty']      = esti['blind']['leftQty'];
            checkParams['rightQty']     = esti['blind']['rightQty'];
            checkParams['qty']          = esti['blind']['bQty'];
            checkParams['division']     = esti['blind']['division'];
            checkParams['divSpec']      = esti['blind']['divSpec'];

            const result = estiBlindMsg(checkParams);

            if(!result['state'])
            {
                esti.getMsgSet(result['msg'], result['id']);
                getFocus(result['id']);
                return false;
            }
        }            
        break;
        case '002': case '003':
        {
            checkParams['maxWidth']     = esti['curtain']['maxWidth'];
            checkParams['maxHeight']    = esti['curtain']['maxHeight'];
            checkParams['width']        = esti['common']['width'];
            checkParams['height']       = esti['common']['height'];
            checkParams['qty']          = esti['curtain']['cQty'];
            checkParams['size']         = esti['curtain']['size'];
            checkParams['addColor']     = esti['curtain']['addColor'];
            checkParams['inColor']      = esti['curtain']['inColor'];
            checkParams['inSize']       = esti['curtain']['inSize'];

            const result = estiCurtainMsg(checkParams);

            if(!result['state'])
            {
                esti.getMsgSet(result['msg'], result['id']);
                getFocus(result['id']);
                return false;
            }
        }
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

    confirm.require({
        message     : '해당 견적을 저장하시겠습니까?',
        header      : '견적저장',
        rejectProps : {
            label       : '취소',
            severity    : 'secondary',
            outlined    : true
        },
        acceptProps : {
            label: '저장'
        },
        accept : async () => {
            let params;

            switch(esti['common']['unit'])
            {
                case '001':
                    params = getBlindParams(esti['common'], esti['blind']);

                    params['eachItemSaleAmt']   = esti['total']['eachItemSaleAmt'];
                    params['eachItemSaleTax']   = esti['total']['eachItemSaleTax'];
                    params['eachItemPurcAmt']   = esti['total']['eachItemPurcAmt'];
                    params['eachItemPurcTax']   = esti['total']['eachItemPurcTax'];
                break;
                case '002': case '003':
                    params = getCurtainParams(esti['common'], esti['curtain']);

                    params['totalHeightSaleAmt']   = esti['total']['totalHeightSaleAmt'];
                    params['totalHeightSaleTax']   = esti['total']['totalHeightSaleTax'];
                    params['totalHeightPurcAmt']   = esti['total']['totalHeightPurcAmt'];
                    params['totalHeightPurcTax']   = esti['total']['totalHeightPurcTax'];

                    params['totalShapeSaleAmt']    = esti['total']['totalShapeSaleAmt'];
                    params['totalShapeSaleTax']    = esti['total']['totalShapeSaleTax'];
                    params['totalShapePurcAmt']    = esti['total']['totalShapePurcAmt'];
                    params['totalShapePurcTax']    = esti['total']['totalShapePurcTax'];
                break;
                case '004':
                    params = getEaParams(esti['common'], esti['ea']);
                break;
            }

            params['type']              = esti['type'];
            params['emCd']              = esti['emCd'];
            params['clientCd']          = client['clientCd'];
            params['edCd']              = esti['edCd'];

            params['totalUnit']         = esti['total']['totalUnitSize'];

            params['pdSaleAmt']         = Number(esti['total']['totalItemSaleAmt']);
            params['pdSaleTax']         = Number(esti['total']['totalItemSaleTax']);
            params['pdPurcAmt']         = Number(esti['total']['totalItemPurcAmt']);
            params['pdPurcTax']         = Number(esti['total']['totalItemPurcTax']);

            params['totalSaleAmt']      = esti['total']['totalSaleAmt'];
            params['totalSaleTax']      = esti['total']['totalSaleTax'];
            params['totalPurcAmt']      = esti['total']['totalPurcAmt'];
            params['totalPurcTax']      = esti['total']['totalPurcTax'];

            params['itemCnt']           = esti['total']['totalQty'];

            console.log(JSON.stringify(params, null, 2));

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/estiV1/getResult`, params);
                
                esti.getEmCd(res.data['emCd']);
                esti.getList();
                
                switch(esti['type'])
                {
                    case 'I': case 'N':
                        router.push({ path : '/customer/estiList' });
                    break;
                    case 'M':
                        esti.getList();
                    break;   
                }
                
                getPopupClose(true, 'itemList');
                getPopupClose(true, 'itemSet');
            }
            catch(e)
            {
                console.log(e);
            }
        }
    });
}

const getFocus = (id: string) => {
    const inputElement = document.getElementById(id);
    if (inputElement) 
    {
        inputElement.focus();
    }
}

// onMounted(() => {
//     switch(esti['type'])
//     {
//         case 'N': case 'I':
//             esti.getReset();
//         break;
//         case 'M':
//             esti.getInfo();
//         break;
//     }
// })

</script>

<style lang="scss">
.p-inputnumber-button{
    width: 20px !important;
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