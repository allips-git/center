<template>
    <Dialog v-model:visible="visible"
        pt:root:class="!border-0 !bg-transparent w-full md:w-[400px] min-h-[600px] md:h-auto h-full !max-h-screen" 
        pt:mask:class="bg-white backdrop-blur-sm">
            <template #container>
                <BackHeader title="매장 회원가입 1/2"/>
                <div class="px-4 pt-10">
                    <div class="form-gap-box">
                        <IftaLabel class="relative w-full">
                            <label for="email">이메일</label>
                            <IconField>
                                <InputText id="email" v-model="join['login']['email']" placeholder="이메일을 입력해주세요." class="w-full"/>
                                <InputIcon><IconInputX/></InputIcon>
                            </IconField>
                            <small v-if="join['msg']['email'] !== ''" class="vali_text">{{ join['msg']['email'] }}</small>
                            <small v-if="join['msg']['email'] !== ''" class="vali_text-tran">none</small>
                        </IftaLabel>

                        <IftaLabel class="w-full">
                            <label for="pw">비밀번호</label>
                            <IconField>
                                <InputText type="password" id="pw" v-model="join['login']['pw']" placeholder="비밀번호를 입력해주세요" class="w-full"/>
                                <InputIcon><IconEye/></InputIcon>
                            </IconField>
                            <small v-if="join['msg']['pw'] !== ''" class="vali_text">{{ join['msg']['pw'] }}</small>
                            <small v-if="join['msg']['pw'] !== ''" class="vali_text-tran">none</small>
                        </IftaLabel>

                        <IftaLabel class="w-full">
                            <label for="pw">비밀번호 확인</label>
                            <IconField>
                                <InputText type="password" id="pwChk" v-model="join['login']['pwChk']" placeholder="비밀번호를 다시 한 번 입력해주세요" class="w-full"/>    
                                <InputIcon><IconEye/></InputIcon>
                            </IconField>
                            <small v-if="join['msg']['pwChk'] !== ''" class="vali_text">{{ join['msg']['pwChk'] }}</small>
                            <small v-if="join['msg']['pwChk'] !== ''" class="vali_text-tran">none</small>
                        </IftaLabel>

                        <IftaLabel>
                            <IconField>
                                <InputText :value="join['login']['einFile']['name']" placeholder="사업자 등록증을 업로드 해주세요." variant="filled" class="w-full" readonly @click="getFileBtn"/>
                                <input type="file" id="einFile" ref="einFile" style="display:none" accept="image/*" @change="getFile"/>
                                <InputIcon class="pi pi-file-arrow-up" />
                            </IconField>
                            <label>사업자 등록증 업로드</label>
                        </IftaLabel>
                        <small v-if="join['msg']['einFile'] !== ''" class="vali_text">{{ join['msg']['einFile'] }}</small>
                        <small v-if="join['msg']['einFile'] !== ''" class="vali_text-tran">none</small>
                        <div class="mobile-fiex-bottom next-button md:*:mt-12 md:!border-t-0">
                            <Button label="다음" class="w-full" @click="getNext"/>
                        </div>
                    </div>
                    <!-- <div class="mobile-fiex-bottom">
                        <Button label="다음" class="w-full" @click="getNext"/>
                    </div> -->
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
import IconInputX from '@/components/icons/IconInputX.vue';
import IconEye from '@/components/icons/IconEye.vue';
import axios from 'axios';
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

const getNext = async () => {
    await join.getMsgReset();

    const checkParams = {
        email   : join['login']['email'],
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

    try
    {
        const res = await axios.post('https://data.planorder.kr/joinV1/getIdCheck', { id : join['login']['email'] });

        console.log(res);
        router.push({ path : `/join/joinSecond` });
    }
    catch(e)
    {
        console.log(e);
        if(e.response.data['code'] === 4100)
        {
            join.getMsgSet('이미 사용 중인 계정입니다.', 'email');
            const inputElement = document.getElementById('email');
            if (inputElement) 
            {
                inputElement.focus();
            }
        }
        else
        {
            alert('회원가입 도중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
        }
    }
}

onMounted(()=>{
    if(!join.certified)
    {
        // router.go(-1);
    }
})
</script>

<style lang="scss" scoped>

</style>