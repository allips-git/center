<template>
    <div>
        <BackHeader title="설정" />
        <main class="pb-5">
            <section class="p-4 md:p-6">
                <div class="flex gap-2 px-4 py-3.5 border border-gray-200 rounded-sm">
                    <div class="!size-[33px] flex items-center justify-center">
                        <IconAvatar class="fill-[#78BBFF]  size-full"/>
                    </div>
                    <div class="flex items-center gap-0.5">
                        <h1>{{ login['name'] }}</h1>
                        <span class="text-sm text-sky-500">님</span>
                    </div>
                </div>
            </section>
            <section class="px-4 pb-4 md:px-6 md:pb-6">
                <ul class="border *:text-sm *:border-b last:border-b-0 border-l-lv3 rounded-sm bg-bg-lv1 *:flex *:justify-between *:items-center *:p-4">
                    <li>
                        <div class="flex items-center">
                            <p>요금제</p>
                            <div class="ml-2"> 
                                <span class="px-2 pb-px text-xs font-light text-white rounded-full bg-p-lv4">스탠다드</span>
                            </div>
                        </div>
                        <p class="text-p-lv2 text-10">사용 가능 기한 2022년 10월 10일 까지</p>
                    </li>
                    <li>
                        <p>플랜 포인트</p>
                        <p class="text-p-lv2 text-10">2400p</p>
                    </li>
    
                    <li>
                        <p>샵 맴버 인원</p>
                        <p class="text-p-lv2 text-10">1/3 사용중</p>
                    </li>
                </ul>
            </section>
            <div class="gray-bar"></div>
            <section class="p-4 md:p-6">
                <h2 class="setting-list-header">정보설정</h2>
                <ul>
                    <li v-for="(item, index) in storeSettings" :key="index" class="flex items-center text-sm justify-between py-4 border-b hover:bg-gray-50 text-t-lv1 pl-3.5" @click="navigateTo(item)">
                        <p>{{ item.name }}</p>
                        <div class="flex items-center justify-center size-5"><IconPlay class="w-5 fill-gray-600"/></div>
                    </li>
                </ul>
    
            </section>
            <div class="gray-bar"></div>
            <section class="p-4 md:p-6">

                <h2 class="setting-list-header">플랜오더 약관</h2>
                <ul class="*:text-sm text-t-lv1">
                    <li class="flex justify-between pl-2.5 py-4 border-b hover:bg-gray-50">
                        <p>사용약관</p>
                        <div class="flex items-center justify-center size-5"><IconPlay class="w-5 fill-gray-600"/></div>
                    </li>
                    <li class="flex justify-between pl-2.5 py-4 border-b hover:bg-gray-50" @click="router.push({ path : '/setting/privacy' })">
                        <p>개인정보 처리방침</p>
                        <div class="flex items-center justify-center size-5"><IconPlay class="w-5 fill-gray-600"/></div>
                    </li>
                    <li class="flex justify-between pl-2.5 py-4 border-b hover:bg-gray-50">
                        <p>개인정보 수집 이용 동의서</p>
                        <div class="flex items-center justify-center size-5"><IconPlay class="w-5 fill-gray-600"/></div>
                    </li>
                    <li class="flex justify-between pl-2.5 py-4 border-b hover:bg-gray-50" @click="getJoinOut">
                        <p>회원탈퇴</p>
                        <div class="flex items-center justify-center size-5"><IconPlay class="w-5 fill-gray-600"/></div>
                    </li>
                </ul>
            </section>
    
            <section class="px-4">
                <p class="my-5 text-sm text-center text-[#DBDBDB]">version 1.1.0.8c</p>
                <Button label="로그아웃" severity="secondary" class="w-full h-[46px]" @click="getLogOut"/>
            </section>
    
            <section class="px-5 py-6 my-[52px] border-gray-200 border-y text-[#505050]">
                <ul class="flex justify-evenly text-10">
                    <li>회사소개</li>
                    <li>고객센터</li>
                    <li>공지사항</li>
                    <li>사용문의</li>
                </ul>
            </section>
        </main>
    </div>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import IconAvatar from '@/components/icons/IconAvatar.vue';
import IconPlay from '@/components/icons/IconPlay.vue';
import Badge from 'primevue/badge';

import { useConfirm } from "primevue/useconfirm";
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAxiosData, getTokenOut } from '@/assets/js/function';
import { useLoginStore } from '@/store';

const confirm = useConfirm();
const router  = useRouter();
const login   = useLoginStore();

const storeSettings = ref([
    { name: '매장설정', path: 'setting/setting_store' },
    { name: '플랜톡', path: '/plantalk' },
    { name: '멤버관리', path: '/setting/member_list' },
    { name: '할인 설정', path: '/setting/coupon_menu' },
    { name: '시공시간 설정', path: '/setting/time_setting' },
    { name: '고정비용 등록', path: '/setting/static_pay' },
    { name: '푸쉬 알림', path: '/setting' },
    { name: '회원정보 변경', path: '/setting' },
    { name: '사업자 인증', path: '/setting/setting_auth' },
    { name: '계약서 관리', path: '/setting' },
]);

const navigateTo = (item) => {
    router.push(item.path); // 해당 경로로 이동
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