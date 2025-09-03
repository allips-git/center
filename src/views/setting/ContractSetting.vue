<template>
    <BackHeader title="견적서 / 계약서 설정"/>
    <main class="pb-[80px]" ref="mainRef">
        <section class="px-4 pt-4 pb-6 sm:px-6 sm:pt-6 sm:pb-8">
            <div class="flex gap-4">
                <div class="flex-1 border border-l-lv4 rounded-[4px] overflow-hidden cursor-pointer" @click="getPopupOpen('contractPreview')">
                    <div class="px-[20px] pt-[40px] bg-bg-lv3">
                        <div class="line-repeat-paper"></div>
                    </div>
                    <div class="p-3 shadow-[0_-4px_10px_rgba(0,0,0,0.12)]">
                        <strong class="block text-sm font-bold tracking-tight break-keep text-t-lv1">디자인윈도우 계약서 미리보기 [ 기본양식 ]</strong>
                        <div class="flex flex-col gap-0.5 mt-2">
                            <dl class="flex gap-1 text-xs font-medium text-t-lv1">
                                <dt>수정일:</dt>
                                <dd>25.03.12</dd>
                            </dl>
                            <dl class="flex gap-1 text-xs font-medium text-t-lv1">
                                <dt>생성일:</dt>
                                <dd>25.01.30</dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div class="flex-1 border border-l-lv4 rounded-[4px] overflow-hidden cursor-pointer">
                    <div class="px-[20px] pt-[40px] bg-bg-lv3">
                        <div class="line-repeat-paper"></div>
                    </div>
                    <div class="p-3 shadow-[0_-4px_10px_rgba(0,0,0,0.12)]">
                        <strong class="block text-sm font-bold tracking-tight break-keep text-t-lv1">디자인윈도우 계약서 미리보기 [ 엑셀양식 ]</strong>
                        <div class="flex flex-col gap-0.5 mt-2">
                            <dl class="flex gap-1 text-xs font-medium text-t-lv1">
                                <dt>수정일:</dt>
                                <dd>25.03.12</dd>
                            </dl>
                            <dl class="flex gap-1 text-xs font-medium text-t-lv1">
                                <dt>생성일:</dt>
                                <dd>25.01.30</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="gray-bar"></div>
        <section class="px-4 py-6 sm:px-6 sm:py-8">
            <ul class="flex flex-col *:border-b *:py-4 *:border-gray-100 *:flex *:justify-between *:items-center text-sm *:gap-8">
                <li>
                    <p class="text-lv1 break-keep">견적서/계약서 대표설정</p>
                    <SelectButton size="small" v-model="value" :options="options" />
                </li>
                <li>
                    <p class="text-lv1">실측 사이즈 숨김</p>
                    <ToggleSwitch />
                </li>
                <li>
                    <p class="text-lv1">단위 숨김</p>
                    <ToggleSwitch />
                </li>
                <li>
                    <p class="text-lv1">고객 계약싸인 기능</p>
                    <ToggleSwitch />
                </li>
                <li>
                    <p class="text-lv1 break-keep">견적서,계약서 싸인/도장 png 누끼파일</p>
                    <div class="flex items-center justify-center flex-none w-[5.5rem] h-[5.5rem] rounded-[4px] bg-[#fff] border border-bg-lv3 cursor-pointer overflow-hidden" @click="getPopupOpen('ssss')">
                        <!-- 파일 업로드 전 -->
                        <img src="@/assets/img/img-upload.png" alt="이미지 업로드" title="이미지 업로드" class="w-full aspect-square"/>
                        <!-- 파일 업로드 후
                        <img src="@/assets/img/img-seal.png" alt="도장이미지" title="도장이미지" class="w-full aspect-square"/>
                        -->
                    </div>
                </li>
            </ul>
        </section>
        <div class="gray-bar"></div>
        <section class="px-4 py-6 sm:px-6 sm:py-8">
            <h2 class="mb-1 text-sm font-normal">약정서 내용</h2>
            <Textarea v-model="terms" autoResize cols="30" rows="10"  class="w-full" />
        </section>
    </main>

    <div :style="{width: mainWidth + 'px', left: mainLeft + 'px', }" class="bottom-fixed-btn-box">
        <Button label="저장" size="large" class="w-full"/>
    </div>

    <Dialog v-model:visible="popup['pop']['contractPreview']" header="계약서 미리보기" 
        :modal=true position="center" class="custom-dialog-bottom" 
        @update:visible="getPopupClose('contractPreview', true)">
        <template #header>
            <div class="modal-backheader">
                <Button @click="getPopupClose(true, 'contractPreview')" severity="contrast" text icon="pi pi-times"/>
                <h2 class="modal-backheader-title">계약서 미리보기</h2>
            </div>
        </template>
        <ContractPreview/>
    </Dialog>

    <Dialog v-model:visible="popup['pop']['ssss']"
        :modal=true position="bottom" class="custom-dialog-util"
        @update:visible="getPopupClose('emojiPickerPop', true)" pt:mask:class="custom-dialog-util-wrap">
        <div class="modal-backheader">
            <Button @click="getPopupClose('emojiPickerPop', true)" severity="contrast" text icon="pi pi-times" />
            <h2 class="modal-backheader-title">싸인/도장 선택</h2>
        </div>
        <div class="p-4 pb-6">
            <div class="flex flex-col">
                <!-- 선택 O -->
                <Button variant="text" label="싸인 만들기" iconPos="right" class="!justify-between w-full *:text-sm sm:*:text-base *:text-t-lv1" @click="getPopupOpen('signaturePop')" />
                <!-- 선택 X -->
                <Button variant="text" label="도장 png 누끼파일 등록" iconPos="right" class="!justify-between w-full *:text-sm sm:*:text-base *:text-t-lv1" />
            </div>
        </div>
    </Dialog>

    <Dialog v-model:visible="popup['pop']['signaturePop']" 
        :modal=true position="center" class="w-96 max-w-96 custom-dialog-center" :dismissable-mask="true"
        @update:visible="getPopupClose(true, 'signaturePop')">
        <template #header>
            <div class="modal-backheader">
                <Button @click="getPopupClose(true, 'signaturePop')" severity="contrast" text icon="pi pi-times"/>
                <h2 class="modal-backheader-title">싸인 등록하기</h2>
            </div>
        </template>
        <div class="md:pt-4">
            <SignaturePad />
            <p class="mt-1.5 px-8 text-10 md:text-xs leading-[1.34] text-t-lv2 text-center break-keep">계약서에 자동으로 입력될 싸인입니다.</p>
            <div class="grid grid-cols-2 gap-2 mt-6 btn-2-layout-box">
                <Button size="large" severity="secondary" label="취소"/>
                <Button size="large" label="확인"/>
            </div>
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import ToggleSwitch from 'primevue/toggleswitch';
import SelectButton from 'primevue/selectbutton';
import Textarea from 'primevue/textarea';
import SignaturePad from "@/views/include/SignaturePad.vue";
import ContractPreview from "@/views/include/setting/ContractPreview.vue";
import { ref } from 'vue';
import { onMounted } from 'vue'
import { usePopupStore } from '@/store';
import { usePopup } from '@/assets/js/popup';

const popup     = usePopupStore();
const mainRef = ref(null);
const mainWidth = ref(0);
const mainLeft = ref(0)

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
const { getPopupOpen, getPopupClose } = usePopup();

const getPopup = async() => {
    //getPopupOpen('contractPreview');
}
const value = ref('기본양식');
const options = ref(['기본양식', '엑셀양식']);

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

<style lang="scss">
.line-repeat-paper {
    padding: 10px;
    height: 100px;
    background-color: var(--white);
    &::after {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        margin-top: 10px;
        background-image: repeating-linear-gradient(
            to bottom,        /* 세로 방향으로 반복 */
            var(--l-lv4),     /* 선 색상 */
            var(--l-lv4) 1px, /* 선 두께 */
            transparent 1px,  /* 선 바로 아래부터 투명 */
            transparent 22px  /* 선 간격 */
        )
    }
}
</style>
