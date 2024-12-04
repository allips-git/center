<template>
    <BackHeader title="발주서" />
    <main class="!pb-36">
        <div class="relative">
            <section class="relative rounded-t-xl overflow-hidden bg-white">
                <InfoCard :title="'수신'" :info="info" />
                <div class="gray-bar"></div>

                <section class="px-5">
                    <div class="flex flex-col gap-5">
                        <TableCard title="어떤 텍스트?" />
                    </div>
                </section>
            </section>
            <div class="gray-bar"></div>
            <section class="px-5">
                <CalculateCard  :showtitle="true" title="합계 금액" totalTitle="총 합계 금액"/>
            </section>
        </div>
    </main>
    <section class="fixed bg-white border-t border-gray-200 rounded-t-2xl p-5 bottom-0 w-full overflow-hidden">
        <div class="flex justify-between *:flex *:gap-2 *:items-center text-sm w-full">
            <div>
                <div class="label-checkbox-box">
                    <RadioButton />
                    <label for="">일반양식</label>
                </div>
                <div class="label-checkbox-box">
                    <RadioButton />
                    <label for="">엑셀양식</label>
                </div>
            </div>
        </div>

        <div class="btn-2-layout-box pt-4">
            <Button label="발주서 미리보기" severity="secondary"/>
            <Button label="발주 하기"/>
        </div>
    </section>
</template>
    
<script setup lang="ts">
import { ref } from 'vue';
import BackHeader from '@/components/layouts/BackHeader.vue'
import CalculateCard from "@/components/card/CalculateCard.vue";
import InfoCard from "@/components/card/InfoCard.vue";
import TableCard from "@/components/card/TableCard.vue";
import RadioButton from 'primevue/radiobutton';
import ToggleSwitch from 'primevue/toggleswitch';


const checked = ref(false)
// 정보 배열 정의
const info = ref([
    { label: '매장번호', value: '112-1211978241' },
    { label: '고객명', value: '김고객' },
    { label: '주문일', value: '2024.12.10'},
    { label: '출고일', value: '2024.12.12' },
    { label: '배송명', value: '멋진배송' },
    { label: '요청사항', value: '문앞에 놔주세요' },
]);
</script>

<style lang="scss">

</style>