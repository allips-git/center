<template>
    <div class="p-5">
        <div class="text-sm form-gap-box">

            <div class="relative flex items-center justify-center w-full ">
                <p class="w-[100px] flex-none">계약일</p>
                <DatePicker v-model="con['conInfo']['conDt']" showIcon fluid iconDisplay="input" dateFormat="yy-mm-dd" showTime hourFormat="24" class="w-full"/>
            </div>
            
            <div class="relative flex items-center justify-center w-full">
                <p class="w-[100px] flex-none">시공일</p>
                <div class="flex flex-col w-full gap-1">
                    <DatePicker id="deliDt" v-model="con['conInfo']['deliDt']" showIcon fluid iconDisplay="input" dateFormat="yy-mm-dd" showTime hourFormat="24" class="w-full"/>
                    <small class="w-full text-red-500">{{ con['msg']['deliDt'] }}</small>
                </div>
            </div>

            <div class="relative flex items-center justify-center w-full">
                <p class="w-[100px]  flex-none">설치시간</p>
                <div class="flex w-full gap-2 *:w-full">
                    <Select v-model="con['conInfo']['insHour']" :options="data['hours']" optionLabel="name" optionValue="value" placeholder="시"/>
                    <Select v-model="con['conInfo']['insMinute']" :options="data['minute']" optionLabel="name" optionValue="value" placeholder="분"/>
                </div>
                <small class="text-red-500">{{ con['msg']['insTime'] }}</small>
                <!-- <div class="flex flex-col w-full gap-1">
                    <DatePicker id="insTime" v-model="con['conInfo']['insTime']" showIcon fluid iconDisplay="input" dateFormat="yy-mm-dd" showTime timeOnly hourFormat="24"/>
                    <small class="text-red-500">{{ con['msg']['insTime'] }}</small>
                </div> -->
            </div>

            <div class="relative flex items-center justify-center w-full">
                <p class="w-[100px] flex-none">시공 담당</p>
                <Select class="w-full" v-model="con['conInfo']['person']" :options="con['person']" optionLabel="label" optionValue="value"/>
            </div>

            <div class="relative flex items-center justify-center w-full">
                <p class="w-[100px] flex-none">선금</p>
                <div class="flex w-full gap-2">
                    <Select v-model="con['conInfo']['payGb']" :options="data['payGb']" optionLabel="label" optionValue="value" class="w-full"/>
                    <InputNumber v-model="con['conInfo']['amt']" class="w-full *:w-full"/>
                </div>
            </div>
            <div class="relative flex items-center justify-center w-full">
                <p class="w-[100px] flex-none">메모</p>
                <Textarea v-model="con['conInfo']['memo']" rows="1" cols="30" autoResize class="w-full" placeholder="비고" />
            </div>
        </div>
    </div>
    <div class="bottom-fixed-btn-box">
        <Button label="계약서 이동" size="large" :disabled="status" @click="getConMove"></Button>
    </div>
</template>

<script setup lang="ts">
import InputNumber from 'primevue/inputnumber';
import DatePicker from 'primevue/datepicker';
import Textarea from 'primevue/textarea';
import { useConfirm } from "primevue/useconfirm";
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useDataStore, useClientStore, useEstiStore, useContractStore } from '@/store';
import { getAxiosData, getTokenOut, getConvertDate } from '@/assets/js/function';
import { usePopup } from '@/assets/js/popup';
import { contractMsg } from '@/assets/js/msg';

const confirm   = useConfirm();
const router    = useRouter();
const data      = useDataStore();
const client    = useClientStore();
const esti      = useEstiStore();
const con       = useContractStore();
const status    = ref(false);

const { getPopupClose } = usePopup();

const getConMove = () => {
    const checkParams = {
        deliDt      : con['conInfo']['deliDt'],
        insHour     : con['conInfo']['insHour'],
        insMinute   : con['conInfo']['insMinute']
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
            con['conInfo']['conDt']  = getConvertDate(con['conInfo']['conDt'], 'yyyy-mm-dd hh:ii');
            con['conInfo']['deliDt'] = getConvertDate(con['conInfo']['deliDt'], 'yyyy-mm-dd hh:ii');

            const params = {
                emCd        : esti['emCd'],
                clientCd    : client['clientCd'],
                addInfo     : esti['addInfo'],
                dcInfo      : esti['dcInfo'],
                cutInfo     : esti['cutInfo'],
                insTime     : `${con['conInfo']['insHour']}:${con['conInfo']['insMinute']}`,
                conInfo     : con['conInfo']
            }

            console.log(params);

            status.value = true;

            try
            {
                const instance  = await getAxiosData();
                await instance.post(`https://data.planorder.kr/estiV1/getContract`, params);
                getPopupClose(true, 'conInfoSet');
                router.go(-1);
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

            status.value = false;
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