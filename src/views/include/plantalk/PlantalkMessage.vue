<template>
<main class="p-5">
    <section class="flex flex-col items-center justify-center gap-1 pb-5">
        <IconCheckboard class="fill-green-400"/>
        <p class="text-lg font-bold text-green-400">알림 발송 완료</p>
    </section>
    <div class="flex flex-col items-center justify-center w-full px-4 py-10 mt-5 bg-kakaoBg rounded-2xl">
        <p class="w-auto px-4 py-1 text-sm bg-white bg-opacity-50 rounded-full" v-if="showEditGuide">아래 on/off 버튼을 클릭해 플랜톡 내용을 편집해보세요.</p>
        <div class="w-full mt-5 overflow-hidden rounded-xl max-w-96">
            <div class="py-2 text-center bg-yellow-300"> 알림톡 도착</div>
            <div class="p-5 bg-white">
                <div class="text-sm notice-text" v-html="getContents()"></div>
                <Button v-if="kakao['info']['kdGb'] === '002'" label="계약서 상세"  class="w-full mt-2 !bg-gray-200 !border-gray-200 !text-gray-900 !cursor-default"></Button>
            </div>
        </div>
    </div>
</main>
</template>

<script setup lang="ts">
import IconCheckboard from "@/components/icons/IconCheckboard.vue";
import { onMounted } from 'vue';
import { useKakaoStore } from '@/store';

const kakao = useKakaoStore();

const getContents = () => {
    return kakao.contents?.replace(/\n/g, "<br>") ?? "";
}

onMounted(() => {
    kakao.getKakaoSendInfo();
})
</script>

<style lang="scss">

</style>