<template>
    <BackHeader title="설정" />
    <main class="pb-5">
        <section class="p-4">
            <div class="flex gap-2 p-4 border border-gray-200 rounded-md">
                <div class="!size-12 flex items-center justify-center">
                    <IconAvatar class="text-sky-400 size-full"/>
                </div>
                <div class="flex flex-col">
                    <h1>디자인 윈도우</h1>
                    <span class="text-sm text-sky-500">대표님</span>
                </div>
            </div>
        </section>
        <section class="px-5">
            <ul class="border *:border-b last:border-b-0 border-gray-200 rounded-md bg-gray-50 *:flex *:justify-between *:items-center *:p-4">
                <li>
                    <div class="flex items-center">
                        <p>요금제</p>
                        <div class="ml-2"> 
                            <Badge value="스탠다드"></Badge>
                        </div>
                    </div>
                    <p class="text-sm font-bold text-sky-500">사용 가능 기한 2022년 10월 10일 까지</p>
                </li>
                <li>
                    <p>플랜 포인트</p>
                    <p class="text-sm font-bold text-sky-500">2400p</p>
                </li>

                <li>
                    <p>샵 맴버 인원</p>
                    <p class="text-sm font-bold text-sky-500">1/3 사용중</p>
                </li>
            </ul>
        </section>
        <div class="gray-bar"></div>
        <section class="px-4">
            <h2 class="setting-list-header">정보설정</h2>
            <ul>
                <li v-for="(item, index) in storeSettings" :key="index" class="flex justify-between px-2 py-4 border-b hover:bg-gray-50" @click="navigateTo(item)">
                    <p>{{ item.name }}</p>
                    <div><IconPlay class="w-2 fill-gray-600"/></div>
                </li>
            </ul>

            <h2 class="mt-4 setting-list-header">플랜오더 약관</h2>
            <ul>
                <li v-for="(item, index) in termsList" :key="index" class="flex justify-between px-2 py-4 border-b hover:bg-gray-50">
                    <p>{{ item }}</p>
                    <div><IconPlay class="w-2 fill-gray-600"/></div>
                </li>
            </ul>
        </section>

        <section class="px-4">
            <p class="my-5 text-center text-gray-400">version 1.1.0.8c</p>
            <Button label="로그아웃" severity="secondary" class="w-full"  />
        </section>

        <section class="px-5 py-6 my-5 border-t border-gray-200">
            <ul class="flex text-sm justify-evenly">
                <li>회사소개</li>
                <li>고객센터</li>
                <li>공지사항</li>
                <li>사용문의</li>
            </ul>
        </section>
    </main>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import IconAvatar from '@/components/icons/IconAvatar.vue';
import IconPlay from '@/components/icons/IconPlay.vue';
import Badge from 'primevue/badge';

import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const storeSettings = ref([
    { name: '매장설정', path: '/setting_store' },
    { name: '플랜톡', path: '/plantalk' },
    { name: '멤버관리', path: '/setting/member_list' },
    { name: '할인 설정', path: '/setting/coupon_menu' },
    { name: '시공시간 설정', path: '/setting/time_setting' },
    { name: '고정비용 등록', path: '/setting/staticPay' },
    { name: '푸쉬 알림', path: '/setting' },
    { name: '회원정보 변경', path: '/member-info-change' },
    { name: '사업자 인증', path: '/setting/setting_auth' },
    { name: '계약서 관리', path: '/setting' },
]);

const navigateTo = (item) => {
    router.push(item.path); // 해당 경로로 이동
};

const termsList = ref([
    '사용약관',
    '개인정보 처리방침',
    '개인정보 수집 이용 동의서',
]);

</script>

<style lang="scss">

</style>