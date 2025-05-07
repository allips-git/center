<template>
    <main class="h-[100%] overflow-y-scroll pb-20">
        <BackHeader title="통계"/>
        <div class="flex justify-between p-4 md:p-6">
            <div>
                <p class="text-sm font-bold">{{ getConvertDate(aver['searchDt'], 'aver') }} 총 손익</p>
                <p class="font-bold text-green-500 text-28">{{ getAmt(aver['totalAmt']) }} 원</p>
            </div>
            <div>
                <DatePicker v-model="aver['searchDt']" view="month" dateFormat="yy년 mm'월'" 
                    class="custom-datapicker *:!text-sm !max-w-[120px] h-[33px] *:!pl-1 *:!pr-1.5 bg-gray" :locale="'ko'" showIcon fluid iconDisplay="input"
                    @update:modelValue="aver.getData()">
                    <template #inputicon="slotProps" class="!pl-1">
                    <IconPlay class="rotate-90 !fill-gray-500"/>
                    </template>
            </DatePicker>
            </div>
        </div>

        <div class="gray-bar"></div>

       <section class="p-4 md:p-6">
            <h2 class="mb-4 text-base font-bold">요약</h2>
            <div class="w-full h-[22px] overflow-hidden bg-gray-200 rounded-full ">
                <div class="flex items-center h-full *:h-full">
                    <div :class="`bg-blue-400`" :style="{ width: `${aver.saleAmtPercent}`}" >
                        <p class="flex items-center justify-end h-full pr-3 text-xs text-right text-white">{{ aver.saleAmtPercent }}</p>
                    </div>
    
                    <div :class="`bg-yellow-400`" :style="{ width: `${aver.purcAmtPercent}` }" >
                        <p class="flex items-center justify-end h-full pr-3 text-xs text-right text-white">{{ aver.purcAmtPercent }}</p>
                    </div>
    
                    <div :class="`bg-red-400`" :style="{ width: `${aver.fixedAmtPercent}` }">
                        <!-- 0%센트 일때 안보이게 처리 (글자 겹칩 현상 발생함) -->
                        <p v-if="aver.fixedAmtPercent == '0%'"   class="flex items-center justify-end h-full pr-3 text-xs text-right text-white">{{ aver.fixedAmtPercent }}</p>
                    </div>
                </div>
            </div>
            <!--  border border-gray-200 rounded-md -->
            <ul class="flex flex-col gap-1.5  mt-[1.625rem] text-xs text-t-lv1 mx-4">
                <li class="flex justify-between gap-5">
                    <div class="flex items-center gap-3.5">
                        <span class="block bg-blue-400 rounded-full size-[11px]"></span>
                        <p>매출</p>
                    </div>
                    <p class="text-sm font-bold text-t-lv2">{{ getAmt(aver['saleAmt']) }}원</p>
                </li>

                <li class="flex justify-between gap-5">
                    <div class="flex items-center gap-3.5">
                        <span class="block bg-yellow-400 rounded-full size-[11px]"></span>
                        <p>매입</p>
                    </div>
                    <p class="text-sm font-bold text-t-lv2">{{ getAmt(aver['purcAmt']) }}원</p>
                </li>

                <li class="flex justify-between gap-5">
                    <div class="flex items-center gap-3.5">
                        <span class="block bg-red-400 rounded-full size-[11px]"></span>
                        <p>비용</p>
                    </div>
                    <p class="text-sm font-bold text-t-lv2">{{ getAmt(aver['fixedAmt']) }}원</p>
                </li>
            </ul>
        </section>

        <div class="gray-bar"></div>

        <section class="p-4 md:p-6">
            <div class="w-full bg-white">
                <div class="">
                    <h2 class="text-base font-bold">이달 고객 매출 순위</h2>
                    <span class="text-sm text-gray-400">최고 10명</span>
                </div>
                <ul class="px-4 mt-4">
                    <li v-for="(item, index) in aver['clientRank']" :key="index" class="flex items-center justify-between py-3">
                            <div class="flex items-center gap-2 ">
                                <p class="w-2 font-bold">{{ index + 1 }}</p>
                                <IconAvatar class="w-8 text-sky-400"/>
                                <p class="">{{ item['clientNm'] }}</p>
                            </div>
                        <p class="font-bold ">{{ getAmt(item['amt']) }}원</p>
                    </li>
                </ul>
            </div>
        </section>
    
        <div class="gray-bar"></div>

        <section class="p-4 md:p-6">
            <h2 class="mb-6 text-base font-bold">결제 수단</h2>
            <div class="">
                <div class="w-full h-5 overflow-hidden bg-gray-200 rounded-full">
                    <div class="flex items-center h-full *:h-full">
                        <div :class="`bg-blue-400`" :style="{ width: `${aver.accountPercent}`}" >
                            <p v-if="aver.accountPercent !== '0%'"  class="flex items-center justify-end h-full pr-3 text-xs text-right text-white">{{ aver.accountPercent }}</p>
                        </div>
        
                        <div :class="`bg-yellow-400`" :style="{ width: `${aver.cashPercent}` }" >
                            <p v-if="aver.cashPercent === '0%'" class="flex items-center justify-end h-full pr-3 text-xs text-right text-white">{{ aver.cashPercent }}</p>
                        </div>
        
                        <div :class="`bg-red-400`" :style="{ width: `${aver.cardPercent}` }">
                            <!-- 0%센트 일때 안보이게 처리 (글자 겹칩 현상 발생함) -->
                            <p v-if="aver.cardPercent === '0%'"  class="flex items-center justify-end h-full pr-3 text-xs text-right text-white">{{ aver.cardPercent }}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <ul class="flex flex-col gap-2.5 pt-6">
                <li v-for="(item, index) in aver['payList']" :key="index" class="flex justify-between gap-5">
                    <div class="flex items-center gap-3.5 text-xs text-t-lv1 px-4">
                        <span v-if="item['codeSub'] === '001'" class="block bg-blue-300 rounded-full size-3"></span>
                        <span v-if="item['codeSub'] === '002'" class="block bg-yellow-400 rounded-full size-3"></span>
                        <span v-if="item['codeSub'] === '003'" class="block bg-green-400 rounded-full size-3"></span>
                        <p>{{ item['codeNm'] }} {{ item['cnt'] }}회</p>
                    </div>
                    <p v-if="item['codeSub'] === '001'" class="px-4 text-sm font-bold text-t-lv2">{{ getAmt(item['amt']) }}원</p>
                    <p v-if="item['codeSub'] === '002'" class="px-4 text-sm font-bold text-t-lv2">{{ getAmt(item['amt']) }}원</p>
                    <p v-if="item['codeSub'] === '003'" class="px-4 text-sm font-bold text-t-lv2">{{ getAmt(item['amt']) }}원</p>
                </li>
            </ul>
        </section>

        <!-- <section class="pb-10">
            <h2 class="px-4 pt-2 text-lg font-bold">키워드별 매출 기여도</h2>
            <div class="flex justify-center px-10 py-5">
                <canvas id="myDoughnutChart"></canvas>
            </div>
            <ul class="flex flex-col gap-2 p-4 pb-0 mx-4">
                <li v-for="(item, index) in aver['keywordList']" :key="index" class="flex justify-between gap-5">
                    <div class="flex items-center gap-2">
                        
                        배경색상 양식 : bg-[color]-[num] / 텍스트색상 양식: text-[color]-[num]
                        폭 > -red-400
                        EA > -blue-400
                        회베 > -green-400
                        야드 > -sky-500 
                        <span v-if="item['codeSub'] === '001' || item['codeSub'] === '002'" class="block bg-green-400 rounded-full size-3"></span>
                        <span v-if="item['codeSub'] === '003' || item['codeSub'] === '004'" class="block rounded-full bg-sky-400 size-3"></span>
                        <p>{{ item['codeNm'] }} ({{ item['cnt'] }}개)</p>
                    </div>
                    <p v-if="item['codeSub'] === '001' || item['codeSub'] === '002'" class="text-lg font-bold text-red-400">{{ getAmt(item['amt']) }}원</p>
                    <p v-if="item['codeSub'] === '003' || item['codeSub'] === '004'" class="text-lg font-bold text-blue-400">{{ getAmt(item['amt']) }}원</p>
                </li>
            </ul>
        </section> -->
    </main>
    <div class="bg-blue-400"></div>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
// import Avatar from 'primevue/avatar';
import IconPlay from '@/components/icons/IconPlay.vue'
import DatePicker from 'primevue/datepicker';
import IconAvatar from '@/components/icons/IconAvatar.vue';
import { onMounted } from 'vue';
import { useAverageStore } from '@/store';
import { Chart, registerables } from 'chart.js';
import { getCommas, getConvertDate } from '@/assets/js/function';

const aver = useAverageStore();

const getAmt = (amt: number) => {
    return getCommas(Number(amt));
}

onMounted(async () => {
    await aver.getData();
    Chart.register(...registerables);
    
    const ctx = document.getElementById('myDoughnutChart') as HTMLCanvasElement;

    const chartData = {
        labels      : aver.keywordNmList,
        datasets    : [{
            label                   : '매출 기여도',
            data                    : aver.keywordValList,
            backgroundColor         : ['#4ade80', '#38bdf8' , '#f87171', '#60a5fa'],
            hoverBackgroundColor    : ['#66bb6a', '#42a5f5'],
        }]
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