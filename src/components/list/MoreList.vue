<template>
    <div class="flex items-center justify-between py-3">
        <div>
            <h5 class="flex items-start text-zinc-700 font-bold text-sm">
                {{ title }}
                <span class="block w-1 h-1 bg-green-400 rounded-2xl"></span>
            </h5>
            <ul>
                <li v-for="(list, index) in lists" :key="index" class="text-xs text-zinc-400 flex">
                    <p class="mr-4">{{ list.label }}</p>
                    <p>{{ list.content }}</p>
                </li>
            </ul>
        </div>
        <span class="pi pi-angle-right"></span>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

// 리스트 객체의 타입 정의
interface ListItem {
    label: string;
    content: string;
}

// props의 타입 정의
const props = defineProps<{
    title: string;
    lists: ListItem[];
}>();

</script>

<style scoped>

</style>
