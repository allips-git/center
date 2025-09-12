<template>
    <!-- <BackHeader title="실측 정보" /> -->
    <main class="pb-[80px]" ref="mainRef">
        <section class="flex flex-col gap-5 px-4 pt-2 pb-6 sm:px-6 sm:pt-6 sm:pb-8">
            <div v-for="(item, index) in getLocate()" :key="index" class="overflow-hidden w-full rounded border border-l-lv4">
                <h2 class="px-4 py-1.5 text-sm text-left bg-l-lv5">
                    {{ item.setLocate }}
                </h2>
                <template v-for="(data, dIndex) in actual.detail" :key="dIndex">
                    <div v-if="item.setLocate === data.setLocate" class="flex flex-col justify-start items-start px-4 py-6 border-t first:border-t-0" @click="getDetailInfo(data.adCd)">
                        <div class="flex justify-between mb-4 w-full">
                            <div class="flex-1 flex flex-col gap-[0.8125rem] pt-1">
                                <h3 class="font-black leading-tight text-red-500 text-13">{{ data.itemNm }}</h3>
                            </div>
                            <div class="w-[100px] flex-none flex flex-col gap-2">
                                <div class="flex justify-end">
                                    <Button label="삭제" outlined severity="danger" size="small" @click.stop="getDelete(data.adCd)" class="w-[3rem] *:!font-normal" />
                                </div>
                            </div>
                        </div>
                        <table class="overflow-hidden w-full text-center rounded-sm table-fixed custom-table-in-card">
                            <thead class="">
                                <tr class="text-10 !text-t-lv3 border-0 *:font-normal *:pb-0.5">
                                    <th>가로</th>
                                    <th>세로</th>
                                    <th>{{ data.itemCd === 'EX000001' ? '갯수' : '좌' }}</th>
                                    <th>{{ data.itemCd === 'EX000001' ? '분할' : '우' }}</th>
                                    <th>규격</th>
                                </tr>
                            </thead>
                            <tbody class="">
                                <tr v-if="data.itemCd === 'EX000001'" class="font-bold text-sm !text-t-lv1">
                                    <td class="py-0.5 leading-tight align-top">{{ data.width }}</td>
                                    <td class="py-0.5 leading-tight align-top">{{ data.height }}</td>
                                    <td class="py-0.5 leading-tight align-top">{{ data.qty }}</td>
                                    <td class="py-0.5 leading-tight align-top">{{ data.split === '001' ? '양개' : '편개' }}</td>
                                    <td class="py-0.5 leading-tight align-top">{{ data.size }}폭</td>
                                </tr>
                                <template v-else>
                                    <template v-if="data.division !== 'S'">
                                        <tr v-for="(blind, bIndex) in data.spec" :key="bIndex" class="font-bold text-sm !text-t-lv1">
                                            <td class="py-0.5 leading-tight align-top">{{ blind.width }}</td>
                                            <td class="py-0.5 leading-tight align-top">{{ blind.height }}</td>
                                            <td class="py-0.5 leading-tight align-top">{{ blind.handle === 'L' ? (data.division === 'D' ? data.qty : blind.qty) : 0 }}</td>
                                            <td class="py-0.5 leading-tight align-top">{{ blind.handle === 'R' ? (data.division === 'D' ? data.qty : blind.qty) : 0 }}</td>
                                            <td class="py-0.5 leading-tight align-top">{{ blind.size }}회베</td>
                                        </tr>
                                    </template>
                                    <template v-else>
                                        <tr class="font-bold text-sm !text-t-lv1">
                                            <td class="py-0.5 leading-tight align-top">{{ data.width }}</td>
                                            <td class="py-0.5 leading-tight align-top">{{ data.height }}</td>
                                            <td class="py-0.5 leading-tight align-top">{{ data.leftQty }}</td>
                                            <td class="py-0.5 leading-tight align-top">{{ data.rightQty }}</td>
                                            <td class="py-0.5 leading-tight align-top">{{ data.size }}회베</td>
                                        </tr>
                                    </template>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </template>
            </div>
        </section>

        <div v-if="gubun !== 'I'" :style="{width: mainWidth + 'px', left: mainLeft + 'px' }" class="bottom-fixed-btn-box">
            <Button label="실측 저장" size="large" @click="getActualEstiSave"/>
        </div>

        <Dialog v-model:visible="popup['pop']['actualChoice']" 
            :modal=true position="center" class="w-96 max-w-96 custom-dialog-center" :dismissable-mask="true"
            @update:visible="getPopupClose('actualChoice', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose('actualChoice', true)" severity="contrast" text icon="pi pi-times"/>
                    <h2 class="modal-backheader-title">실측 구분</h2>
                </div>
            </template>
            <div class="pt-3">
                <ActualChoice :gubun="'E'" @getClose="getPopupClose('actualChoice', true)"/>
            </div>
        </Dialog>
        <Dialog v-model:visible="popup['pop']['itemSet']" header="실측등록" 
            :modal=true position="center" class="custom-dialog-bottom backPopup"
            @update:visible="getPopupClose('itemSet', true)">
            <template #header>
                <div class="modal-fullheader change-button">
                    <Button @click="getPopupClose('itemSet', true)" severity="contrast" text icon="pi pi-arrow-left"/>
                    <h2 class="modal-backheader-title">실측등록</h2>
                    <Button label="실측 변경" size="small" @click="getItemChange" class="!z-[100] !bg-p-lv4 !text-white"/>
                </div>
            </template>
            <ProductRegister/>
        </Dialog>
    </main>
</template>

<script setup lang="ts">
import ActualChoice from '@/components/modal/ActualChoice.vue'
import ProductRegister from "@/views/include/ProductRegister.vue";
import { useConfirm } from "primevue/useconfirm";
import { ref } from 'vue';
import { onMounted, onUnmounted } from 'vue';
import { usePopupStore, useProductStore, useClientStore, useEstiStore, useActualStore } from '@/store';
import { useRoute } from 'vue-router';
import { usePopup } from '@/assets/js/popup';
import { getAxiosData, getTokenOut } from '@/assets/js/function';

defineProps({
    gubun : String
});

const confirm   = useConfirm();
const route     = useRoute();
const popup     = usePopupStore();
const client    = useClientStore();
const product   = useProductStore();
const esti      = useEstiStore();
const actual    = useActualStore();
const mainRef   = ref(null);
const mainWidth = ref(0);
const mainLeft  = ref(0);

const { getPopupOpen, getPopupClose } = usePopup();

const getLocate = () => {
    return [...new Map(actual.detail.map(item => [item.setLocate, item])).values()];
}

const getDelete = (adCd: string) => {
    confirm.require({
        message     : '해당 실측 데이터를 삭제하시겠습니까?',
        header      : '삭제',
        rejectProps : {
            label       : '취소',
            severity    : 'secondary',
            outlined    : true
        },
        acceptProps : {
            label: '삭제'
        },
        accept : async () => {
            const params = {
                adCd : adCd
            }

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                await instance.post(`https://data.planorder.kr/actualV1/getDetailDelete`, params);
                await actual.getDetail();
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
                    alert('실측 삭제 중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                }
            }
        }
    });
}

const getDetailInfo = async (adCd: string) => {
    await product.getEstiYn('N');
    await actual.getAdCd(adCd);
    await actual.getDetailInfo().then(async (res) => {
        if(res.result)
        {
            await esti.getReset();
            if(res.data.common.itemCd === 'EX000001')
            {
                res.data.common.roundGb = '001';
                await esti.getCurtainSet(res.data.itemInfo);
            }
            else
            {
                await esti.getBlindSet(res.data.itemInfo);
            }

            await esti.getCommonSet(res.data.common);
            await esti.getUnitCalc('Y');
        }
    });

    getPopupOpen('itemSet');
}

const getItemChange = () => {
    getPopupOpen('actualChoice');
}

const getActualEstiSave = () => {
    confirm.require({
        message     : '해당 실측 데이터를 추가하시겠습니까?',
        header      : '견적 추가',
        rejectProps : {
            label       : '취소',
            severity    : 'secondary',
            outlined    : true
        },
        acceptProps : {
            label: '추가'
        },
        accept : async () => {
            const params = {
                adCd : actual.adList
            }

            params['type']      = esti['type'];
            params['emCd']      = esti['emCd'];
            params['clientCd']  = client['clientCd'];

            console.log(params);

            try
            {
                const instance = await getAxiosData();
                const res      = await instance.post(`https://data.planorder.kr/estiV1/getActualSave`, params);

                await esti.getEmCd(res.data['emCd']);

                if(esti.type === 'I')
                {
                    /** 견적에서 추가 데이터 시 */
                    await esti.getList();
                }

                if(route.name === 'CustomerEstiDetail')
                {
                    await esti.getDetail(client.stCd);
                }
                else
                {
                    await client.getDetail();
                    getPopupOpen('estiList');
                }

                getPopupClose('itemList', false);
                getPopupClose('itemSet', false);
                getPopupClose('measurementSetting', false);
                getPopupClose('measurementInfo', false);

                if(esti.type === 'N')
                {
                    getPopupOpen('estiList');
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
                    alert('실측 저장 중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                }
            }
        }
    });
}

onMounted(() => {
    const updateMainSize = () => {
        if (mainRef.value) {
            mainWidth.value = mainRef.value.offsetWidth
            mainLeft.value = mainRef.value.offsetLeft
        }
    }

    updateMainSize()

    const observer = new ResizeObserver(() => updateMainSize())
    observer.observe(mainRef.value)
});

onUnmounted(async () => {
    await actual.getListReset();
    await actual.getList();
})

</script>

<style lang="scss">
</style>