<template>
    <ul>
        <li v-for="(item, index) in main['alarm']" class="flex text-base cursor-pointer" :key="index"
            @click="alarmDetailsPop = true" :class="{ 'last:border-b-0 border-b border-gray-100 gap-3 py-2.5 last:pb-0' : item['headerState'], 'py-1' : !item['headerState'] }">
            <div v-if="item['headerState']" class="">
                <!-- 승인 또는 긍정 -->
                <div class="size-8 bg-green-50 rounded-full flex items-center  justify-center">
                    <span class="pi pi-check text-green-600"></span>
                </div>
                <!-- 반려 또는 부정 -->
                <!-- <div class="size-8 bg-red-50 rounded-full flex items-center  justify-center">
                    <span class="pi pi-exclamation-circle text-red-600"></span>
                </div> -->
            </div>
            <div :class="{ 'flex w-full items-center' : !item['headerState'] }">
                <p class="font-bold w-52 mb-1" :class="{ '!mb-0' : !item['headerState'] }">{{ notification.title }}</p>
                <p class="text-gray-600 truncate w-full">'{{ notification.clientName }}' 발주서가 반려되었습니다.</p>
                <p class="text-gray-400 mt-1" :class="{ '!mt-0' : !item['headerState'] }">{{ notification.time }}</p>
            </div>
        </li>
        
        <!-- 알림 0개일때 -->
        <li class="flex text-sm py-1">
            <p class="w-full text-center font-bold">{{ t('msg.empty_alarm') }}</p>
        </li>
    </ul>
    <Dialog v-model:visible="alarmDetailsPop" header="알림 상세" :modal=true class="custom-dialog-center custom-dialog-mini !h-auto" :style="{ minWidth:'300px', maxWidth:'400px' }">
        <div class="p-5 py-4">
            <h1>반려사유는 이러이러 합니다. </h1>
            <div class="flex justify-end gap-2 mt-4">
                <Button type="button" :label="t('btn.close_pop')" severity="secondary" @click="alarmDetailsPop = false"></Button>
                <Button type="button" :label="t('btn.go_to_page')" @click="goRouter"></Button>
            </div>
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { ref, defineProps } from "vue";
import { useRouter } from 'vue-router';

const router    = useRouter();

const alarmDetailsPop = ref(false)

const goRouter = () => {
    router.push('/ord/onlineOrdList');
}

const notifications = ref([
    { headerState: true, title: '온라인 외주 발주', clientName: '발주처 1', time: '19:10' },
    { headerState: false, title: '온라인 외주 발주', clientName: '발주처 2', time: '19:15' },
    { headerState: true, title: '온라인 외주 발주', clientName: '발주처 3', time: '19:20' },
    { headerState: false, title: '온라인 외주 발주', clientName: '발주처 4', time: '19:25' },
]);

</script>