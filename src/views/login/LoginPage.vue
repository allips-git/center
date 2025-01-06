<template>
<Dialog v-model:visible="visible"
    style="background-image: radial-gradient(circle at left top, var(--p-surface-0), var(--p-primary-50))"
    pt:root:class="!border-0 !bg-transparent w-full md:w-[400px] md:h-auto !min-h-[600px] h-full !max-h-screen justify-start" 
    pt:mask:class="bg-white backdrop-blur-sm">
        <template #container>
            <BackHeader title="로그인" />
            <div class="flex flex-col px-6 pb-8 mt-10 rounded-2xl sm:mt-0">
                <div class="flex flex-col items-center justify-center">
                    <IconLogo class="w-12 fill-sky-500"/>
                    <p class="w-full mt-5 mb-10 text-2xl font-extrabold text-center"><span class="text-sky-500 rext">PLAN ORDER</span></p>
                </div>
                <div class="hidden mt-10 mb-10 md:block">
                    <p class="flex flex-col items-center justify-center text-2xl font-bold">로그인</p>
                </div>
                <div class="flex flex-col gap-4">
                    <IftaLabel class="w-full">
                        <label for="username" class="">이메일</label>
                        <InputText id="id" v-model="idData" placeholder="이메일을 입력해주세요." @keyup.enter="getEnter" class="w-full"/>
                    </IftaLabel>

                    <IftaLabel>
                        <label for="pw" class="">비밀번호</label>
                        <InputText id="pw" v-model="pwData" placeholder="비밀번호를 입력해주세요." type="password" @keyup.enter="getEnter" class="w-full"/>
                    </IftaLabel>
                    <div class="flex items-center justify-between">
                        <div class="label-checkbox-box">
                            <RadioButton />
                            <label for="">자동 로그인</label>
                        </div>
                        <div class="flex items-center self-center flex-none gap-1">
                            <router-link to="">
                                <Button label="아이디 찾기" text severity="secondary" />
                            </router-link>
                            <span class="text-gray-400">|</span>
                            <router-link to="">
                                <Button label="비밀번호 찾기" text severity="secondary" />
                            </router-link>
                        </div>
                    </div>
                </div>
                <Button label="이메일 로그인" size="large" class="w-full mt-4" @click="getLogin"/>
                <div class="flex items-center justify-center w-full mt-4">
                    <span class="text-gray-600">계정이 없으신가요?</span>
                    <Button label="회원가입" class="!*:font-bold" text @click="router.push({ path : '/join/agree' })"/>
                </div>
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';
import IconLogo from '@/components/icons/IconLogo.vue'
import BackHeader from '@/components/layouts/BackHeader.vue'
import IftaLabel from 'primevue/iftalabel';
import RadioButton from 'primevue/radiobutton';

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLoginStore } from '@/store';

const login     = useLoginStore();
const router    = useRouter();
const idData    = ref('');
const pwData    = ref('');
const visible   = ref(true);

const getEnter = () => {
    const id  = event.target.id;

    if(id === 'id')
    {
        const pw = document.getElementById("pw");

        pw.focus();
    }
    else
    {
        getLogin();
    }
}

const getLogin = async () => {
    const params = {
        id : idData.value, 
        pw : pwData.value
    };
    
    const result = await login.getLogin(params);

    if(result)
    {
        router.push({ path : `/` });
    }
    else
    {
        alert('로그인 정보가 잘못되었습니다. 입력한 데이터를 확인해주세요.');
    }
}
</script>

<style lang="scss" scoped>

</style>