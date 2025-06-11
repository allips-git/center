<template>
    <div class="sticky top-0 z-10 w-full bg-white product-button">
        <BackHeader title="명세서" />
        <Button label="제품 추가 등록" size="small" class="esti-button" @click="getEstiAdd"/>
    </div>
    <main class="main-bottom-fixed-pd pb-[121px]" ref="mainRef">
        <section class="p-4">
            <div class="flex flex-col gap-5">
                <TableCard v-for="(table, index) in esti['list']" :key="index" :title="table.title" :cards="table.cardLists"
                    :columns="table.columns" :rows="table.rows" :tags="table.tags" :showTag="table.showTag" :showButton="table.showButton"
                    @get-modify="getEstiModify"/>
            </div>
        </section>
        <div class="gray-bar"></div>
        <section class="p-4">
            <CalculateCard title="제품 결제 내역" :calcs="esti['payList']" totalTitle="총 결제 금액" :totalAmt="getAmt(esti['payList'], 'total')" :showtoggle="true">
                <div class="flex flex-col gap-5 py-3 ">                    
                    <div class="relative flex items-center justify-center input-custom">
                        <p class="w-[100px] text-13 flex-none">할인 금액</p>
                        <InputText class="*:!text-blue-500 inputNumber-color *:!rounded-sm" @click="getDisAmtPopup" :value="getAmtInfo('dcAmt')" readonly/>
                        <span class="absolute text-blue-500 translate-y-1/2 text-13 right-4 bottom-1/2">원</span>
                    </div>

                    <div class="relative flex items-center justify-center input-custom">
                        <p class="w-[100px] text-13 flex-none">추가 금액</p>
                        <InputText class="*:!text-red-500 inputNumber-color *:!rounded-sm" @click="getPopupOpen('addAmtSet')" :value="getAmtInfo('addAmt')" readonly/>
                        <span class="absolute text-sm text-red-500 right-4 bottom-2.5">원</span>
                    </div>
                </div>
                <div class="flex justify-between my-5">
                    <p class="text-sm">천원단위 절삭</p>
                    <ToggleSwitch v-model="esti['cutInfo']['gubun']" @change="getCut"/>
                </div>
            </CalculateCard>
        </section>
      
        <div :style="{width: mainWidth + 'px', left: mainLeft + 'px',  
            }" class="bottom-fixed-btn-box" 
            >
            <Button label="견적서 저장" severity="secondary" size="large" @click="getEstiSave"/>
            <Button label="계약서 이동" size="large" @click="getPopupOpen('conInfoSet')"/>
        </div>
    </main>

    <Dialog v-model:visible="popup['pop']['disAmtSet']" 
            :modal=true position="center" class="w-96 max-w-96 custom-dialog-center" :dismissable-mask="true"
            @update:visible="getPopupClose(true, 'disAmtSet')">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose(true, 'disAmtSet')" severity="contrast" text icon="pi pi-times"/>
                    <h2 class="modal-backheader-title">할인</h2>
                </div>
            </template>
            <div class="pt-3">
            <SaleAmountPop :gubun="'E'" @getApply="getDisApply" @getClose="getPopupClose('disAmtSet', true)"/>
        </div>
    </Dialog>

    <Dialog v-model:visible="popup['pop']['addAmtSet']" header="추가 가격 입력" 
            :modal=true position="center" class="w-96 max-w-96 custom-dialog-center" :dismissable-mask="true"
            @update:visible="getPopupClose(true, 'addAmtSet')">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose(true, 'addAmtSet')" severity="contrast" text icon="pi pi-times"/>
                    <h2 class="modal-backheader-title">추가 가격 입력</h2>
                </div>
            </template>
            <div class="pt-3">
            <AddAmountPop :gubun="'E'" @getApply="getAddApply" @getClose="getPopupClose('addAmtSet', true)"/>
        </div>
    </Dialog>

    <Dialog v-model:visible="popup['pop']['itemList']" header="제품선택" 
        :modal=true position="center" class="custom-dialog-full"
        @update:visible="getPopupClose('itemList', true)">
        <template #header>
            <div class="modal-fullheader">
                <h2 class="modal-backheader-title">제품선택</h2>
                <Button @click="getPopupClose('itemList', true)" severity="contrast" text icon="pi pi-arrow-left"/>
            </div>
        </template>
        <ProductChoice/>
    </Dialog>

    <Dialog v-model:visible="popup['pop']['itemSet']" header="제품등록" 
        :modal=true position="center" class="custom-dialog-bottom backPopup"
        @update:visible="getPopupClose('itemSet', true)">
        <template #header>
            <div class="modal-fullheader">
                <Button @click="getPopupClose('itemSet', true)" severity="contrast" text icon="pi pi-arrow-left"/>
                <h2 class="modal-backheader-title">제품등록</h2>
            </div>
        </template>
        <ProductRegister/>
    </Dialog>

    <Dialog v-model:visible="popup['pop']['conInfoSet']" header="계약 정보" 
            :modal=true position="center" class="custom-dialog-bottom" 
            @update:visible="getPopupClose('conInfoSet', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose(true, 'kakaoDetail')" severity="contrast" text icon="pi pi-times"/>
                    <h2 class="modal-backheader-title">계약 정보</h2>
                </div>
            </template>
            <ContractModal/>
        </Dialog>
    
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import TableCard from '@/components/card/TableCard.vue'
import CalculateCard from "@/components/card/CalculateCard.vue";
import Dialog from 'primevue/dialog';
import SaleAmountPop from '@/components/modal/SaleAmountPop.vue'
import AddAmountPop from '@/components/modal/addAmountPop.vue'
import ContractModal from '@/views/customer/ContractModal.vue'
import ProductChoice from "@/views/include/ProductChoice.vue";
import ProductRegister from "@/views/include/ProductRegister.vue";
import ToggleSwitch from 'primevue/toggleswitch';
import { useConfirm } from "primevue/useconfirm";
import { onMounted } from 'vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDataStore, usePopupStore, useEstiStore } from '@/store';
import { usePopup } from '@/assets/js/popup';
import { getAmt, getAxiosData, getTokenOut } from '@/assets/js/function';

const confirm   = useConfirm();
const router    = useRouter();
const data      = useDataStore();
const popup     = usePopupStore();
const esti      = useEstiStore();

const mainRef = ref(null);
const mainWidth = ref(0);
const mainLeft = ref(0)

onMounted(() => {
    const updateMainSize = () => {
        if (mainRef.value) {
            mainWidth.value = mainRef.value.offsetWidth
            mainLeft.value = mainRef.value.offsetLeft
        }
    }

    updateMainSize()

    const observer = new ResizeObserver(() => updateMainSize())
    observer.observe(mainRef.value)
});

const { getPopupOpen, getPopupClose } = usePopup();

const getDisAmtPopup = async () => {
    await data.getCoupon();
    getPopupOpen('disAmtSet');
}

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
    getPopupClose('disAmtSet', true);

    if(esti['dcInfo']['unit'] === 'F')
    {
        const dcAmt = Number(esti['dcInfo']['val']);
        
        esti['dcInfo']['amt'] = -dcAmt;
        esti.getPayAmt('dcAmt', -dcAmt, esti['dcInfo']['memo']);
    }
    else
    {
        const amt    = getAmt(esti['payList'], 'firstDis');
        const dcAmt  = Math.round(amt/100 * esti['dcInfo']['val']);

        esti['dcInfo']['amt'] = -dcAmt;
        esti.getPayAmt('dcAmt', -dcAmt, esti['dcInfo']['memo']);
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

    console.log(esti['dcInfo']);
}

const getAddApply = () => {
    getPopupClose(true, 'addAmtSet');

    esti['addInfo']['amt'] = esti['addInfo']['val'];
    esti.getPayAmt('addAmt', Number(esti['addInfo']['val']), esti['addInfo']['memo']);

    /** 할인 단위가 %일 시 할인 금액 재적용 */
    if(esti['dcInfo']['unit'] === 'P')
    {
        const amt    = getAmt(esti['payList'], 'firstDis');
        const dcAmt  = Math.round(amt/100 * esti['dcInfo']['val']);

        esti['dcInfo']['amt'] = -dcAmt;
        esti.getPayAmt('dcAmt', -dcAmt, esti['dcInfo']['memo']);
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
