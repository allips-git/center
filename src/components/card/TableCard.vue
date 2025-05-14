<template>
    <div class="w-full border border-gray-200 rounded"> 
        <h1 class="p-4 text-sm text-left bg-gray-50">{{ title }}</h1>
        <!-- 개별 카드 v-for  -->
        <div class="flex flex-col items-start justify-start p-4 border-t first:border-t-0" v-for="(card, index) in cards" :key="index" @click="emit('get-modify', card['edCd'])">
            <!-- 카드 상단 -->
             <div class="flex items-center justify-between w-full">
                <h2 class="text-gray-400 text-desc">{{ card.productTitle }}</h2>
                <div v-if="card.showDelete" class="flex justify-end">
                    <Button label="삭제" outlined severity="danger" size="small" @click.stop="getDelete(card['edCd'])" class="w-14"/>
                </div>            
             </div>
            <section class="w-full">
                <div class="flex items-end justify-between w-full mb-4 text-sm">
                    <div class="">
                        <!-- <h2 class="mb-1 text-sm text-gray-400">{{ card.productTitle }}</h2> -->
                        <h3 :class="`font-bold text-${card.isRed ? 'red' : 'blue'}-600`">{{ card.colorTitle }}</h3>
                        <!-- <h3 class="font-bold text-red-600">{{ card.colorTitle }}</h3> -->
                    </div>
                    <p class="font-bold">{{ card.amt ? getAmt(card.amt)+'원' : '' }}</p>
                </div>
            </section>
            <!-- 테이블 -->
            <table class="w-full overflow-hidden text-center rounded-sm table-fixed">
                <thead class="">
                    <tr class="*:py-2 text-caption !text-t-lv3 border-0">
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
                    <tr class="*:py-2  border-b last:border-b-0 font-bold text-desc !text-t-lv1" v-for="(row, index) in card.rows" :key="index">
                        <template v-if="sizeYn">
                            <template v-for="col in card.columns" :key="col.key">
                                <td v-if="col.key !== 'width' && col.key !== 'height'">
                                    {{ row[col.key] }}
                                </td>
                            </template>
                        </template>
                        <template v-else>
                            <template v-for="col in card.columns" :key="col.key">
                                <td>
                                    {{ row[col.key] }}
                                </td>
                            </template>
                        </template>
                    </tr>
                </tbody>
            </table>
            <!-- 태그  -->
            <section v-if="card.showTag" class="flex flex-wrap gap-2 my-3">
                <Tag v-for="(tag, index) in card.tag2" :key="index" severity="secondary" :value="tag.spanText"></Tag>
            </section>

            <!-- 지시사항  -->
            <section v-if="card['spanText'] !== ''" class="flex items-center justify-start w-auto px-3 py-1 my-2 mt-3 text-sm text-orange-400 rounded-full bg-orange-50">
                <p class="font-bold">지시사항: <span class="">{{ card['spanText'] }}</span></p>
            </section>
            <!-- 버튼 -->
            <!-- 버튼타입 // severity="" // primary(시스템),success(외주),secondary(시스템/외주 발주완료),warn(발주취소),danger(발주 취소 요청) -->
            
                <Button v-if="card['showButton'] && index === cards.length -1" 
                    :label="card['buttonText']" :severity="card['buttonType']"  @click="getBtnProcess(card['buttonType'], card['edCd'])" class="w-full mt-4"/>
            
        </div>
    </div>
</template>

<script setup lang="ts">
import Tag from 'primevue/tag';
import { useConfirm } from "primevue/useconfirm";
import { defineProps } from 'vue'
import { useRouter } from 'vue-router';
import { useClientStore, useEstiStore, useOrderStore } from '@/store';
import { getCommas } from "@/assets/js/function";
import { getAxiosData, getTokenOut } from '@/assets/js/function';
import { usePopup } from '@/assets/js/popup';

const emit      = defineEmits(['get-modify']);
const confirm   = useConfirm();
const router    = useRouter();
const client    = useClientStore();
const esti      = useEstiStore();
const order     = useOrderStore();

const { getPopupOpen } = usePopup();

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

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/estiV1/getDelete`, params);

                if(res.data['cnt'] === 0)
                {
                    router.go(-1);
                }
                else
                {
                    esti.getList();
                }
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
            router.push({ path : '/customer/outOrderMate' });
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
            });
        break;
        case 'warn':
            /** 시스템 공장 발주 취소 요청 */
            alert('준비 중인 기능입니다.');
            // await order.getEdCd(edCd);

            // confirm.require({
            //     message     : '발주 취소 요청하시겠습니까?',
            //     header      : '발주 취소 요청',
            //     rejectProps : {
            //         label       : '취소',
            //         severity    : 'secondary',
            //         outlined    : true
            //     },
            //     acceptProps : {
            //         label: '확인'
            //     },
            //     accept : async () => {
            //         const params = {
            //             edCd : order['edCd']
            //         }

            //         try
            //         {
            //             const instance  = await getAxiosData();
            //             await instance.post(`https://data.planorder.kr/orderV1/getSysOrderCancelRequest`, params);
            //             await order.getList({ emCd : esti['emCd'] });
            //         }
            //         catch(e)
            //         {
            //             console.log(e);
            //             if(e.response.status === 401)
            //             {
            //                 getTokenOut();
            //             }
            //             else
            //             {
            //                 alert('발주 취소 요청 중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
            //             }
            //         }
            //     }
            // });
        break;
    }
}

const getAmt = (amt) => {
    return getCommas(Number(amt));
};
</script>

<style lang="scss">

</style>