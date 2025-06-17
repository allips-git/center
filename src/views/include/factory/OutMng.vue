<template>
<main class="p-4 !pb-32">
    <div class="text-sm input-layout-box">
        <div class="flex items-center justify-between w-full mb-2">
            <h1 class="font-bold">제품명<span class="ml-0.5 text-red-500">*</span></h1>
            <Button v-if="factory['out']['itemType'] === 'U'" label="삭제" size="small" severity="danger" class="!border-l-lv4" outlined @click="getOutItemDelete"/>
        </div>
        <div class="relative flex items-center justify-center">
            <p class="w-[100px] flex-none text-13 text-t-lv3">제품 이름</p>
            <div class="w-full mng-input">
                <InputText id="itemNm" v-model="factory['out']['itemInfo']['itemNm']" class="w-full row_input" autocomplete="off"/>
                <small class="text-red-500">{{ factory['out']['itemMsg']['itemNm'] }}</small>
            </div>
        </div>

        <h1 class="mt-4 font-bold">색상 추가<span class="ml-0.5 text-red-500">*</span></h1>
        
        <div class="relative flex items-start justify-center">
            <p class="w-[100px] flex-none pt-2 text-13 text-t-lv3">색상 이름</p>
            <div class="flex flex-col w-full gap-2 mng-input">
                <div v-for="(item, index) in factory['out']['itemInfo']['colors']" :key="index" class="">
                <template v-if="item['delYn'] === 'N'">
                    <div class="flex gap-2">
                        <InputText :id="`icNm${index}`" v-model="item['icNm']" class="w-full row_input" autocomplete="off"/>
                        <div class="flex-none w-[3.125rem] h-10">
                            <Button v-if="index === 0" label="컬러 추가" class="flex-none w-full *:!text-10 !px-0 *:!pb-0.5  h-full" @click="getAddColor"/>
                            <Button v-if="index !== 0" label="삭제" class="flex-none w-full *:!text-10 !px-0 *:!pb-0.5  h-full" severity="secondary" @click="factory.getOutDelColor(index)"/>
                        </div>
                    </div>
                    <small class="text-red-500">{{ factory['out']['itemMsg']['colors'] }}</small>
                </template>
            </div>
            </div>
        </div>



        <h1 class="mt-4 font-bold">옵션 설정<span class="ml-0.5 text-red-500">*</span></h1>

        <div class="relative flex items-center justify-center w-full text-t-lv3 mng-input">
            <p class="w-[100px] flex-none">기본 단위</p>
            <div class="w-full mng-input">
                <div class="flex w-full gap-2 mng-input">
                    <InputNumber inputId="size"  v-model="factory['out']['itemInfo']['size']" class="w-full *:w-full *:!text-center font-bold row_input" autocomplete="off"/>
                    <div class="h-10 custom-select-arrow">
                        <Select class="w-full" 
                        v-model="factory['out']['itemInfo']['unit']" :options="data['unit']" optionLabel="name" optionValue="value" />
                        <IconPlay class="absolute rotate-90 top-3 right-2 *:fill-gray-400 -z-10"/>
                    </div>
                </div>
                <small class="text-red-500">{{ factory['out']['itemMsg']['size'] }}</small>
            </div>    
        </div>

        <div class="relative flex items-center justify-center w-full" v-if="factory['out']['itemInfo']['unit'] !== '004'">
            <p class="w-[100px] flex-none text-t-lv3">기본 높이</p>
            <div class="relative w-full">
                <InputNumber v-model="factory['out']['itemInfo']['minHeight']" class="w-full *:w-full *:!pr-10 row_input inputNumber-color"/>
                <small class="text-red-500">{{ factory['out']['itemMsg']['minHeight'] }}</small>
                <span class="absolute text-sm text-t-lv1 right-4 top-2.5">cm</span>
            </div>
        </div>

        <div class="relative flex items-center justify-center w-full" v-if="factory['out']['itemInfo']['unit'] === '003'">
            <p class="w-[100px] flex-none text-t-lv3">원단 폭</p>
            <div class="w-full">
                <InputNumber inputId="pokSpec" v-model="factory['out']['itemInfo']['pokSpec']" class="w-full *:w-full row_input inputNumber-color" autocomplete="off"/>
                <small class="text-red-500">{{ factory['out']['itemMsg']['pokSpec'] }}</small>
            </div>
            <span class="absolute text-13 text-t-lv1 right-4 top-2.5">cm</span>
        </div>

        <div class="relative flex items-center justify-center w-full">
            <p class="w-[100px] flex-none text-t-lv3">매입 가격</p>
            <div class="w-full">
                <InputNumber inputId="purcAmt" v-model="factory['out']['itemInfo']['purcAmt']" class="w-full row_input *:w-full inputNumber-color" autocomplete="off"/>
                <small class="text-red-500">{{ factory['out']['itemMsg']['purcAmt'] }}</small>
            </div>
            <span class="absolute text-13 text-t-lv1 right-4 top-2.5">원</span>
        </div>

        <div class="relative flex items-center justify-center w-full">
            <p class="w-[100px] flex-none text-t-lv3">판매가격</p>
            <div class="w-full">
                <InputNumber inputId="saleAmt" v-model="factory['out']['itemInfo']['saleAmt']" class="w-full *:w-full row_input inputNumber-color" autocomplete="off"/>
                <small class="text-red-500">{{ factory['out']['itemMsg']['saleAmt'] }}</small>
            </div>
            <span class="absolute text-13 text-t-lv1 right-4 top-2.5">원</span>
        </div>


        <div class="w-full bottom-modal-absol-box">
            <Button label="저장" class="w-full" @click="getOutItemSave"/>
        </div>
    </div>
</main>
</template>

<script setup lang="ts">
import InputNumber from 'primevue/inputnumber';
import IconPlay from '@/components/icons/IconPlay.vue';

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
.custom_select{
    .p-select-label{
        display: flex;
        align-items: center;
        justify-content: center;
    }
}


</style>