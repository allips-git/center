<template>
    <main class="pb-[174px] md:pb-[124px]" ref="mainRef">
        <div class="relative">
            <section class="px-4 mb-6 sm:px-8">
                <InfoCard :title="factory['out']['detail']['header'][0]['value']" 
                    :info="factory['out']['detail']['header']" :btnLabel="'수정하기'"
                    @get-delete="getDelete" @get-btn="getPopOpen('outFactorySet')"/>
            </section>
            <div class="gray-bar" />
            <section class="px-4 my-6 sm:px-8">
                <CalculateCard :showtitle="true" :calcs="factory['out']['detail']['info']" title="매입 거래원장" 
                    totalTitle="총 결제 금액" :totalAmt="factory['out']['detail']['totalAmt']"/>
            </section>
        </div>

        <div :style="{width: mainWidth + 'px', left: mainLeft + 'px',  
        }" class="!flex-col bottom-fixed-btn-box !pt-[18px] !gap-4" 
        >
        <div class="flex justify-between w-full text-base font-bold">
                <p >총 제품</p>
                <p class="text-p-lv4">{{ factory['out']['detail']['itemCnt'] }}개</p>
            </div>
            <Button label="제품 설정하기" size="large" @click="getPopupOpen('outFactoryItemList')"/>
        </div>

        <Dialog v-model:visible="popup['pop']['outFactoryItemList']" header="외주공장 제품정보" 
            :modal=true position="center" class="custom-dialog-full"
            @update:visible="getPopupClose('outFactoryItemList', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose('outFactoryItemList', true)" severity="contrast" text icon="pi pi-times"/>
                    <h2 class="modal-backheader-title">외주 공장 제품정보</h2>
                </div>
            </template>
            <OutProduct/>
        </Dialog>

        <Dialog v-model:visible="popup['pop']['outFactorySet']" header="외주 공장 저장" 
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopClose('outFactorySet', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose(true, 'outFactorySet')" severity="contrast" text icon="pi pi-times"/>
                    <h2 class="modal-backheader-title">외주 공장 저장</h2>
                </div>
            </template>
            <OutFactorySet/>
        </Dialog>
    </main>
</template>
    
<script setup lang="ts">
import CalculateCard from "@/components/card/CalculateCard.vue";
import InfoCard from "@/components/card/InfoCard.vue";
import OutProduct from "@/views/include/factory/OutProduct.vue";
import OutFactorySet from '@/views/include/factory/OutFactorySet.vue'
import { useConfirm } from "primevue/useconfirm";
import { ref } from 'vue';
import { onMounted, onUnmounted } from 'vue';
import { usePopupStore, useFactoryStore } from '@/store';
import { usePopup } from '@/assets/js/popup';
import { getAxiosData } from '@/assets/js/function';

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
const popup     = usePopupStore();
const factory   = useFactoryStore();
const { getPopupOpen, getPopupClose } = usePopup();

const getDelete = () => {
    confirm.require({
        message     : '해당 외주공장을 삭제하시겠습니까?',
        header      : '외주공장 삭제',
        rejectProps : {
            label       : '취소',
            severity    : 'secondary',
            outlined    : true
        },
        acceptProps : {
            label: '삭제'
        },
        accept : async () => {
            const params = {
                fcCd : factory.out.fcCd
            }

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                await instance.post(`https://data.planorder.kr/factoryV1/getOutFactoryDelete`, params);
            }
            catch(e)
            {
                console.log(e);
                if(e.response.status === 401)
                {
                    alert('토큰 만료');
                }
                else
                {
                    alert('외주 공장 삭제 중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                }
            }
        }
    });
}

const getPopOpen = (popNm: string) => {
    factory.getOutInfoReset();
    factory.getOutFactoryInfo();
    getPopupOpen(popNm);
}

onMounted(async () => {
    await factory.getOutFactoryDetail();
});

onUnmounted(async () => {
    await factory.getList();
});
</script>

<style lang="scss">

</style>