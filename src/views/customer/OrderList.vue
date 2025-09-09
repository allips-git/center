<template>
    <main class="pb-[130px] md:pb-32" ref="mainRef">
        <main class="main-bottom-fixed-pd">
            <section class="p-4">
                <div class="flex flex-col gap-5">
                    <TableCard v-for="(table, index) in ord['list']" :key="index" :title="table.title" :cards="table.cardLists"
                        :columns="table.columns" :rows="table.rows" :tags="table.tags" :showTag="table.showTag" :showButton="table.showButton"
                        @get-modify="getEstiModify"/>
                </div>
            </section>
            <div class="gray-bar my-[14px]"></div>
            <section class="p-4">
                <CalculateCard title="제품 결제 내역" :calcs="ord['payList']" totalTitle="총 결제 금액" :totalAmt="getAmt(ord['payList'], 'total')" :showtoggle="true">
                    <div class="flex flex-col gap-5 py-3">                    
                        <div class="flex relative justify-between items-center input-custom">
                            <p class="w-[100px] text-13 flex-none text-t-lv3">할인 금액</p>
                            <InputText class="*:!text-blue-500 inputNumber-color *:!rounded-sm !w-1/3" @click="getDisAmtPopup" :value="getAmtInfo('dcAmt')" readonly/>
                            <span class="absolute right-3 bottom-1/2 text-blue-500 translate-y-1/2 text-13">원</span>
                        </div>

                        <div class="flex relative justify-between items-center input-custom">
                            <p class="w-[100px] text-13 flex-none text-t-lv3">추가 금액</p>
                            <InputText class="*:!text-red-500 inputNumber-color *:!rounded-sm !w-1/3" @click="getPopupOpen('addAmtSet')" :value="getAmtInfo('addAmt')" readonly/>
                            <span class="absolute right-3 bottom-1/2 text-red-500 translate-y-1/2 text-13">원</span>
                        </div>
                    </div>
                    <div class="flex justify-between my-5 custom-toggle">
                        <p class="text-sm">천원단위 절삭</p>
                        <ToggleSwitch v-model="ord['cutInfo']['gubun']" @change="getCut"/>
                    </div>
                </CalculateCard>
            </section>
        </main>
<!-- 
        <div class="!bottom-[56px] md:!bottom-0 md:!left-[200px] bottom-fixed-btn-box sm:!w-full md:!w-[calc(100vw-200px)]" >
            <Button label="확인" size="large" severity="secondary" @click="router.go(-1)"/>
        </div> -->

        <div :style="{width: mainWidth + 'px', left: mainLeft + 'px',  
            }" class="bottom-fixed-btn-box" 
            >
            <Button label="저장하기" size="large" severity="secondary" @click="getSave"/>
        </div>

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
                <SaleAmountPop :gubun="'O'" @getApply="getDisApply" @getClose="getPopupClose('disAmtSet', true)"/>
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
                <AddAmountPop :gubun="'O'" @getApply="getAddApply" @getClose="getPopupClose('addAmtSet', true)"/>
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
                <div class="modal-fullheader change-button">
                    <Button @click="getPopupClose('itemSet', true)" severity="contrast" text icon="pi pi-arrow-left"/>
                    <h2 class="modal-backheader-title">제품등록</h2>
                    <Button label="제품 변경" size="small" @click="getItemChange" class="!z-[100] !bg-p-lv4 !text-white"/>
                </div>
            </template>
            <ProductRegister/>
        </Dialog>
    
        <Dialog v-model:visible="popup['pop']['sysOrderSet']"  header="시스템 발주 정보" 
            :modal=true position="center" class="custom-dialog-bottom backPopup"
            @update:visible="getPopupClose('sysOrderSet', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose(true, 'sysOrderSet')" severity="contrast" text icon="pi pi-times" />
                    <h2 class="modal-backheader-title">시스템 발주 정보</h2>
                </div>
            </template>
            <SysOrderInfo/>
        </Dialog>
    
        <!-- <Dialog v-model:visible="popup['pop']['outOrderSet']"  header="외주 발주 정보" 
            :modal=true position="bottom" class="custom-dialog-bottom"
            @update:visible="getPopupClose('outOrderSet', true)">
            <OutOrderInfo/>
        </Dialog> -->

        <Dialog v-model:visible="popup['pop']['outOrderSet']" 
        header="외주 발주 정보"
        :modal=true
        position="center"
        class="custom-dialog-bottom backPopup"
        @update:visible="getPopupClose(true, 'outOrderSet')">
        <template #header>
            <div class="modal-backheader">
                <Button @click="getPopupClose(true, 'outOrderSet')" severity="contrast" text icon="pi pi-times" iconPos="right"/>
                <h2 class="modal-backheader-title">외주발주정보</h2>
            </div>
        </template>
         <OutOrderInfo/>

        </Dialog>
    </main>
</template>

<script setup lang="ts">
import TableCard from '@/components/card/TableCard.vue'
import CalculateCard from "@/components/card/CalculateCard.vue";
import SysOrderInfo from "@/views/include/customer/SysOrderInfo.vue";
import OutOrderInfo from "@/views/include/customer/OutOrderInfo.vue";
import ProductChoice from "@/views/include/ProductChoice.vue";
import ProductRegister from "@/views/include/ProductRegister.vue";
import SaleAmountPop from '@/components/modal/SaleAmountPop.vue'
import AddAmountPop from '@/components/modal/addAmountPop.vue'
import ToggleSwitch from 'primevue/toggleswitch';
import { useConfirm } from "primevue/useconfirm";
import { ref } from 'vue';
import { onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { useDataStore, usePopupStore, useClientStore, useEstiStore, useOrderStore } from '@/store';
import { usePopup } from '@/assets/js/popup';
import { getAmt, getAxiosData, getTokenOut } from '@/assets/js/function';

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

const confirm   = useConfirm();
const route     = useRoute();
const data      = useDataStore();
const popup     = usePopupStore();
const client    = useClientStore();
const esti      = useEstiStore();
const ord       = useOrderStore();

const { getPopupOpen, getPopupClose } = usePopup();

const getItemChange = () => {
    getPopupClose(true, 'itemSet');
    getPopupOpen('itemList');
}

const getDisAmtPopup = async () => {
    await data.getCoupon();
    getPopupOpen('disAmtSet');
}

const getEstiModify = async (edCd: string) => {
    const info = ord.list.flatMap(item => item.cardLists).find(card => card.edCd === edCd);
    
    // 데이터가 없거나 발주 대기 상태가 아니면 무시
    if (!info || info.detailStCd !== '005') 
    {
        return;
    }

    await esti.getReset();
    await esti.getEdCd(edCd, 'O');
    await esti.getInfo();
    getPopupOpen('itemSet');
}

const getAmtInfo = (name) => {
    const info = ord['payList'].find(item => item.name === name);

    return info['amt'];
}

const getDisApply = () => {
    getPopupClose('disAmtSet', true);

    if(ord['dcInfo']['unit'] === 'F')
    {
        const dcAmt = Number(ord['dcInfo']['val']);
        
        ord['dcInfo']['amt'] = -dcAmt;
        ord.getPayAmt('002', -dcAmt, ord['dcInfo']['memo']);
    }
    else
    {
        const amt    = getAmt(ord['payList'], 'firstDis');
        const dcAmt  = Math.round(amt/100 * ord['dcInfo']['val']);

        ord['dcInfo']['amt'] = -dcAmt;
        ord.getPayAmt('002', -dcAmt, ord['dcInfo']['memo']);
    }

    /** 절삭단위 체크된 경우 재적용 */
    if(ord['cutInfo']['gubun'])
    {
        const amt       = getAmt(ord['payList'], 'cutDis');
        const cutAmt    = amt % 10000;

        ord['cutInfo']['amt'] = -cutAmt;
        ord['cutInfo']['val'] = -cutAmt;
        ord.getPayAmt('003', -cutAmt);
    }
}

const getAddApply = () => {
    getPopupClose(true, 'addAmtSet');

    ord['addInfo']['amt'] = ord['addInfo']['val'];
    ord.getPayAmt('001', Number(ord['addInfo']['val']), ord['addInfo']['memo']);

    /** 할인 단위가 %일 시 할인 금액 재적용 */
    if(ord['dcInfo']['unit'] === 'P')
    {
        const amt    = getAmt(ord['payList'], 'firstDis');
        const dcAmt  = Math.round(amt/100 * ord['dcInfo']['val']);

        ord['dcInfo']['amt'] = -dcAmt;
        ord.getPayAmt('002', -dcAmt, ord['dcInfo']['memo']);
    }

    /** 절삭단위 체크된 경우 재적용 */
    if(ord['cutInfo']['gubun'])
    {
        const amt       = getAmt(ord['payList'], 'cutDis');
        const cutAmt    = amt % 10000;

        ord['cutInfo']['amt'] = -cutAmt;
        ord['cutInfo']['val'] = -cutAmt;
        ord.getPayAmt('003', -cutAmt);
    }
}

const getCut = () => {
    let cutAmt = 0;

    if(ord['cutInfo']['gubun'])
    {
        const amt   = getAmt(ord['payList'], 'cutDis');
        cutAmt      = amt % 10000;
    }

    ord['cutInfo']['amt'] = -cutAmt;
    ord['cutInfo']['val'] = -cutAmt;
    ord.getPayAmt('003', -cutAmt);
}

const getSave = () => {
    confirm.require({
        message     : '발주서를 저장하시겠습니까?',
        header      : '발주서 저장',
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
                addInfo : ord['addInfo'],
                dcInfo  : ord['dcInfo'],
                cutInfo : ord['cutInfo']
            }

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                await instance.post(`https://data.planorder.kr/estiV1/getSave`, params);

                if(route.name === 'CustomerEstiDetail')
                {
                    await esti.getDetail(client.stCd);
                }
                else
                {
                    await client.getDetail();
                }
                
                getPopupClose(true, 'estiList');
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
                    if(e.response.data.code === 4100)
                    {
                        alert('진행된 발주서는 수정할 수 없습니다.');
                    }
                    else
                    {
                        alert('발주서 저장 중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                    }
                }
            }
        }
    });
}

onMounted(async () => {
    await ord.getReset();
    await ord.getList({ emCd : esti['emCd'] });
})

</script>

<style lang="scss">

</style>