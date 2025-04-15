<template>    
    <Dialog 
    v-model:visible="join['state']" 
    pt:mask:class="backdrop-blur-sm h-full"
    pt:root:class="!border-0 !bg-white w-full sm:w-[450px] sm:h-auto h-full !max-h-screen" 
    >
        <template #container>
            <div class="flex flex-col px-6 py-8 rounded-2xl sm:min-h-96 w-full h-full pt-[80px] md:pt-0">
                <p class="flex items-center justify-center font-bold mb-6 w-full fixed top-0 h-[50px] left-0 md:relative">{{ t('common.agree_terms') }}</p>

                <p class="font-bold text-2xl"><span class="text-indigo-600 dark:text-indigo-500">{{ t('common.plan_order') }}</span> <br/>{{ t('sentence.agree_plan_order_terms') }}</p>
                <p class="text-gray-400 text-sm mt-3">{{ t('sentence.agree_terms_and_policy') }}</p>

                <ul class="flex flex-col gap-3 mt-5">
                    <li class="pb-4 border-b border-gray-200">
                        <Checkbox v-model="join['agree']['all']" inputId="all" :binary="true" @update:modelValue="(value) => getAllCheck(value)"/>
                        <label for="all" class="ml-2">{{ t('sentence.agree_all') }}</label>
                    </li>

                    <li>
                        <Checkbox v-model="join['agree']['age']['yn']" inputId="age" :binary="true"/>
                        <label for="age" class="ml-2">{{ t('sentence.required_age_14') }}</label>
                    </li>

                    <li>
                        <Checkbox v-model="join['agree']['use']['yn']" inputId="use" :binary="true"/>
                        <label for="use" class="ml-2">{{ t('sentence.required_agree_terms') }}</label>
                    </li>

                    <li>
                        <Checkbox v-model="join['agree']['info']['yn']" inputId="info" :binary="true"/>
                        <label for="info" class="ml-2">{{ t('sentence.required_consent_personal_data') }}</label>
                    </li>

                    <li>
                        <Checkbox v-model="join['agree']['choice']['yn']" inputId="choice" :binary="true"/>
                        <label for="choice" class="ml-2">{{ t('sentence.optional_consent_marketing') }}</label>
                    </li>
                </ul>
                <Button :label="t('btn.agree_and_continue')"  size="large" class="mt-10" @click="getNext"/>
            </div>
        </template>
    </Dialog>
</template>
    
<script setup lang="ts">
import Checkbox from 'primevue/checkbox';
import Dialog from 'primevue/dialog';
import { onMounted } from 'vue';
import { useInviteJoinStore } from '@/store/modules/inviteJoin';
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router';
import { getCertified } from "@/assets/js/certified";

const route     = useRoute();
const router    = useRouter();
const join      = useInviteJoinStore();

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
                alert('본인인증에 성공하였습니다.');
                join.getCertified(true);
                router.push({path : `/inviteJoin`, query: { email : route.query.email }});
            }
            else
            {
                alert(result.msg);
            }
        }).catch(error => {
            alert(error.msg);
        });
    }
    else
    {
        alert('필수 약관 모두 동의해주세요.');
    }
}

onMounted(async() => {
    await join.getReset();
    await join.getEmail(atob(route.query.email));
})
</script>

<style lang="scss" scoped>
</style>