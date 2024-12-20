<template>
    <Dialog v-model:visible="visible"
        pt:root:class="!border-0 !bg-transparent w-full md:w-[500px] md:h-auto h-full !max-h-screen" 
        pt:mask:class="bg-white backdrop-blur-sm">
            <template #container>
                <BackHeader title="매장회원가입 2/2"/>
                <div class="modal-page-padding">
                    <div class="p-4 mb-8 rounded-lg bg-gray-50">
                        <p class="">
                            플랜오더에 등록하실 운영 중인 매장시설 정보와 플랜 및 문자메시지 등 플랜오더 이용을 위한 결제수단을 입력해주세요.<br>
                            <b>* 안심하세요! 결제수단을 등록해도, 2주 무료체험 기간 동안 절대 결제가 일어나지 않고 언제든 해지 가능해요.</b>
                        </p>
                        <span class="block mt-4 text-sm text-gray-400">무료체험 기간 동안 이용을 해지하지 않으시면 무료체험 종료일 오전 10시에 자동으로 결제되며, 매월 25일 정기결제가 이루어집니다.</span>
                    </div>
                    <div class="form-gap-box">
                        <IftaLabel class="w-full">
                            <label for="emali">매장이름</label>
                            <InputText id="emali" placeholder="매장이름을 입력해주세요." class="w-full"/>    
                        </IftaLabel>

                        <IftaLabel class="w-full">
                            <label for="emali">지역</label>
                            <Select placeholder="지역을 선택해주세요." class="w-full"/>
                        </IftaLabel>

                        <div class="flex flex-col gap-2">
                            <label for="">사업자 구분</label>
                            <SelectButton v-model="value" :options="options" />
                        </div>

                        <IftaLabel class="w-full">
                            <label>사업자 등록 번호</label>
                            <InputText placeholder="- 없이 입력해주세요." class="w-full"/>    
                        </IftaLabel>

                        <IftaLabel class="w-full">
                            <label>사업자등록증상 대표자 이름</label>
                            <InputText placeholder="대표자 이름을 입력해주세요." class="w-full"/>    
                        </IftaLabel>

                        <IftaLabel>
                            <IconField>
                                <InputText class="w-full" readonly/>
                                <InputIcon class="pi pi-search" />
                            </IconField>
                            <label>주소</label>
                            <small class="text-red-500"></small>
                        </IftaLabel>

                        <IftaLabel class="w-full">
                            <label>매장 대표 연락처</label>
                            <InputText placeholder="- 없이 입력해주세요." class="w-full"/>    
                        </IftaLabel>
                        
                    </div>
                    <div class="mobile-fiex-bottom">
                        <Button label="매장시설 정보 제출하기" class="w-full" />
                    </div>
                </div>
            </template>
        </Dialog>
    </template>
    
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import Checkbox from 'primevue/checkbox';
import SelectButton from 'primevue/selectbutton';
import IftaLabel from 'primevue/iftalabel';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

const value = ref('개인');
const options = ref(['개인', '법인']);


import { ref } from 'vue';

import BackHeader from '@/components/layouts/BackHeader.vue'
const visible   = ref(true);
const idData = ref('')
const pwData = ref('')


</script>

<style lang="scss" scoped>

</style>