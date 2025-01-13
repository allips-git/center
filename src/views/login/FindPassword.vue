<template>
    <Dialog v-model:visible="visible"
    :closable="false" 
    pt:root:class="!border-0 !bg-transparent w-full md:w-[500px] md:h-auto h-full !max-h-screen" 
    pt:mask:class="bg-white backdrop-blur-sm">
        <template #container>
            <BackHeader title="휴대폰 인증"/>
            <div class="modal-page-padding">
                <div class="form-gap-box">
                    <IftaLabel class="w-full">
                        <label for="id">이메일 아이디</label>
                        <InputText placeholder="이메일을 입력해주세요." class="w-full"/>
                    </IftaLabel>
                </div>
                <div class="mobile-fiex-bottom">
                    <Button label="비밀번호 찾기" class="w-full" size="large"/>
                </div>
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Dialog from 'primevue/dialog';
import IftaLabel from 'primevue/iftalabel';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import BackHeader from '@/components/layouts/BackHeader.vue'

const visible = ref(true)
</script>

<style lang="scss" scoped>

</style>