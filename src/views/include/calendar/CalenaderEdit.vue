<template>
    <section class="px-[12px] py-[18px]">
        <div class="flex gap-2 items-center pb-5">
            <IconAvatar class="flex-none size-9 fill-[#78BBFF]"/>
            <div class="w-full">
                <p class="font-bold text-sky-500 text-8">일정</p>
                <p class="mt-[-1px] flex items-center text-base font-bold text-t-lv1">{{ calendar['edit']['clientNm'] }} 
                    <span class="flex justify-center items-center ml-2 text-sm text-gray-400 size-4" @click="getClientDetail">
                        <IconPlay class="size-4 fill-l-lv0"/>
                    </span>
                </p>
            </div>
            <p class="flex-none text-base font-bold text-[#6670E4]">
                {{ calendar['edit']['stCd'] === 'Y' ? '견적' : '시공' }}
            </p>
        </div>
        <div class="py-[6px] border-t border-[#FAFAFA]">
            <Select v-model="calendar['edit']['stCd']" :options="getStCd()" optionLabel="label" optionValue="value" class="edit-select" size="small" 
                @update:modelValue="(value) => getStCdChange(value)">
                <template #dropdownicon>
                    <IconArrowDropDown class="w-4 h-4 text-l-lv0" />
                </template>
            </Select>
        </div>
        <div class="flex flex-col gap-1 items-start text-10 text-t-lv2 sm:text-xs">
            <p>{{ getDate() }}</p>
            <p class="px-2 py-[3px] text-10 sm:text-xs text-white rounded-full bg-sky-500" @click="getNavi('tel', calendar['edit']['tel'])">{{ calendar['edit']['tel'] }}</p>
            <p class="px-2 py-[3px] text-10 sm:text-xs text-white rounded-full bg-sky-500" :data-address="calendar['edit']['addr']" @click="getNavi('addr', calendar['edit']['addr'])">{{ calendar['edit']['addr'] }}</p>
            <p>상세주소 : {{ calendar['edit']['addrDetail'] }}</p>
            <p v-if="calendar['edit']['stCd'] === '013' || calendar['edit']['stCd'] === '011'">설치 예상시간 : {{ calendar['edit']['insTime'] }}</p>
            <p v-if="calendar['edit']['stCd'] === '013' || calendar['edit']['stCd'] === '011'">설치 수량 : {{ calendar['edit']['insCnt'] }}</p>
        </div>
        <div class="px-2.5 mt-2.5 mb-5 ml-4 w-full border-l-2 border-l-lv2 min-h-12 custom-textarea">
            <Textarea v-model="calendar['edit']['memo']" rows="5" cols="30" @blur="getMemoUpdate" placeholder="메모를 입력해주세요."/>
        </div>

        <div class="flex justify-end border-t border-[#FAFAFA] pt-2.5">
            <button class="p-2 m-[-0.5rem]" @click="getDetail">
                <Iconpencil class="fill-gray-500 size-5" />
            </button>
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
import IconArrowDropDown from '@/components/icons/IconArrowDropDown.vue'

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
        width: 100%;
        padding: 0 0.5rem 0 0 !important;
        border: none;
        color: var(--t-lv4);
        font-size: 0.625rem;
        font-weight: 400;
        box-shadow: none;
        line-height: 1.2;
        &:focus {
            //color: var(--t-lv1);
        }
    }
}
</style>
