<template>
<main class="p-4">
    <div class="bottom-modal-contents-box !px-0 !pb-20 z-10 !gap-0">
        <!-- <div class="absolute !z-[100] flex justify-end top-[8px] right-[8px] change-button">
            <Button label="제품 변경" size="small" @click="getItemChange" class="!z-[100] !text-xs"/>
        </div>     -->
        <div class="flex justify-between py-[5px] text-sm">
            <h2 class="p-1.5 leading-[1.167] font-bold rounded-[0.125rem] bg-s-lv2 text-xs text-s-lv1">{{ esti['common']['itemNm'] }} {{ `${esti['common']['icNm'] === '' ? '' : '/'+esti['common']['icNm']}` }}</h2>
            <div class="flex gap-1 items-center font-medium">
                <span>({{ esti['common']['unitSize'] }}{{ esti['common']['unitNm'] }}) {{ getAmt(esti['common']['saleUnit'] || 0) }}원</span>
                <IconPencil class="w-3 h-3 text-gray-400 cursor-pointer" @click="getPopupOpen('priceChange')" />
            </div>
        </div>
        <div class="gray-bar my-[0.875rem]"></div>
        <!-- 입력 계산기 컴포넌트 -->
        <div class="">
            <!-- 회베 -->
            <CalcHebeSet v-if="esti['common']['unit'] === '001'"/>
            <!-- 폭 , 야드 -->
            <CalcWidthYardSet v-if="esti['common']['unit'] === '002' || esti['common']['unit'] === '003' || esti['common']['unit'] === '005' || esti['common']['unit'] === '006' "/>
            <!-- EA -->
            <CalcEASet v-if="esti['common']['unit'] === '004'"/>
        </div>

        <!-- 옵션 더보기 -->
        <section class="">
            <div class="w-full custom_accordion">
                <Accordion
                    value="null"
                    class="pt-0 pb-1"
                    >
                    <AccordionPanel class="*:pb-0 " value="0" >
                        <AccordionHeader class="!gap-2 !justify-end py-1">
                            <p class="pb-0 text-xs font-medium text-t-lv3">옵션 더보기</p>
                            <template #toggleicon>
                                <IconArrowDropDown class="w-4 h-4 text-l-lv0" />
                            </template>
                        </AccordionHeader>
                        <AccordionContent class="w-full">
                            <div class="flex flex-col gap-3 pt-1">
                                <div v-for="(item, index) in getOptionList()" :key="index"  class="flex gap-3 mt-3 w-full">
                                    <IftaLabel class="w-full">
                                        <InputText :value="item.itemNm" placeholder="옵션을 선택해주세요." class="w-full" readonly @click="getOption(index)"/>
                                        <label for="emali">옵션명</label>
                                    </IftaLabel>

                                    <IftaLabel class="w-full">
                                        <InputText :value="item.icNm" placeholder="옵션 세부명" class="w-full" disabled/>
                                        <label for="emali">옵션 세부명</label>
                                    </IftaLabel>
                                </div>
                                <div class="flex justify-center items-center my-1 w-full">
                                    <Button :label="'옵션 추가'" class="btn-md" @click="esti.getOptionAdd()"/>
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
        <div class="gray-bar my-[0.875rem]"></div>
        <div class="mt-[10px]">
            <CalculateCard title="총 단위" :showtitle="true" 
                :unit="esti['total']['totalUnitSize']+esti['common']['unitNm']"
                :calcs="esti['totalAmtInfo']" totalTitle="총 금액" :totalAmt="esti['total']['totalSaleAmt'] + esti['total']['totalSaleTax']" :showUnit="true"/>
        </div>
    </div>
    <div class="bottom-modal-absol-box">
        <Button type="button" label="저장" @click="getSaveCheck" :disabled="status" size="large" class="w-full"></Button>
    </div>
    <Dialog v-model:visible="popup['pop']['priceChange']" header="단가 변경" 
            :modal=true position="center" class="w-96 max-w-96 custom-dialog-center" :dismissable-mask="true"
            @update:visible="getPopupClose('addAmtSet', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose('priceChange', true)" severity="contrast" text icon="pi pi-times"/>
                    <h2 class="modal-backheader-title">단가 변경</h2>
                </div>
            </template>
            <div class="pt-3">
            <EditPricePop/>
        </div>
    </Dialog>
    <Dialog v-model:visible="popup['pop']['optionList']" header="옵션선택" 
        :modal=true position="center" class="custom-dialog-full"
        @update:visible="getPopupClose('optionList', true)">
        <template #header>
            <div class="modal-fullheader">
                <Button @click="getPopupClose('optionList', true)" severity="contrast" text icon="pi pi-times"/>
                <h2 class="modal-backheader-title">옵션 리스트</h2>
            </div>
        </template>
        <OptionChoice/>
    </Dialog>
</main>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';
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
import EditPricePop from '@/components/modal/EditPricePop.vue'
import OptionChoice from "@/views/include/OptionChoice.vue";
import { ref } from 'vue';
import { useConfirm } from "primevue/useconfirm";
import { usePopupStore, useClientStore, useProductStore, useEstiStore, useOrderStore, useActualStore } from '@/store';
import { getCommas } from '@/assets/js/function';
import { usePopup } from '@/assets/js/popup';
import { useRoute } from 'vue-router';
import { estiBlindMsg, estiCurtainMsg, estiEaMsg } from '@/assets/js/msg';
import { getBlindParams, getCurtainParams, getEaParams } from '@/assets/js/calcAndProcess';
import { getAxiosData } from '@/assets/js/function';
import IconPencil from '@/components/icons/Iconpencil.vue';
import IconArrowDropDown from '@/components/icons/IconArrowDropDown.vue'

const confirm   = useConfirm();
const popup     = usePopupStore();
const client    = useClientStore();
const product   = useProductStore();
const esti      = useEstiStore();
const order     = useOrderStore();
const actual    = useActualStore();
const route     = useRoute();
const status    = ref(false);
const { getPopupOpen, getPopupClose } = usePopup();

const getOptionList = () => {
    return esti.common.options.filter(i => i.gb === 'N');
}

const getOption = (optionSeq: number) => {
    esti.getOptionSeq(optionSeq);
    getPopupOpen('optionList');
}

const getAmt = (amt: number) => {
    return getCommas(Number(amt));
}

const getSaveCheck = () => {
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

            console.log(result);

            if(!result['state'])
            {
                esti.getMsgSet(result['msg'], result['index'] === null ? result['id'] : 'divWidth');
                getFocus(result['id']);
                return false;
            }
        }            
        break;
        case '002': case '003': case '005': case '006':
        {
            checkParams['maxWidth']     = esti['curtain']['maxWidth'];
            checkParams['maxHeight']    = esti['curtain']['maxHeight'];
            // checkParams['width']        = esti['common']['width'];
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

    if(product.estiYn === 'Y')
    {
        getEstiSave();
    }
    else
    {
        getActualSave();
    }
}

const getActualSave = () => {
    confirm.require({
        message     : '해당 실측을 저장하시겠습니까?',
        header      : '실측저장',
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
                break;
                case '002': case '003': case '005': case '006':
                    params = getCurtainParams(esti['common'], esti['curtain']);
                break;
            }
            
            params['amCd']      = actual.amCd;
            params['type']      = actual.detailType;
            params['totalUnit'] = esti['total']['totalUnitSize'];

            if(actual.detailType === 'U')
            {
                params['adCd'] = actual.adCd;
            }

            console.log(JSON.stringify(params, null, 2));

            status.value = true;

            try
            {
                const instance  = await getAxiosData();
                await instance.post(`https://data.planorder.kr/actualV1/getDetailSave`, params);

                await actual.getDetail();
                getPopupClose('itemSet', false);
            }
            catch(e)
            {
                console.log(e);
            }

            status.value = false;
        }
    });
}

const getEstiSave = () => {
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
                    params['eachOptionList']    = esti['total']['eachOptionList'];
                break;
                case '002': case '003': case '005': case '006':
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

            status.value = true;

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/estiV1/getResult`, params);

                console.log(res);
                console.log(esti.type);


                await esti.getEmCd(res.data['emCd']);

                if(esti.type === 'M' || esti.type === 'I')
                {
                    /** 견적에서 수정 시 */
                    await esti.getList();
                }
                else if(esti.type === 'O')
                {
                    /** 발주에서 수정 시 */
                    await order.getList({ emCd : esti['emCd'] });
                }

                if(route.name === 'CustomerEstiDetail')
                {
                    await esti.getDetail(client.stCd);
                }
                else
                {
                    if(esti.type !== 'O')
                    {
                        await client.getDetail();
                        getPopupOpen('estiList');
                    }
                }

                getPopupClose('itemList', false);
                getPopupClose('itemSet', false);

                if(esti.type === 'N')
                {
                    getPopupOpen('estiList');
                }
            }
            catch(e)
            {
                console.log(e);
            }

            status.value = false;
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
</style>