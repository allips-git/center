<template>
    <div class="relative">
        <BackHeader title="맴버 관리"/>
        <div class="flex items-center justify-center gap-1 absolute z-[60] text-sm translate-y-1/2 right-4 bottom-1/2 text-gray-500">
            <p class="pb-[0.5px] text-t-lv2 text-desc">등급설정</p>
            <IconSetting class="size-[17px] fill-l-lv0" />
        </div>
    </div>
    <main class="px-4 pb-32" ref="mainRef">
        <ul class="flex flex-col">
            <!-- v-for -->
            <li v-for="item, index in member['list']" :key="index" class="flex items-center justify-between py-[14px]" @click="getDetail(item['state'], item['userCd'])">
                <div class="flex items-center gap-[10px]">
                    <IconAvatar class="fill-sky-400 size-9"/>
                    <div  class="flex flex-col">
                        <p class="text-base font-bold ">{{ item['userNm'] }}</p>
                        <span class="text-t-lv4 text-10">{{ item['rank'] }}</span>
                    </div>
                </div>
                <span v-if="item['state'] === 'Y'" class="pi pi-check text-lg text-sky-500 !font-bold"></span>
                <p v-else-if="item['state'] === 'E'" class="capsuel_gray text-10">초대중</p>
                <p v-else-if="item['state'] === 'C'" class="capsuel_yellow">심사중</p>
                <p v-else-if="item['state'] === 'P'" class="capsuel_sky" @click.stop="getAppr(item['userCd'])">승인대기중</p>
            </li>
        </ul>
    </main>

    <div :style="{width: mainWidth + 'px', left: mainLeft + 'px',  }" class="bottom-fixed-btn-box" >
        <Button label="멤버 추가" size="large" @click="getPopup"/>
    </div>

    <Dialog v-model:visible="popup['pop']['memberDetail']" header="멤버상세" 
        :modal=true position="center" class="custom-dialog-full" 
        @update:visible="getPopupClose('memberDetail', true)">
        <template #header>
            <div class="modal-backheader">
                <Button @click="getPopupClose(true, 'memberDetail')" severity="contrast" text icon="pi pi-times"/>
                <h2 class="modal-backheader-title">멤버 상세</h2>
            </div>
        </template>
        <MemberDetail/>
    </Dialog> 

    <Dialog v-model:visible="popup['pop']['memberSet']" header="멤버 저장" 
        :modal=true position="center" class="custom-dialog-full" 
        @update:visible="getPopupClose('memberSet', true)">
        <template #header>
            <div class="modal-backheader">
                <Button @click="getPopupClose(true, 'memberSet')" severity="contrast" text icon="pi pi-times"/>
                <h2 class="modal-backheader-title">멤버 정보 저장</h2>
            </div>
        </template>
        <MemberEdit/>
    </Dialog> 
</template>

<script setup lang="ts">
import IconAvatar from '@/components/icons/IconAvatar.vue';
import IconSetting from '@/components/icons/IconSetting.vue';
import BackHeader from '@/components/layouts/BackHeader.vue';
import MemberDetail from "@/views/include/setting/MemberDetail.vue";
import MemberEdit from "@/views/include/setting/MemberEdit.vue";
import { ref } from 'vue';
import { useConfirm } from "primevue/useconfirm";
import { onMounted } from 'vue';
import { usePopupStore, useLoginStore, useMemberStore } from '@/store';
import { getAxiosData, getTokenOut } from '@/assets/js/function';
import { usePopup } from '@/assets/js/popup';

const confirm   = useConfirm();
const popup     = usePopupStore();
const login     = useLoginStore();
const member    = useMemberStore();

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

const { getPopupOpen, getPopupClose } = usePopup();

const getDetail = async (state: string, userCd: string) => {
    if(state === 'Y')
    {
        await member.getUserCd(userCd);
        getPopupOpen('memberDetail');
    }
}

const getPopup = async() => {
    await member.getInfoReset();
    getPopupOpen('memberSet');
}

const getAppr = (userCd: string) => {
    if(login['rank'] === 'C' || login['rank'] === 'M')
    {
        confirm.require({
            message     : '해당 멤버를 승인하시겠습니까?',
            header      : '승인',
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
                    userCd : userCd
                }

                try
                {
                    const instance  = await getAxiosData();
                    await instance.post(`https://data.planorder.kr/memberV1/getAppr`, params);
                    member.getList();
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
                        alert('승인 처리 중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                    }
                }
            }
        });
    }
}

onMounted(() => {
    member.getList();
})

</script>

<style lang="scss">

</style>