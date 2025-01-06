<template>
    <Dialog v-model:visible="visible" pt:root:class="!border-0 !bg-transparent w-full md:w-[500px] md:h-auto h-full !max-h-screen" pt:mask:class="bg-white backdrop-blur-sm">
        <template #container>
            <BackHeader title="약관동의"/>
            <div class="modal-page-padding">
                <h2 class="pt-16 text-xl font-bold"> <span class="text-sky-500">플랜오더</span> <br> 약관에 동의해주세요.</h2>
                <p class="mt-3 mb-6 text-sm font-bold text-gray-400">모든 이용자는 플랜오더의 이용약관 및 개인정보 처리 방침에 동의해야합니다.</p>

                <ul class="text-gray-600 flex flex-col gap-4 *:flex *:justify-between *:items-center">
                    <li class="border-b !pb-3">
                        <div class="font-bold label-checkbox-box">
                            <Checkbox v-model="join['agree']['all']" inputId="all" :binary="true" @update:modelValue="(value) => getAllCheck(value)"></Checkbox>
                            <label for="all" class="text-gray-900">모두 동의합니다.</label>
                        </div>
                    </li>

                    <li class="mt-2 text-sm">
                        <div class="label-checkbox-box">
                            <Checkbox v-model="join['agree']['age']['yn']" inputId="age" :binary="true"></Checkbox>
                            <label for="age">[필수] 만 14세 이상입니다.</label>
                        </div>
                        <!-- <IconPlay class="fill-gray-500 size-2"/> -->
                    </li>

                    <li class="text-sm">
                        <div class="label-checkbox-box">
                            <Checkbox v-model="join['agree']['use']['yn']" inputId="use" :binary="true"></Checkbox>
                            <label for="use">[필수] 이용약관 동의</label>
                        </div>
                        <IconPlay class="fill-gray-500 size-2"/>
                    </li>

                    <li class="text-sm">
                        <div class="label-checkbox-box">
                            <Checkbox v-model="join['agree']['info']['yn']" inputId="info" :binary="true"></Checkbox>
                            <label for="info">[필수] 개인정보 수집 - 이용 동의</label>
                        </div>
                        <IconPlay class="fill-gray-500 size-2"/>
                    </li>

                    <li class="text-sm">
                        <div class="label-checkbox-box">
                            <Checkbox v-model="join['agree']['choice']['yn']" inputId="choice" :binary="true"></Checkbox>
                            <label for="choice">[선택사항] 마케팅 정보 수신 동의</label>
                        </div>
                        <IconPlay class="fill-gray-500 size-2"/>
                    </li>
                    <small class="text-red-500">{{ msg }}</small>
                </ul>
                <div class="mobile-fiex-bottom">
                    <Button label="동의하고 계속하기" class="w-full" @click="getNext" size="large"/>
                </div>
            </div>
        </template>
    </Dialog>
</template>
    
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import Checkbox from 'primevue/checkbox';
import BackHeader from '@/components/layouts/BackHeader.vue'
import { useJoinStore } from '@/store';
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { getCertified } from "@/assets/js/certified";
import IconPlay from '@/components/icons/IconPlay.vue';

const join      = useJoinStore();
const router    = useRouter();
const msg       = ref('');
const visible   = ref(true);

const getAllCheck = (value: boolean) => {
    join.getAgree(value);
}

const getAgreeCheck = () => {
    return (join['agree']['age']['yn'] && join['agree']['use']['yn'] && join['agree']['info']['yn']);
};

const getNext = () => {
    if(getAgreeCheck())
    {
        getCertified().then(result => {
            if(result.status)
            {
                join.getCertified(true);
                router.push({path : `/join/joinFirst`});
            }
            else
            {
                alert('인증에 실패하였습니다. 지속될 경우 관리자에게 문의하세요.');
            }
        }).catch(error => {
            alert(error.msg);
        });
    }
    else
    {
        msg.value = '필수 약관 모두 동의해주세요.';
    }
}
</script>

<style lang="scss" scoped>
</style>