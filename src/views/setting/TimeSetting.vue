<template>
    <div ref="mainRef">
        <BackHeader title="시공시간 설정"/>
        <main class="pb-20 pc-contents-h-box">
            <section class="pt-5 pb-5 mx-5 border-b ">
                <h1 class="mb-2 text-sm font-bold text-t-lv1">기본시공 시간</h1>
                <p class="text-11 text-t-lv3">견적서 작성 진행시 중복되는 기본서비스 (인테리어 자재) 시간을 차감하여 정확한 전체 시공시간 계산을 도와주는 기능입니다.</p>
            </section>
            
            <section class="p-4 md:p-6 form-gap-box !gap-8 pt-3 text-lv-1">
                <div class="relative flex items-center justify-center w-full">
                    <label class="w-[200px] flex-none text-sm">커튼 1개당 시공시간 (분)</label>
                    <InputText v-keyfilter.num v-model="time['curtainTime']" class="w-full !pr-8 font-bold text-right inputNumber-color !border-0 !border-b"/>
                    <span class="absolute font-bold  translate-y-1/2 right-3.5 bottom-1/2">분</span>
                </div>

                <div class="relative flex items-center justify-center w-full">
                    <label class="w-[200px] flex-none text-sm">블라인드 1개당 시공시간 (분)</label>
                    <InputText v-keyfilter.num v-model="time['blindTime']" class="w-full !pr-8 font-bold text-right inputNumber-color !border-0 !border-b"/>
                    <span class="absolute font-bold  translate-y-1/2 right-3.5 bottom-1/2">분</span>
                </div>
            </section>
            <div class="flex flex-col items-center justify-center pt-5 card">
                <Message v-if="msg" severity="info">시공시간이 저장되었습니다.</Message>
            </div>

            <div :style="{width: mainWidth + 'px', left: mainLeft + 'px',  
            }" class="bottom-fixed-btn-box" 
            >
                <Button :disabled="status" label="저장" size="large" @click="getTimeSave"/>
            </div>
        </main>
    </div>

</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue';
import Message from 'primevue/message';
import { useConfirm } from "primevue/useconfirm";
import { ref, onMounted } from 'vue'
import { useTimeStore } from '@/store';
import { getAxiosData, getTokenOut } from '@/assets/js/function';

const confirm   = useConfirm();
const time      = useTimeStore();
const msg       = ref(false);
const status    = ref(false);

const mainRef = ref(null);
const mainWidth = ref(0);
const mainLeft = ref(0)

onMounted(() => {
    const updateMainSize = () => {
        if (mainRef.value) {
            mainWidth.value = mainRef.value.offsetWidth
            mainLeft.value = mainRef.value.offsetLeft
        }
    }

    updateMainSize()

    const observer = new ResizeObserver(() => updateMainSize())
    observer.observe(mainRef.value)
});

const getTimeSave = () => {
    confirm.require({
        message     : '시공시간을 저장하시겠습니까?',
        header      : '저장',
        rejectProps : {
            label       : '취소',
            severity    : 'secondary',
            outlined    : true
        },
        acceptProps : {
            label: '확인'
        },
        accept : async () => {
            const params = {
                curtainTime : time['curtainTime'],
                blindTime   : time['blindTime']
            }

            console.log(params);

            status.value = true;

            try
            {
                const instance  = await getAxiosData();
                await instance.post(`https://data.planorder.kr/timeSettingV1/getResult`, params);
                time.getTime();

                msg.value = true;

                setTimeout(() => {
                    msg.value = false;
                }, 2000);
            }
            catch(e)
            {
                console.log(e);
                if(e.response.status === 401)
                {
                    getTokenOut();
                }
                else
                {
                    alert('시공시간 저장 중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                }
            }

            status.value = false;
        }
    });
}

onMounted(() => {
    time.getTime();
})
</script>

<style lang="scss">

</style>