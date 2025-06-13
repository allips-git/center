<template>
<Dialog v-model:visible="visible"
    pt:root:class="!border-0 w-full md:w-[400px] md:h-auto !min-h-[600px] h-full !max-h-screen justify-start overflow-hidden !rounded-none md:!rounded-lg">
        <template #container>
            <div class="relative w-[300px] h-[300px] -mt-12 -ml-12">
                <div class="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-br from-fuchsia-500 to-[#C72FF8] opacity-60 -top-2 left-11 z-10"></div>
                <div class="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-br from-indigo-400 to-[#2f56f8] opacity-80 top-5 left-5 z-20"></div>
                <div class="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-br from-indigo-500 to-cyan-300 top-0 left-0 z-30">
                    <div class="relative left-20 top-28">
                        <IconLogo class="w-[3.25rem] fill-white"/>
                        <h3 class="mt-2 font-bold text-white text-18">홍길동님 <br/> 환영합니다.</h3>
                    </div>
                </div>
            </div>

            <div class="flex flex-col items-center mx-auto gap-[14px] mt-16">
                <h3 class="font-bold text-18">디자인윈도우</h3>
                <h4 class="text-10">대한민국 부산광역시 금정구 청룡동 87</h4>
                <IconAvatar class="w-24 fill-[#78BBFF]"/>
            </div>
            
            
            <Dialog
                v-model:visible="messageVisible"
                modal
                :closable="false"
                :draggable="false"
                pt:root:class="!border-0 md:w-[370px] h-auto !max-h-screen justify-center overflow-hidden"
                pt:mask:class="bg-black/40"
            >
                <div class="z-40 flex flex-col items-center px-6 mx-auto">
                    <p class="text-base font-semibold text-gray-700">디자인윈도우 업체 심사중.</p>
                    <div class="flex flex-col items-center mt-4 text-sm text-center text-gray-700">
                        <p>업체 심사 중입니다.</p>
                        <p>
                            <span class="font-bold text-p-lv4">최대 48시간이 소요</span>되며
                        </p>
                        <p>문의사항은 고객센터 010-3445-2105로</p>
                        <p>문의 부탁드립니다.</p>
                    </div>
                    <Button label="종료" size="small" class="w-32 my-6"/>
                </div>
            </Dialog>
           
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import IconAvatar from '@/components/icons/IconAvatar.vue';
import IconLogo from '@/components/icons/IconLogo.vue'
import Dialog from 'primevue/dialog';
import { ref } from 'vue';

const visible   = ref(true);
const messageVisible = ref(true);
</script>