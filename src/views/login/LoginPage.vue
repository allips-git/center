<template>
<Dialog v-model:visible="visible"
    style="background-image: radial-gradient(circle at left top, var(--p-surface-0), var(--p-primary-50))"
    pt:root:class="!border-0 !bg-transparent w-full md:w-[400px] md:h-auto !min-h-[600px] h-full !max-h-screen justify-center" 
    pt:mask:class="bg-white backdrop-blur-sm">
        <template #container>
            <div class="flex flex-col px-6 pb-8 mt-10 rounded-2xl sm:mt-0">
                <div class="flex flex-col items-center justify-center">
                    <IconLogo class="fill-indigo-600 size-32 sm:size-16 "/>
                    <p class="w-full mb-2 text-3xl font-bold text-center"><span class="text-indigo-600 rext">PlanOrder Center</span></p>
                </div>
                <div class="mt-10 mb-10">
                    <p class="flex flex-col items-center justify-center text-2xl font-bold">로그인</p>
                </div>
                <div class="flex flex-col gap-4">
                    <div class="inline-flex flex-col gap-2">
                        <label for="username" class="">이메일</label>
                        <InputText id="id" v-model="idData" placeholder="이메일을 입력해주세요." @keyup.enter="getEnter"/>
                    </div>
                    <div class="inline-flex flex-col gap-2">
                        <label for="pw" class="">비밀번호</label>
                        <InputText id="pw" v-model="pwData" placeholder="비밀번호를 입력해주세요." type="password" @keyup.enter="getEnter"/>
                    </div>
                    <div class="flex items-center self-center gap-1">
                        <router-link to="">
                            <Button label="아이디 찾기" plain text />
                        </router-link>
                        <span>|</span>
                        <router-link to="">
                            <Button label="비밀번호 찾기" plain text />
                        </router-link>
                    </div>
                </div>
                <Button label="로그인" size="large" class="w-full mt-4" @click="getLogin"/>
                <div class="flex items-center justify-center w-full mt-4">
                    <span>아이디가 없으신가요?</span>
                    <Button label="회원가입" class="!*:font-bold" text />
                </div>
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';
import IconLogo from '@/components/icons/IconLogo.vue'
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