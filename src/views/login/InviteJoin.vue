<template>    
    <Dialog v-model:visible="visible" pt:root:class="!border-0 !bg-transparent" pt:mask:class="backdrop-blur-sm">
        <template #container>
            <div class="flex flex-col px-6 py-8 rounded-2xl sm:w-[400px] min-h-96">
                <p class="flex items-center justify-center font-bold mb-6">{{ t('common.invitation_signup') }}</p>

                <div class="flex gap-4 flex-col">
                    <div class="inline-flex flex-col gap-2">
                        <label>email</label>
                        <InputText v-model="invite['email']" disabled/>
                    </div>

                    <div class="inline-flex flex-col gap-2">
                        <label> {{ t('common.password') }}</label>
                        <InputText id="pw" v-model="invite['pw']" :placeholder="t('placeHolder.enter_your_password')" type="password"/>
                        <small v-if="msg !== ''" class="text-red-500">{{ msg }}</small>
                    </div>

                    <div class="inline-flex flex-col gap-2">
                        <label>{{ t('common.verify_password') }}</label>
                        <InputText id="pwChk" v-model="invite['pwChk']" :placeholder="t('placeHolder.enter_your_password')" type="password"/>
                        <small v-if="msg !== ''" class="text-red-500">{{ msg }}</small>
                    </div>
                </div>

                <Button label="완료" size="large" class="mt-10" @click="getResult"/>
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';
import axios from 'axios';
import { useConfirm } from "primevue/useconfirm";
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router'
import { useInviteJoinStore } from '@/store/modules/inviteJoin';
import { useI18n } from 'vue-i18n';

const { t }     = useI18n();
const confirm   = useConfirm();
const route     = useRoute();
const router    = useRouter();
const invite    = useInviteJoinStore();
const visible   = ref(true);
const msg       = ref('');

const getResult = () => {
    if(invite['pw'].length < 4)
    {
        msg.value = '비밀번호는 4자리 이상 입력해주세요.';
        getFocus('pw');
        return;
    }

    if(invite['pw'] !== invite['pwChk'])
    {
        msg.value = '비밀번호가 일치하지 않습니다.';
        getFocus('pwChk');
        return;
    }

    const params = {
        id          : invite['email'],
        pw          : invite['pw'],
        platform    : invite['platform'],
        agree1      : invite['agree']['age'] ? 'Y' : 'N',
        agree2      : invite['agree']['use'] ? 'Y' : 'N',
        agree3      : invite['agree']['info'] ? 'Y' : 'N'
    };

    console.log(params);

    confirm.require({
        message     : '초대받은 링크에 회원가입 하시겠습니까?',
        header      : '회원가입',
        rejectProps : {
            label       : '취소',
            severity    : 'secondary',
            outlined    : true
        },
        acceptProps : {
            label: '확인'
        },
        accept : async () => {
            try
            {
                await axios.put(`https://po-data.plansys.kr/v1/factory/inviteJoin/updateData`, params);
                router.push({path : `/login`});
            }
            catch(e)
            {
                console.log(e);
                alert('error');
            }
        }
    });
}

const getFocus = (id: string) => {
    const inputElement = document.getElementById(id);
    if (inputElement) 
    {
        inputElement.focus();
    }
}

onMounted(() => {
    console.log(atob(route.query.email));
})
</script>

<style lang="scss" scoped>
</style>