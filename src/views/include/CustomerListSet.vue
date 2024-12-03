<template>
    <div class="bottom-modal-contents-box">
        
            <IftaLabel class="label-input-box">
                <DatePicker showIcon fluid iconDisplay="input" id="username" showTime hourFormat="24"/>
                <label for="username">일자</label>
            </IftaLabel>

            <IftaLabel class="label-input-box">
                <InputText id="username"  />
                <label for="username">고객명</label>
            </IftaLabel>

            <IftaLabel class="label-input-box">
                <InputText id="username"  />
                <label for="username">전화번호</label>
            </IftaLabel>
            
            <IftaLabel>
                <IconField>
                    <InputText id="username" placeholder=""  class="w-full"/>
                    <InputIcon class="pi pi-search" />
                </IconField>
                <label for="username">주소</label>
            </IftaLabel>

            <IftaLabel class="label-input-box">
                <InputText id="username"  />
                <label for="username">상새주소</label>
            </IftaLabel>

            <IftaLabel class="label-input-box">
                <Select/> 
                <label for="username">담당자</label>
            </IftaLabel>

            <IftaLabel class="label-input-box">
                <Select/> 
                <label for="username">그룹</label>
            </IftaLabel>

            <IftaLabel class="label-input-box">
                <InputText id="username"  />
                <label for="username">그룹명 입력</label>
            </IftaLabel>
            <div class="bottom-modal-sticky-box">
                <Button type="button" label="명세서 이동" @click="" class="w-full" />
            </div>
    </div>
</template>

<script setup lang="ts">
import IftaLabel from 'primevue/iftalabel';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import DatePicker from 'primevue/datepicker';
import Select from 'primevue/select';


</script>