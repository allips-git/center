<template>
    <main class="!pb-32">
        <div class="input-layout-box ">
            <div class="flex items-center justify-between w-full mb-2">
                <h1 class="text-sm font-bold">제품명<span class="ml-1 text-sm text-red-500">*</span></h1>
                <!-- <Button label="삭제" size="small" severity="danger" outlined/> -->
            </div>

            <div class="relative flex items-center justify-center mng-input">
                <p class="w-[100px] flex-none text-13">제품이름</p>
                <InputText :value="factory['sys']['itemInfo']['itemNm']" class="w-full" disabled/>
            </div>
            
            <h1 class="mt-4 text-sm font-bold">색상추가<span class="ml-1 text-sm text-red-500">*</span></h1>
            <div class="relative flex items-start justify-center">
                <p class="w-[100px] flex-none pt-2 text-xs">색상이름</p>
                <div class="flex flex-col w-full gap-2 mng-input">
                    <InputText :value="item['icNm']" class="w-full" disabled v-for="(item, index) in factory['sys']['itemInfo']['colors']" :key="index"/>
                </div>
            </div>

            <h1 class="mt-4 text-sm font-bold">옵션 설정<span class="ml-0.5 text-red-500">*</span></h1>
            <div class="relative flex items-center justify-center">
                <p class="w-[100px] flex-none text-xs">기본 단위</p>
                <div class="flex w-full gap-2 mng-input">
                    <InputText :value="factory['sys']['itemInfo']['size']" class="w-3/5" disabled/>
                    <InputText :value="factory['sys']['itemInfo']['unitNm']" class="!w-2/5 !border-l-[0.5px] !focus:border-l-2 custom_select" disabled/>
                </div>
            </div>

            <div class="relative flex items-center justify-center">
                <p class="w-[100px] flex-none text-xs">매입 가격</p>
                <InputText :value="getAmt(factory['sys']['itemInfo']['purcAmt'])" class="w-full !text-right !pr-8" disabled/>
                <span class="absolute text-sm text-blue-500 translate-y-1/2 right-4 bottom-1/2">원</span>
            </div>

            <div class="relative flex items-center justify-center">
                <p class="w-[100px] flex-none text-xs">판매 가격</p>
                <InputText v-model="factory['sys']['itemInfo']['saleAmt']" class="w-full !min-w-0 !max-w-full box-border !text-right !pr-8"/>
                <span class="absolute text-sm text-blue-500 translate-y-1/2 right-4 bottom-1/2">원</span>
            </div>

            <div class="bottom-fixed-btn-box">
                <Button label="저장" size="large" @click="getSysItemSave"/>
            </div>
        </div>
    </main>
</template>
    
<script setup lang="ts">
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