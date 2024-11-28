<template>
    <Dialog v-model:visible="visible"
        pt:root:class="!border-0 !bg-transparent w-full md:w-[500px] md:h-auto h-full !max-h-screen" 
        pt:mask:class="backdrop-blur-sm bg-white">
            <template #container>
                <BackHeader title="약관동의"/>
                <div class="modal-page-padding">
                    <h2 class="text-xl font-bold"> <span class="text-indigo-600">플랜오더</span> <br> 약관에 동의해주세요.</h2>
                    <p class="mt-3 mb-6 text-sm font-bold text-gray-400">모든 이용자는 플랜오더의 이용약관 및 개인정보 처리 방침에 동의해야합니다.</p>

                    <ul class="text-gray-600 flex flex-col gap-2 *:flex *:justify-between">
                        <li class="border-b !pb-3">
                            <div class="label-checkbox-box">
                                <Checkbox></Checkbox>
                                <label for="">모두 동의합니다.</label>
                            </div>
                        </li>

                        <li class="mt-2">
                            <div class="label-checkbox-box">
                                <Checkbox></Checkbox>
                                <label for="">[필수] 만 14세 이상입니다.</label>
                            </div>
                            <Button secondary text label="보기 >" size="small" severity="secondary" class="flex-none"/>
                        </li>

                        <li>
                            <div class="label-checkbox-box">
                                <Checkbox></Checkbox>
                                <label for="">[필수] 이용약관 동의</label>
                            </div>
                            <Button secondary text label="보기 >" size="small" severity="secondary" class="flex-none"/>
                        </li>

                        <li >
                            <div class="label-checkbox-box">
                                <Checkbox></Checkbox>
                                <label for="">[필수] 개인정보 수집 - 이용 동의</label>
                            </div>
                            <Button secondary text label="보기 >" size="small" severity="secondary" class="flex-none"/>

                        </li>

                        <li class="">
                            <div class="label-checkbox-box">
                                <Checkbox></Checkbox>
                                <label for="">[선택사항] 마케팅 정보 수신 동의</label>
                            </div>
                            <Button secondary text label="보기 >" size="small" severity="secondary" class="flex-none"/>
                        </li>
                    </ul>
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

    import { ref } from 'vue';
    
    import BackHeader from '@/components/layouts/BackHeader.vue'
    const visible   = ref(true);
    const idData = ref('')
    const pwData = ref('')
    
    
    </script>
    
    <style lang="scss" scoped>
    
    </style>