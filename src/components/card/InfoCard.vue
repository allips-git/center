<template>
    <div class="flex justify-between items-center py-1 sm:pt-5">
        <h2 class="font-bold text-15 sm:text-base text-t-lv1">{{ title }}</h2>
        <Button v-if="btnLabel" :label="btnLabel" severity="secondary" outlined @click="getBtn" class="outlined-button *:!text-13"></Button>
    </div>
    <div class="mt-2 info-list">
        <dl v-for="(info, index) in props.info" :key="index" class="info-set">
            <dt class="title">
                {{ info.label }}
            </dt>
            <dd class="desc">
                <div class="!inline-flex capsuel_sky" v-if="info.label === '전화번호'">
                    {{ info.value }}
                </div>
                <template v-else>
                    {{ info.value }}
                </template>
                <ul v-if="info.label === '영업시간'" class="flex flex-col gap-1 mt-1">
                    <li v-for="(extraItem, extraIndex) in info.extra" :key="extraIndex" >
                        {{ extraItem }}
                    </li>
                </ul>
            </dd>
        </dl>
    </div>
    <!--
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
    -->
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