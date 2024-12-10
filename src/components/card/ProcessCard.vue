<template>
    <!-- 프로세스 카드 -->
     <div class="w-full p-4 rounded border border-gray-200">
         <div class="flex justify-between border-b border-neutral-100 pb-4 font-bold">
             <h1>{{ props.info['stNm'] }}</h1>
             <h2 class="text-xl">{{ getAmt(props.info['totalSaleAmt']) }}원</h2>
         </div>

         <ul class="flex mt-5">
            <li class="w-1/4 flex flex-col gap-3 *:first:rounded-l-full *:last:rounded-r-full">
                <div class="w-full h-2" :class="props['info']['conDt'] !== '' ? 'bg-indigo-500' : 'bg-gray-200'" ></div>
                <p class="text-sm text-center text-gray-600">계약 완료</p>
                <p class="text-sm text-center text-gray-600">{{ getDate(props.info['conDt']) }}</p>
            </li>
            <li class="w-1/4 flex flex-col gap-3 *:first:rounded-l-full *:last:rounded-r-full">
                <div class="w-full h-2" :class="props['info']['preDt'] !== '' ? 'bg-indigo-500' : 'bg-gray-200'" ></div>
                <p class="text-sm text-center text-gray-600">발주 완료</p>
                <p class="text-sm text-center text-gray-600">{{ getDate(props.info['preDt']) }}</p>
            </li>
            <li class="w-1/4 flex flex-col gap-3 *:first:rounded-l-full *:last:rounded-r-full">
                <div class="w-full h-2" :class="props['info']['deliConDt'] !== '' ? 'bg-indigo-500' : 'bg-gray-200'" ></div>
                <p class="text-sm text-center text-gray-600">시공 완료</p>
                <p class="text-sm text-center text-gray-600">{{ getDate(props.info['deliConDt']) }}</p>
            </li>
            <li class="w-1/4 flex flex-col gap-3 *:first:rounded-l-full *:last:rounded-r-full">
                <div class="w-full h-2" :class="props['info']['payDt'] !== '' ? 'bg-indigo-500' : 'bg-gray-200'" ></div>
                <p class="text-sm text-center text-gray-600">결제 완료</p>
                <p class="text-sm text-center text-gray-600">{{ getDate(props.info['payDt']) }}</p>
            </li>
        </ul>

        <div class="my-8">
            <section v-if="props.info['stCd'] === '001' || props.info['stCd'] === '002'" class="w-full text-center flex flex-col gap-1">
                <p class="text-gray-400">견적일</p>
                <span class="text-base">{{ getDateAndTime(props.info['estiDt']) }}</span>
            </section>

            <section v-else class="flex gap-2">
                <p class="text-center text-gray-400 w-full">
                    시공일
                    <span class="block text-gray-900">{{ props.info['deliDt'] === '' ? getDateAndTime(props.info['deliConDt']) : getDateAndTime(props.info['deliDt']) }}</span>
                </p>
                <p class="text-center text-gray-400 w-full border-l">
                    작업시간
                    <span class="block text-gray-900">{{ props.info['insTime'] }}</span>
                </p>
            </section>
        </div>

        <section class="flex gap-3 *:w-full">
            <template v-if="props.info['stCd'] === '001' && props.info['useYn'] === 'Y'">
                <Button label="제품추가"/>
            </template>
            <template v-else-if="props.info['stCd'] === '012'">
                <Button severity="secondary" label="상세보기"/>
            </template>
            <template v-else-if="props.info['useYn'] === 'N'">
                <Button severity="secondary" label="견적서 복원" @click="getEstiRestore"/>
            </template>
            <template v-else>
                <Button severity="secondary" :label="getFirstBtnText()" @click="getFirstBtnClick"/>
                <Button :label="getSecondBtnText()" @click="getSecondBtnClick"/>
            </template>
            <Button v-if="props.info['useYn'] !== 'N'" severity="secondary" icon="pi pi-ellipsis-h" outlined class="flex-none" @click="togglemorePopover" />
            <Popover class="custom-popover-listbox" ref="morePopover" dismissable> 
                <Listbox :options="moreBtnList" optionLabel="name" optionValue="value" class="w-full md:w-56">
                <template #option="slotProps">
                    <ul class="flex items-center">
                        <li @click="getProcess(slotProps.option.value)">{{ slotProps.option.name }}</li>
                    </ul>
                </template>
                </Listbox>
            </Popover> 
        </section>
     </div>
</template>

<script setup lang="ts">
import Popover from 'primevue/popover';
import Listbox from 'primevue/listbox';
import { ref } from 'vue';
import { useConfirm } from "primevue/useconfirm";
import { useRouter } from 'vue-router';
import { useClientStore, useEstiStore } from '@/store';
import { getAxiosData, getTokenOut, getCommas, getConvertDate } from '@/assets/js/function';

const confirm   = useConfirm();
const client    = useClientStore();
const esti      = useEstiStore();
const router    = useRouter();
const props     = defineProps({
    info : Object
});

const morePopover = ref() 

const togglemorePopover = (event) => {
    morePopover.value.toggle(event);
}

const getAmt = (amt) => {
    return getCommas(Number(amt));
};

const getDate = (date: string) => {
    return date !== '' ? getConvertDate(new Date(date), 'mm%dd%w%') : '';
}

const getDateAndTime = (date) => {
    return getConvertDate(new Date(date), 'mm%dd%w% hh:ii');
}

const getFirstBtnText = () => {
    let text = '견적서 공유';

    switch (props.info['stCd']) 
    {
        case '002': /** 견적 진행 */
            text = '견적서 공유';
        break;
        case '003': /** 계약 완료 */
            text = '계약서 공유';
        break;
        case '006': /** 발주 완료 */ 
        case '011': /** 시공 완료 */
            text = '상세보기';
        break;
    }

    return text;
};

const getSecondBtnText = () => {
    let text = '';

    switch(props.info['stCd'])
    {
        case '002': /** 견적 진행 */
            text = '견적서 이동';
        break;
        case '003': /** 계약 완료 */
            text = '공장발주';
        break; 
        case '006': /** 발주 완료 */
            text = '시공완료';
        break;
        case '011': /** 시공 완료 */
            text = '결제입력';
        break;
    }

    return text;
};

const getFirstBtnClick = () => {
    switch(props.info['stCd'])
    {
        case '002':
            router.push({ path : '/customer/estiMate' });
        break;
        case '003':
            router.push({ path : '/customer/conMate' });
        break;
        case '006': case '012':
            router.push({ path: '/customer/orderList' });
        break;
    }
}

const getSecondBtnClick = () => {
    switch(props.info['stCd'])
    {
        case '002':
            esti.getEmCd(props['info']['emCd']);
            router.push({ path: '/customer/estiList' });
        break;
        case '003':
            router.push({ path: '/customer/orderList' });
        break;
        case '006':
            // getAlertDataSet(true, '시공완료', '시공완료 처리하시겠습니까?', true);
            // resultYn.value = 'Y';
        break;
        case '011': case '012':
            router.push({ path: '/customer/orderList' });
        break;
    }
}

const getEstiRestore = () => {
    confirm.require({
        message     : '해당 견적을 복원하시겠습니까?',
        header      : '견적복원',
        rejectProps : {
            label       : '취소',
            severity    : 'secondary',
            outlined    : true
        },
        acceptProps : {
            label: '확인'
        },
        accept : async () => {
            try
            {
                const instance  = await getAxiosData();
                await instance.post(`https://data.planorder.kr/estiV1/getRestore`, { emCd : props['info']['emCd'] });
                client.getDetail();
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
                    alert('견적 복원 중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                }
            }
        }
    });
}

const getProcess = (value: string) => {
    switch(value)
    {
        case 'E':
            router.push({ path : '/customer/estiMate' });
        break;
        case 'C':
        break;
        case 'T':
        break;
        case 'N':
            confirm.require({
                message     : '해당 견적을 취소하시겠습니까?',
                header      : '견적취소',
                rejectProps : {
                    label       : '취소',
                    severity    : 'secondary',
                    outlined    : true
                },
                acceptProps : {
                    label: '확인'
                },
                accept : async () => {
                    try
                    {
                        const instance  = await getAxiosData();
                        await instance.post(`https://data.planorder.kr/estiV1/getCancel`, { emCd : props['info']['emCd'] });
                        client.getDetail();
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
                                    alert('견적 취소 중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                                break;
                                case 4100:
                                    alert('해당 견적에는 발주처리 또는 진행 중인 제품이 존재하여, 취소가 불가능합니다.');
                                break;
                            }
                        }
                    }
                }
            });
        break;
    }
}

const moreBtnList = ref([
    { name: '견적서 발송', value : 'E' },
    { name: '계약서 발송', value : 'C' },
    { name: '네비게이션', value : 'T' },
    { name: '명세표 취소', value : 'N' }
]);
</script>
