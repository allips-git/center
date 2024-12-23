<template>
    <div>
        <BackHeader title="맴버정보 수정"/>
        <main class="pt-5 pb-28 pc-contents-h-box">

            <section class="px-5 form-gap-box">
                <IftaLabel class="w-full">
                    <InputText id="username" class="w-full"/>
                    <label for="emali">ID</label>
                </IftaLabel>

                <IftaLabel class="w-full">
                    <InputText id="username" class="w-full"/>
                    <label for="emali">비밀번호</label>
                </IftaLabel>

                <IftaLabel class="w-full">
                    <InputText id="username" class="w-full"/>
                    <label for="emali">비밀번호 확인</label>
                </IftaLabel>

                <IftaLabel class="w-full">
                    <InputText id="username" class="w-full"/>
                    <label for="emali">이름</label>
                </IftaLabel>

                <IftaLabel class="w-full">
                    <InputText id="username" class="w-full"/>
                    <label for="emali">전화번호</label>
                </IftaLabel>

                <IftaLabel>
                    <IconField>
                        <InputText  class="w-full" readonly placeholder="주소를 입력해주세요."/>
                        <InputIcon class="pi pi-search" />
                    </IconField>
                    <label>주소</label>
                </IftaLabel>

                <IftaLabel class="label-input-box">
                    <InputText id="addrDetail"/>
                    <label>상세주소</label>
                </IftaLabel>
    
                <IftaLabel class="w-full">
                    <Select id="username" class="w-full"/>
                    <label for="emali">권한 등급</label>
                </IftaLabel>

            </section>
        </main>
        <div class="bottom-fixed-btn-box md:!absolute">
            <Button label="저장" size="large"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import IftaLabel from 'primevue/iftalabel';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';



</script>

<style lang="scss">

</style>