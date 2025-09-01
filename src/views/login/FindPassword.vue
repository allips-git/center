<template>
    <Dialog v-model:visible="visible"
    :closable="false" 
    pt:root:class="!border-0 !bg-transparent w-full md:w-[500px] md:h-auto h-full !max-h-screen" 
    pt:mask:class="bg-white backdrop-blur-sm">
        <template #container>
            <BackHeader title="휴대폰 인증"/>
            <div class="modal-page-padding">
                <div class="form-gap-box">
                    <IftaLabel class="relative w-full">
                        <label for="id">이메일 아이디</label>
                        <InputText id="email" v-model="id" placeholder="이메일을 입력해주세요." class="w-full"/>
                    </IftaLabel>
                    <small v-if="idMsg !== ''" class="vali_text">{{ idMsg }}</small>
                    <div class="mobile-fiex-bottom">
                        <Button label="비밀번호 찾기" class="w-full" size="large" @click="getMove"/>
                    </div>
                </div>
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';
import IftaLabel from 'primevue/iftalabel';
import BackHeader from '@/components/layouts/BackHeader.vue'
import { useToast } from "primevue/usetoast";
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useFindStore } from '@/store/modules/find';
import { getCertified } from "@/assets/js/certified";
import { getAxiosData } from "@/assets/js/function";

const toast     = useToast();
const router    = useRouter();
const route     = useRoute();
const find      = useFindStore();
const visible   = ref(true);
const id        = ref('');
const idMsg     = ref('');

const getMove = async () => {
    if(id.value === '')
    {
        idMsg.value = '이메일을 입력해주세요.';
        const inputElement = document.getElementById('email');
        if (inputElement) 
        {
            inputElement.focus();
        }
        return;
    }

    getCertified('find').then(async result => {
        if(result.status)
        {
            await find.getCertified(true);

            const params = {
                id   : id.value,
                name : find.auth.name,
                tel  : find.auth.tel
            };

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                await instance.post(`https://data.planorder.kr/findV1/getInfoCheck`, params);
                router.push({path : `/change_password`, query : { id : id.value }});
            }
            catch(e)
            {
                console.log(e);
                if(e.response.data['code'] === 4000)
                {
                    alert('인증된 정보와 일치하지 않는 계정입니다. 계정을 확인해주세요.');
                }
                else
                {
                    alert('비밀번호 찾기에 실패하였습니다. 지속될 경우 관리자에게 문의하세요.');
                }
            }
        }
        else
        {
            toast.add({ severity: 'error', summary: '인증실패', detail: result.msg, life: 3000 });
        }
    }).catch(error => {
        toast.add({ severity: 'error', summary: '인증에러', detail: error.msg, life: 3000 });
    });
}

onMounted(() => {
    if(route.query.id)
    {
        id.value = route.query.id;
    }

    idMsg.value = '';
})
</script>

<style lang="scss" scoped>

</style>