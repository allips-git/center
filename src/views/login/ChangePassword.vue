<template>
    <!-- style="background-image: radial-gradient(circle at left top, var(--p-surface-0), var(--p-primary-50))" -->
    <!-- pt:mask:class="bg-white backdrop-blur-sm" -->
    <Dialog v-model:visible="visible"
    :closable="false" 
    pt:root:class="!border-0 !bg-transparent w-full md:w-[500px] md:h-auto h-full !max-h-screen" 
    pt:mask:class="bg-white backdrop-blur-sm">
        <template #container>
            <div class="flex flex-col px-4 pb-8 mt-5 rounded-2xl sm:mt-10">
                <div class="hidden mt-10 mb-10 md:block">
                    <p class="flex flex-col justify-center items-center text-2xl font-bold">비밀번호 찿기</p>
                </div>
                <div class="flex flex-col gap-6">
                    <IftaLabel class="label-input-box">
                        <label for="username" class="">새 비밀번호</label>
                        <IconField>
                            <InputText id="pwd" v-model="pwData" placeholder="비밀번호를 입력해주세요." type="password" class="w-full"/>
                            <InputIcon @click="getPwView('pw')"><IconEye/></InputIcon>
                        </IconField>
                    </IftaLabel>

                    <IftaLabel class="label-input-box">
                        <label for="pwCheck" class="">새 비밀번호 확인</label>
                        <IconField>
                            <InputText id="pwChk" v-model="pwCheck" placeholder="비밀번호를 입력해주세요." type="password" class="w-full"/>
                            <InputIcon @click="getPwView('pwCheck')"><IconEye/></InputIcon>
                        </IconField>
                    </IftaLabel>
                </div>
                <div>
                    <Button label="비밀번호 변경" size="large" class="mt-6 w-full" @click="getChangePassword"/>
                </div>
                <small v-if="msg !== ''" class="vali_text">{{ msg }}</small>
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';
import IftaLabel from 'primevue/iftalabel';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import IconEye from '@/components/icons/IconEye.vue';
import { useConfirm } from "primevue/useconfirm";
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { joinFirstMsg } from '@/assets/js/msg';
import { getAxiosData } from "@/assets/js/function";

const confirm   = useConfirm();
const router    = useRouter();
const route     = useRoute();
const pwData    = ref('');
const pwCheck   = ref('');
const msg       = ref('');
const visible   = ref(true);

const getPwView = (target: string) => {
    const pw = document.getElementById(target);

    if(pw.type === 'password')
    {
        pw.type = 'text';
    }
    else
    {
        pw.type = 'password';
    }
}

const getChangePassword = async () => {
    msg.value = '';

    const checkParams = {
        pwd     : pwData.value,
        pwChk   : pwCheck.value
    };

    const result = joinFirstMsg(checkParams);

    if(!result['state'])
    {
        msg.value = result['msg'];
        const inputElement = document.getElementById(result['id']);
        if (inputElement) 
        {
            inputElement.focus();
        }

        return false;
    }

    confirm.require({
        message     : '비밀번호를 변경하시겠습니까?',
        header      : '비밀번호 변경',
        rejectProps : {
            label       : '취소',
            severity    : 'secondary',
            outlined    : true
        },
        acceptProps : {
            label       : '변경',
        },
        accept : async () => {
            const params = {
                id  : route.query.id,
                pw  : pwData.value
            };

            try
            {
                const instance = await getAxiosData();
                await instance.post(`https://data.planorder.kr/findV1/getPasswordSet`, params);
                alert('비밀번호가 변경되었습니다. 로그인 화면으로 이동합니다.');
                router.push({ path : `/login` });
            }
            catch(e)
            {
                console.log(e);
                alert('비밀변호 변경 도중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
            }
        }
    });
}

const getReset = () => {
    pwData.value    = '';
    pwCheck.value   = '';
    msg.value       = '';
}

onMounted(() => {
    getReset();
})
</script>

<style lang="scss" scoped>

</style>