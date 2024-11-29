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
                        <InputText id="id" v-model="idData" placeholder="이메일을 입력해주세요." @keyup.enter="getEnter"/>
                    </div>
                    <div class="inline-flex flex-col gap-2">
                        <label for="pw" class="">비밀번호</label>
                        <InputText id="pw" v-model="pwData" placeholder="비밀번호를 입력해주세요." type="password" @keyup.enter="getEnter"/>
                    </div>
                    <div class="flex gap-1 items-center self-center">
                        <Button label="아이디 찾기" plain text />
                        <span>|</span>
                        <Button label="비밀번호 찾기" plain text />
                    </div>
                </div>
                <Button label="로그인" size="large" class="w-full mt-4" @click="getLogin"/>
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
import IftaLabel from 'primevue/iftalabel';
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