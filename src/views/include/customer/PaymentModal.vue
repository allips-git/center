<template>
<main class="pt-5 !pb-32">

    <div class="">
        <section class="px-5 form-gap-box">
            <div class="flex relative justify-between items-center">
                <p class="w-[100px] flex-none text-13">할인 금액</p>
                <InputNumber  class="*:!text-red-500 inputNumber-color !w-[70%]" :modelValue="getAmtInfo('lastDcAmt')" placeholder="할인 금액을 입력하세요" 
                readonly @click="getDisAmtPopup"
                />
                <span class="absolute bottom-2.5 right-4 text-sm text-red-500">원</span>
            </div>

            <div class="flex relative justify-between items-center">
                <p class="w-[100px] flex-none text-13">추가 금액</p>
                <InputNumber class="*:!text-blue-500 inputNumber-color !w-[70%]" 
                :modelValue="getAmtInfo('lastAddAmt')" placeholder="추가 금액을 입력하세요"
                readonly @click="getPopupOpen('addAmtSet')"
                />
                <span class="absolute right-4 bottom-1/2 text-sm text-blue-500 translate-y-1/2">원</span>
            </div>

            <div class="flex relative justify-between items-center">
                <p class="w-[100px] flex-none text-13">최종 결제금액</p>
                <InputNumber class="*:!text-blue-500 inputNumber-color !w-[70%] text-base" :modelValue="getTotalAmt()" placeholder="최종 결제 금액을 입력하세요"/>
                <span class="absolute right-4 bottom-1/2 text-sm text-blue-500 translate-y-1/2">원</span>
            </div>
        </section>

        <section class="px-5">
            <div class="py-6">
                <h1 class="mb-2 text-base font-bold">입금 정보</h1>
                <div class="form-gap-box">
                    <div class="flex relative justify-between items-center w-full">
                        <p class="w-[100px] flex-none text-13">잔금</p>
                        <div class="flex w-[70%] justify-end">
                            <Select class="*:text-sm" v-model="pay['pay']['payGb']" :options="data['payGb']" optionLabel="label" optionValue="value" />
                            <div class="relative ml-2 w-full">
                                <InputNumber class="*:!text-blue-500 inputNumber-color" 
                                :modelValue="getTotalAmt()" placeholder="잔금을 입력하세요" readonly
                                />
                                <span class="absolute right-4 bottom-1/2 text-sm text-blue-500 translate-y-1/2">원</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex relative justify-between items-start">
                        <p class="w-[100px] flex-none text-13">메모</p>
                        <Textarea v-model="pay['pay']['memo']" rows="3" cols="30" style="resize: none" class="w-[70%]"/>
                    </div>
                </div>
            </div>
        </section>
        <div class="mt-2 btn-2-layout-box bottom-fixed-btn-box">
            <Button label="결제 완료" :disabled="status" @click="getPay"/>
        </div>
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
import { getAmt } from '@/assets/js/function';
import { usePopup } from '@/assets/js/popup';
import { getAxiosData, getTokenOut } from '@/assets/js/function';

const confirm   = useConfirm();
const data      = useDataStore();
const popup     = usePopupStore();
const client    = useClientStore();
const esti      = useEstiStore();
const pay       = usePayStore();
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
                await client.getDetail();
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