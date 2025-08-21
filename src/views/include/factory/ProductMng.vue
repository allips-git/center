<template>
    <main class="!pb-[20rem] p-4 sm:px-6"><!-- @TODO [임시] 키패드 높이 하단 패딩 처리 (pb-32) -->
        <div class="flex flex-col gap-8">
            <!-- 제품명 -->
            <section class="flex flex-col flex-1 gap-2.5">
                <header class="flex justify-between items-center">
                    <h2 class="mb-1 text-sm font-bold text-t-lv0">제품명<span class="ml-1 text-sm text-red-500">*</span></h2>
                    <!-- <Button label="삭제" size="small" severity="danger" outlined /> -->
                </header>
                <div class="flex flex-1 justify-between items-center">
                    <label class="w-[28%] max-w-[120px] min-w-[80px] flex-none text-13 text-t-lv2">
                        제품이름
                    </label>
                    <InputText :value="factory['sys']['itemInfo']['itemNm']" class="w-full" disabled/>
                </div>
            </section>

            <!-- 색상 추가 -->
            <section class="flex flex-col flex-1 gap-2.5">
                <h2 class="mb-1 text-sm font-bold text-t-lv0">색상 추가<span class="ml-1 text-sm text-red-500">*</span></h2>
                <div class="flex flex-1 justify-between items-start">
                    <label class="w-[28%] max-w-[120px] mt-2.5 min-w-[80px] flex-none text-13 text-t-lv2">
                        색상이름
                    </label>
                    <div class="flex flex-col flex-1 gap-2.5">
                        <InputText :value="item['icNm']" class="w-full" disabled v-for="(item, index) in factory['sys']['itemInfo']['colors']" :key="index"/>
                    </div>
                </div>
            </section>

            <!-- 옵션 설정 -->
            <section class="flex flex-col flex-1 gap-2.5">
                <h2 class="mb-1 text-sm font-bold text-t-lv0">옵션 설정<span class="ml-1 text-sm text-red-500">*</span></h2>
                <div class="flex flex-1 justify-between items-center">
                    <label class="w-[28%] max-w-[120px] min-w-[80px] flex-none text-13 text-t-lv2">
                        기본 단위
                    </label>
                    <div class="flex gap-2 w-full">
                        <InputText :value="factory['sys']['itemInfo']['size']" class="w-3/5" disabled/>
                        <InputText :value="factory['sys']['itemInfo']['unitNm']" class="!w-2/5" disabled/>
                    </div>
                </div>
                <div class="flex flex-1 justify-between items-center">
                    <label class="w-[28%] max-w-[120px] min-w-[80px] flex-none text-13 text-t-lv2">
                        매입 가격
                    </label>
                    <div class="flex-1 input-set has-unit">
                        <InputText :value="getAmt(factory['sys']['itemInfo']['purcAmt'])" class="w-full text-blue-500" disabled/>
                        <span class="text-blue-500 unit">원</span>
                    </div>
                </div>
                <!-- <div class="flex relative justify-center items-center">
                    <p class="w-[100px] flex-none text-xs">판매 가격</p>
                    <InputNumber v-model="factory['sys']['itemInfo']['saleAmt']" class="w-full !min-w-0 !max-w-full box-border !text-right !pr-8"/>
                    <span class="absolute right-4 bottom-1/2 text-sm text-blue-500 translate-y-1/2">원</span>
                </div> -->
                <div class="flex flex-1 justify-between items-center">
                    <label class="w-[28%] max-w-[120px] min-w-[80px] flex-none text-13 text-t-lv2">
                        판매 가격
                    </label>
                    <div class="flex-1 input-set has-unit">
                        <InputNumber v-model="factory['sys']['itemInfo']['saleAmt']" class="w-full text-blue-500" />
                        <span class="text-blue-500 unit">원</span>
                    </div>
                </div>
            </section>
            
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