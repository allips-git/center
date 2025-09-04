<template>
    <main class="pb-[80px]" ref="mainRef">
        <div class="p-4 sm:p-6">
            <h1 class="p-2.5 text-base font-bold leading-tight bg-bg-lv2 text-t-lv1">{{ mate.gb === 'E' ? '견적서' : '계약서' }}</h1>
            <!-- 계약자 정보 -->
            <section class="relative mt-3.5">
                <h2 class="text-sm sm:text-base font-bold text-t-lv1 leading-[1.34] break-keep pr-14">{{ mate.info.ceNm }}</h2>
                <div class="mt-2 flex flex-col gap-1 [&_dl]:w-full [&_dl]:flex [&_dl]:gap-1 [&_dt]:flex-none text-xs sm:text-sm text-t-lv1 leading-[1.34] break-keep">
                    <dl class="pr-14">
                        <dt>대표:</dt>
                        <dd>{{ mate.info.ceoNm }}</dd>
                    </dl>
                    <dl v-if="mate.gb === 'C'">
                        <dt>계약 담당자:</dt>
                        <dd>{{ mate.info.conPerson }}</dd>
                    </dl>
                    <dl>
                        <dt>전화번호:</dt>
                        <dd>{{ mate.info.tel }}</dd>
                    </dl>
                    <dl>
                        <dt>주소:</dt>
                        <dd>{{ mate.info.addr }} {{ mate.info.addrDetail }}</dd>
                    </dl>
                    <dl>
                        <dt>견적일:</dt>
                        <dd>{{ mate.info.estiDt }}</dd>
                    </dl>
                    <dl v-if="mate.gb === 'C'">
                        <dt>계약일:</dt>
                        <dd>{{ mate.info.conDt }}</dd>
                    </dl>
                </div>
                <!-- 파일이 있는 경우에만 노출 -->
                <div class="absolute top-0 right-0 w-[3.25rem] h-[3.25rem] border border-l-lv2">
                    <img v-if="mate.base === 'N'" :src="mate.info.sign" alt="도장이미지" title="도장이미지" class="w-full aspect-square"/>
                    <img v-else src="@/assets/img/img-seal.png" alt="도장이미지" title="도장이미지" class="w-full aspect-square"/>
                </div>
            </section>
            <!-- 견적 금액 -->
            <section class="mt-6">
                <table role="table" class="contract-table">
                    <colgroup>
                        <col style="width: auto;" />
                        <col style="width: 16%;" />
                        <col style="width: 24%;" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col" class="text-left">제품</th>
                            <th scope="col" class="text-center">수량</th>
                            <th scope="col" class="text-right">금액</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in mate.info.list" :key="index">
                            <th scope="row" class="text-left">
                                {{ item.itemNm }}
                                <!-- 옵션 / 사이즈 -->
                                <div class="mt-1.5 font-normal text-t-lv2">
                                    <template v-for="(option, opIndex) in item.option" :key="opIndex">
                                        <div>옵션: {{ option }}</div>
                                    </template>
                                    <ul>
                                        <li v-for="(spec, spIndex) in item.spec" :key="spIndex">
                                            <span v-if="mate.sizeYn === 'N'">{{ spec.width }}*{{ spec.height }}</span>
                                            <span>{{ spec.handle === '' ? `[${spec.cnt}]` : `[${spec.handle}${spec.cnt}]` }}</span>
                                            <span v-if="mate.unitYn === 'N'">[{{ spec.unit }}{{ item.unitNm }}]</span>
                                        </li>
                                    </ul>
                                </div>
                            </th>
                            <td class="text-center">{{ item.cnt }}</td>
                            <td class="text-right">{{ getCommas(item.amt) }}</td>
                        </tr>
                    </tbody>
                </table>
                <h3 class="mt-3.5 text-xs sm:text-sm text-t-lv1 leading-[1.34] font-bold">합계금액</h3>
                <div class="mt-4 flex flex-col gap-1.5 [&_dl]:w-full [&_dl]:flex [&_dl]:justify-between text-xs sm:text-sm text-t-lv1 leading-[1.34]">
                    <template v-for="(item, index) in mate.payList" :key="index">
                        <dl v-if="item.amt !== 0">
                            <dt>{{ item.title }}</dt>
                            <dd :class="`font-bold ${item.red ? 'text-red-500' : ( item.blue ? 'text-p-lv4' : '' )}`">{{ getCommas(item.amt) }}</dd>
                        </dl>
                    </template>
                    <dl class="mt-2 text-base pt-3.5 pb-4 border-y-[0.75px] border-t-lv1">
                        <dt class="font-bold">총금액</dt>
                        <dd class="font-bold text-p-lv4">{{ getCommas(getAmt(mate.payList, 'total')) }}</dd>
                    </dl>
                </div>
            </section>
            <!-- 약정 내용 -->
            <section class="mt-6">
                <Textarea v-model="terms" autoResize readonly cols="30" rows="10"  class="w-full" />
            </section>
            <section v-if="mate.info.clientSet === 'Y'" class="mt-3">
                <h2 class="p-2.5 text-base font-bold leading-tight bg-bg-lv2 text-t-lv1">계약서</h2>
                <div class="flex justify-between mt-3.5">
                    <div class="flex flex-col gap-1.5 justify-center min-h-[3.25rem]">
                        <h3 class="text-sm sm:text-base font-bold text-t-lv1 leading-[1.34] break-keep">{{ mate.info.clientNm }}</h3>
                        <div class="flex flex-col gap-1 [&_dl]:w-full [&_dl]:flex [&_dl]:gap-1 [&_dt]:flex-none text-xs sm:text-sm text-t-lv1 leading-[1.34] break-keep">
                            <dl>
                                <dt>전화번호:</dt>
                                <dd>{{ mate.info.clientTel }}</dd>
                            </dl>
                            <dl>
                                <dt>주소:</dt>
                                <dd>{{ mate.info.clientAddr }} {{ mate.info.clientAddrDetail }}</dd>
                            </dl>
                        </div> 
                    </div>
                    <!-- 파일이 있는 경우에만 노출 -->
                    <div class="w-[3.25rem] h-[3.25rem] border border-l-lv2">
                        <img v-if="mate.base === 'N'" :src="mate.info.clientSignImage" alt="도장이미지" title="도장이미지" class="w-full aspect-square"/>
                        <img v-else src="@/assets/img/img-seal.png" alt="도장이미지" title="도장이미지" class="w-full aspect-square"/>
                    </div>
                </div>
            </section>
        </div>
    </main>
    <section v-if="mate.view === 'Y'" class="overflow-hidden fixed bottom-0 px-4 pt-4 w-full bg-white rounded-t-2xl border-t border-gray-200 md:pb-0">
        <IftaLabel class="w-[100%]">
            <IconField class="w-full">
                <InputText :value="`${domain}/customer/${mate.gb === 'E' ? 'estiDoc' : 'conDoc'}?cd=${emCd}`" readonly class="w-[100%] cursor-pointer truncate pr-12"/>
                <InputIcon class="cursor-pointer pi pi-eye" @click="getDoc"/>
            </IconField>
            <label>{{ mate.gb === 'E' ? '견적서' : '계약서' }} 링크</label>
        </IftaLabel>
        <div class="py-4 btn-2-layout-box conbutton">
            <Button :label="`${mate.gb === 'E' ? '견적서' : '계약서'} 링크 발송`" @click="getNavi" class="w-[100%]"/>
        </div>
    </section>

    <div v-if="mate.base !== 'Y' && mate.gb === 'C' && mate.view === 'N' && mate.info.clientSet === 'N'" :style="{width: mainWidth + 'px', left: mainLeft + 'px', }" class="bottom-fixed-btn-box">
        <Button label="계약 서명하기" size="large" class="w-full" @click="getPopupOpen('signaturePop')"/>
    </div>

    <Dialog v-model:visible="popup['pop']['signaturePop']" 
        :modal=true position="center" class="w-96 max-w-96 custom-dialog-center" :dismissable-mask="true"
        @update:visible="getPopupClose(true, 'signaturePop')">
        <template #header>
            <div class="modal-backheader">
                <Button @click="getPopupClose(true, 'signaturePop')" severity="contrast" text icon="pi pi-times"/>
                <h2 class="modal-backheader-title">계약 서명</h2>
            </div>
        </template>
        <div class="md:pt-4">
            <SignaturePad ref="signRef" :gb="'contract'"/>
            <p class="mt-1.5 px-8 text-10 md:text-xs leading-[1.34] text-t-lv2 text-center break-keep">본인은 본 계약서 및 관련 약관의 모든 내용을 확인하였으며, 전자서명을 통해 이에 동의함을 확인합니다.</p>
            <div class="grid grid-cols-2 gap-2 mt-6 btn-2-layout-box">
                <Button size="large" severity="secondary" label="취소" @click="getPopupClose(true, 'signaturePop')"/>
                <Button size="large" label="계약완료" @click="getConResult"/>
            </div>
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue'
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Dialog from "primevue/dialog";
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import IftaLabel from 'primevue/iftalabel';
import SignaturePad from "@/views/include/SignaturePad.vue";
import { useConfirm } from "primevue/useconfirm";
import { usePopupStore, useEstiStore, useMateStore } from '@/store';
import { useRoute } from 'vue-router';
import { usePopup } from '@/assets/js/popup';
import { getAxiosData, getCommas, getAmt } from '@/assets/js/function';

const mainRef   = ref(null);
const mainWidth = ref(0);
const mainLeft  = ref(0);
const domain    = window.location.origin;
const confirm   = useConfirm();
const popup     = usePopupStore();
const esti      = useEstiStore();
const mate      = useMateStore();
const emCd      = btoa(esti['emCd']);
const route     = useRoute();
const signRef   = ref(null);

const { getPopupOpen, getPopupClose } = usePopup();

const getDoc = () => {
    const url = domain+`/customer/${mate.gb === 'E' ? 'estiDoc' : 'conDoc'}?cd=`+emCd;
    window.open(url, '_blank');
}

const getConResult = () => {
    confirm.require({
        message     : '계약을 완료하시겠습니까?',
        header      : '계약',
        rejectProps : {
            label       : '취소',
            severity    : 'secondary',
            outlined    : true
        },
        acceptProps : {
            label: '완료'
        },
        accept : async () => {
            const formData  = new FormData();

            try 
            {
                await signRef.value.saveAsImage();
                const params    = {
                    emCd : atob(route.query.cd)
                };

                formData.append('params', JSON.stringify(params));

                console.log(mate.info.clientSignFile);

                if(mate.info.clientSignFile !== null)
                {
                    formData.append('file', mate.info.clientSignFile);
                }
            } 
            catch (signError) 
            {
                console.error('서명 저장 실패:', signError);
                alert('서명 저장에 실패했습니다. 다시 시도해주세요.');
                return;
            }

            try
            {
                const instance  = await getAxiosData();
                await instance.post('https://data.planorder.kr/estiAndConSetV1/getContractSave', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                mate.getConMate({ emCd : atob(route.query.cd) }, 'N');
                alert('계약이 완료되었습니다.');
            }
            catch(e)
            {
                console.log(e);
                if(e.response.data.code === 4100)
                {
                    alert('이미 서명된 계약건입니다.');
                }
                else
                {
                    alert('계약에 실패하였습니다. 지속될 경우 관리자에게 문의하세요.');
                }
            }
        }
    });
}

const getNavi = () => {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'share', value: `${domain}/customer/${mate.gb === 'E' ? 'estiDoc' : 'conDoc'}?cd=${emCd}` }));
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
    observer.observe(mainRef.value);

    if(route.query.cd)
    {
        if(route.meta.gb === 'E')
        {
            mate.getEstiMate({ emCd : atob(route.query.cd) }, 'N');
        }
        else
        {
            mate.getConMate({ emCd : atob(route.query.cd) }, 'N');
        }
    }
});

const terms = ref(`
1. 본사는 맞춤전문 업체로서 계약해지 또는 변경은 계약후 7일내에 한하며 이후 해지는 불가능 합니다. 또한 계약 제품이 생산을 진행하였어도 계약해지 또는 변경이 불가능합니다.

2. 계약 철회시 제작이 진행하지 않았어도 계약금은 반환되지 않습니다.

3. 기존제품 철거 및 재시공은 하지 않습니다. 만약 고객님이 원할 경우 추가비용이 발생합니다.

4. 주문 제작 특성상 설치 후 교환/반품은 불가합니다. (제품 불량건 교환가능)

5. 시공시간 지정은 불가능 합니다.

6. 무상AS 기간은 1년이며, 고객 실수로 인한 제품하자는 AS비용이 별도로 발생합니다. (제품하자일 경우 제외)

7. 계약서의 내용을 충분히 이해하였음을 확인합니다.
`)
</script>