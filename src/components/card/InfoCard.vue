<template>
    <div class="flex items-center justify-between px-5 pt-5 pb-2 font-bold">
        <h2 class="font-bold">{{ title }}</h2>
        <Button v-if="btnLabel" :label="btnLabel" size="small" severity="secondary" outlined @click="getBtn"></Button>
    </div>
    <ul class="flex flex-col gap-2 p-5 pt-0 text-sm rounded-md">
        <li v-for="(info, index) in props.info" :key="index" class="flex">
            <p class="w-24 text-gray-600 whitespace-nowrap">{{ info.label }}</p>
            <p :class="{ 'capsuel_sky': info.label === '전화번호' }">{{ info.value }}
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