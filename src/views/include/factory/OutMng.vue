<template>
<main class="p-5 !pb-32">
    <div class="flex justify-end">
            <Button v-if="factory['out']['itemType'] === 'U'" label="제품 삭제" size="small" severity="danger" @click="getOutItemDelete"/>
        </div>
    <div class="input-layout-box">
        <div class="flex justify-between w-full items-center">
            <h1 class="font-bold">제품명<span class="ml-0.5 text-red-500">*</span></h1>
        </div>
        <IftaLabel class="w-full">
            <InputText id="itemNm" v-model="factory['out']['itemInfo']['itemNm']" class="w-full" autocomplete="off"/>
            <label>제품 이름</label>
            <small class="text-red-500">{{ factory['out']['itemMsg']['itemNm'] }}</small>
        </IftaLabel>

        <h1 class="mt-4 font-bold">색상 추가<span class="ml-0.5 text-red-500">*</span></h1>
        <div v-for="(item, index) in factory['out']['itemInfo']['colors']" :key="index" class="flex gap-2">
            <template v-if="item['delYn'] === 'N'">
                <IftaLabel class="w-full">
                    <InputText :id="`icNm${index}`" v-model="item['icNm']" class="w-full" autocomplete="off"/>
                    <label>색상이름</label>
                </IftaLabel>
                <Button v-if="index === 0" label="색상 추가" class="w-28" @click="getAddColor"/>
                <Button v-if="index !== 0" label="삭제" class="w-28" severity="danger" outlined @click="factory.getOutDelColor(index)"/>
            </template>
        </div>
        <small class="text-red-500">{{ factory['out']['itemMsg']['colors'] }}</small>

        <h1 class="mt-4 font-bold">옵션 설정<span class="ml-0.5 text-red-500">*</span></h1>
        <InputGroup>
            <IftaLabel class="w-full flex gap-2">
                <InputNumber inputId="size" v-model="factory['out']['itemInfo']['size']" class="w-full" autocomplete="off"/>
                <label>기본 단위</label>
            </IftaLabel>
            <Select class="!w-40 !border-l-[0.5px] !focus:border-l-2 custom_select" 
                v-model="factory['out']['itemInfo']['unit']" :options="data['unit']" optionLabel="name" optionValue="value" />
        </InputGroup>
        <small class="text-red-500">{{ factory['out']['itemMsg']['size'] }}</small>

        <InputGroup v-if="factory['out']['itemInfo']['unit'] !== '004'">
            <IftaLabel class="w-full flex gap-2">
                <InputNumber inputId="minHeight" v-model="factory['out']['itemInfo']['minHeight']" class="w-full" autocomplete="off"/>
                <label>기본 높이</label>
            </IftaLabel>
            <InputGroupAddon>cm</InputGroupAddon>
        </InputGroup>
        <small class="text-red-500">{{ factory['out']['itemMsg']['minHeight'] }}</small>

        <InputGroup v-if="factory['out']['itemInfo']['unit'] === '003'">
            <IftaLabel class="w-full flex gap-2">
                <InputNumber inputId="pokSpec" v-model="factory['out']['itemInfo']['pokSpec']" class="w-full" autocomplete="off"/>
                <label>원단 폭</label>
            </IftaLabel>
            <InputGroupAddon>cm</InputGroupAddon>
        </InputGroup>
        <small class="text-red-500">{{ factory['out']['itemMsg']['pokSpec'] }}</small>

        <InputGroup>
            <IftaLabel class="w-full flex gap-2">
                <InputNumber inputId="purcAmt" v-model="factory['out']['itemInfo']['purcAmt']" class="w-full" autocomplete="off"/>
                <label>매입 가격</label>
            </IftaLabel>
            <InputGroupAddon>원</InputGroupAddon>
        </InputGroup>
        <small class="text-red-500">{{ factory['out']['itemMsg']['purcAmt'] }}</small>

        <InputGroup>
            <IftaLabel class="w-full flex gap-2">
                <InputNumber inputId="saleAmt" v-model="factory['out']['itemInfo']['saleAmt']" class="w-full" autocomplete="off"/>
                <label>판매 가격</label>
            </IftaLabel>
            <InputGroupAddon>원</InputGroupAddon>
        </InputGroup>
        <small class="text-red-500">{{ factory['out']['itemMsg']['saleAmt'] }}</small>

        <div class="bottom-fixed-btn-box">
            <Button label="저장" size="large" @click="getOutItemSave"/>
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