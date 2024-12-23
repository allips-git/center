<template>
    <main class="p-5 !pb-32">
        <div class="input-layout-box">
            <div class="flex justify-between w-full items-center">
                <h1 class="font-bold">제품명</h1>
            </div>
            <IftaLabel class="w-full">
                <InputText :value="factory['sys']['itemInfo']['itemNm']" class="w-full" disabled/>
                <label>제품 이름</label>
            </IftaLabel>
    
            <h1 class="mt-4 font-bold">색상</h1>
            <div v-for="(item, index) in factory['sys']['itemInfo']['colors']" :key="index" class="flex gap-2">
                <IftaLabel class="w-full">
                    <InputText :value="item['icNm']" class="w-full" disabled/>
                    <label>색상이름</label>
                </IftaLabel>
            </div>
    
            <h1 class="mt-4 font-bold">옵션 설정<span class="ml-0.5 text-red-500">*</span></h1>
            <InputGroup>
                <IftaLabel class="w-full flex gap-2">
                    <InputText :value="factory['sys']['itemInfo']['size']" class="w-full" disabled/>
                    <label>기본 단위</label>
                </IftaLabel>
                <InputText :value="factory['sys']['itemInfo']['unitNm']" class="!w-40 !border-l-[0.5px] !focus:border-l-2 custom_select" disabled/>
            </InputGroup>
    
            <InputGroup>
                <IftaLabel class="w-full flex gap-2">
                    <InputText :value="getAmt(factory['sys']['itemInfo']['purcAmt'])" class="w-full" disabled/>
                    <label>매입 가격</label>
                </IftaLabel>
                <InputGroupAddon>원</InputGroupAddon>
            </InputGroup>
    
            <InputGroup>
                <IftaLabel class="w-full flex gap-2">
                    <InputNumber v-model="factory['sys']['itemInfo']['saleAmt']" class="w-full"/>
                    <label>판매 가격</label>
                </IftaLabel>
                <InputGroupAddon>원</InputGroupAddon>
            </InputGroup>
    
            <div class="bottom-fixed-btn-box">
                <Button label="저장" size="large" @click="getSysItemSave"/>
            </div>
        </div>
    </main>
</template>
    
<script setup lang="ts">
import IftaLabel from 'primevue/iftalabel';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputNumber from 'primevue/inputnumber';
import { useConfirm } from "primevue/useconfirm";
import { onMounted } from 'vue';
import { useFactoryStore } from '@/store';
import { getAxiosData, getCommas, getTokenOut } from '@/assets/js/function';
import { usePopup } from '@/assets/js/popup';

const confirm   = useConfirm();
const factory   = useFactoryStore();
const { getPopupClose } = usePopup();

const getAmt = (amt: number) => {
    return getCommas(Number(amt));
}

const getSysItemSave = () => {
    confirm.require({
        message     : '시스템 공장 제품 정보를 저장하시겠습니까?',
        header      : '저장',
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
                faCd    : factory['sys']['faCd'],
                itemCd  : factory['sys']['itemCd'],
                saleAmt : factory['sys']['itemInfo']['saleAmt']
            }

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                await instance.post(`https://data.planorder.kr/factoryV1/getSysItemSave`, params);
                await factory.getSysItemList();
                getPopupClose('sysFactoryItemSet', true);
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
                    alert('시스템 공장 제품 저장 중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                }
            }
        }
    });
}

onMounted(() => {
    factory.getSysItemInfo();
});
</script>

<style lang="scss">
.custom_select{
    .p-select-label{
        display: flex;
        align-items: center;
        justify-content: center;
    }
}


</style>