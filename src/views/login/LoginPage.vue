<template>
    <!-- style="background-image: radial-gradient(circle at left top, var(--p-surface-0), var(--p-primary-50))" -->
    <!-- pt:mask:class="bg-white backdrop-blur-sm" -->
<Dialog v-model:visible="visible"
    pt:root:class="!border-0 !bg-transparent w-full md:w-[400px] md:h-auto !min-h-[600px] h-full !max-h-screen justify-start">
        <template #container>
            <BackHeader title="로그인"  class="md:hidden" />
            <div class="flex flex-col px-4 pb-8 mt-5 rounded-2xl sm:mt-10">
                <div class="flex flex-col items-center justify-center">
                    <IconLogo class="w-[3.25rem] fill-[#00AEF2]"/>
                    <p class="w-full mt-[1.5625rem] mb-10 text-lg font-bold text-center noto"><span class="text-[#00AEF2] rext">PLAN ORDER</span></p>
                </div>
                <div class="hidden mt-10 mb-10 md:block">
                    <p class="flex flex-col items-center justify-center text-2xl font-bold">로그인</p>
                </div>
                <div class="flex flex-col gap-6">
                    <IftaLabel class="w-full">
                        <label for="username" class="">이메일</label>
                        <IconField>
                            <InputText id="id" v-model="idData" placeholder="이메일을 입력해주세요." @keyup.enter="getEnter" class="w-full"/>
                            <InputIcon @click="getIdDelete"><IconInputX/></InputIcon>
                        </IconField>
                    </IftaLabel>

                    <IftaLabel>
                        <label for="pw" class="">비밀번호</label>
                        <IconField>
                            <InputText id="pw" v-model="pwData" placeholder="비밀번호를 입력해주세요." type="password" @keyup.enter="getEnter" class="w-full"/>
                            <InputIcon @click="getPwView"><IconEye/></InputIcon>
                        </IconField>
                    </IftaLabel>
                </div>
                <div class="flex items-center justify-end mt-4">
                        <!-- <div class="label-checkbox-box">
                            <RadioButton />
                            <label for="">자동 로그인</label>
                        </div> -->
                        <div class="flex items-center self-center flex-none gap-3 text-t-lv2">
                            <router-link to="" class="text-xs">아이디 찾기</router-link>
                            <span class="text-xs">|</span>
                            <router-link to="join/find_password" class="text-xs">비밀번호 찾기</router-link>
                        </div>
                </div>
                <div class="login-button">
                    <Button label="이메일 로그인" class="w-full mt-6 !py-[13px]" @click="getLogin"/>
                </div>
                <div class="flex items-center justify-center w-full gap-[1.125rem] mt-6">
                    <span class="text-sm text-t-lv2">계정이 없으신가요?</span>
                    <router-link to="/join/agree" class="text-sm font-bold text-p-lv4">회원가입</router-link>
                    <!-- <Button label="회원가입" class="!*:font-bold" text @click="router.push({ path : '/join/agree' })"/> -->
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
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLoginStore } from '@/store';
import IconInputX from '@/components/icons/IconInputX.vue';
import IconEye from '@/components/icons/IconEye.vue';

const login     = useLoginStore();
const router    = useRouter();
const idData    = ref('');
const pwData    = ref('');
const visible   = ref(true);

const getIdDelete = () => {
    idData.value = '';
    const id = document.getElementById("id");
    id.focus();
}

const getPwView = () => {
    const pw = document.getElementById("pw");

    if(pw.type === 'password')
    {
        pw.type = 'text';
    }
    else
    {
        pw.type = 'password';
    }
}

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

    if(result === 200)
    {
        router.push({ path : `/` });
        if (typeof window.ReactNativeWebView !== 'undefined') 
        {
            window.ReactNativeWebView.postMessage(JSON.stringify({ message: 'login success' }));
        }
    }
    else
    {
        if(result === 4100)
        {
            router.push({ path : `/join/wait_join` });
        }
        else
        {
            alert('로그인 정보가 잘못되었습니다. 입력한 데이터를 확인해주세요.');
        }
    }
}
</script>

<style lang="scss" scoped>

</style>