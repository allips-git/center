<template>
    <Dialog v-model:visible="visible"
        pt:root:class="!border-0 !bg-transparent w-full md:w-[500px] md:h-auto h-full !max-h-screen" 
        pt:mask:class="backdrop-blur-sm bg-white">
            <template #container>
                <BackHeader title="매장회원가입 1/2"/>
                <div class="modal-page-padding">
                    <div class="form-gap-box">
                        <IftaLabel class="w-full">
                            <label for="emali">이메일</label>
                            <InputText id="emali" placeholder="이메일을 입력해주세요." class="w-full"/>    
                        </IftaLabel>

                        <IftaLabel class="w-full">
                            <label for="emali">비밀번호</label>
                            <InputText id="emali" placeholder="비밀번호를 입력해주세요" class="w-full"/>    
                        </IftaLabel>

                        <IftaLabel class="w-full">
                            <label for="emali">비밀번호 확인</label>
                            <InputText id="emali" placeholder="비밀번호를 다시 한 번 입력해주세요" class="w-full"/>    
                        </IftaLabel>

                        <IftaLabel>
                            <IconField>
                                <InputText id="username" placeholder="사업자 등록증을 업로드 해주세요." variant="filled" class="w-full" readonly/>
                                <InputIcon class="pi pi-file-arrow-up" />
                            </IconField>
                            <label for="username">사업자 등록증 업로드</label>
                        </IftaLabel>
                    </div>
                    <div class="mobile-fiex-bottom">
                        <Button label="동의하고 계속하기" class="w-full" />
                    </div>
                </div>
            </template>
        </Dialog>
    </template>
    
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import Checkbox from 'primevue/checkbox';

import IftaLabel from 'primevue/iftalabel';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';



import { ref } from 'vue';

import BackHeader from '@/components/layouts/BackHeader.vue'
const visible   = ref(true);
const idData = ref('')
const pwData = ref('')


</script>

<style lang="scss" scoped>

</style>