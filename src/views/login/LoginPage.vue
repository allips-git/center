<template>
<Dialog v-model:visible="visible"
    style="background-image: radial-gradient(circle at left top, var(--p-surface-0), var(--p-primary-50))"
    pt:root:class="!border-0 !bg-transparent w-full md:w-[400px] md:h-auto h-full !max-h-screen" 
    pt:mask:class="backdrop-blur-sm bg-white">
        <template #container>
            <div class="flex flex-col px-6 pb-8 rounded-2xl mt-10 sm:mt-0">
                <div class="flex flex-col items-center justify-center">
                    <IconLogo class="fill-indigo-600 size-32 sm:size-16 "/>
                    <p class="w-full text-center text-3xl mb-2 font-bold"><span class="text-indigo-600 rext">PlanOrder Center</span></p>
                </div>
                <div class="mb-10 mt-10">
                    <p class="flex flex-col items-center justify-center font-bold text-2xl">로그인</p>
                </div>
                <div class="flex gap-4 flex-col">
                    <div class="inline-flex flex-col gap-2">
                        <label for="username" class="">이메일</label>
                        <InputText id="id" placeholder="이메일을 입력해주세요." v-model="idData"/>
                    </div>
                    <div class="inline-flex flex-col gap-2">
                        <label for="pw" class="">비밀번호</label>
                        <InputText id="pw" placeholder="비밀번호를 입력해주세요." v-model="pwData" type="password"/>
                    </div>
                    <div class="flex gap-1 items-center self-center">
                        <Button label="아이디 찾기" plain text />
                        <span>|</span>
                        <Button label="비밀번호 찾기" plain text />
                    </div>
                </div>
                <Button label="로그인" size="large" class="w-full mt-4" />
                <div class="flex w-full items-center justify-center mt-4">
                    <span>아이디가 없으신가요?</span>
                    <Button label="회원가입" class="!*:font-bold" text />
                </div>
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { ref } from 'vue';
import IftaLabel from 'primevue/iftalabel';
import IconLogo from '@/components/icons/IconLogo.vue'

const visible   = ref(true);
const idData = ref('')
const pwData = ref('')


</script>

<style lang="scss" scoped>

</style>