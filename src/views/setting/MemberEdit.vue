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
                        <InputIcon>
                            <IconSpot/>
                        </InputIcon>
                    </IconField>
                    <label>주소</label>
                    <!-- <small class="text-red-500">ㅁㄴㅁ</small> -->
                </IftaLabel>

                <IftaLabel class="label-input-box">
                    <InputText id="addrDetail"/>
                    <label>상세주소</label>
                </IftaLabel>
    
                <IftaLabel class="w-full">
                    <div class="w-full custom-select-arrow">
                        <Select id="username" class="w-full"/>
                        <IconPlay class="absolute rotate-90 top-3 right-2 *:fill-gray-400 -z-10"/>
                    </div>
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
import IconSpot from '@/components/icons/IconSpot.vue';
import BackHeader from '@/components/layouts/BackHeader.vue'
import IftaLabel from 'primevue/iftalabel';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import IconPlay from '@/components/icons/IconPlay.vue';



</script>

<style lang="scss">

</style>