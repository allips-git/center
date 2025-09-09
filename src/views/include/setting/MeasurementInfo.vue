<template>
    <!-- <BackHeader title="실측 정보" /> -->
    <main class="pb-[80px]" ref="mainRef">
        <section class="flex flex-col gap-5 px-4 pt-2 pb-6 sm:px-6 sm:pt-6 sm:pb-8">
            <div v-for="(item, index) in getLocate()" :key="index" class="overflow-hidden w-full rounded border border-l-lv4">
                <h2 class="px-4 py-1.5 text-sm text-left bg-l-lv5">
                    {{ item.setLocate }}
                </h2>
                <template v-for="(data, dIndex) in actual.detail" :key="dIndex">
                    <div v-if="item.setLocate === data.setLocate" class="flex flex-col justify-start items-start px-4 py-6 border-t first:border-t-0">
                        <div class="flex justify-between mb-4 w-full">
                            <div class="flex-1 flex flex-col gap-[0.8125rem] pt-1">
                                <h3 class="font-black leading-tight text-red-500 text-13">{{ data.itemNm }}</h3>
                            </div>
                            <div class="w-[100px] flex-none flex flex-col gap-2">
                                <div class="flex justify-end">
                                    <Button label="삭제" outlined severity="danger" size="small" @click.stop="getDelete(data.adCd)" class="w-[3rem] *:!font-normal" />
                                </div>
                            </div>
                        </div>
                        <table class="overflow-hidden w-full text-center rounded-sm table-fixed custom-table-in-card">
                            <thead class="">
                                <tr class="text-10 !text-t-lv3 border-0 *:font-normal *:pb-0.5">
                                    <th>가로</th>
                                    <th>세로</th>
                                    <th>{{ data.itemCd === 'EX000001' ? '갯수' : '좌' }}</th>
                                    <th>{{ data.itemCd === 'EX000001' ? '분할' : '우' }}</th>
                                    <th>규격</th>
                                </tr>
                            </thead>
                            <tbody class="">
                                <tr v-if="data.itemCd === 'EX000001'" class="font-bold text-sm !text-t-lv1">
                                    <td class="py-0.5 leading-tight align-top">{{ data.width }}</td>
                                    <td class="py-0.5 leading-tight align-top">{{ data.height }}</td>
                                    <td class="py-0.5 leading-tight align-top">{{ data.qty }}</td>
                                    <td class="py-0.5 leading-tight align-top">{{ data.split === '001' ? '양개' : '편개' }}</td>
                                    <td class="py-0.5 leading-tight align-top">{{ data.size }}폭</td>
                                </tr>
                                <template v-else>
                                    <template v-if="data.division !== 'S'">
                                        <tr v-for="(blind, bIndex) in data.spec" :key="bIndex" class="font-bold text-sm !text-t-lv1">
                                            <td class="py-0.5 leading-tight align-top">{{ blind.width }}</td>
                                            <td class="py-0.5 leading-tight align-top">{{ blind.height }}</td>
                                            <td class="py-0.5 leading-tight align-top">{{ blind.handle === 'L' ? blind.cnt : 0 }}</td>
                                            <td class="py-0.5 leading-tight align-top">{{ blind.handle === 'R' ? blind.cnt : 0 }}</td>
                                            <td class="py-0.5 leading-tight align-top">{{ blind.size }}회베</td>
                                        </tr>
                                    </template>
                                    <template v-else>
                                        <tr class="font-bold text-sm !text-t-lv1">
                                            <td class="py-0.5 leading-tight align-top">{{ data.width }}</td>
                                            <td class="py-0.5 leading-tight align-top">{{ data.height }}</td>
                                            <td class="py-0.5 leading-tight align-top">{{ data.leftQty }}</td>
                                            <td class="py-0.5 leading-tight align-top">{{ data.rightQty }}</td>
                                            <td class="py-0.5 leading-tight align-top">{{ data.size }}회베</td>
                                        </tr>
                                    </template>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </template>
            </div>
        </section>

        <div :style="{width: mainWidth + 'px', left: mainLeft + 'px' }" class="bottom-fixed-btn-box">
            <Button label="실측 저장" size="large" />
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useActualStore } from '@/store';

const actual    = useActualStore();
const mainRef   = ref(null);
const mainWidth = ref(0);
const mainLeft  = ref(0);

const getLocate = () => {
    return [...new Map(actual.detail.map(item => [item.setLocate, item])).values()];
}

const getDelete = (adCd: string) => {
    console.log(adCd);
}

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

</script>

<style lang="scss">
</style>