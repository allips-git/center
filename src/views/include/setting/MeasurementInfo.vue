<template>
    <!-- <BackHeader title="실측 정보" /> -->
    <main class="pb-[80px]" ref="mainRef">
        <section class="flex flex-col gap-5 px-4 pt-4 pb-6 sm:px-6 sm:pt-6 sm:pb-8">
            <div v-for="card in cards" :key="card.title" class="overflow-hidden w-full rounded border border-l-lv4">
                <h2 class="px-4 py-1.5 text-sm text-left bg-l-lv5">
                    {{ card.title }}
                </h2>
                <div class="flex flex-col justify-start items-start px-4 py-6 border-t first:border-t-0">
                    <div class="flex justify-between mb-4 w-full">
                        <div class="flex-1 flex flex-col gap-[0.8125rem] pt-1">
                            <div class="text-xs leading-tight text-t-lv3">공장제목이 필요 없는 경우 이 부분 삭제하면 됨 (가격도 마찬가지)</div>
                            <h3 class="font-black leading-tight text-red-500 text-13">블라인드 실측</h3>
                        </div>
                        <div class="w-[100px] flex-none flex flex-col gap-2">
                            <div class="flex justify-end danger-button">
                                <Button label="삭제" outlined severity="danger" size="small" @click.stop="getDelete(card['edCd'])" class="w-[3.25rem] font-normal !border-l-lv3" />
                            </div>
                            <div class="font-bold text-right text-13">154,675,769원</div>
                        </div>
                    </div>
                    <table class="overflow-hidden w-full text-center rounded-sm table-fixed custom-table-in-card">
                        <thead class="">
                            <tr class="text-10 !text-t-lv3 border-0 *:font-normal *:pb-0.5">
                                <th>가로</th>
                                <th>세로</th>
                                <th>가공</th>
                                <th>분할</th>
                                <th>규격</th>
                            </tr>
                        </thead>
                        <tbody class="">
                            <tr class="font-bold text-sm !text-t-lv1">
                                <td class="py-0.5 leading-tight align-top">240</td>
                                <td class="py-0.5 leading-tight align-top">120</td>
                                <td class="py-0.5 leading-tight align-top">1</td>
                                <td class="py-0.5 leading-tight align-top">양개</td>
                                <td class="py-0.5 leading-tight align-top">22회베</td>
                            </tr>
                            <tr class="font-bold text-sm !text-t-lv1">
                                <td class="py-0.5 leading-tight align-top">240</td>
                                <td class="py-0.5 leading-tight align-top">120</td>
                                <td class="py-0.5 leading-tight align-top">1</td>
                                <td class="py-0.5 leading-tight align-top">양개</td>
                                <td class="py-0.5 leading-tight align-top">22회베</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <div :style="{width: mainWidth + 'px', left: mainLeft + 'px' }" class="bottom-fixed-btn-box">
            <Button label="실측 저장" size="large"/>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';
import BackHeader from '@/components/layouts/BackHeader.vue';

const mainRef = ref(null);
const mainWidth = ref(0);
const mainLeft = ref(0);

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

const cards = ref([
    { title: '거실 블라인드', value: '0' },
    { title: '거실 커튼', value: '1' },
    { title: '안방 블라인드', value: '2' },
    { title: '부산 동래 자이엘라 아파트 3단지 29C', value: '3' }
]);

</script>

<style lang="scss">
</style>