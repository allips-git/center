<template>
    <!-- 프로세스 카드 -->
     <div class="w-full p-4 rounded border border-gray-200">
         <div class="flex justify-between border-b border-neutral-100 pb-4 font-bold">
             <h1>견적진행</h1>
             <h2 class="text-xl">{{ getAmt(props.info['totalSaleAmt']) }}원</h2>
         </div>

         <ul class="flex mt-5">
            <li class="w-1/4 flex flex-col gap-3 *:first:rounded-l-full *:last:rounded-r-full">
                <div class="w-full h-2" :class="props['info']['conDt'] !== '' ? 'bg-indigo-500' : 'bg-gray-200'" ></div>
                <p class="text-sm text-center text-gray-600">계약 완료</p>
                <p class="text-sm text-center text-gray-600">{{ getDate(props.info['conDt']) }}</p>
            </li>
            <li class="w-1/4 flex flex-col gap-3 *:first:rounded-l-full *:last:rounded-r-full">
                <div class="w-full h-2" :class="props['info']['preDt'] !== '' ? 'bg-indigo-500' : 'bg-gray-200'" ></div>
                <p class="text-sm text-center text-gray-600">발주 완료</p>
                <p class="text-sm text-center text-gray-600">{{ getDate(props.info['preDt']) }}</p>
            </li>
            <li class="w-1/4 flex flex-col gap-3 *:first:rounded-l-full *:last:rounded-r-full">
                <div class="w-full h-2" :class="props['info']['deliConDt'] !== '' ? 'bg-indigo-500' : 'bg-gray-200'" ></div>
                <p class="text-sm text-center text-gray-600">시공 완료</p>
                <p class="text-sm text-center text-gray-600">{{ getDate(props.info['deliConDt']) }}</p>
            </li>
            <li class="w-1/4 flex flex-col gap-3 *:first:rounded-l-full *:last:rounded-r-full">
                <div class="w-full h-2" :class="props['info']['payDt'] !== '' ? 'bg-indigo-500' : 'bg-gray-200'" ></div>
                <p class="text-sm text-center text-gray-600">결제 완료</p>
                <p class="text-sm text-center text-gray-600">{{ getDate(props.info['payDt']) }}</p>
            </li>
        </ul>

        <div class="my-8">
            <section v-if="props.info['stCd'] === '001' || props.info['stCd'] === '002'" class="w-full text-center flex flex-col gap-1">
                <p class="text-gray-400">견적일</p>
                <span class="text-base">{{ getDateAndTime(props.info['estiDt']) }}</span>
            </section>

            <section v-else class="flex gap-2">
                <p class="text-center text-gray-400 w-full">
                    시공일
                    <span class="block text-gray-900">{{ props.info['deliDt'] === '' ? getDateAndTime(props.info['deliConDt']) : getDateAndTime(props.info['deliDt']) }}</span>
                </p>
                <p class="text-center text-gray-400 w-full border-l">
                    작업시간
                    <span class="block text-gray-900">{{ props.info['insTime'] }}</span>
                </p>
            </section>
        </div>

        <section class="flex gap-3 *:w-full">
            <Button severity="secondary"  label="견적서 공유" />
            <Button label="견적서 이동"/>
            <Button severity="secondary" icon="pi pi-ellipsis-h" outlined class="flex-none" @click="togglemorePopover" />

            <Popover class="custom-popover-listbox" ref="morePopover" dismissable> 
                <Listbox :options="moreBtnList"  optionLabel="name" class="w-full md:w-56">
                <template #option="slotProps">
                    <ul class="flex items-center">
                        <li>{{ slotProps.option.name }}</li>
                    </ul>
                </template>
                </Listbox>
            </Popover> 
        </section>
     </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Popover from 'primevue/popover';
import Listbox from 'primevue/listbox';
import { getCommas, getConvertDate } from '@/assets/js/function';

const props = defineProps({
    info : Object
});

const morePopover = ref() 

const togglemorePopover = (event) => {
    morePopover.value.toggle(event);
}

const getAmt = (amt) => {
    return getCommas(Number(amt));
};

const getDate = (date: string) => {
    return date !== '' ? getConvertDate(new Date(date), 'mm%dd%w%') : '';
}

const getDateAndTime = (date) => {
    return getConvertDate(new Date(date), 'mm%dd%w% hh:ii');
}

const moreBtnList = ref([
    { name: '견적서 발송' },
    { name: '계약서 발송' },
    { name: '네비게이션' },
    { name: '명세표 취소' }
]);
</script>
