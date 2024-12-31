<template>
<main class="pt-5 !pb-32">
    <div class="form-gap-box">
        <section class="px-5 form-gap-box">
            <div>
                <h1 class="mb-2 text-lg font-bold">금액 조정</h1>
                <InputGroup>
                    <IftaLabel class="w-full text-red-500">
                        <InputNumber :modelValue="getAmtInfo('lastDcAmt')" placeholder="할인 금액을 입력하세요" 
                            class="*:!text-right" readonly @click="getPopupOpen('disAmtSet')"/>
                        <label>할인금액</label>
                    </IftaLabel>
                    <InputGroupAddon><span class="text-sm text-blue-600">원</span></InputGroupAddon>
                </InputGroup>
            </div>
            
            <InputGroup>
                <IftaLabel class="w-full">
                    <InputNumber :modelValue="getAmtInfo('lastAddAmt')" placeholder="추가 금액을 입력하세요" 
                        class="*:!text-right" readonly @click="getPopupOpen('addAmtSet')"/>
                    <label>추가 금액</label>
                </IftaLabel>
                <InputGroupAddon><span class="text-sm text-blue-600">원</span></InputGroupAddon>
            </InputGroup>
            
            <InputGroup>
                <IftaLabel class="w-full">
                    <InputNumber :modelValue="getTotalAmt()" placeholder="최종 결제 금액을 입력하세요" class="*:!text-right" readonly/>
                    <label>최종 결제 금액</label>
                </IftaLabel>
                <InputGroupAddon><span class="text-sm text-blue-600">원</span></InputGroupAddon>
            </InputGroup>
        </section>

        <div class="gray-bar"></div>
        <section class="px-5 form-gap-box">
            <div class="mt-5">
                <h1 class="mb-2 text-lg font-bold">입금 정보</h1>
                <div class="flex gap-2">
                    <IftaLabel class="w-full">
                        <Select v-model="order['pay']['payGb']" :options="data['payGb']" optionLabel="label" optionValue="value" class="w-full"/>
                        <label>잔금 처리 형식</label>
                    </IftaLabel>

                    <InputGroup>
                        <IftaLabel class="w-full">
                            <InputNumber :modelValue="getTotalAmt()" placeholder="잔금을 입력하세요" class="*:!text-right" readonly/>
                            <label>잔금</label>
                        </IftaLabel>
                        <InputGroupAddon><span class="text-sm text-blue-600">원</span></InputGroupAddon>
                    </InputGroup>
                </div>
            </div>
            <IftaLabel class="w-full">
                <Textarea v-model="order['pay']['memo']" rows="3" cols="30" style="resize: none" class="w-full"/>
                <label>메모</label>
            </IftaLabel>        
        </section>
        <div class="mt-2 btn-2-layout-box bottom-fixed-btn-box">
            <Button label="결제 완료" @click="getPay"/>
        </div>
    </div>
    <Dialog v-model:visible="popup['pop']['disAmtSet']" header="할인 가격 입력" 
        :modal=true position="center" class="min-w-96 custom-dialog-center" :dismissableMask="true"
        @update:visible="getPopupClose('disAmtSet', true)">
        <div class="pt-3">
            <SaleAmountPop :gubun="'P'" @getApply="getDisApply" @getClose="getPopupClose('disAmtSet', true)"/>
        </div>
    </Dialog>

    <Dialog v-model:visible="popup['pop']['addAmtSet']" header="추가 가격 입력" 
        :modal=true position="center" class="min-w-96 custom-dialog-center" :dismissableMask="true"
        @update:visible="getPopupClose('addAmtSet', true)">
        <div class="pt-3">
            <AddAmountPop :gubun="'P'" @getApply="getAddApply" @getClose="getPopupClose('addAmtSet', true)"/>
        </div>
    </Dialog>
</main>
</template>

<script setup lang="ts">
import IftaLabel from 'primevue/iftalabel';
import InputNumber  from 'primevue/inputnumber';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Textarea from 'primevue/textarea';
import SaleAmountPop from '@/components/modal/SaleAmountPop.vue'
import AddAmountPop from '@/components/modal/addAmountPop.vue'
import { useConfirm } from "primevue/useconfirm";
import { useDataStore, usePopupStore, useEstiStore, useOrderStore } from '@/store';
import { getAmt } from '@/assets/js/function';
import { usePopup } from '@/assets/js/popup';
import { getAxiosData, getTokenOut } from '@/assets/js/function';

const confirm   = useConfirm();
const data      = useDataStore();
const popup     = usePopupStore();
const esti      = useEstiStore();
const order     = useOrderStore();

const { getPopupOpen, getPopupClose } = usePopup();

const getAmtInfo = (name) => {
    const info = order['payList'].find(item => item.name === name);

    return Number(info['amt']);
}

const getDisApply = () => {
    getPopupClose('disAmtSet', true);

    if(order['dcInfo']['unit'] === 'F')
    {
        order['dcInfo']['amt'] = Number(order['dcInfo']['val']);
        order.getPayAmt('006', -Number(order['dcInfo']['val']));
    }
    else
    {
        const amt    = getAmt(order['payList'], 'lastDis');
        const dcAmt  = Math.round(amt/100 * order['dcInfo']['val']);

        order['dcInfo']['amt'] = -dcAmt;
        order.getPayAmt('006', -dcAmt);
    }
}

const getAddApply = () => {
    getPopupClose('addAmtSet', true);

    order['addInfo']['amt'] = order['addInfo']['val'];
    order.getPayAmt('005', Number(order['addInfo']['val']));

    /** 할인 단위가 %일 시 할인 금액 재적용 */
    if(order['dcInfo']['unit'] === 'P')
    {
        const amt    = getAmt(order['payList'], 'lastDis');
        const dcAmt  = Math.round(amt/100 * order['dcInfo']['val']);

        order['dcInfo']['amt'] = -dcAmt;
        order.getPayAmt('006', -dcAmt);
    }
}

const getTotalAmt = () => {
    return Number(getAmt(order['payList'], 'total'));
}

const getPay = () => {
    confirm.require({
        message     : '최종 결제를 완료하시겠습니까?',
        header      : '결제',
        rejectProps : {
            label       : '취소',
            severity    : 'secondary',
            outlined    : true
        },
        acceptProps : {
            label: '확인'
        },
        accept : async () => {
            const params = {
                emCd        : esti['emCd'],
                addInfo     : order['addInfo'],
                dcInfo      : order['dcInfo'],
                payGb       : order['pay']['payGb'],
                memo        : order['pay']['memo'],
                totalAmt    : getTotalAmt()
            };

            try
            {
                const instance  = await getAxiosData();
                await instance.post(`https://data.planorder.kr/orderV1/getPayResult`, params);
                await order.getList({ emCd : esti['emCd'] });
                getPopupClose('paymentSet', true);
            }
            catch(e)
            {
                console.log(e);
                if(e.response.status === 401)
                {
                    getTokenOut();
                }
                else
                {
                    alert('결제제 처리 중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                }
            }
        }
    });
}
</script>