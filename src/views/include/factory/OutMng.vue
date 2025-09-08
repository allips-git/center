<template>
    <main class="!pb-[20rem] p-4 sm:px-6"><!-- @TODO [임시] 키패드 높이 하단 패딩 처리 (pb-32) -->
        <div class="flex flex-col gap-8">
            <!-- 제품명 -->
            <section class="flex flex-col flex-1 gap-2.5">
                <header class="flex justify-between items-center">
                    <h2 class="mb-1 text-sm font-bold text-t-lv0">제품명<span class="ml-1 text-sm text-red-500">*</span></h2>
                    <Button v-if="factory['out']['itemType'] === 'U'" label="삭제" size="small" severity="danger" class="!border-l-lv4" outlined @click="getOutItemDelete"/>
                </header>
                <div class="flex flex-1 justify-between items-start">
                    <label class="w-[28%] mt-2.5 max-w-[120px] min-w-[80px] flex-none text-13 text-t-lv2">
                        제품이름
                    </label>
                    <div class="w-full">
                        <InputText id="itemNm" v-model="factory['out']['itemInfo']['itemNm']" class="w-full" autocomplete="off"/>
                        <small class="text-msg">{{ factory['out']['itemMsg']['itemNm'] }}</small>
                    </div>
                </div>
            </section>

            <!-- 색상 추가 -->
            <section class="flex flex-col flex-1 gap-2.5">
                <h2 class="mb-1 text-sm font-bold text-t-lv0">색상 추가<span class="ml-1 text-sm text-red-500">*</span></h2>
                <div class="flex flex-1 justify-between items-start">
                    <label class="w-[28%] mt-2.5 max-w-[120px] min-w-[80px] flex-none text-13 text-t-lv2">
                        색상 이름
                    </label>
                    <div class="flex flex-col flex-1 gap-2.5">
                        <div v-for="(item, index) in factory['out']['itemInfo']['colors']" :key="index" class="">
                            <template v-if="item['delYn'] === 'N'">
                                <div class="flex gap-2">
                                    <InputText :id="`icNm${index}`" v-model="item['icNm']" class="w-full row_input" autocomplete="off"/>
                                    <div class="flex-none w-[3.125rem] h-10">
                                        <Button v-if="index === 0" label="컬러 추가" class="flex-none w-full *:!text-10 !px-0 *:!pb-0.5  h-full" @click="getAddColor"/>
                                        <Button v-if="index !== 0" label="삭제" class="flex-none w-full *:!text-10 !px-0 *:!pb-0.5  h-full" severity="secondary" @click="factory.getOutDelColor(index)"/>
                                    </div>
                                </div>
                                <small class="text-msg">{{ factory['out']['itemMsg']['colors'] }}</small>
                            </template>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 옵션 설정 -->
            <section class="flex flex-col flex-1 gap-2.5">
                <h2 class="mb-1 text-sm font-bold text-t-lv0">옵션 설정<span class="ml-1 text-sm text-red-500">*</span></h2>
                <div class="flex flex-1 justify-between items-start">
                    <label class="w-[28%] mt-2.5 max-w-[120px] min-w-[80px] flex-none text-13 text-t-lv2">
                        기본 단위
                    </label>
                    <div class="w-full">
                        <div class="grid grid-cols-2 gap-2">
                            <InputNumber inputId="size"  v-model="factory['out']['itemInfo']['size']" class="w-full" autocomplete="off"/>
                            <Select class="" 
                            v-model="factory['out']['itemInfo']['unit']" :options="data['unit']" optionLabel="name" optionValue="value">
                                <template #dropdownicon>
                                    <IconArrowDropDown class="w-4 h-4 text-l-lv0" />
                                </template>
                            </Select>
                        </div>
                        <small class="text-msg">{{ factory['out']['itemMsg']['size'] }}</small>
                    </div>
                </div>
                <div class="flex flex-1 justify-between items-start" v-if="factory['out']['itemInfo']['unit'] !== '004'">
                    <label class="w-[28%] max-w-[120px] mt-2.5 min-w-[80px] flex-none text-13 text-t-lv2">
                        기본 높이
                    </label>
                    <div class="flex-1">
                        <div class="w-full input-set has-unit custom-input-style">
                            <InputNumber v-model="factory['out']['itemInfo']['minHeight']" class="w-full" />
                            <span class="text-t-lv1 unit">cm</span>
                        </div>
                        <small class="text-msg">{{ factory['out']['itemMsg']['minHeight'] }}</small>
                    </div>
                </div>
                <div class="flex flex-1 justify-between items-start" v-if="factory['out']['itemInfo']['unit'] === '003'">
                    <label class="w-[28%] mt-2.5 max-w-[120px] min-w-[80px] flex-none text-13 text-t-lv2">
                        원단 폭
                    </label>
                    <div class="flex-1">
                        <div class="w-full input-set has-unit custom-input-style">
                            <InputNumber inputId="pokSpec" v-model="factory['out']['itemInfo']['pokSpec']" class="w-full" autocomplete="off"/>
                            <span class="text-t-lv1 unit">cm</span>
                        </div>
                        <small class="text-msg">{{ factory['out']['itemMsg']['pokSpec'] }}</small>
                    </div>
                </div>
                <div class="flex flex-1 justify-between items-start">
                    <label class="w-[28%] max-w-[120px] mt-2.5 min-w-[80px] flex-none text-13 text-t-lv2">
                        매입 가격
                    </label>
                    <div class="flex-1">
                        <div class="w-full input-set has-unit">
                            <InputNumber inputId="purcAmt" v-model="factory['out']['itemInfo']['purcAmt']" class="w-full" autocomplete="off"/>
                            <span class="text-t-lv1 unit">원</span>
                        </div>
                        <small class="text-msg">{{ factory['out']['itemMsg']['purcAmt'] }}</small>
                    </div>
                </div>
                <div class="flex flex-1 justify-between items-start">
                    <label class="w-[28%] max-w-[120px] mt-2.5 min-w-[80px] flex-none text-13 text-t-lv2">
                        판매 가격
                    </label>
                    <div class="flex-1">
                        <div class="w-full input-set has-unit">
                            <InputNumber inputId="saleAmt" v-model="factory['out']['itemInfo']['saleAmt']" class="w-full" autocomplete="off"/>
                            <span class="text-t-lv1 unit">원</span>
                        </div>
                        <small class="text-msg">{{ factory['out']['itemMsg']['saleAmt'] }}</small>
                    </div>
                </div>
            </section>

            <div class="w-full bottom-modal-absol-box">
                <Button label="저장" class="w-full" @click="getOutItemSave"/>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import InputNumber from 'primevue/inputnumber';
import IconArrowDropDown from '@/components/icons/IconArrowDropDown.vue'


import { useConfirm } from "primevue/useconfirm";
import { useDataStore, useFactoryStore } from '@/store';
import { usePopup } from '@/assets/js/popup';
import { outFactoryItemMsg } from '@/assets/js/msg';
import { getAxiosData } from '@/assets/js/function';

const confirm   = useConfirm();
const data      = useDataStore();
const factory   = useFactoryStore();
const { getPopupClose } = usePopup();

const getAddColor = async () => {
    await factory.getOutAddColor();

    const el = document.getElementById(`icNm${factory['out']['itemInfo']['colors'].length - 1}`);
    el.focus();
}

const getOutItemDelete = () => {
    confirm.require({
        message     : '제품을 삭제하시겠습니까?',
        header      : '제품삭제',
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
                itemCd  : factory['out']['itemCd']
            };

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                await instance.post(`https://data.planorder.kr/factoryV1/getOutFactoryItemDelete`, params);

                factory.getOutFactoryItemList();
                getPopupClose('outFactoryItemSet', true);
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
                    switch(e.response.data['code'])
                    {
                        case 4000:
                            alert('제품 삭제 도중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                        break;
                        case 4100:
                            factory.getOutItemMsgSet('견적에 등록된 제품은 삭제할 수 없습니다.', 'itemNm');
                            getFocus('itemNm');
                        break;
                    }
                }
            }
        }
    });
}

const getOutItemSave = () => {
    const checkParams = {
        itemNm      : factory['out']['itemInfo']['itemNm'],
        colors      : factory['out']['itemInfo']['colors'],
        size        : factory['out']['itemInfo']['size'],
        unit        : factory['out']['itemInfo']['unit'],
        minHeight   : factory['out']['itemInfo']['minHeight'],
        pokSpec     : factory['out']['itemInfo']['pokSpec'],
        purcAmt     : factory['out']['itemInfo']['purcAmt'],
        saleAmt     : factory['out']['itemInfo']['saleAmt']
    };

    const result = outFactoryItemMsg(checkParams);

    if(!result['state'])
    {
        factory.getOutItemMsgSet(result['msg'], result['id']);
        getFocus(result['id']);
        return false;
    }

    confirm.require({
        message     : '제품을 저장하시겠습니까?',
        header      : '제품저장',
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
                type        : factory['out']['itemType'],
                fcCd        : factory['out']['fcCd'],
                itemNm      : factory['out']['itemInfo']['itemNm'],
                colors      : factory['out']['itemInfo']['colors'],
                size        : factory['out']['itemInfo']['size'],
                unit        : factory['out']['itemInfo']['unit'],
                minHeight   : factory['out']['itemInfo']['minHeight'] ? factory['out']['itemInfo']['minHeight'] : 0,
                pokSpec     : factory['out']['itemInfo']['pokSpec'] ? factory['out']['itemInfo']['pokSpec'] : 0,
                purcAmt     : factory['out']['itemInfo']['purcAmt'],
                saleAmt     : factory['out']['itemInfo']['saleAmt']
            };

            if(factory['out']['itemType'] === 'U')
            {
                params['itemCd'] = factory['out']['itemCd'];
            }

            try
            {
                const instance  = await getAxiosData();
                await instance.post(`https://data.planorder.kr/factoryV1/getOutItemResult`, params);

                factory.getOutFactoryItemList();
                getPopupClose('outFactoryItemSet', true);
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
                    switch(e.response.data['code'])
                    {
                        case 4000:
                            alert('제품 저장 도중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                        break;
                        case 4100:
                            factory.getOutItemMsgSet('이미 등록된 제품명입니다.', 'itemNm');
                            getFocus('itemNm');
                        break;
                        case 4200: {
                            factory.getOutItemMsgSet('견적에 등록된 색상은 삭제할 수 없습니다.', 'colors');
                            const result = await factory.getOutColorRestore(e.response.data['icCd']);

                            getFocus(`icNm${result}`);
                        }
                        break;
                    }
                }
            }
        }
    });
}

const getFocus = (id: string) => {
    const el = document.getElementById(id);
    el.focus();
}
</script>

<style lang="scss">
.custom-input-style {
    &.input-set {
        .p-inputtext {
            padding-right: 1.75rem !important;
        }
    }
}
</style>