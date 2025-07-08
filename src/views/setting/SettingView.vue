<template>
    <div class="xl:h-[90vh] overflow-y-auto">
        <BackHeader title="설정" />
        <main class="pb-5">
            <section class="p-4 md:p-6">
                <div class="flex gap-2 px-4 py-3.5 rounded-sm border border-gray-200">
                    <div class="!size-[33px] flex items-center justify-center">
                        <IconAvatar class="fill-[#78BBFF]  size-full"/>
                    </div>
                    <div class="flex gap-0.5 items-center">
                        <h1 class="text-base font-bold text-t-lv1">{{ login['name'] }}</h1>
                        <span class="text-sm text-sky-500">님</span>
                    </div>
                </div>
            </section>
            <section class="px-4 md:px-6">
                <ul class="border *:border-b last:border-b-0 border-l-lv3 rounded-sm bg-bg-lv1 *:flex *:justify-between *:items-center *:p-4">
                    <li>
                        <div class="flex items-center">
                            <p class="!text-t-lv1 text-xs">요금제</p>
                            <div class="flex ml-2 itmes-center"> 
                                <span class="px-2 py-[3px] text-white rounded-full text-10 bg-p-lv4">스탠다드</span>
                            </div>
                        </div>
                        <p class="!text-p-lv2 text-10">사용 가능 기한 2022년 10월 10일 까지</p>
                    </li>
                    <li>
                        <p class="!text-t-lv1 text-xs">플랜 포인트</p>
                        <p class="!text-p-lv2 text-10">2400p</p>
                    </li>
    
                    <li>
                        <p class="!text-t-lv1 text-xs">샵 멤버 인원</p>
                        <p class="!text-p-lv2 text-10">1/3 사용중</p>
                    </li>
                </ul>
            </section>
            <section class="p-4 pb-0 md:p-6 md:pb-0">
                <h2 class="text-sm setting-list-header text-t-lv1">정보설정</h2>
                <ul>
                    <li v-for="(item, index) in storeSettings" :key="index" class="flex justify-between items-center p-4 text-sm border-b hover:bg-gray-50 text-t-lv1" @click="navigateTo(item)">
                        <p>{{ item.name }}</p>
                        <div class="flex justify-center items-center size-5"><IconPlay class="w-5 fill-gray-600"/></div>
                    </li>
                </ul>
    
            </section>
            <section class="p-4 pt-0 md:p-6 md:pt-0">

                <h2 class="text-con setting-list-header text-t-lv1 !border-t-0">플랜오더 약관</h2>
                <ul class="*:text-sm text-t-lv1">
                    <li class="flex justify-between p-4 border-b hover:bg-gray-50">
                        <p>사용약관</p>
                        <div class="flex justify-center items-center size-5"><IconPlay class="w-5 fill-gray-600"/></div>
                    </li>
                    <li class="flex justify-between p-4 border-b hover:bg-gray-50" @click="getPopupOpen('privacyView')">
                        <p>개인정보 처리방침</p>
                        <div class="flex justify-center items-center size-5"><IconPlay class="w-5 fill-gray-600"/></div>
                    </li>
                    <li class="flex justify-between p-4 border-b hover:bg-gray-50">
                        <p>개인정보 수집 이용 동의서</p>
                        <div class="flex justify-center items-center size-5"><IconPlay class="w-5 fill-gray-600"/></div>
                    </li>
                    <li class="flex justify-between p-4 border-b hover:bg-gray-50" @click="getJoinOut">
                        <p>회원탈퇴</p>
                        <div class="flex justify-center items-center size-5"><IconPlay class="w-5 fill-gray-600"/></div>
                    </li>
                </ul>
            </section>
    
            <section class="px-4">
                <p class="my-5 text-sm text-center text-[#DBDBDB]">version 1.1.0.8c</p>
                <Button severity="secondary" class="w-full h-[46px] !font-light" @click="getLogOut">
                    <span class="text-xs">로그아웃</span>
                </Button>
            </section>
    
            <section class="px-5 py-6 my-[52px] border-gray-200 border-y !text-[#505050]">
                <ul class="flex justify-evenly text-10">
                    <li>회사소개</li>
                    <li>고객센터</li>
                    <li>공지사항</li>
                    <li>사용문의</li>
                </ul>
            </section>
            <Dialog v-model:visible="popup['pop']['settingStore']" 
                :modal=true position="center" class="custom-dialog-full" 
                @update:visible="getPopClose('settingStore', true)">
                <template #header>
                    <!-- <div class="modal-backheader">
                        <Button @click="getPopupClose(true, 'settingStore')" severity="contrast" text icon="pi pi-times" />
                        <h2 class="modal-backheader-title">매장 설정</h2>
                    </div> -->
                </template>
                <SettingStore/>
            </Dialog>
            <Dialog v-model:visible="popup['pop']['memberList']" 
                :modal=true position="center" class="custom-dialog-full" 
                @update:visible="getPopClose('memberList', true)">
                <template #header>
                    <!-- <div class="modal-backheader">
                        <Button @click="getPopupClose(true, 'memberList')" severity="contrast" text icon="pi pi-times" />
                        <h2 class="modal-backheader-title">매장 설정</h2>
                    </div> -->
                </template>
                <MemberMng/>
            </Dialog>
            <Dialog v-model:visible="popup['pop']['couponMenu']" 
                :modal=true position="center" class="custom-dialog-full" 
                @update:visible="getPopClose('couponMenu', true)">
                <template #header>
                    <!-- <div class="modal-backheader">
                        <Button @click="getPopupClose(true, 'couponMenu')" severity="contrast" text icon="pi pi-times" />
                        <h2 class="modal-backheader-title">할인 설정</h2>
                    </div> -->
                </template>
                <CouponMenu/>
            </Dialog>
            <Dialog v-model:visible="popup['pop']['timeSetting']" 
                :modal=true position="center" class="custom-dialog-full" 
                @update:visible="getPopClose('timeSetting', true)">
                <template #header>
                    <!-- <div class="modal-backheader">
                        <Button @click="getPopupClose(true, 'timeSetting')" severity="contrast" text icon="pi pi-times" />
                        <h2 class="modal-backheader-title">시공시간 설정</h2>
                    </div> -->
                </template>
                <TimeSetting/>
            </Dialog>
            <Dialog v-model:visible="popup['pop']['staticPayView']" 
                :modal=true position="center" class="custom-dialog-full" 
                @update:visible="getPopClose('staticPayView', true)">
                <template #header>
                    <!-- <div class="modal-backheader">
                        <Button @click="getPopupClose(true, 'staticPayView')" severity="contrast" text icon="pi pi-times" />
                        <h2 class="modal-backheader-title">고정비용 설정</h2>
                    </div> -->
                </template>
                <StaticPayView/>
            </Dialog>
            <Dialog v-model:visible="popup['pop']['privacyView']" 
                :modal=true position="center" class="custom-dialog-full" 
                @update:visible="getPopClose('privacyView', true)">
                <template #header>
                    <!-- <div class="modal-backheader">
                        <Button @click="getPopupClose(true, 'privacyView')" severity="contrast" text icon="pi pi-times" />
                        <h2 class="modal-backheader-title">개인정보 처리방침</h2>
                    </div> -->
                </template>
                <Privacy/>
            </Dialog>
        </main>
    </div>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import IconAvatar from '@/components/icons/IconAvatar.vue';
import IconPlay from '@/components/icons/IconPlay.vue';
import Dialog from 'primevue/dialog';
import SettingStore from "@/views/setting/SettingStore.vue";
import PlantalkMain from "@/views/plantalk/PlantalkMain.vue";
import MemberMng from "@/views/setting/MemberMng.vue";
import CouponMenu from "@/views/setting/CouponMenu.vue";
import TimeSetting from "@/views/setting/TimeSetting.vue";
import StaticPayView from "@/views/setting/StaticPay.vue";
import Privacy from "@/views/setting/Privacy.vue";

import { useConfirm } from "primevue/useconfirm";
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAxiosData, getTokenOut } from '@/assets/js/function';
import { useLoginStore, usePopupStore } from '@/store';
import { usePopup } from '@/assets/js/popup';

const confirm = useConfirm();
const router  = useRouter();
const login   = useLoginStore();
const popup   = usePopupStore();

const { getPopupOpen, getPopupClose } = usePopup();

const storeSettings = ref([
    { name: '매장설정', path: 'settingStore' },
    { name: '플랜톡', path: 'kakaoList' },
    { name: '멤버관리', path: 'memberList' },
    { name: '할인 설정', path: 'couponMenu' },
    { name: '시공시간 설정', path: 'timeSetting' },
    { name: '고정비용 등록', path: 'staticPayView' },
    { name: '푸쉬 알림', path: '/setting' },
    { name: '회원정보 변경', path: '/setting' },
    { name: '사업자 인증', path: '/setting/setting_auth' },
    { name: '계약서 관리', path: '/setting' },
]);

const navigateTo = (item) => {
    getPopupOpen(item.path);
};

const getJoinOut = () => {
    confirm.require({
        message     : '정말로 회원 탈퇴하시겠습니까?',
        header      : '회원 탈퇴',
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
                const instance  = await getAxiosData();
                await instance.post(`https://data.planorder.kr/login/getJoinOut`);
                login.getLogout();
                router.push({ path : '/login' });
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
                    alert('회원 탈퇴 처리 중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                }
            }
        }
    });
}

const getLogOut = () => {
    login.getLogout();
    router.push({ path : '/login' });
}

</script>

<style lang="scss">

</style>