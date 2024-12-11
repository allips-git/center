<template>
<main>
    <section class="px-5">
        <div class="flex items-center justify-between">
            <div class="flex items-center w-full gap-2">
                <IconAvatar class="text-indigo-300 !size-16"/>
                <div>
                    <p class="text-sm text-indigo-600">고객</p>
                    <h2 class="text-xl font-bold">하현재</h2>
                </div>
            </div>
            <span class="pi pi-angle-right"></span>
        </div>
    </section>
    <div class="gray-bar"></div>
    <section class="px-5">
        <div class="form-gap-box">
            <IftaLabel class="w-full">
                <Select class="w-full"/>
                <label>견적 담당</label>
            </IftaLabel>

            <IftaLabel class="label-input-box">
                <DatePicker showIcon fluid iconDisplay="input" dateFormat="yy-mm-dd"/>
                <label>견적일</label>
            </IftaLabel>

            <IftaLabel class="w-full">
                <Select class="w-full"/>
                <label>시공담당</label>
            </IftaLabel>

            <IftaLabel class="label-input-box">
                <DatePicker showIcon fluid iconDisplay="input" dateFormat="yy-mm-dd"/>
                <label>시공일</label>
            </IftaLabel>
        </div>
        
    </section>
    <div class="gray-bar"></div>
    <section class="">
        <h2 class="px-5 text-lg font-bold">수정기록</h2>
        <ul class="flex flex-col">
            <li v-for="(item, index) in notifications" :key="index" class="flex items-center gap-2 px-4 py-4 border-b first:mt-2">
            <IconAvatar class="text-indigo-300 !size-10"/>
            <div>
                <div class="flex items-center gap-1">
                <b>{{ item.name }}</b>
                <span>・</span>
                <p class="text-sm text-gray-400">{{ item.time }}</p>
                </div>
                <p>{{ item.message }}</p>
            </div>
            </li>
        </ul>
    </section>
</main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DatePicker from 'primevue/datepicker';
import IftaLabel from 'primevue/iftalabel';
import IconAvatar from '@/components/icons/IconAvatar.vue';


const notifications = ref([
  { name: '김시공', time: '오후 12:18분', message: '시공 완료을 완료 하였습니다.' },
  { name: '홍길동', time: '오후 1:30분', message: '작업이 시작되었습니다.' },
  { name: '이순신', time: '오후 2:45분', message: '배달이 완료되었습니다.' },
  // 더 많은 항목을 추가할 수 있습니다.
]);
</script>

<style lang="scss">

</style>
