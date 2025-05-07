<template>
    <BackHeader title="고정비용" />
    <main class="pb-[56px] md:pb-0">
        <section class="p-4 md:p-6">
            <h1 class="mb-2 text-xl font-bold">전체 <span class="text-sky-500">{{ cost['cnt'] }}건</span></h1>
            <div class="flex items-center gap-2 font-bold">
                <p>월간 고정 지출</p>
                <p class="text-xl font-bold">{{ getCommas(cost['amt']) }}<span class="text-base ml-0.5">원</span></p>
            </div>
        </section>
        
        <div class="gray-bar"></div>

        <section class="flex flex-col gap-4 p-4 text-sm md:p-6">
            <div class="flex items-center justify-between">
                <h2 class="text-lg font-bold">내 고정비 목록</h2>
                <Button label="고정비 등록" size="small" @click="getPopup"/>
            </div>
            <ul class="flex flex-col">
                <!-- v-for -->
                <li v-for="(item, index) in cost['list']" :key="index" class="flex items-center justify-between py-4 border-b" @click="getInfo(item['fxCd'])">
                    <div>
                        <p class="font-bold ">{{ item['fxNm'] }}</p>
                        <p class="text-sm text-gray-400" >{{ item['title'] }}</p>
                    </div>

                    <div class="text-right">
                        <p class="text-sm text-gray-400">{{ item['fxDt'] }}</p>
                        <p class="text-lg font-bold">{{ getCommas(Number(item['amt'])) }}원</p>
                    </div>
                </li>
            </ul>
        </section>
    </main>
    <!-- <Dialog v-model:visible="popup['pop']['staticPaySet']" header="고정비용 저장" 
        :modal=true position="bottom" :dismissableMask="true" class="custom-dialog-bottom"
        @update:visible="getPopupClose('staticPaySet', true)">
        <StaticPaySet/>
    </Dialog> -->

    <Dialog v-model:visible="popup['pop']['staticPaySet']" header="고정비용 저장" 
            :modal=true position="center" class="custom-dialog-bottom" 
            @update:visible="getPopupClose('staticPaySet', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopupClose(true, 'staticPaySet')" severity="contrast" text icon="pi pi-times"/>
                    <h2 class="modal-backheader-title">고정 비용 저장</h2>
                </div>
            </template>
        <StaticPaySet/>

        </Dialog> 
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import StaticPaySet from "@/views/include/setting/StaticPaySet.vue";
import { onMounted } from 'vue'
import { usePopupStore, useCostStore } from '@/store';
import { getCommas } from '@/assets/js/function';
import { usePopup } from '@/assets/js/popup';

const popup = usePopupStore();
const cost  = useCostStore();

const { getPopupOpen, getPopupClose } = usePopup();

const getPopup = async() => {
    await cost.getInfoReset();
    getPopupOpen('staticPaySet');
}

const getInfo = async (fxCd: string) => {
    await getPopup();
    await cost.getFxCd(fxCd);
    cost.getInfo();
}

onMounted(() => {
    cost.getData();
})
</script>

<style lang="scss">

</style>