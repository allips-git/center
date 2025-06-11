<template>
    <div class="flex items-center justify-between font-bold">
        <h2 class="pb-4 font-bold title-md">{{ title }}</h2>
        <Button v-if="btnLabel" :label="btnLabel" size="small" severity="secondary" outlined @click="getBtn" class="outlined-button"></Button>
    </div>
    <ul class="flex flex-col gap-2 rounded-md text-desc">
        <li v-for="(info, index) in props.info" :key="index" class="flex">
            <p class="w-24 !text-t-lv2 whitespace-nowrap">{{ info.label }}</p>
            <p :class="{ 'capsuel_sky !text-t-lv5': info.label === '전화번호'}" class="text-t-lv1">{{ info.value }}
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