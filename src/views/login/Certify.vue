<template>    
    <Dialog 
    :closeOnEscape="false"
    v-model:visible="visible" 
    pt:mask:class="h-full backdrop-blur-sm"
    pt:root:class="!border-0 w-full sm:w-[450px] sm:h-auto h-full !max-h-screen" 
    >
        <template #container>
            <div class="flex flex-col px-6 py-8 rounded-2xl sm:min-h-96 w-full h-full pt-[80px] md:pt-0 dark:bg-zinc-700">
                <p class="flex items-center justify-center font-bold mb-6 w-full fixed top-0 h-[50px] left-0 md:relative">아이디 찾기</p>
                <p class="text-2xl font-bold"><span class="text-indigo-600 dark:text-indigo-500">본인인증 진행</span> <br/>인증 진행 후 본인의 아이디를 찾을 수 있습니다.</p>
                <p class="mt-3 text-sm text-gray-400">회원정보에 등록한 휴대전화 번호와 입력한 휴대전화 번호가 같아야, 인증번호를 받을 수 있습니다.</p>
                <Button :label="'본인인증'"  size="large" class="mt-10" @click="getMove"/>
            </div>
        </template>
    </Dialog>
</template>
    
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { useRouter } from 'vue-router';
import { useToast } from "primevue/usetoast";
import { ref } from 'vue';
import { useFindStore } from '@/store/modules/find';
import { getCertified } from "@/assets/js/certified";
import { getAxiosData } from "@/assets/js/function";

const toast     = useToast();
const router    = useRouter();
const find      = useFindStore();
const visible   = ref(true);

const getMove = async () => {
    getCertified('find').then(async result => {
        if(result.status)
        {
            await find.getCertified(true);

            const params = {
                name : find.auth.name,
                tel  : find.auth.tel
            };

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/findV1/getId`, params);

                console.log(res);

                await find.getIdList(res.data.list);
                router.push({path : `/find_Id`});
            }
            catch(e)
            {
                console.log(e);
                alert('아이디 찾기에 실패하였습니다. 지속될 경우 관리자에게 문의하세요.');
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

</script>
<style lang="scss" scoped>
</style>