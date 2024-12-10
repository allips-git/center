<template>
    <div class="p-5">
        <div class="form-gap-box">
            <IftaLabel class="label-input-box">
                <DatePicker v-model="con['conInfo']['conDt']" showIcon fluid iconDisplay="input" dateFormat="yy-mm-dd" showTime hourFormat="24"/>
                <label>계약일</label>
            </IftaLabel>
    
            <IftaLabel class="label-input-box">
                <DatePicker id="deliDt" v-model="con['conInfo']['deliDt']" showIcon fluid iconDisplay="input" dateFormat="yy-mm-dd" showTime hourFormat="24"/>
                <label>시공일</label>
                <small class="text-red-500">{{ con['msg']['deliDt'] }}</small>
            </IftaLabel>
    
            <IftaLabel class="label-input-box">
                <DatePicker id="insTime" v-model="con['conInfo']['insTime']" showIcon fluid iconDisplay="input" dateFormat="yy-mm-dd" showTime timeOnly hourFormat="24"/>
                <label>설치시간</label>
                <small class="text-red-500">{{ con['msg']['insTime'] }}</small>
            </IftaLabel>

            <IftaLabel class="label-input-box">
                <Select v-model="con['conInfo']['person']" :options="con['person']" optionLabel="label" optionValue="value"/>
                <label>시공 담당</label>
            </IftaLabel>
            <div>
                <div class="flex gap-4">
                    <IftaLabel class="w-60">
                        <label>지급 방식</label>
                        <Select v-model="con['conInfo']['payGb']" :options="data['payGb']" optionLabel="label" optionValue="value" class="w-full"/>
                    </IftaLabel>

                    <IftaLabel class="w-full ">
                        <label>선금 금액</label>
                        <InputNumber v-model="con['conInfo']['amt']" class="w-full"/>
                    </IftaLabel>
                </div>
            </div>

            <IftaLabel class="w-full">
                <label>메모</label>
                <Textarea v-model="con['conInfo']['memo']" rows="3" cols="30" style="resize: none" class="w-full" />
            </IftaLabel>
        </div>
    </div>
    <div class="bottom-fixed-btn-box">
        <Button label="계약서 이동" size="large" @click="getConMove"></Button>
    </div>
</template>

<script setup lang="ts">
import IftaLabel from 'primevue/iftalabel';
import InputNumber from 'primevue/inputnumber';
import DatePicker from 'primevue/datepicker';
import Textarea from 'primevue/textarea';
import { useConfirm } from "primevue/useconfirm";
import { onMounted } from 'vue'
import { useDataStore, useClientStore, useEstiStore, useContractStore } from '@/store';
import { getAxiosData, getTokenOut, getConvertDate } from '@/assets/js/function';
import { usePopup } from '@/assets/js/popup';
import { contractMsg } from '@/assets/js/msg';

const confirm   = useConfirm();
const data      = useDataStore();
const client    = useClientStore();
const esti      = useEstiStore();
const con       = useContractStore();

const { getPopupClose } = usePopup();

const getConMove = () => {
    const checkParams = {
        deliDt  : con['conInfo']['deliDt'],
        insTime : con['conInfo']['insTime']
    }

    const result = contractMsg(checkParams);

    if(!result['state'])
    {
        con.getMsgSet(result['msg'], result['id']);
        getFocus(result['id']);
        return false;
    }

    confirm.require({
        message     : '해당 견적서를 계약 진행하시겠습니까?',
        header      : '계약처리',
        rejectProps : {
            label       : '취소',
            severity    : 'secondary',
            outlined    : true
        },
        acceptProps : {
            label: '계약'
        },
        accept : async () => {
            const params = {
                emCd        : esti['emCd'],
                clientCd    : client['clientCd'],
                addInfo     : esti['addInfo'],
                dcInfo      : esti['dcInfo'],
                cutInfo     : esti['cutInfo'],
                insTime     : con['conInfo']['insTime'],
                conInfo     : con['conInfo']
            }

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                await instance.post(`https://data.planorder.kr/estiV1/getContract`, params);
                getPopupClose(true, 'conInfoSet');
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
                    if(e.response.data['code'] === 4100)
                    {
                        alert('실측 데이터 견적이 존재하므로, 계약 처리가 불가능합니다.');
                    }
                    else
                    {
                        alert('계약 처리 중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
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

onMounted(async () => {
    await con.getReset();
    await con.getData({ emCd : esti['emCd'] });
})

</script>

<style lang="scss" >
.custom-input-select-btn{
    display: flex;
    align-items: center;
    justify-content: end;
}
// .custom-InputGroupAddon{
//     padding: 0 !important;
//     width: 50%;
//     flex:  none;
//     // border: none !important;
// }
</style>