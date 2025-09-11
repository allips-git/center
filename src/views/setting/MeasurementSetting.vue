<template>
    <BackHeader title="실측 불러오기"/>
    <main class="pb-[80px]">
        <section class="px-4 pt-2 pb-6 sm:px-6 sm:pt-6 sm:pb-8">
            <IconField class="w-full bg">
                <InputIcon class="z-10">
                    <IconSearch class="w-4 h-4 text-t-lv2" />
                </InputIcon>
                <InputText v-model="actual.search" placeholder="아파트 이름" class="w-full" @keyup.enter="getList"/>
            </IconField>
            <Accordion v-model:value="active" class="mt-2">
                <AccordionPanel v-for="(item, index) in actual.list" :key="index" :value="index" class="relative">
                    <AccordionHeader expandIcon="" collapseIcon="" class="!block !px-0 !pt-6 [&_svg]:hidden" @click="getAccordion(item.amCd)">
                        <h2 class="font-bold leading-[1.3] font-base text-p-lv4 break-keep">
                            {{ item.amNm }}
                        </h2>
                        <div class="flex flex-col gap-1.5 mt-1.5 [&_dl]:flex [&_dl]:gap-1 [&_dl]:w-full [&_dl]:text-sm [&_dl]:text-t-lv1 [&_dl]:font-normal [&_dl]:leading-tight [&_dt]:flex-none">
                            <dl>
                                <dt class="hidden">주소</dt>
                                <dd>{{ item.addr !== '' ? item.addr + ' / ' + item.addrDetail : '' }}</dd>
                            </dl>
                            <dl>
                                <dt>실측 개수: </dt>
                                <dd>{{ item.cnt }}개</dd>
                            </dl>
                            <dl>
                                <dt>메모: </dt>
                                <dd>{{ item.memo }}</dd>
                            </dl>
                            <dl class="*:text-10 *:text-t-lv3">
                                <dt>등록일: </dt>
                                <dd>{{ item.regDt }}</dd>
                            </dl>
                        </div>
                        <Button label="삭제" outlined severity="danger" size="small" @click.stop="getDelete(item.amCd)" class="w-[3rem] *:!font-normal !absolute top-[1.25rem] right-20 " />
                        <Button label="정보 수정" size="small" severity="secondary" variant="outlined" class="!absolute top-[1.25rem] right-0 *:!text-t-lv3" @click.stop="getInfo(item.amCd)"/>
                    </AccordionHeader>
                    <AccordionContent v-if="gubun !== 'I'" class="[&>div]:p-0">
                        <CheckboxGroup v-model="actual.adList" name="ingredient" class="flex flex-col w-full border-t border-l-lv4">
                            <div v-for="(detail, dIndex) of item.detail" :key="dIndex" class="flex gap-2 px-2.5 py-3.5 items-center bg-[#FAFAFA] border-y border-l-lv4 mb-[-1px]">
                                <Checkbox :inputId="'adCd'+detail.adCd" name="category" :value="detail.adCd" />
                                <label :for="'adCd'+detail.adCd" class="text-sm font-medium">{{ detail.setLocate }}</label>
                            </div>
                        </CheckboxGroup>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
        </section>

        <div v-if="gubun !== 'I'" class="bottom-modal-absol-box">
            <Button type="button" label="실측 불러오기" class="w-full" size="large" @click="getActual" />
        </div>

        <div class="fixed bottom-20 right-4 xl:right-[calc((100vw-1280px)/2+8rem)] xl:bottom-14 2xl:right-[calc((100vw-1440px)/2+8rem) register-button"  @click="getActualAdd">
            <Button label="실측 신규 추가" icon="pi pi-plus" size="large" />
        </div>

        <Dialog v-model:visible="popup['pop']['measurementInfo']" 
            :modal=true position="center" class="custom-dialog-full" 
            @update:visible="getPopupClose('measurementInfo', true)">
            <template #header>
                <div class="modal-fullheader">
                    <Button @click="getPopupClose('measurementInfo', true)" severity="contrast" text icon="pi pi-arrow-left" class="flex justify-start"/>
                    <h1 class="modal-backheader-title">실측 정보</h1>
                    <Button label="사이즈 추가등록" size="small" class="!z-[100] *:!font-bold" @click="getActualDetailAdd"/>
                </div>
            </template>
            <MeasurementInfo :gubun="gubun"/>
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
import BackHeader from '@/components/layouts/BackHeader.vue';
import IconField from 'primevue/iconfield'; 
import InputText from 'primevue/inputtext'; 
import InputIcon from 'primevue/inputicon'; 
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import CheckboxGroup from 'primevue/checkboxgroup';
import Checkbox from 'primevue/checkbox';
import Dialog from 'primevue/dialog';
import IconSearch from '@/components/icons/IconSearch.vue';
import MeasurementInfo from "@/views/include/setting/MeasurementInfo.vue";
import MeasurementRegistration from "@/views/include/setting/MeasurementRegistration.vue";
import { useConfirm } from "primevue/useconfirm";
import { onMounted, ref } from 'vue';
import { usePopupStore, useActualStore } from '@/store';
import { usePopup } from '@/assets/js/popup';
import { getAxiosData, getTokenOut } from '@/assets/js/function';

const props = defineProps({
    gubun : String
});

const confirm = useConfirm();
const popup   = usePopupStore();
const actual  = useActualStore();
const active  = ref(null);

const { getPopupOpen, getPopupClose } = usePopup();

const getList = async () => {
    await actual.getListReset();
    await actual.getList();
}

const getAccordion = async (amCd: string) => {
    await actual.getAmCd(amCd);
    
    if(props.gubun === 'I')
    {
        const data = actual.list.find(item => item.amCd === amCd);
        const adCd = data.detail.map(item => item.adCd);
        await actual.getAdList(adCd);
        await actual.getDetail();
        getPopupOpen('measurementInfo')
    }
    else
    {
        actual.getAdList([]);
    }
}

const getDelete = (amCd: string) => {
    confirm.require({
        message     : '해당 실측을 삭제하시겠습니까?',
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
                amCd : amCd
            }

            console.log(params);

            try
            {
                const instance = await getAxiosData();
                await instance.post(`https://data.planorder.kr/actualV1/getDelete`, params);
                await actual.getList();
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

const getInfo = async (amCd: string) => {
    await actual.getAmCd(amCd);
    await actual.getInfo();
    getPopupOpen('measurementRegistration');
}

const getActualAdd = async () => {
    await actual.getReset();
    getPopupOpen('measurementRegistration');
}

const getActualDetailAdd = async () => {
    await actual.getDetailReset();
    getPopupOpen('actualChoice');
}

const getActual = async () => {
    if(actual.adList.length === 0)
    {
        alert('실측을 선택해주세요.');
        return;
    }

    await actual.getDetail();
    getPopupOpen('measurementInfo');
}

onMounted(() => {
    actual.getList();
})
</script>

<style lang="scss">
.p-accordionpanel-active {
    .p-accordionheader {
        h2 {
            padding-right: 4.5rem;
        }
    }
}
.p-accordioncontent-content {
    transition: height 0.01s ease-in-out, opacity 0.01s ease-in-out !important;
}
</style>