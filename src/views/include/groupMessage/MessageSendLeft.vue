<template>
<section class="w-full h-full px-4 py-5 border-r max-w-80">
    <h1 class="text-lg font-bold">고객 선택</h1>
    <div class="flex flex-col gap-2 mt-5">
        <p>수신 고객</p>
        <Select placeholder="선택" />
    </div>
    <div class="flex flex-col gap-2 mt-5">
        <p>발송 비용</p>
        <ul class="*:flex *:justify-between text-sm border border-gray-200 rounded-lg last-span-blue">
            <li v-for="(item, index) in customerStats" :key="index" class="p-3 border-b border-gray-200 last:border-b-0 last:font-bold">
                <span>{{ item.title }}</span>
                <span class="ml-2 text-gray-600">{{ item.count }}</span>
            </li>
        </ul>

        <ul class="*:flex *:justify-between *:items-center *:p-3 text-sm border border-gray-200 rounded-lg">
            <li class="border-b border-gray-200">
                <div>
                    <b class="mr-2">현재 포인트</b>
                    <Button label="충전하기" size="small" outlined />
                </div>
                <b>0P</b>
            </li>
            <li>
                <p>차감후 포인트</p>
                <p>0</p>
            </li>
        </ul>
    </div>


</section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 수신 고객 통계 데이터 정의
const customerStats = ref([
    { title: '수신 고객', count: 0 },
    { title: '번호 미등록, 결번 고객', count: 0 },
    { title: '최종 수신 고객', count: 0 },
    { title: '장문 문자', count: 0 },
    { title: '차감 예정 포인트', count: 0 },
]);
</script>

<style lang="scss">
.last-span-blue{
    li:last-child span:last-child{
        color: #2563eb;
    }
}
</style>