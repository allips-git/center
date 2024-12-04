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
        <FontAwesomeIcon class="p-4 text-zinc-400" :icon="['fas', 'chevron-right']" @click="getInfo"/>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps({
    title: String,
    lists: Array
});

const emit = defineEmits(['getListClick']);

const getInfo = () => {
    emit('getListClick');
}

</script>

<style scoped>

</style>