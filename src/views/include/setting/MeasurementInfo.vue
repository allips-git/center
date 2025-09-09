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

        <Dialog v-model:visible="popup['pop']['actualChoice']" 
            :modal=true position="center" class="w-96 max-w-96 custom-dialog-center" :dismissable-mask="true"
            @update:visible="getPopupClose('actualChoice', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose('actualChoice', true)" severity="contrast" text icon="pi pi-times"/>
                    <h2 class="modal-backheader-title">실측 구분</h2>
                </div>
            </template>
            <div class="pt-3">
                <ActualChoice :gubun="'E'" @getApply="getDisApply" @getClose="getPopupClose('actualChoice', true)"/>
            </div>
        </Dialog>
        <Dialog v-model:visible="popup['pop']['itemSet']" header="실측등록" 
            :modal=true position="center" class="custom-dialog-bottom backPopup"
            @update:visible="getPopupClose('itemSet', true)">
            <template #header>
                <div class="modal-fullheader change-button">
                    <Button @click="getPopupClose('itemSet', true)" severity="contrast" text icon="pi pi-arrow-left"/>
                    <h2 class="modal-backheader-title">실측등록</h2>
                    <Button label="실측 변경" size="small" @click="getItemChange" class="!z-[100] !bg-p-lv4 !text-white"/>
                </div>
            </template>
            <ProductRegister/>
        </Dialog>
    </main>
</template>

<script setup lang="ts">
import ActualChoice from '@/components/modal/ActualChoice.vue'
import ProductRegister from "@/views/include/ProductRegister.vue";
import { ref } from 'vue';
import { onMounted } from 'vue';
import { usePopupStore, useActualStore } from '@/store';
import { usePopup } from '@/assets/js/popup';

const popup     = usePopupStore();
const actual    = useActualStore();
const mainRef   = ref(null);
const mainWidth = ref(0);
const mainLeft  = ref(0);

const { getPopupOpen, getPopupClose } = usePopup();

const getLocate = () => {
    return [...new Map(actual.detail.map(item => [item.setLocate, item])).values()];
}

const getDelete = (adCd: string) => {
    console.log(adCd);
}

const getItemChange = () => {
    getPopupOpen('actualChoice');
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