<template>
    <div class="p-5">
        <div class="form-gap-box">
            <IftaLabel class="label-input-box">
                <DatePicker showIcon fluid iconDisplay="input" dateFormat="yy-mm-dd" showTime hourFormat="24"/>
                <label>계약일</label>
            </IftaLabel>
    
            <IftaLabel class="label-input-box">
                <DatePicker showIcon fluid iconDisplay="input" dateFormat="yy-mm-dd" showTime hourFormat="24"/>
                <label>시공일</label>
            </IftaLabel>
    
            <IftaLabel class="label-input-box">
                <DatePicker showIcon fluid iconDisplay="input" dateFormat="yy-mm-dd" showTime timeOnly hourFormat="24"/>
                <label>설치시간</label>
            </IftaLabel>

            <IftaLabel class="label-input-box">
                <Select />
                <label>시공 담당</label>
            </IftaLabel>
            <div>
                <div class="flex gap-4">
                    <IftaLabel class="w-60">
                        <label>지금 방식</label>
                        <Select class="w-full" placeholder="지급 방식"/>
                    </IftaLabel>

                    <IftaLabel class="w-full ">
                        <label>선금 금액</label>
                        <InputNumber class="w-full"/>
                    </IftaLabel>
                </div>
            </div>

            <IftaLabel class="w-full">
                <label>메모</label>
                <Textarea rows="3" cols="30" style="resize: none" class="w-full" />
            </IftaLabel>
        </div>
    </div>
    <div class="bottom-fixed-btn-box">
        <Button label="계약서 이동" size="large"></Button>
    </div>
</template>

<script setup lang="ts">
import IftaLabel from 'primevue/iftalabel';
import InputNumber from 'primevue/inputnumber';
import DatePicker from 'primevue/datepicker';
import Textarea from 'primevue/textarea';

</script>

<style lang="scss" >
.custom-input-select-btn{
    display: flex;
    align-items: center;
    justify-content: end;
}
// .custom-InputGroupAddon{
//     padding: 0 !important;
//     width: 50%;
//     flex:  none;
//     // border: none !important;
// }
</style>