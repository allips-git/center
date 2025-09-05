<template>
    <div class="overflow-hidden w-full rounded border border-l-lv4"> 
        <h1 class="px-4 py-1.5 text-sm text-left bg-l-lv5">{{ title }}</h1>
        <!-- 개별 카드 v-for  -->
        <div class="flex flex-col justify-start items-start px-4 py-6 border-t first:border-t-0" v-for="(card, index) in cards" :key="index" @click="emit('get-modify', card['edCd'])">
            <div class="flex justify-between mb-4 w-full">
                <div class="flex-1 flex flex-col gap-[0.8125rem] pt-1">
                    <h2 v-if="card.productTitle" class="text-xs leading-tight text-t-lv3">{{ card.productTitle }}</h2>
                    <div>
                        <!-- <h2 class="mb-1 text-sm text-gray-400">{{ card.productTitle }}</h2> -->
                        <h3 :class="`font-black text-13 leading-tight text-${card.isRed ? 'red-500' : 'p-lv3'}`">{{ card.colorTitle }}</h3>
                        <!-- <h3 class="font-bold text-red-600">{{ card.colorTitle }}</h3> -->
                    </div>
                </div>
                <div class="w-[100px] flex-none flex flex-col gap-2">
                    <div v-if="card.showDelete" class="flex justify-end danger-button">
                        <Button label="삭제" outlined severity="danger" size="small" @click.stop="getDelete(card['edCd'])" class="w-[3.25rem] font-normal !border-l-lv3" />
                    </div>  
                    <p class="font-bold text-right text-13">{{ card.amt ? getAmt(card.amt)+'원' : '' }}</p>
                </div>
            </div>                
            <!-- 테이블 -->
            <table class="overflow-hidden w-full text-center rounded-sm table-fixed custom-table-in-card">
                <thead class="">
                    <tr class="text-10 !text-t-lv3 border-0 *:font-normal *:pb-0.5">
                        <template v-for="col in card.columns" :key="col.key">
                            <template v-if="sizeYn">
                                <th v-if="col.header !== '가로' && col.header !== '세로'">
                                    {{ col.header }}
                                </th>
                            </template>
                            <template v-else>
                                <th>
                                    {{ col.header }}
                                </th>
                            </template>
                        </template>
                    </tr>
                </thead>
                <tbody class="">
                    <!-- v-for -->
                    <tr class="font-bold text-sm !text-t-lv1" v-for="(row, index) in card.rows" :key="index">
                        <template v-if="sizeYn">
                            <template v-for="col in card.columns" :key="col.key">
                                <td class="py-0.5 leading-tight align-top" v-if="col.key !== 'width' && col.key !== 'height'">
                                    {{ row[col.key] }}
                                </td>
                            </template>
                        </template>
                        <template v-else>
                            <template v-for="col in card.columns" :key="col.key">
                                <td class="py-0.5 leading-tight align-top">{{ row[col.key] }}</td>
                            </template>
                        </template>
                    </tr>
                </tbody>
            </table>
            <div class="flex flex-col gap-[0.875rem]" :class="{ 'mt-4': card.showTag || card.spanText !== '' }">
                <!-- 태그  -->
                <section v-if="card.showTag" class="flex flex-wrap gap-y-1.5 gap-2">
                    <Tag v-for="(tag, index) in card.tags" :key="index" severity="info" :value="tag.spanText" class="!inline-flex !items-center !px-2 !py-1 *:text-10 *:font-bold !rounded-[0.75rem] !text-s-lv1 !bg-s-lv2 *:leading-[1.34]"></Tag>
                </section>

                <!-- 지시사항  -->
                <section v-if="card['spanText'] !== ''" class="flex justify-start items-center px-2 py-1 w-auto text-s-lv3 bg-s-lv4 rounded-[0.75rem] text-10">
                    <p class="font-bold leading-[1.34]">지시사항: <span class="">{{ card['spanText'] }}</span></p>
                </section>
            </div>
            <!-- 버튼 -->
            <!-- 버튼타입 // severity="" // primary(시스템),success(외주),secondary(시스템/외주 발주완료),warn(발주취소),danger(발주 취소 요청) -->
            <div class="order-button">
                <!-- @2025-09-02 발주 배송요청 사항 정보 요청 -->
                <!-- <div class="bg-bg-lv2 rounded-[0.25rem] p-3 mt-4">
                    <div class="flex justify-evenly flex-wrap items-center [&_dl]:flex [&_dl]:flex-col [&_dl]:gap-1 [&_dl]:items-center text-11 sm:text-13">
                        <dl>
                            <dt class="text-t-lv3">배송</dt>
                            <dd class="text-t-lv1">
                                <span class="inline-block px-1.5 font-medium text-white rounded-sm bg-p-lv4">직배</span>
                            </dd>
                        </dl>
                        <hr class="w-[1px] h-[1.5rem] bg-l-lv4" />
                        <dl>
                            <dt class="text-t-lv3">주문일</dt>
                            <dd class="text-t-lv1">01.08 (목) 17:30</dd>
                        </dl>
                        <hr class="w-[1px] h-[1.5rem] bg-l-lv4" />
                        <dl>
                            <dt class="text-t-lv3">출고일</dt>
                            <dd class="text-t-lv1">01.08 (목)</dd>
                        </dl>
                        <dl class="mt-4 w-full">
                            <dt class="text-t-lv3">배송 요청사항</dt>
                            <dd class="text-t-lv1">빠른 배송 부탁드립니다.</dd>
                        </dl>
                    </div>
                </div> -->
                <Button v-if="card['showButton'] && index === cards.length -1" 
                    :label="card['buttonText']" :severity="card['buttonType']"  @click="getBtnProcess(card['buttonType'], card['edCd'])" class="mt-4 w-full"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Tag from 'primevue/tag';
import { useConfirm } from "primevue/useconfirm";
import { ref, defineProps } from 'vue'
import { usePopupStore, useClientStore, useEstiStore, useOrderStore, usePayStore } from '@/store';
import { getCommas } from "@/assets/js/function";
import { getAxiosData, getTokenOut } from '@/assets/js/function';
import { usePopup } from '@/assets/js/popup';
import { useRoute } from 'vue-router';

const emit      = defineEmits(['get-modify']);
const confirm   = useConfirm();
const popup     = usePopupStore();
const client    = useClientStore();
const esti      = useEstiStore();
const order     = useOrderStore();
const pay       = usePayStore();
const route     = useRoute();
const status    = ref(false);

const { getPopupOpen, getPopupClose } = usePopup();

defineProps({
    title   : String,
    cards   : String,
    columns : Array,
    rows    : Array,
    sizeYn  : String
});

const getDelete = (edCd: string) => {
    confirm.require({
        message     : '해당 제품을 삭제하시겠습니까?',
        header      : '삭제',
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
                clientCd : client['clientCd'],
                edCd     : edCd
            }

            status.value = true;

            if(status.value)
            {
                try
                {
                    const instance  = await getAxiosData();
                    const res       = await instance.post(`https://data.planorder.kr/estiV1/getDelete`, params);

                    if(res.data['cnt'] === 0)
                    {
                        if(route.name === 'CustomerEstiDetail')
                        {
                            await esti.getDetail(client.stCd);
                        }
                        else
                        {
                            await client.getDetail();
                        }
                        getPopupClose(true, 'estiList');
                    }

                    esti.getList();
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
                        alert('제품 삭제 처리 중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                    }
                }
            }

            status.value = false;
        }
    });
}

const getBtnProcess = async (type: string, edCd: string) => {
    switch(type)
    {
        case 'primary':
        {
            /** 시스템 공장 발주 */
            await order.getSysInfoReset();
            await order.getEdCd(edCd);
            getPopupOpen('sysOrderSet');
        }
        break;
        case 'success':
        {
            /** 외주 공장 발주 */
            await order.getOutInfoReset();
            await order.getEdCd(edCd);
            getPopupOpen('outOrderSet');
        }
        break;
        case 'secondary':
            /** 외주 공장 발주완료 */
            await order.getEdCd(edCd);
            getPopupOpen('outOrderMate');
        break;
        case 'help':
            /** 시스템 공장 발주취소 */
            await order.getEdCd(edCd);

            confirm.require({
                message     : '발주 취소 처리하시겠습니까?',
                header      : '발주 취소',
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
                        edCd : order['edCd']
                    }

                    status.value = true;

                    if(status.value)
                    {
                        try
                        {
                            const instance  = await getAxiosData();
                            await instance.post(`https://data.planorder.kr/orderV1/getSysOrderCancel`, params);
                            await order.getList({ emCd : esti['emCd'] });
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
                                        alert('발주 취소 처리 중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                                    break;
                                    case 4100:
                                        alert('이미 승인 처리된 발주서입니다. 발주 취소 요청 메뉴를 이용해주세요.');
                                        order.getList({ emCd : esti['emCd'] });
                                    break;
                                }
                            }
                        }
                    }

                    status.value = false;
                }
            });
        break;
        case 'warn':
            /** 시스템 공장 발주 취소 요청 */
            await order.getEdCd(edCd);

            confirm.require({
                message     : '발주 취소 요청하시겠습니까?',
                header      : '발주 취소 요청',
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
                        edCd : order['edCd']
                    }

                    try
                    {
                        const instance  = await getAxiosData();
                        await instance.post(`https://data.planorder.kr/orderV1/getSysOrderCancelRequest`, params);
                        await pay.getList({ emCd : esti['emCd'] });
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
                            alert('발주 취소 요청 중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                        }
                    }
                }
            });
        break;
    }
}

const getAmt = (amt) => {
    return getCommas(Number(amt));
};
</script>

<style lang="scss">
.custom-table-in-card {
    margin: 0 -0.5rem;
    width: calc(100% + 1rem);
}
</style>