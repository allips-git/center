<template>
    <div class="relative">
        <BackHeader title="고정비용 저장장"/>
        <Button v-if="cost['type'] === 'U'" label="비용 삭제" size="small" severity="danger" outlined class="!absolute  right-4 bottom-1/2 translate-y-1/2 z-[90]" @click="getDelete"/>
    </div>
    <main class="p-5 pb-20">
        <section class="form-gap-box">
            <IftaLabel class="w-full">
                <InputText v-model="cost['info']['title']" class="w-full"/>
                <label>고정비용 이름</label>
            </IftaLabel>

            <IftaLabel class="w-full">
                <DatePicker v-model="cost['info']['fxDt']" showIcon fluid iconDisplay="input" dateFormat="yy-mm-dd" hourFormat="24"/>
                <label>고정 지출 일자</label>
            </IftaLabel>

            <IftaLabel class="w-full">
                <InputText v-keyfilter.num v-model="cost['info']['amt']" class="w-full"/>
                <label>금액</label>
            </IftaLabel>

            <IftaLabel class="w-full">
                <Select optionLabel="label" optionValue="value" v-model="cost['info']['fxGb']" :options="data['fxGb']" class="w-full"/>
                <label>분류선택</label>
            </IftaLabel>

            <IftaLabel class="w-full">
                <label>메모</label>
                <Textarea v-model="cost['info']['contents']" autoResize rows="3" cols="30" class="w-full" />
            </IftaLabel>
        </section>
    </main>
    <div class="bottom-fixed-btn-box">
        <Button :disalbed="status" label="저장" size="large" @click="getResult"/>
    </div>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import IftaLabel from 'primevue/iftalabel';
import DatePicker from 'primevue/datepicker';
import Textarea from 'primevue/textarea';
import { useConfirm } from "primevue/useconfirm";
import { ref } from 'vue'
import { useDataStore, useCostStore } from '@/store';
import { getAxiosData, getTokenOut, getConvertDate } from '@/assets/js/function';
import { usePopup } from '@/assets/js/popup';

const confirm   = useConfirm();
const data      = useDataStore();
const cost      = useCostStore();
const status    = ref(false);

const { getPopupClose } = usePopup();

const getDelete = async () => {
    confirm.require({
        message     : '해당 고정비용을 삭제하시겠습니까?',
        header      : '삭제제',
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
                fxCd : cost['fxCd']
            }

            try
            {
                const instance  = await getAxiosData();
                await instance.post(`https://data.planorder.kr/staticPayV1/getDelete`, params);
                await cost.getListReset();
                await cost.getData();
                getPopupClose('staticPaySet', true);
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
                    alert('고정비용 저장 중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                }
            }
        }
    });
}

const getResult = async () => {
    const params = {
        type        : cost['type'],
        title       : cost['info']['title'],
        fxDt        : getConvertDate(cost['info']['fxDt'], 'yyyy-mm-dd'),
        amt         : cost['info']['amt'],
        fxGb        : cost['info']['fxGb'],
        contents    : cost['info']['contents']
    };

    if(cost['type'] === 'U')
    {
        params['fxCd'] = cost['fxCd'];
    }

    try
    {
        const instance  = await getAxiosData();
        await instance.post(`https://data.planorder.kr/staticPayV1/getResult`, params);
        await cost.getListReset();
        await cost.getData();
        getPopupClose('staticPaySet', true);
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
            alert('고정비용 저장 중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
        }
    }
}
</script>

<style lang="scss">

</style>