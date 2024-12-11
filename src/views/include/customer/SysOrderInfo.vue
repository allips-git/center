<template>
<main class="p-5 !pb-32">
    <div class="form-gap-box">
        
        <IftaLabel class="label-input-box">
            <DatePicker id="insTime"  showIcon fluid iconDisplay="input" dateFormat="yy-mm-dd"/>
            <label>주문일</label>
        </IftaLabel>

        <IftaLabel class="label-input-box">
            <DatePicker id="insTime"  showIcon fluid iconDisplay="input" dateFormat="yy-mm-dd"/>
            <label>출고일</label>
        </IftaLabel>

        <div class="label-input-box">
            <div class="flex gap-2">
                <IftaLabel class="label-input-box max-w-48">
                    <label>배송 방법</label>
                    <Select placeholder="선택해주세요."/>
                </IftaLabel>

                <IftaLabel class="label-input-box ">
                    <label>주소</label>
                    <InputText placeholder="주소를 입력하세요" />
                </IftaLabel>
            </div>
        </div>

        <IftaLabel class="label-input-box ">
            <label>상세 주소</label>
            <InputText placeholder="상세 주소를 입력하세요" />
        </IftaLabel>

        <IftaLabel class="label-input-box ">
            <label>배송 요청사항</label>
            <InputText placeholder="배송 요청사항을 입력하세요." />
        </IftaLabel>
        
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