<template>
    <BackHeader title="고정비용" />
    <main class="">
        <section class="px-4 my-7">
            <h1 class="mb-2 text-lg font-bold text-t-lv1">전체 <span class="text-sky-500">1건</span></h1>
            <div class="flex items-center gap-2 font-bold text-t-lv2">
                <p class="text-13 ">월간 고정 지출</p>
                <p class="text-lg font-bold">126,123<span class="text-base ml-0.5">원</span></p>
            </div>
        </section>
        
        <div class="gray-bar !my-2.5"></div>

        <section class="text-sm">
            <div class="flex items-center justify-between px-4">
                <h2 class="font-bold ">내 고정비 리스트</h2>
                <Button label="지출 등록" size="small" />
            </div>
            <ul class="flex flex-col px-5">
                <!-- v-for -->
                <li class="flex items-center justify-between py-4 border-b first:mt-5">
                    <div>
                        <p class="font-bold">인건비</p>
                        <p class="text-xs text-t-lv3">고정비용 테스트</p>
                    </div>

                    <div class="text-right">
                        <p class="text-xs text-t-lv3">2024-01-01</p>
                        <p class="text-sm text-[#111111] font-medium">123,123원</p>
                    </div>
                </li>
            </ul>
        </section>
    </main>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
</script>

<style lang="scss">

</style>