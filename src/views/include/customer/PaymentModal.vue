<template>
    <main class="!pb-[20rem] p-4 sm:px-6"><!-- @TODO [임시] 키패드 높이 하단 패딩 처리 (pb-32) -->
        <div class="flex flex-col gap-6">
            <section class="flex flex-col flex-1 gap-3">
                <div class="flex flex-1 justify-between items-center">
                    <label class="w-[28%] max-w-[120px] min-w-[80px] flex-none text-13 text-t-lv2">
                        할인 금액
                    </label>
                    <div class="flex-1">
                        <div class="w-full input-set has-unit">
                            <InputNumber class="w-full text-lg text-red-500" :modelValue="getAmtInfo('lastDcAmt')" placeholder="할인 금액을 입력하세요" 
                            readonly @click="getDisAmtPopup"
                            />
                            <span class="text-red-500 unit">원</span>
                        </div>
                    </div>
                </div>
                <div class="flex flex-1 justify-between items-center">
                    <label class="w-[28%] max-w-[120px] min-w-[80px] flex-none text-13 text-t-lv2">
                        추가 금액
                    </label>
                    <div class="flex-1">
                        <div class="w-full input-set has-unit">
                            <InputNumber class="w-full text-lg text-blue-500 inputNumber-color" 
                            :modelValue="getAmtInfo('lastAddAmt')" placeholder="추가 금액을 입력하세요"
                            readonly @click="getPopupOpen('addAmtSet')"
                            />
                            <span class="text-blue-500 unit">원</span>
                        </div>
                    </div>
                </div>
                <div class="flex flex-1 justify-between items-center">
                    <label class="w-[28%] max-w-[120px] min-w-[80px] flex-none text-13 text-t-lv2">
                        최종 결제금액
                    </label>
                    <div class="flex-1">
                        <div class="w-full input-set has-unit">
                            <InputNumber class="text-lg text-blue-500 inputNumber-color" :modelValue="getTotalAmt()" placeholder="최종 결제 금액을 입력하세요"/>
                            <span class="text-blue-500 unit">원</span>
                        </div>
                    </div>
                </div>
            </section>
            <section class="flex flex-col flex-1 gap-3">
                <h2 class="mb-1 text-sm font-bold text-t-lv0">입금 정보</h2>
                <div class="flex flex-1 justify-between items-center">
                    <label class="w-[28%] max-w-[120px] min-w-[80px] flex-none text-13 text-t-lv2">
                        잔금
                    </label>
                    <div class="flex flex-1 gap-2.5 justify-between items-center">
                        <Select class="*:text-sm" v-model="pay['pay']['payGb']" :options="data['payGb']" optionLabel="label" optionValue="value">
                            <template #dropdownicon>
                                <IconArrowDropDown class="w-4 h-4 text-l-lv0" />
                            </template>
                        </Select>
                        <div class="flex-1">
                            <div class="w-full input-set has-unit">
                                <InputNumber class="text-lg text-blue-500 inputNumber-color width-full" 
                                :modelValue="getTotalAmt()" placeholder="잔금을 입력하세요" readonly
                                />
                                <span class="text-blue-500 unit">원</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-1 justify-between items-start">
                    <label class="w-[28%] max-w-[120px] min-w-[80px] mt-1 flex-none text-13 text-t-lv2">
                        메모
                    </label>
                    <div class="flex-1">
                        <Textarea v-model="pay['pay']['memo']" rows="3" cols="30" style="resize: none" class="w-full"/>
                    </div>
                </div>
            </section>
        </div>
        <div class="mt-2 btn-2-layout-box bottom-fixed-btn-box">
            <Button label="결제 완료" :disabled="status" @click="getPay"/>
        </div>
        
        <Dialog v-model:visible="popup['pop']['disAmtSet']" header="할인 가격 입력" 
            :modal=true position="center" class="min-w-96 custom-dialog-center" :dismissableMask="true"
            @update:visible="getPopupClose('disAmtSet', true)">
            <template #header>
                    <div class="modal-backheader">
                        <Button @click="getPopupClose(true, 'disAmtSet')" severity="contrast" text icon="pi pi-times"/>
                        <h2 class="modal-backheader-title">할인가격입력</h2>
                    </div>
                </template>
            <div class="pt-3">
                <SaleAmountPop :gubun="'P'" @getApply="getDisApply" @getClose="getPopupClose('disAmtSet', true)"/>
            </div>
        </Dialog>

        <Dialog v-model:visible="popup['pop']['addAmtSet']" header="추가 가격 입력" 
            :modal=true position="center" class="min-w-96 custom-dialog-center" :dismissableMask="true"
            @update:visible="getPopupClose('addAmtSet', true)">
            <template #header>
                    <div class="modal-backheader">
                        <Button @click="getPopupClose(true, 'disAmtSet')" severity="contrast" text icon="pi pi-times"/>
                        <h2 class="modal-backheader-title">추가 가격입력</h2>
                    </div>
                </template>
            <div class="pt-3">
                <AddAmountPop :gubun="'P'" @getApply="getAddApply" @getClose="getPopupClose('addAmtSet', true)"/>
            </div>
        </Dialog>
    </main>
</template>

<script setup lang="ts">
import InputNumber  from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import SaleAmountPop from '@/components/modal/SaleAmountPop.vue'
import AddAmountPop from '@/components/modal/addAmountPop.vue'
import { ref } from 'vue';
import { useConfirm } from "primevue/useconfirm";
import { useDataStore, usePopupStore, useClientStore, useEstiStore, usePayStore } from '@/store';
import { useRoute } from 'vue-router';
import { getAmt } from '@/assets/js/function';
import { usePopup } from '@/assets/js/popup';
import { getAxiosData, getTokenOut } from '@/assets/js/function';
import IconArrowDropDown from '@/components/icons/IconArrowDropDown.vue'

const confirm   = useConfirm();
const data      = useDataStore();
const popup     = usePopupStore();
const client    = useClientStore();
const esti      = useEstiStore();
const pay       = usePayStore();
const route     = useRoute();
const status    = ref(false);

const { getPopupOpen, getPopupClose } = usePopup();

const getDisAmtPopup = async () => {
    await data.getCoupon();
    getPopupOpen('disAmtSet');
}

const getAmtInfo = (name) => {
    const info = pay['payList'].find(item => item.name === name);

    return Number(info['amt']);
}

const getDisApply = () => {
    getPopupClose('disAmtSet', true);

    if(pay['dcInfo']['unit'] === 'F')
    {
        const dcAmt = Number(pay['dcInfo']['val']);

        pay['dcInfo']['amt'] = -dcAmt;
        pay.getPayAmt('006', -dcAmt, pay['dcInfo']['memo']);
    }
    else
    {
        const amt    = getAmt(pay['payList'], 'lastDis');
        const dcAmt  = Math.round(amt/100 * pay['dcInfo']['val']);

        pay['dcInfo']['amt'] = -dcAmt;
        pay.getPayAmt('006', -dcAmt, pay['dcInfo']['memo']);
    }
}

const getAddApply = () => {
    getPopupClose('addAmtSet', true);

    pay['addInfo']['amt'] = pay['addInfo']['val'];
    pay.getPayAmt('005', Number(pay['addInfo']['val']));

    /** 할인 단위가 %일 시 할인 금액 재적용 */
    if(pay['dcInfo']['unit'] === 'P')
    {
        const amt    = getAmt(pay['payList'], 'lastDis');
        const dcAmt  = Math.round(amt/100 * pay['dcInfo']['val']);

        pay['dcInfo']['amt'] = -dcAmt;
        pay.getPayAmt('006', -dcAmt);
    }
}

const getTotalAmt = () => {
    return Number(getAmt(pay['payList'], 'total'));
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
                addInfo     : pay['addInfo'],
                dcInfo      : pay['dcInfo'],
                payGb       : pay['pay']['payGb'],
                memo        : pay['pay']['memo'],
                totalAmt    : getTotalAmt()
            };

            console.log(params);

            status.value = true;

            try
            {
                const instance  = await getAxiosData();
                await instance.post(`https://data.planorder.kr/payV1/getPayResult`, params);
                await pay.getList({ emCd : esti['emCd'] });
                
                if(route.name === 'CustomerEstiDetail')
                {
                    await esti.getDetail(client.stCd);
                }
                else
                {
                    await client.getDetail();
                }
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
                    alert('결제 처리 중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                }
            }

            status.value = false;
        }
    });
}
</script>