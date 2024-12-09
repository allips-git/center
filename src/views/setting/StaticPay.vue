<template>
    <BackHeader title="고정비용" />
    <main class="">
        <section class="px-5 pt-5">
            <h1 class="mb-2 text-xl font-bold">전체 <span class="text-indigo-600">1</span>건</h1>
            <div class="flex items-center gap-2">
                <p>월간 고정 지출</p>
                <p class="text-lg font-bold">126,123<span class="text-base ml-0.5">원</span></p>
            </div>
        </section>
        
        <div class="gray-bar"></div>

        <section class="">
            <div class="flex items-center justify-between px-4">
                <h2 class="text-lg font-bold">내 고정비 목록</h2>
                <Button label="고정비 등록" size="small" />
            </div>
            <ul class="flex flex-col">
                <!-- v-for -->
                <li class="flex items-center justify-between px-5 py-4 border-b first:mt-5">
                    <div>
                        <p class="font-bold ">인건비</p>
                        <p class="text-sm text-gray-400" >고정비용 테스트</p>
                    </div>

                    <div class="text-right">
                        <p class="text-sm text-gray-400">2024.01.01</p>
                        <p class="text-lg font-bold">123,123원</p>
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