<template>
    <div class="p-4 !pb-20">
        <div class="form-gap-box">
            <IftaLabel>
                <IconField>
                    <InputText id="sysFaCd" v-model="factory['sys']['searchFaCd']" class="w-full" @keyup.enter="getSearch" @click="getSearch"/>
                    <InputIcon class="pi pi-search" />
                </IconField>
                <small class="text-red-500 text-10">{{ factory['sys']['msg']['sysFaCd'] }}</small>
                <!-- <small class="vali_text-tran">none</small> -->
                <label for="faCd">공장 코드</label>
            </IftaLabel>

            <IftaLabel class="w-full">
                <label for="faNm">공장 이름</label>
                <InputText v-model="factory['sys']['searchInfo']['faNm']" class="w-full" disabled/>
            </IftaLabel>

            <IftaLabel class="w-full">
                <label for="einItem">종목</label>
                <InputText v-model="factory['sys']['searchInfo']['einItem']" class="w-full" disabled/>    
            </IftaLabel>

            <IftaLabel class="w-full">
                <label for="person">담당자 성명</label>
                <InputText v-model="factory['sys']['searchInfo']['person']" class="w-full" disabled/>    
            </IftaLabel>
        </div>
        <div class="bottom-modal-absol-box">
            <Button type="button" label="거래신청" @click="getSysFactoryApply" class="w-full"></Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import IftaLabel from 'primevue/iftalabel';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import { useConfirm } from "primevue/useconfirm";
import { useFactoryStore } from '@/store';
import { getAxiosData, getTokenOut } from '@/assets/js/function';
import { usePopup } from '@/assets/js/popup';

const factory   = useFactoryStore();
const confirm   = useConfirm();

const { getPopupClose } = usePopup();

const getSearch = async () => {
    await factory.getSysMsgReset();
    const result = await factory.getSysFactorySearch();

    if(!result['status'])
    {
        switch(result['code'])
        {
            case 4000:
                factory.getSysMsgSet('존재하지 않는 공장코드입니다.', 'sysFaCd');
                getFocus('sysFaCd');
            break;
        }
    }
}

const getSysFactoryApply = () => {
    if(factory['sys']['searchInfo']['faCd'] === '')
    {
        factory.getSysMsgSet('공장 코드를 검색해주세요.', 'sysFaCd');
        getFocus('sysFaCd');
        return false;
    }

    confirm.require({
        message     : '해당 공장에 거래신청을 하시겠습니까?',
        header      : '거래신청',
        rejectProps : {
            label       : '취소',
            severity    : 'secondary',
            outlined    : true
        },
        acceptProps : {
            label: '신청'
        },
        accept : async () => {
            const params = {
                faCd : factory['sys']['searchInfo']['faCd']
            };

            try
            {
                const instance  = await getAxiosData();
                await instance.post(`https://data.planorder.kr/factoryV1/getSysFactoryRequest`, params);
                await factory.getList();
                getPopupClose('sysFactorySearch', true);
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
                    switch(e.response.data['code'])
                    {
                        case 4000:
                            alert('시스템 공장 거래 신청 도중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                        break;
                        case 4100:
                            factory.getSysMsgSet('이미 신청한 공장입니다.', 'sysFaCd');
                            getFocus('sysFaCd');
                        break;
                    }
                }
            }
        }
    });
}

const getFocus = (id: string) => {
    const inputElement = document.getElementById(id);
    if (inputElement) 
    {
        inputElement.focus();
    }
}

</script>

<style lang="scss">

</style>