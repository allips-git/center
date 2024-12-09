<template>
    <div class="w-full rounded border border-gray-200"> 
        <h1 class="py-2 px-4 text-left text-base font-bold bg-gray-50">{{ title }}</h1>
        <!-- 개별 카드 v-for  -->
        <div class="pt-5 pb-3 px-4 border-t first:border-t-0" v-for="(card, index) in cards" :key="index" @click="emit('get-modify', card['edCd'])">
            <!-- 카드 상단 -->
            <section>
                <div class="flex items-end justify-between text-base mt-2 mb-5">
                    <div class="">
                        <h2 class="text-sm text-gray-400 mb-1">{{ card.productTitle }}</h2>
                        <h3 class="font-bold text-indigo-600">{{ card.colorTitle }}</h3>
                    </div>
                    <p class="font-bold text-lg">{{ getAmt(card.amt) }}원</p>
                </div>
            </section>
            <!-- 테이블 -->
            <table class="table-fixed w-full text-center rounded-sm overflow-hidden border-gray-200">
                <thead class="border">
                    <tr class="*:py-2 text-xs text-gray-600 bg-gray-50">
                        <template v-for="col in card.columns" :key="col.key">
                            <template v-if="sizeYn === 'Y'">
                                <th v-if="col.header !== '가로' && col.header !== '세로'">
                                    {{ col.header }}
                                </th>
                            </template>
                            <template v-else>
                                <th>
                                    {{ col.header }}
                                </th>
                            </template>
                        </template>
                    </tr>
                </thead>
                <tbody class="border">
                    <!-- v-for -->
                    <tr class="*:py-2  border-b last:border-b-0 font-bold text-sm" v-for="(row, index) in card.rows" :key="index">
                        <template v-if="sizeYn === 'Y'">
                            <template v-for="col in card.columns" :key="col.key">
                                <td v-if="col.key !== 'width' && col.key !== 'height'">
                                    {{ row[col.key] }}
                                </td>
                            </template>
                        </template>
                        <template v-else>
                            <template v-for="col in card.columns" :key="col.key">
                                <td>
                                    {{ row[col.key] }}
                                </td>
                            </template>
                        </template>
                    </tr>
                </tbody>
            </table>
            <!-- 태그  -->
            <section v-if="card.showTag" class="my-3 flex flex-wrap gap-2">
                <Tag v-for="(tag, index) in card.tag2" :key="index" severity="secondary" :value="tag.spanText"></Tag>
            </section>

            <!-- 지시사항  -->
            <section class="my-2 text-sm text-gray-600 bg-gray-50 py-1 rounded-md px-3 border-gray-100 border">
                <p class="font-bold">지시사항: <span class="font-normal">{{ card['spanText'] }}</span></p>
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
import { getCommas } from "@/assets/js/function";

const emit = defineEmits(['get-modify']);

defineProps({
    title   : String,
    cards   : String,
    columns : Array,
    rows    : Array,
    sizeYn  : String
});

const getAmt = (amt) => {
    return getCommas(Number(amt));
};
</script>

<style lang="scss">

</style>