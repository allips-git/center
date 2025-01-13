<template>
    <Dialog v-model:visible="visible"
        pt:root:class="!border-0 !bg-transparent w-full md:w-[500px] md:h-auto h-full !max-h-screen" 
        pt:mask:class="backdrop-blur-sm bg-white">
            <template #container>
                <BackHeader title="매장회원가입 1/2"/>
                <div class="modal-page-padding">
                    <div class="form-gap-box">
                        <IftaLabel class="w-full">
                            <label for="id">이메일</label>
                            <InputText id="id" v-model="join['login']['id']" placeholder="이메일을 입력해주세요." class="w-full"/>
                            <small v-if="join['msg']['id'] !== ''" class="text-red-500">{{ join['msg']['id'] }}</small>
                        </IftaLabel>

                        <IftaLabel class="w-full">
                            <label for="pw">비밀번호</label>
                            <InputText type="password" id="pw" v-model="join['login']['pw']" placeholder="비밀번호를 입력해주세요" class="w-full"/>
                            <small v-if="join['msg']['pw'] !== ''" class="text-red-500">{{ join['msg']['pw'] }}</small>
                        </IftaLabel>

                        <IftaLabel class="w-full">
                            <label for="pw">비밀번호 확인</label>
                            <InputText type="password" id="pwChk" v-model="join['login']['pwChk']" placeholder="비밀번호를 다시 한 번 입력해주세요" class="w-full"/>    
                            <small v-if="join['msg']['pwChk'] !== ''" class="text-red-500">{{ join['msg']['pwChk'] }}</small>
                        </IftaLabel>

                        <IftaLabel>
                            <IconField>
                                <InputText :value="join['login']['einFile']['name']" placeholder="사업자 등록증을 업로드 해주세요." variant="filled" class="w-full" readonly @click="getFileBtn"/>
                                <input type="file" id="einFile" ref="einFile" style="display:none" accept="image/*" @change="getFile"/>
                                <InputIcon class="pi pi-file-arrow-up" />
                            </IconField>
                            <label>사업자 등록증 업로드</label>
                        </IftaLabel>
                        <small v-if="join['msg']['einFile'] !== ''" class="text-red-500">{{ join['msg']['einFile'] }}</small>
                    </div>
                    <div class="mobile-fiex-bottom">
                        <Button label="다음" class="w-full" @click="getNext"/>
                    </div>
                </div>
            </template>
        </Dialog>
    </template>
    
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import IftaLabel from 'primevue/iftalabel';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import BackHeader from '@/components/layouts/BackHeader.vue'
import { useJoinStore } from '@/store';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getFileCheck } from '@/assets/js/function';
import { joinFirstMsg } from '@/assets/js/msg';

const join      = useJoinStore();
const router    = useRouter();
const visible   = ref(true);
const einFile   = ref<HTMLInputElement | null>(null);

const getFileBtn = () => {
    einFile.value?.click();
};

const getFile = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const files  = target.files;
    const file   = files[0];

    const fileCheck = getFileCheck(file, 10);

    if(!fileCheck['stat'])
    {
        join.getMsgSet(fileCheck['msg'], 'einFile');
    }
    else
    {
        join.getFile(file, file.name);
    }
};

const getNext = () => {
    const checkParams = {
        id      : join['login']['id'],
        pw      : join['login']['pw'],
        pwChk   : join['login']['pwChk'],
        einFile : join['login']['einFile']['name']
    };

    const result = joinFirstMsg(checkParams);

    if(!result['state'])
    {
        join.getMsgSet(result['msg'], result['id']);
        const inputElement = document.getElementById(result['id']);
        if (inputElement) 
        {
            inputElement.focus();
        }

        return false;
    }

    router.push({ path : `/join/joinSecond` });
}

onMounted(()=>{
    if(!join.certified)
    {
        router.go(-1);
    }
})
</script>

<style lang="scss" scoped>

</style>