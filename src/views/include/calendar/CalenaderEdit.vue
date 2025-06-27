<template>
    <section class="px-3 py-[18px]">
        <div class="flex items-center gap-4 pb-5 border-b border-[#FAFAFA]">
            <IconAvatar class="size-12 fill-sky-400"/>
            <div class="w-full ">
                <p class="text-8 text-sky-500">일정</p>
                <p class="flex items-center text-base font-bold">{{ calendar['edit']['clientNm'] }} 
                    <span class="flex items-center justify-center ml-2 text-sm text-gray-400 size-4" @click="getClientDetail">
                        <IconPlay class="size-4 fill-gray-400"/>
                    </span>
                </p>
            </div>
            <p class="flex-none text-base font-bold text-sky-500">
                {{ calendar['edit']['stCd'] === 'Y' ? '견적' : '시공' }}
            </p>
        </div>
        <div class="py-[10px] edit-select">
            <Select v-model="calendar['edit']['stCd']" :options="getStCd()" optionLabel="label" optionValue="value" class="!rounded-full *:!text-10 *:!rounded-full " size="small" 
                @update:modelValue="(value) => getStCdChange(value)"/>
        </div>
        <div class="flex flex-col items-start gap-1 text-gray-500 text-10">
            <p>{{ getDate() }}</p>
            <p class="px-2 py-[3px] text-10 text-white rounded-full bg-sky-500" @click="getNavi('tel', calendar['edit']['tel'])">{{ calendar['edit']['tel'] }}</p>
            <p class="px-2 py-[3px] text-10 text-white rounded-full bg-sky-500" :data-address="calendar['edit']['addr']" @click="getNavi('addr', calendar['edit']['addr'])">{{ calendar['edit']['addr'] }}</p>
            <p>상세주소 : {{ calendar['edit']['addrDetail'] }}</p>
            <p v-if="calendar['edit']['stCd'] === '013' || calendar['edit']['stCd'] === '011'">설치 예상시간 : {{ calendar['edit']['insTime'] }}</p>
            <p v-if="calendar['edit']['stCd'] === '013' || calendar['edit']['stCd'] === '011'">설치 수량 : {{ calendar['edit']['insCnt'] }}</p>
        </div>
        <div class="w-full px-3 mt-4 mb-5 ml-3 border-l-2 border-gray-300 min-h-12 custom-textarea">
            <Textarea v-model="calendar['edit']['memo']" rows="5" cols="30" @blur="getMemoUpdate"/>
        </div>

        <div class="flex justify-end border-t border-[#fafafa] pt-[10px]">
            <Iconpencil class="fill-gray-500 size-4" @click="getDetail"/>
        </div>
    </section>
</template>

<script setup lang="ts">
import IconAvatar from '@/components/icons/IconAvatar.vue';
import IconPlay from '@/components/icons/IconPlay.vue';
import Iconpencil from '@/components/icons/Iconpencil.vue';
import Textarea from 'primevue/textarea';
import { useConfirm } from "primevue/useconfirm";
import { onMounted } from 'vue';
import { useDataStore, useClientStore, useCalendarStore } from '@/store';
import { getConvertDate } from '@/assets/js/function';
import { usePopup } from '@/assets/js/popup';
import { getAxiosData, getTokenOut } from '@/assets/js/function';

const confirm   = useConfirm();
const data      = useDataStore();
const calendar  = useCalendarStore();
const client    = useClientStore();

const { getPopupOpen, getPopupClose } = usePopup();

const getDetail = async () => {
    await calendar.getDetailInfo();
    // getPopupClose('calendarEdit', true);
    getPopupOpen('calendarSet');
}

const getDate = () => {
    return getConvertDate(new Date(calendar['edit']['stDt']), 'mm%dd%w% hh:ii');
}

const getNavi = (name: string, val: string) => {
    if(name === 'addr')
    {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type : 'address' , value : val}));
    }
    else if(name === 'tel')
    {
        const phoneNumber   = val;
        const telHref       = 'tel:' + phoneNumber;

        window.location.href = telHref;
    }
}

const getStCd = () => {
    if(calendar['edit']['stCd'] === '013' || calendar['edit']['stCd'] === '011')
    {
        return data['stCd'].filter(item => item.value === '013' || item.value === '011');
    }
    else
    {
        return data['stCd'].filter(item => item.value === 'Y' || item.value === 'N');
    }
}

const getStCdChange = (stCd: string) => {
    if(stCd === 'N' || stCd === '011')
    {
        const msg   = `해당 일정을 ${stCd === 'N' ? '견적취소' : '시공완료'} 상태로 변경하시겠습니까?`;

        confirm.require({
            message     : msg,
            header      : '상태 변경',
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
                    emCd  : calendar.emCd,
                    stCd  : stCd
                };

                console.log(params);

                try
                {
                    const instance  = await getAxiosData();
                    await instance.post(`https://data.planorder.kr/calendarV1/getStCdChange`, params);
                    await calendar.getMonthData();
                    await calendar.getDayData();
                    getPopupClose('calendarEdit', true);
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
                                alert('일정 상태 변경 처리 중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                            break;
                            case 4100:
                                alert('해당 견적에는 발주처리 또는 진행 중인 제품이 존재하여, 취소가 불가능합니다.');
                            break;
                            case 4200:
                                alert('해당 견적서는 이미 시공완료 처리되었거나, 발주처리가 완료되어야 시공완료 처리가능합니다.');
                            break;
                        }
                    }
                }
            },
            reject : () => {
                if(stCd === 'N')
                {
                    calendar['edit']['stCd'] = '001';
                }
                else
                {
                    calendar['edit']['stCd'] = '006';
                }
            },
            onHide : () => {
                if(stCd === 'N')
                {
                    calendar['edit']['stCd'] = '001';
                }
                else
                {
                    calendar['edit']['stCd'] = '006';
                }
            }
        });
    }
}

const getClientDetail = async () => {
    await client.getDataSet(calendar['edit']['clientCd']);
    getPopupOpen('clientDetail');
}

const getMemoUpdate = async () => {
    const params = {
        ikey : calendar['edit']['ikey'],
        memo : calendar['edit']['memo']
    };

    try
    {
        const instance  = await getAxiosData();
        await instance.post(`https://data.planorder.kr/calendarV1/getMemoUpdate`, params);
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
            alert('일정 메모 기재에 실패하였습니다. 지속될 경우 관리자에게 문의하세요.');
        }
    }
}

onMounted(() => {
    calendar.getEditInfo();
})
</script>

<style lang="scss"> 
.custom-textarea{
    .p-textarea{
        width: 180px;
        border: none;
        height: 48px;
        font-size: 0.6175rem;
        padding: 0;
        color: #ACB3BB;
        box-shadow: none;
    }
}
</style>
