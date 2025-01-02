<template>
<main class="pt-5 !pb-32">
    <div class="form-gap-box">
        <section class="px-5 form-gap-box">
            <h1 class="mb-2 text-lg font-bold">금액 조정</h1>
            <div class="relative flex items-center justify-center">
                <p class="w-[100px] flex-none">할인 금액</p>
                <InputNumber  class="*:!text-red-500 inputNumber-color" />
                <span class="absolute text-sm text-red-500 right-4 bottom-2.5">원</span>
            </div>

            <div class="relative flex items-center justify-center">
                <p class="w-[100px] flex-none">추가 금액</p>
                <InputNumber class="*:!text-blue-500 inputNumber-color" />
                <span class="absolute text-sm text-blue-500 right-4 bottom-2.5">원</span>
            </div>

            <div class="relative flex items-center justify-center">
                <p class="w-[100px] flex-none">최종 결제금액</p>
                <InputNumber class="*:!text-blue-500 inputNumber-color" />
                <span class="absolute text-sm text-blue-500 right-4 bottom-2.5">원</span>
            </div>
        </section>

        <div class="gray-bar"></div>
        <section class="px-5">
            <div class="mt-5">
                <h1 class="mb-2 text-lg font-bold">입금 정보</h1>
                <div class="form-gap-box">
                    <div class="relative flex items-center justify-start w-full">
                        <p class="w-[100px] flex-none">잔금</p>
                        <div class="flex w-[calc(100%-100px)]">
                            <Select class="w-32"/>
                            <div class="relative w-[calc(100%-8rem)] ml-2">
                                <InputNumber class="*:!text-blue-500 inputNumber-color *:w-full" />
                                <span class="absolute text-sm text-blue-500 right-4 bottom-2.5">원</span>
                            </div>
                        </div>
                    </div>

                    <div class="relative flex items-start justify-center">
                        <p class="w-[100px] flex-none">메모</p>
                        <Textarea rows="3" cols="30" style="resize: none" class="w-full"/>
                    </div>
                </div>
            </div>
        </section>
        <div class="mt-2 btn-2-layout-box bottom-fixed-btn-box">
            <Button label="결제 완료" @click=""/>
        </div>
    </div>
</main>
</template>

<script setup lang="ts">
import IftaLabel from 'primevue/iftalabel';
import InputNumber  from 'primevue/inputnumber';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Textarea from 'primevue/textarea';
</script>