<template>
<main class="p-5 !pb-32">
    <div class="form-gap-box">
        <div class="relative flex items-center justify-center w-full">
            <p class="w-[100px] flex-none">계약일</p>            
            <DatePicker id="insTime"  showIcon fluid iconDisplay="input" dateFormat="yy-mm-dd" class="w-full"/>
        </div>

        <div class="relative flex items-center justify-center w-full">
            <p class="w-[100px] flex-none">출고일</p>            
            <DatePicker id="insTime"  showIcon fluid iconDisplay="input" dateFormat="yy-mm-dd" class="w-full"/>
        </div>

        <div class="relative flex items-center justify-center w-full">
            <p class="w-[100px] flex-none">배송</p>            
            <div class="flex w-full gap-2">
                <Select class="w-32" />
                <InputText placeholder="주소를 입력하세요" class="w-full" />
            </div>
        </div>

        <div class="relative flex items-center justify-center w-full">
            <p class="w-[100px] flex-none">배송지 상세</p>            
            <InputText placeholder="상세주소를 입력하세요" class="w-full"/>
        </div>

        <div class="relative flex items-center justify-center w-full">
            <p class="w-[100px] flex-none">배송 요청사항</p>            
            <InputText placeholder="비고" class="w-full" />
        </div>
        
        <div class="mt-2 btn-2-layout-box bottom-fixed-btn-box">
            <Button label="시스템 발주"/>
        </div>
    </div>
</main>
</template>

<script setup lang="ts">
import IftaLabel from 'primevue/iftalabel';
import InputText from 'primevue/inputtext';
import DatePicker from 'primevue/datepicker';

</script>