<template>
    <div class="flex justify-between font-bold mb-4 px-5 pt-5 pb-2 items-center">
        <h2 class="font-bold text-2xl">{{ title }}</h2>
        <Button v-if="btnLabel" :label="btnLabel" size="small" severity="secondary" outlined @click="getBtn"></Button>
    </div>
    <ul class="flex flex-col gap-4 p-5 pt-0 rounded-md">
        <li v-for="(info, index) in props.info" :key="index" class="flex">
            <p class="text-gray-600 w-24 whitespace-nowrap">{{ info.label }}</p>
            <p>{{ info.value }}
                <ul v-if="info.label === '영업시간'" class="flex flex-col gap-1 mt-1">
                    <li v-for="(extraItem, extraIndex) in info.extra" :key="extraIndex" >
                        {{ extraItem }}
                    </li>
                </ul>
            </p>
        </li>
    </ul>
</template>

<script setup lang="ts">
const emit = defineEmits(['get-btn']);

interface InfoItem {
    label   : string;
    value   : string;
    extra?  : string[]; // 추가 정보가 있을 수 있으므로 선택적 속성으로 설정
}

const props = defineProps<{
    title       : string;
    btnLabel    : string;
    info        : InfoItem[];
}>();

const getBtn = () => {
    emit('get-btn');
}

</script>