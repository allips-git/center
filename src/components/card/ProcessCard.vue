<template>
    <!-- 프로세스 카드 -->
     <div class="w-full p-4 border border-gray-200 rounded">
         <div class="flex justify-between pb-4 text-sm font-bold border-b border-neutral-100">
             <h1>{{ props.info['stNm'] }}</h1>
             <h2 class="">{{ getAmt(props.info['totalSaleAmt']) }}원</h2>
         </div>

         <ul class="flex mt-5">
            <li class="w-1/4 flex flex-col gap-1 *:first:rounded-l-full *:last:rounded-r-full">
                <div class="w-full h-2 mb-2" :class="props['info']['conDt'] !== '' ? 'bg-sky-500' : 'bg-gray-200'" ></div>
                <p class="text-center text-11" :class="props['info']['conDt'] !== '' ? 'text-gray-900' : ''" >계약 완료</p>
                <p class="text-center text-10 " :class="props['info']['conDt'] !== '' ? 'text-gray-400' : ''">{{ getDate(props.info['conDt']) }}</p>
            </li>
            <li class="w-1/4 flex flex-col gap-1 *:first:rounded-l-full *:last:rounded-r-full">
                <div class="w-full h-2 mb-2" :class="props['info']['preDt'] !== '' ? 'bg-sky-500' : 'bg-gray-200'" ></div>
                <p class="text-center text-11" :class="props['info']['preDt'] !== '' ? 'text-gray-900' : ''">발주 완료</p>
                <p class="text-center text-10" :class="props['info']['preDt'] !== '' ? 'text-gray-400' : ''" >{{ getDate(props.info['preDt']) }}</p>
            </li>
            <li class="w-1/4 flex flex-col gap-1 *:first:rounded-l-full *:last:rounded-r-full">
                <div class="w-full h-2 mb-2" :class="props['info']['deliConDt'] !== '' ? 'bg-sky-500 *:font-bold' : 'bg-gray-200'" ></div>
                <p class="text-center text-gray-600 text-11" :class="props['info']['deliConDt'] !== '' ? 'text-gray-900' : ''">시공 완료</p>
                <p class="text-center text-gray-400 text-10" :class="props['info']['deliConDt'] !== '' ? 'text-gray-400' : ''">{{ getDate(props.info['deliConDt']) }}</p>
            </li>
            <li class="w-1/4 flex flex-col gap-1 *:first:rounded-l-full *:last:rounded-r-full">
                <div class="w-full h-2 mb-2" :class="props['info']['payDt'] !== '' ? 'bg-sky-500' : 'bg-gray-200'" ></div>
                <p class="text-center text-gray-600 text-11" :class="props['info']['payDt'] !== '' ? 'text-gray-900' : ''">결제 완료</p>
                <p class="text-center text-gray-400 text-10" :class="props['info']['payDt'] !== '' ? 'text-gray-400' : ''">{{ getDate(props.info['payDt']) }}</p>
            </li>
        </ul>

        <div class="my-8">
            <section v-if="props.info['stCd'] === '001' || props.info['stCd'] === '002'" class="flex flex-col w-full gap-1 text-center text-11">
                <p class="text-gray-400">견적일</p>
                <span class="text-11">{{ getDateAndTime(props.info['estiDt']) }}</span>
            </section>

            <section v-else class="flex gap-2 text-11">
                <p class="w-full text-center text-gray-400 ">
                    시공일
                    <span class="block text-gray-900">{{ props.info['deliDt'] === '' ? getDateAndTime(props.info['deliConDt']) : getDateAndTime(props.info['deliDt']) }}</span>
                </p>
                <p class="w-full text-center text-gray-400 border-l">
                    작업시간
                    <span class="block text-gray-900">{{ props.info['insTime'] }}</span>
                </p>
            </section>
        </div>

        <section class="flex gap-2 *:w-full">
            <template v-if="props.info['stCd'] === '001' && props.info['useYn'] === 'Y'">
                <div class="add-button">
                    <Button label="제품추가" @click="getEstiAdd" size="large" class="w-full"/>
                </div>
            </template>
            <template v-else-if="props.info['stCd'] === '012'">
                <Button severity="secondary" label="상세보기" @click="getPayInfo"/>
            </template>
            <template v-else-if="props.info['useYn'] === 'N'">
                <Button severity="secondary" label="견적서 복원" @click="getEstiRestore"/>
            </template>
            <template v-else>
                <Button severity="secondary" :label="getFirstBtnText()" @click="getFirstBtnClick"/>
                <Button :label="getSecondBtnText()" @click="getSecondBtnClick" class="list-button"/>
            </template>
            <Button v-if="props.info['useYn'] !== 'N' && props.info['stCd'] !== '001'" severity="secondary" icon="pi pi-ellipsis-h" outlined class="flex-none" @click="togglemorePopover" />
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
import { usePopup } from '@/assets/js/popup';

const { getPopupOpen } = usePopup();

const confirm   = useConfirm();
const client    = useClientStore();
const esti      = useEstiStore();
const router    = useRouter();
const props     = defineProps({
    info : Object
});

const getEstiAdd = () => {
    esti.getType('I');
    esti.getEmCd(props['info']['emCd']);
    esti.getReset();
    getPopupOpen('itemList');
}

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

const getPayInfo = () => {
    esti.getEmCd(props['info']['emCd']);
    router.push({ path: '/customer/payList' })
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
    esti.getEmCd(props['info']['emCd']);

    switch(props.info['stCd'])
    {
        case '002':
            router.push({ path : '/customer/estiMate' });
        break;
        case '003':
            router.push({ path : '/customer/conMate' });
        break;
        case '006': 
            router.push({ path: '/customer/payList' });
        break;
        case '012': case '011':
            router.push({ path: '/customer/payList' });
        break;
    }
}

const getSecondBtnClick = () => {
    esti.getEmCd(props['info']['emCd']);
    
    switch(props.info['stCd'])
    {
        case '002':
            router.push({ path: '/customer/estiList' });
        break;
        case '003':
            router.push({ path: '/customer/orderList' });
        break;
        case '006':
            confirm.require({
                message     : '시공완료 처리하시겠습니까?',
                header      : '시공완료',
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
                        await instance.post(`https://data.planorder.kr/estiV1/getDeilResult`, { emCd : props['info']['emCd'] });
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
                            alert('시공 완료 처리 중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                        }
                    }
                }
            });
        break;
        case '011': case '012':
            router.push({ path: '/customer/payList' });
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
    esti.getEmCd(props['info']['emCd']);
    
    switch(value)
    {
        case 'E':
            router.push({ path : '/customer/estiMate' });
        break;
        case 'C':
            if(props.info['stCd'] !== '002')
            {
                router.push({ path : '/customer/conMate' });
            }
            else
            {
                alert('계약 진행 후 확인 가능합니다.');
            }
        break;
        case 'O':
            if(props.info['stCd'] !== '002')
            {
                router.push({ path : '/customer/orderList' });
            }
            else
            {
                alert('계약 완료 후 확인 가능합니다.');
            }
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
    { name: '발주서 보기', value : 'O' },
    { name: '네비게이션', value : 'T' },
    { name: '명세표 취소', value : 'N' }
]);
</script>
