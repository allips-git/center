<template>
    <div class="sticky top-0 z-10 w-full bg-white">
        <BackHeader title="명세서" />
        <Button label="제품 추가 등록" size="small" class="!absolute right-4 top-1/2 -translate-y-1/2 z-50" @click="getEstiAdd"/>
    </div>
    <main class="main-bottom-fixed-pd">
        <section class="px-5">
            <div class="flex flex-col gap-5">
                <TableCard v-for="(table, index) in esti['list']" :key="index" :title="table.title" :cards="table.cardLists"
                    :columns="table.columns" :rows="table.rows" :tags="table.tags" :showTag="table.showTag" :showButton="table.showButton"
                    @get-modify="getEstiModify"/>
            </div>
        </section>
        <div class="gray-bar"></div>
        <section class="px-5">
            <CalculateCard title="제품 결제 내역" :calcs="esti['payList']" totalTitle="총 결제 금액" :totalAmt="getAmt(esti['payList'], 'total')" :showtoggle="true">
                <div class="flex flex-col gap-5 mt-3">                    
                    <InputGroup @click="getPopupOpen('disAmtSet')">
                        <IftaLabel class="w-full">
                            <InputText :value="getAmtInfo('dcAmt')" class="w-full" readonly/>
                            <label>할인 금액</label>
                        </IftaLabel>
                        <InputGroupAddon><span class="text-sm text-blue-600">원</span></InputGroupAddon>
                    </InputGroup>
            
                    <InputGroup @click="getPopupOpen('addAmtSet')">
                        <IftaLabel class="w-full">
                            <InputText :value="getAmtInfo('addAmt')" class="w-full" readonly/>
                            <label>추가 금액</label>
                        </IftaLabel>
                        <InputGroupAddon><span class="text-sm text-red-600">원</span></InputGroupAddon>
                    </InputGroup>

                    <div class="flex justify-between">
                        <p>천원단위 절삭</p>
                        <ToggleSwitch v-model="esti['cutInfo']['gubun']" @change="getCut"/>
                    </div>
                </div>
            </CalculateCard>
        </section>
    </main>
    <div class="bottom-fixed-btn-box">
        <Button label="견적서 저장" size="large" @click="getEstiSave"/>
        <Button label="계약서 이동" severity="secondary" size="large" @click="getPopupOpen('conInfoSet')"/>
    </div>

    <Dialog v-model:visible="popup['pop']['disAmtSet']" header="할인 가격 입력" 
        :modal=true position="center" class="min-w-96 custom-dialog-center" :dismissableMask="true"
        @update:visible="getPopupClose(true, 'disAmtSet')">
        <div class="pt-3">
            <SaleAmountPop @getApply="getDisApply" @getClose="getPopupClose(true, 'disAmtSet')"/>
        </div>
    </Dialog>

    <Dialog v-model:visible="popup['pop']['addAmtSet']" header="추가 가격 입력" 
        :modal=true position="center" class="min-w-96 custom-dialog-center" :dismissableMask="true"
        @update:visible="getPopupClose(true, 'addAmtSet')">
        <div class="pt-3">
            <AddAmountPop @getApply="getAddApply" @getClose="getPopupClose(true, 'addAmtSet')"/>
        </div>
    </Dialog>

    <Dialog v-model:visible="popup['pop']['itemList']" header="제품선택" 
        :modal=true position="center" class="custom-dialog-bottom"
        @update:visible="getPopupClose(true, 'itemList')">
        <ProductChoice/>
    </Dialog>

    <Dialog v-model:visible="popup['pop']['itemSet']" header="제품등록" 
        :modal=true position="center" class="custom-dialog-bottom"
        @update:visible="getPopupClose(true, 'itemSet')">
        <ProductRegister/>
    </Dialog>
    
    <Dialog v-model:visible="popup['pop']['conInfoSet']" header="계약 정보" 
        :modal=true position="center" class="custom-dialog-bottom"
        @update:visible="getPopupClose(true, 'conInfoSet')">
        <ContractModal/>
    </Dialog>
    
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import TableCard from '@/components/card/TableCard.vue'
import CalculateCard from "@/components/card/CalculateCard.vue";
import IftaLabel from 'primevue/iftalabel';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Dialog from 'primevue/dialog';
import SaleAmountPop from '@/components/modal/SaleAmountPop.vue'
import AddAmountPop from '@/components/modal/addAmountPop.vue'
import ContractModal from '@/views/customer/ContractModal.vue'
import ProductChoice from "@/views/include/ProductChoice.vue";
import ProductRegister from "@/views/include/ProductRegister.vue";
import ToggleSwitch from 'primevue/toggleswitch';
import { useConfirm } from "primevue/useconfirm";
import { onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { usePopupStore, useEstiStore } from '@/store';
import { usePopup } from '@/assets/js/popup';
import { getAmt, getAxiosData, getTokenOut } from '@/assets/js/function';

const confirm   = useConfirm();
const router    = useRouter();
const popup     = usePopupStore();
const esti      = useEstiStore();

const { getPopupOpen, getPopupClose } = usePopup();

const getEstiAdd = () => {
    esti.getType('I');
    esti.getReset();
    getPopupOpen('itemList');
}

const getEstiModify = (edCd: string) => {
    esti.getReset();
    esti.getEdCd(edCd);
    esti.getInfo();
    getPopupOpen('itemSet');
}

const getAmtInfo = (name) => {
    const info = esti['payList'].find(item => item.name === name);

    return info['amt'];
}

const getDisApply = () => {
    getPopupClose(true, 'disAmtSet');

    if(esti['dcInfo']['unit'] === 'F')
    {
        esti['dcInfo']['amt'] = Number(esti['dcInfo']['val']);
        esti.getPayAmt('dcAmt', -Number(esti['dcInfo']['val']));
    }
    else
    {
        const amt    = getAmt(esti['payList'], 'firstDis');
        const dcAmt  = Math.round(amt/100 * esti['dcInfo']['val']);

        esti['dcInfo']['amt'] = -dcAmt;
        esti.getPayAmt('dcAmt', -dcAmt);
    }

    /** 절삭단위 체크된 경우 재적용 */
    if(esti['cutInfo']['gubun'])
    {
        const amt       = getAmt(esti['payList'], 'cutDis');
        const cutAmt    = amt % 10000;

        esti['cutInfo']['amt'] = -cutAmt;
        esti['cutInfo']['val'] = -cutAmt;
        esti.getPayAmt('cutAmt', -cutAmt);
    }
}

const getAddApply = () => {
    getPopupClose(true, 'addAmtSet');

    esti['addInfo']['amt'] = esti['addInfo']['val'];
    esti.getPayAmt('addAmt', Number(esti['addInfo']['val']));

    /** 할인 단위가 %일 시 할인 금액 재적용 */
    if(esti['dcInfo']['unit'] === 'P')
    {
        const amt    = getAmt(esti['payList'], 'firstDis');
        const dcAmt  = Math.round(amt/100 * esti['dcInfo']['val']);

        esti['dcInfo']['amt'] = -dcAmt;
        esti.getPayAmt('dcAmt', -dcAmt);
    }

    /** 절삭단위 체크된 경우 재적용 */
    if(esti['cutInfo']['gubun'] === 'Y')
    {
        const amt       = getAmt(esti['payList'], 'cutDis');
        const cutAmt    = amt % 10000;

        esti['cutInfo']['amt'] = -cutAmt;
        esti['cutInfo']['val'] = -cutAmt;
        esti.getPayAmt('cutAmt', -cutAmt);
    }
}

const getCut = () => {
    let cutAmt = 0;

    if(esti['cutInfo']['gubun'])
    {
        const amt   = getAmt(esti['payList'], 'cutDis');
        cutAmt      = amt % 10000;
    }

    esti['cutInfo']['amt'] = -cutAmt;
    esti['cutInfo']['val'] = -cutAmt;
    esti.getPayAmt('cutAmt', -cutAmt);
}

const getEstiSave = () => {
    confirm.require({
        message     : '견적서를 저장하시겠습니까?',
        header      : '견적서 저장',
        rejectProps : {
            label       : '취소',
            severity    : 'secondary',
            outlined    : true
        },
        acceptProps : {
            label: '저장'
        },
        accept : async () => {
            const params = {
                emCd    : esti['emCd'],
                addInfo : esti['addInfo'],
                dcInfo  : esti['dcInfo'],
                cutInfo : esti['cutInfo']
            }

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                await instance.post(`https://data.planorder.kr/estiV1/getSave`, params);
                router.go(-1);
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
                    alert('견적 저장 중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                }
            }
        }
    });
}

onMounted(() => {
    esti.getList();
});
</script>
