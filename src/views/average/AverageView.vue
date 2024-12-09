<template>
    <main>
        <BackHeader title="통계"/>
        <div class="flex justify-between p-5 pb-0">
            <div>
                <p class="text-xl font-bold text-green-500">100,000,000,000 원</p>
                <p class="font-bold">2024년 12월 총 손익</p>
            </div>
            <div>
                <Select size="small" class="w-32" placeholder="날짜 선택"/>    
            </div>
        </div>

        <div class="gray-bar"></div>

        <section class="p-5 pt-0">
            <h2 class="pt-2 mb-4 text-lg font-bold">요약</h2>
            <div class="w-full h-5 overflow-hidden rounded-full bg-gray-50 ">
                <div class="flex items-center h-full *:h-full">
                    <div class="w-1/3 bg-green-400">
                        <p class="flex items-center justify-end h-full pr-3 text-xs text-right text-white">33%</p>
                    </div>
    
                    <div class="w-1/3 bg-sky-400">
                        <p class="flex items-center justify-end h-full pr-3 text-xs text-right text-white">33%</p>
                    </div>
    
                    <div class="w-1/3 bg-red-400">
                        <p class="flex items-center justify-end h-full pr-3 text-xs text-right text-white">33%</p>
                    </div>
                </div>
            </div>
            
            <ul class="flex flex-col gap-2 p-4 mt-4 border border-gray-200 rounded-md">
                <li class="flex justify-between gap-5">
                    <div class="flex items-center gap-2">
                        <span class="block bg-green-400 rounded-full size-2"></span>
                        <p>매출</p>
                    </div>
                    <p class="text-lg font-bold text-green-400">12,000원</p>
                </li>

                <li class="flex justify-between gap-5">
                    <div class="flex items-center gap-2">
                        <span class="block rounded-full bg-sky-400 size-2"></span>
                        <p>매입</p>
                    </div>
                    <p class="text-lg font-bold text-sky-400">12,000원</p>
                </li>

                <li class="flex justify-between gap-5">
                    <div class="flex items-center gap-2">
                        <span class="block bg-red-400 rounded-full size-2"></span>
                        <p>비용</p>
                    </div>
                    <p class="text-lg font-bold text-red-400">12,000원</p>
                </li>
            </ul>
        </section>

        <div class="gray-bar"></div>

        <section class="my-4">
            <div class="w-full bg-white">
                <h2 class="px-4 pt-2 text-lg font-bold">이달 고객 매출 순위 TOP 10</h2>
                <ul class="mt-4">
                    <li class="flex items-center justify-between p-4 border-b">
                            <div class="flex items-center gap-2 ">
                                <p class="font-bold">1</p>
                                <Avatar icon="pi pi-user" class="!size-5 *:!text-xs *:!flex *:!items-center *:!justify-center" style="background-color: #ece9fc; color: #2a1261" shape="circle" />
                                <p class="">이름</p>
                            </div>
                        <p class="font-bold ">100,000원</p>
                    </li>
                </ul>
            </div>
        </section>
    
        <div class="gray-bar"></div>

        <section class="my-4">
            <h2 class="px-4 pt-2 text-lg font-bold">결제 수단</h2>
            <ul class="flex flex-col gap-2 p-4 mx-4 mt-4 border border-gray-200 rounded-md">
                <li class="flex justify-between gap-5">
                    <div class="flex items-center gap-2">
                        <span class="block bg-green-400 rounded-full size-2"></span>
                        <p>계좌 0회</p>
                    </div>
                    <p class="text-lg font-bold text-green-400">12,000원</p>
                </li>

                <li class="flex justify-between gap-5">
                    <div class="flex items-center gap-2">
                        <span class="block rounded-full bg-sky-400 size-2"></span>
                        <p>현금 0회</p>
                    </div>
                    <p class="text-lg font-bold text-sky-400">12,000원</p>
                </li>

                <li class="flex justify-between gap-5">
                    <div class="flex items-center gap-2">
                        <span class="block bg-red-400 rounded-full size-2"></span>
                        <p>카드 0회</p>
                    </div>
                    <p class="text-lg font-bold text-red-400">12,000원</p>
                </li>
            </ul>
        </section>

        <div class="gray-bar"></div>

        <section class="pb-10">
            <h2 class="px-4 pt-2 text-lg font-bold">키워드별 매출 기여도</h2>
            <div class="flex justify-center px-10 py-5">
                <canvas id="myDoughnutChart"></canvas>
            </div>
            <ul class="flex flex-col gap-2 p-4 mx-4 mt-4 border border-gray-200 rounded-md">
                <li class="flex justify-between gap-5">
                    <div class="flex items-center gap-2">
                        <span class="block bg-green-400 rounded-full size-2"></span>
                        <p>블라인드 (1개)</p>
                    </div>
                    <p class="text-lg font-bold text-green-400">12,000원</p>
                </li>

                <li class="flex justify-between gap-5">
                    <div class="flex items-center gap-2">
                        <span class="block rounded-full bg-sky-400 size-2"></span>
                        <p>커튼 (2개)</p>
                    </div>
                    <p class="text-lg font-bold text-sky-400">12,000원</p>
                </li>
            </ul>
        </section>
    </main>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import Avatar from 'primevue/avatar';
import { onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';

onMounted(() => {
    Chart.register(...registerables);
    
    const ctx = document.getElementById('myDoughnutChart') as HTMLCanvasElement;

    const chartData = {
        labels: ['블라인드', '커튼'],
        datasets: [{
            label: '매출 기여도',
            data: [12, 5],
            backgroundColor: ['#4ade80', ' #38bdf8'],
            hoverBackgroundColor: ['#66bb6a', '#42a5f5'],
        }],
    };

    new Chart(ctx, {
        type: 'doughnut',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false, // 비율 유지 비활성화
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.raw + '개';
                            return label;
                        }
                    }
                }
            },
        },
    });
});
</script>

<style lang="scss">
canvas {
    width: 100% !important;  /* 캔버스의 너비를 100%로 설정 */
    height: 100% !important; /* 캔버스의 높이를 100%로 설정 */
}
</style>