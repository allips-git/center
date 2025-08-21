<template>
    <div class="p-4 !pb-20">
        <div class="form-gap-box">
            <IftaLabel>
                <IconField>
                    <InputText id="alNm" v-model="alNm" class="w-full"/>
                </IconField>
                <small class="text-red-500 text-10">{{ factory['sys']['msg']['alNm'] }}</small>
                <label for="faCd">별칭명</label>
            </IftaLabel>
        </div>
        <div class="bottom-modal-absol-box">
            <Button type="button" label="저장" @click="getSysFactoryNameSet" class="w-full"></Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import IftaLabel from 'primevue/iftalabel';
import IconField from 'primevue/iconfield';
import { ref, onMounted } from 'vue';
import { useConfirm } from "primevue/useconfirm";
import { useFactoryStore } from '@/store';
import { getAxiosData, getTokenOut } from '@/assets/js/function';
import { usePopup } from '@/assets/js/popup';

const factory   = useFactoryStore();
const confirm   = useConfirm();
const alNm      = ref('');

const { getPopupClose } = usePopup();

const getSysFactoryNameSet = () => {
    if(alNm.value === '')
    {
        factory.getSysMsgSet('별칭명을 입력해주세요.', 'alNm');
        getFocus('alNm');
        return false;
    }

    confirm.require({
        message     : '별칭을 설정하시겠습니까?',
        header      : '별칭설정',
        rejectProps : {
            label       : '취소',
            severity    : 'secondary',
            outlined    : true
        },
        acceptProps : {
            label: '저장'
        },
        accept : async () => {
            const params = {
                faCd : factory['sys']['faCd'],
                alNm : alNm.value
            };

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                await instance.post(`https://data.planorder.kr/factoryV1/getSysFactoryNameSet`, params);
                await factory.getSysFactoryDetail();
                getPopupClose('sysFactoryNameSet', true);
            }
            catch(e)
            {
                console.log(e);
                if(e.response.status === 401)
                {
                    getTokenOut();
                }
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
    alNm.value = factory['sys']['info']['alNm'];

    console.log(factory['sys']['info']['alNm']);
});

</script>

<style lang="scss">

</style>