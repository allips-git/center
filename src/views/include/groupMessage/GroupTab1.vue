<template>
    <ul class="flex flex-col w-full gap-5">
        <!--  카드 전체 v-for -->
        <li class="w-full p-4 border border-gray-200 rounded-lg">
            <div class="flex justify-between">
                <h2 class="text-lg font-bold">나만의 메세지</h2>
                <Button label="메세지 추가" size="small" @click="MessageViewPop = true"/>
            </div>
            <div class="w-full min-w-0 mt-4 overflow-hidden rounded-lg">
                <section v-for="(message, index) in messages" :key="index" class="flex items-center justify-between w-full min-w-0 px-4 py-3 overflow-hidden text-sm border-b last:border-b-0 bg-gray-50" @click="MessageViewPop = true">
                    <div class="flex items-center w-full min-w-0">
                        <div class="w-6">
                            <b class="text-base">{{ index + 1 }}</b>
                        </div>
                        <div class="w-full overflow-hidden ">
                            <p class="w-full overflow-hidden font-bold truncate">{{ message.title }}</p>
                            <p class="w-full text-gray-600 truncate">{{ message.content }}</p>
                        </div>
                    </div>
                    <span class="text-gray-400 pi pi-angle-right"></span>
                </section>      
            </div>
        </li>
    </ul>
<Dialog
    v-model:visible="MessageViewPop" 
    header="메세지" 
    :modal=true
    position="center"
    class="custom-dialog-bottom"
    >
    <MessageView :showHeader="false"/>
</Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MessageView from '@/views/message/MessageView.vue'
const MessageViewPop = ref(false) 

// 메시지 배열 정의
const messages = ref([
    { id: 1, title: '메세지 제목 오오오오오오오오오오오오오오오오오오오오오오오오오오오오오오오오오오오', content: '메세지 내용 1' },
    { id: 2, title: '메세지 제목 2', content: '메세지 내용 2' },
    { id: 3, title: '메세지 제목 3', content: '메세지 내용 3' },
]);
</script>

<style lang="scss">
/* 추가적인 스타일이 필요하면 여기에 작성하세요. */
</style>
