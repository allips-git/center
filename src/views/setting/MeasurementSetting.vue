<template>
    <BackHeader title="실측 불러오기 설정"/>
    <main class="pb-[80px]" ref="mainRef">
        <section class="px-4 pt-4 pb-6 sm:px-6 sm:pt-6 sm:pb-8">
            <div class="card">
                <Accordion value="0">
                    <AccordionPanel v-for="tab in tabs" :key="tab.title" :value="tab.value" class="relative">
                        <AccordionHeader expandIcon="" collapseIcon="" class="!block !px-0 !pt-6 [&_svg]:hidden">
                            <h2 class="font-bold font-base text-p-lv4">
                                {{ tab.title }}
                            </h2>
                            <div class="flex flex-col gap-1.5 mt-1.5 [&_dl]:flex [&_dl]:gap-1 [&_dl]:w-full [&_dl]:text-sm [&_dl]:text-t-lv1 [&_dl]:font-normal [&_dl]:leading-tight [&_dt]:flex-none">
                                <dl>
                                    <dt class="hidden">주소</dt>
                                    <dd>부산 수영구 수영로 472</dd>
                                </dl>
                                <dl>
                                    <dt>실측 개수: </dt>
                                    <dd>12개</dd>
                                </dl>
                                <dl>
                                    <dt>메모: </dt>
                                    <dd>공동구매 아파트 메모가 길어질 때 메모가 길어질 때</dd>
                                </dl>
                                <dl class="*:text-10 *:text-t-lv3">
                                    <dt>등록일: </dt>
                                    <dd>25.01.02</dd>
                                </dl>
                            </div>
                        </AccordionHeader>
                        <AccordionContent class="[&>div]:p-0">
                            <Button label="정보 수정" size="small" severity="secondary" variant="outlined" class="!absolute top-[1.375rem] right-0 *:!text-t-lv3" />
                            <CheckboxGroup name="ingredient" class="flex flex-col w-full border-t border-l-lv4">
                                <div v-for="category of categories" :key="category.key" class="flex gap-2 px-2.5 py-3.5 items-center bg-[#FAFAFA] border-y border-l-lv4 mb-[-1px]">
                                    <Checkbox v-model="selectedCategories" :inputId="category.key" name="category" :value="category.name" />
                                    <label :for="category.key" class="text-sm font-medium">{{ category.name }}</label>
                                </div>
                            </CheckboxGroup>
                        </AccordionContent>
                    </AccordionPanel>
                </Accordion>
            </div>
        </section>

        <div class="bottom-modal-absol-box">
            <Button type="button" label="실측 불러오기" class="w-full" size="large" @click="getPopupOpen('measurementInfo')" />
        </div>

        <div class="fixed bottom-20 right-4 xl:right-[calc((100vw-1280px)/2+8rem)] xl:bottom-14 2xl:right-[calc((100vw-1440px)/2+8rem) register-button"  @click="getPopupOpen('measurementRegistration')">
            <Button label="실측 신규 추가" icon="pi pi-plus" size="large" />
        </div>

        <Dialog v-model:visible="popup['pop']['measurementInfo']" 
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopupClose('measurementInfo', true)">
            <template #header>
                <div class="modal-fullheader change-button">
                    <Button @click="getPopupClose('measurementInfo', true)" severity="contrast" text icon="pi pi-arrow-left" class="flex justify-start"/>
                    <h1 class="modal-backheader-title">실측 정보</h1>
                    <Button label="사이즈 추가등록" size="small" outlined class="!z-[100] !bg-p-lv4 !text-white esti-button"/>
                </div>
            </template>
            <MeasurementInfo />
        </Dialog>

        <Dialog v-model:visible="popup['pop']['measurementRegistration']" 
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopupClose('measurementRegistration', true)">
            <template #header>
                <div class="modal-fullheader">
                    <h1 class="modal-backheader-title">실측등록</h1>
                    <Button @click="getPopupClose('measurementRegistration', true)" severity="contrast" text icon="pi pi-arrow-left"/>
                </div>
            </template>
            <MeasurementRegistration />
        </Dialog>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BackHeader from '@/components/layouts/BackHeader.vue';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import CheckboxGroup from 'primevue/checkboxgroup';
import Checkbox from 'primevue/checkbox';
import Dialog from 'primevue/dialog';
import MeasurementInfo from "@/views/include/setting/MeasurementInfo.vue";
import MeasurementRegistration from "@/views/include/setting/MeasurementRegistration.vue";
import { usePopupStore } from '@/store';
import { usePopup } from '@/assets/js/popup';

const popup   = usePopupStore();

const { getPopupOpen, getPopupClose } = usePopup();

const mainRef = ref(null);

const tabs = ref([
    { title: '부산 광안자이 아파트 1단지 24A', value: '0' },
    { title: '부산 해운대 센텀파크 아파트 2단지 34B', value: '1' },
    { title: '부산 연제 롯데캐슬 골드클래스 1단지 45A', value: '2' },
    { title: '부산 동래 자이엘라 아파트 3단지 29C', value: '3' }
]);

const categories = ref([
    {name: "거실 블라인드", key: "1"},
    {name: "거실 커튼", key: "2"},
    {name: "안방 블라인드", key: "3"},
    {name: "안방 커튼", key: "4"},
    {name: "입구 작은방 블라인드", key: "5"},
    {name: "안방 블라인드", key: "6"},
]);
const selectedCategories = ref(['안방 블라인드', '안방 커튼']);
</script>

<style lang="scss">
.p-accordioncontent-content {
    transition: height 0.01s ease-in-out, opacity 0.01s ease-in-out !important;
}
</style>