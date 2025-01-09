<template>
<main class="p-5 !pb-32">
    <div class="input-layout-box">
        <div class="flex items-center justify-between w-full mb-2">
            <h1 class="font-bold">제품명<span class="ml-0.5 text-red-500">*</span></h1>
            <Button v-if="factory['out']['itemType'] === 'U'" label="제품 삭제" size="small" severity="danger" outlined @click="getOutItemDelete"/>
        </div>
        <div class="relative flex items-center justify-center">
            <p class="w-[100px] flex-none">제품 이름</p>
            <div class="w-full">
                <InputText id="itemNm" v-model="factory['out']['itemInfo']['itemNm']" class="w-full" autocomplete="off"/>
                <small class="text-red-500">{{ factory['out']['itemMsg']['itemNm'] }}</small>
            </div>
        </div>

        <h1 class="mt-4 font-bold">색상 추가<span class="ml-0.5 text-red-500">*</span></h1>
        
        <div class="relative flex items-start justify-center">
            <p class="w-[100px] flex-none pt-2">색상추가</p>
            <div class="flex flex-col w-full gap-2">
                <div v-for="(item, index) in factory['out']['itemInfo']['colors']" :key="index" class="">
                <template v-if="item['delYn'] === 'N'">
                    <div class="flex gap-2">
                        <InputText :id="`icNm${index}`" v-model="item['icNm']" class="w-full" autocomplete="off"/>
                        <div class="flex-none w-[5.5rem]">
                            <Button v-if="index === 0" label="색상 추가" class="flex-none w-full" @click="getAddColor"/>
                            <Button v-if="index !== 0" label="삭제" class="flex-none w-full" severity="secondary" @click="factory.getOutDelColor(index)"/>
                        </div>
                    </div>
                    <small class="text-red-500">{{ factory['out']['itemMsg']['colors'] }}</small>
                </template>
            </div>
            </div>
        </div>



        <h1 class="mt-4 font-bold">옵션 설정<span class="ml-0.5 text-red-500">*</span></h1>

        <div class="relative flex items-center justify-center w-full">
            <p class="w-[100px] flex-none">기본 단위</p>
            <div>
                <div class="flex w-full gap-2">
                    <InputNumber inputId="size" v-model="factory['out']['itemInfo']['size']" class="w-full *:w-full *:!text-center font-bold" autocomplete="off"/>
                    <Select class="w-full !border-l-[0.5px] !focus:border-l-2 custom_select" 
                    v-model="factory['out']['itemInfo']['unit']" :options="data['unit']" optionLabel="name" optionValue="value" />
                </div>
                <small class="text-red-500">{{ factory['out']['itemMsg']['size'] }}</small>
            </div>    
        </div>

        <div class="relative flex items-center justify-center w-full" v-if="factory['out']['itemInfo']['unit'] !== '004'">
            <p class="w-[100px] flex-none">기본 높이</p>
            <div class="relative w-full">
                <InputNumber v-model="factory['out']['itemInfo']['minHeight']" class="w-full *:!pr-10 inputNumber-color"/>
                <small class="text-red-500">{{ factory['out']['itemMsg']['minHeight'] }}</small>
                <span class="absolute text-sm text-blue-500 right-4 top-3">cm</span>
            </div>
        </div>

        <div class="relative flex items-center justify-center w-full" v-if="factory['out']['itemInfo']['unit'] === '003'">
            <p class="w-[100px] flex-none">원단 폭</p>
            <div class="w-full">
                <InputNumber inputId="pokSpec" v-model="factory['out']['itemInfo']['pokSpec']" class="w-full inputNumber-color" autocomplete="off"/>
                <small class="text-red-500">{{ factory['out']['itemMsg']['pokSpec'] }}</small>
            </div>
            <span class="absolute text-sm text-blue-500 right-4 top-3">cm</span>
        </div>

        <div class="relative flex items-center justify-center w-full">
            <p class="w-[100px] flex-none">매입 가격</p>
            <div class="w-full">
                <InputNumber inputId="purcAmt" v-model="factory['out']['itemInfo']['purcAmt']" class="w-full inputNumber-color" autocomplete="off"/>
                <small class="text-red-500">{{ factory['out']['itemMsg']['purcAmt'] }}</small>
            </div>
            <span class="absolute text-sm text-blue-500 right-4 top-3">원</span>
        </div>

        <div class="relative flex items-center justify-center w-full">
            <p class="w-[100px] flex-none">판매가격</p>
            <div class="w-full">
                <InputNumber inputId="saleAmt" v-model="factory['out']['itemInfo']['saleAmt']" class="w-full inputNumber-color" autocomplete="off"/>
                <small class="text-red-500">{{ factory['out']['itemMsg']['saleAmt'] }}</small>
            </div>
            <span class="absolute text-sm text-blue-500 right-4 top-3">원</span>
        </div>


        <div class="bottom-fixed-btn-box">
            <Button label="저장" size="large" @click="getOutItemSave"/>
        </div>
    </div>
</main>
</template>

<script setup lang="ts">
import InputNumber from 'primevue/inputnumber';
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