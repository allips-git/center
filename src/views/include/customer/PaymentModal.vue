<template>
<main class="pt-5 !pb-32">
    <div class="form-gap-box">
        <section class="px-5 form-gap-box">
            <div>
                <h1 class="mb-2 text-lg font-bold">금액 조정</h1>
                <InputGroup>
                    <IftaLabel class="w-full">
                        <InputNumber placeholder="할인 금액을 입력하세요" class="*:!text-right" />
                        <label>할인금액</label>
                    </IftaLabel>
                    <InputGroupAddon><span class="text-sm text-blue-600">원</span></InputGroupAddon>
                </InputGroup>
            </div>
            
            <InputGroup>
                <IftaLabel class="w-full">
                    <InputNumber placeholder="추가 금액을 입력하세요" class="*:!text-right" />
                    <label>추가 금액</label>
                </IftaLabel>
                <InputGroupAddon><span class="text-sm text-blue-600">원</span></InputGroupAddon>
            </InputGroup>
            
            <InputGroup>
                <IftaLabel class="w-full">
                    <InputNumber placeholder="최종 결제 금액을 입력하세요" class="*:!text-right" />
                    <label>최종 결제 금액</label>
                </IftaLabel>
                <InputGroupAddon><span class="text-sm text-blue-600">원</span></InputGroupAddon>
            </InputGroup>
        </section>

        <div class="gray-bar"></div>
        <section class="px-5 form-gap-box">
            <div class="mt-5">
                <h1 class="mb-2 text-lg font-bold">입금 정보</h1>
                <div class="flex gap-2">
                    <IftaLabel class="w-full">
                        <Select class="w-full"/>
                        <label>잔금 처리 형식</label>
                    </IftaLabel>

                    <InputGroup>
                        <IftaLabel class="w-full">
                            <InputNumber placeholder="잔금을 입력하세요" class="*:!text-right" />
                            <label>잔금</label>
                        </IftaLabel>
                        <InputGroupAddon><span class="text-sm text-blue-600">원</span></InputGroupAddon>
                    </InputGroup>
                </div>
            </div>
        <IftaLabel class="w-full">
            <Textarea rows="3" cols="30" style="resize: none" class="w-full"/>
            <label>메모</label>
        </IftaLabel>        
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


InputNumber
</script>