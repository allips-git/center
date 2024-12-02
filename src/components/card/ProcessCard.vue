<template>
    <!-- 프로세스 카드 -->
     <div class="w-full p-4 rounded border border-gray-200">
         <div class="flex justify-between border-b border-neutral-100 pb-4 font-bold">
             <h1>견적진행</h1>
             <h2 class="text-xl">128182912원</h2>
         </div>

         <ul class="flex mt-5">
            <li
            v-for="(item, index) in statusItems"
            :key="index"
            class="w-1/4 flex flex-col gap-3 *:first:rounded-l-full *:last:rounded-r-full"
            >
            <div class="w-full h-2"
            :class="item.completed ? 'bg-indigo-500' : 'bg-gray-200'" 
            ></div>
            <p class="text-sm text-center text-gray-600">{{ item.label }}</p>
            </li>
        </ul>

        <div class="my-8">
            <section class="w-full text-center flex flex-col gap-1">
                <p class="text-gray-400">견적일</p>
                <span class="text-base">04월 22일 (월) 09:21</span>
            </section>

            <!-- <section class="flex gap-2">
                <p class="text-center text-gray-400 w-full">
                    시공일
                    <span class="block text-gray-900">2024년 12월 12일</span>
                </p>
                <p class="text-center text-gray-400 w-full border-l">
                    작업시간
                    <span class="block text-gray-900">12분 12초</span>
                </p>
            </section> -->
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

const morePopover = ref() 

const togglemorePopover = (event) => {
    morePopover.value.toggle(event);
}

const moreBtnList = ref([
    { name: '견적서 발송' },
    { name: '계약서 발송' },
    { name: '네비게이션' },
    { name: '명세표 취소' },
]);

// 상태 항목 배열 정의
const statusItems = ref([
  {
    label: '계약완료',
    completed: true, 
  },
  {
    label: '발주완료',
    completed: true, 
  },
  {
    label: '시공완료',
    completed: false, 
  },
  {
    label: '결제 완료',
    completed: false, // 완료 상태

  },
]);
</script>
