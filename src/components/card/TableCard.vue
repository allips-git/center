<template>
    <div class="w-full rounded border border-gray-200"> 
        <h1 class="py-2 px-4 text-left text-base font-bold bg-gray-50">{{ title }} 왜 프롭스?</h1>
        <!-- 개별 카드 v-for  -->
        <div class="pt-5 pb-3 px-4 border-t first:border-t-0">
            <!-- 카드 상단 -->
            <section>
                <div class="flex items-end justify-between text-base mt-2 mb-5">
                    <div class="">
                        <h2 class="text-sm text-gray-400 mb-1">우드택</h2>
                        <h3 class="font-bold text-indigo-600">아르카디아 아이스 화이트</h3>
                    </div>
                    <p class="font-bold text-lg">1,921,121,155원</p>
                </div>
            </section>
            <!-- 테이블 -->
            <table class="table-fixed w-full text-center rounded-sm overflow-hidden border-gray-200">
                <thead class="border">
                    <tr class="*:py-2 text-xs text-gray-600 bg-gray-50">
                        <th>가로 (cm)</th>
                        <th>세로 (cm)</th>
                        <th>좌</th>
                        <th>우</th>
                        <th>규격</th>
                    </tr>
                </thead>
                <tbody class="border">
                    <!-- v-for -->
                    <tr class="*:py-2  border-b last:border-b-0 font-bold text-sm">
                        <td>120</td>
                        <td>120</td>
                        <td>1</td>
                        <td>0</td>
                        <td>2회베</td>
                    </tr>

                    <tr class="*:py-2 !border-b font-bold text-sm">
                        <td>120</td>
                        <td>120</td>
                        <td>1</td>
                        <td>0</td>
                        <td>2회베</td>
                    </tr>
                </tbody>
            </table>
            <!-- 태그  -->
            <section class="my-3 flex flex-wrap gap-2">
                <Tag severity="secondary" value="형상옵션"></Tag>
                <Tag severity="secondary" value="솜피 알투스 402모터"></Tag>
                <Tag severity="secondary" value="새로길이 금액추가"></Tag>
                <Tag severity="secondary" value="레일추가"></Tag>
            </section>

            <!-- 지시사항  -->
            <section class="my-2 text-sm text-gray-600 bg-gray-50 py-1 rounded-md px-3 border-gray-100 border">
                <p class="font-bold">지시사항: <span class="font-normal">동해물과 백두산이</span></p>
            </section>
            <div class="flex justify-end mt-3">
                <Button label="삭제" outlined severity="danger" size="small"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import Tag from 'primevue/tag';


defineProps({
    title : String
})
</script>

<style lang="scss">

</style>