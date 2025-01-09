<template>
    <BackHeader title="메세지" v-if="showHeader"/>
    <main class="w-full pt-5 pb-32">
        <section class="flex justify-between px-5 pb-5">
            <div class="flex items-center gap-2">
                <Button label="고객 선택" icon="pi pi-plus" outlined size="small" rounded @click="CustomerChoicePop = true" class="!rounded-full"></Button>
                <span class="px-3 py-1.5 text-sm text-orange-400 bg-orange-100 rounded-full">홍길동 외 1명</span>
            </div>
            <div class="flex gap-2">
                <Button label="메세지 저장" size="small"></Button>
                <!-- <Button label="메세지 삭제" size="small" severity="danger"></Button> -->
            </div>
        </section>
        <section class="flex flex-col gap-5 mt-5">
            <div class="px-5">
                <IftaLabel class="w-full">
                    <InputText class="w-full"/>
                    <label for="emali">문자 제목</label>
                </IftaLabel>
            </div>

            <div class="!my-0 gray-bar"></div>
            
            <div class="px-5">
                <IftaLabel class="w-full">
                    <Textarea class="w-full" autoResize rows="5" cols="30"/>
                    <label for="emali">문자 제목</label>
                </IftaLabel>
            </div>
        </section>
    </main>
    <div class="z-10 flex-col bottom-fixed-btn-box">
        <div>
            <div class="flex gap-2 *:!text-xs mb-2">
                <Tag severity="info" value="업체명"></Tag>
                <Tag severity="success" value="담당자명"></Tag>
                <Tag severity="warn" value="고객명"></Tag>
            </div>
        </div>
        <div class="flex w-full gap-2 *:w-full">
            <Button size="large"  label="문자 메세지 보내기"/>
            <Button size="large" icon="pi pi-arrow-up-right" class="flex-none" text severity="secondary"/>
        </div>
    </div>
<Dialog
    v-model:visible="CustomerChoicePop" 
    header="고객선택" 
    :modal=true
    position="bottom"
    class="custom-dialog-bottom"
    >
    <CustomerChoice/>
</Dialog>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import BackHeader from '@/components/layouts/BackHeader.vue'
import CustomerChoice from '@/views/include/message/CustomerChoice.vue'
import IftaLabel from 'primevue/iftalabel';
import Textarea from 'primevue/textarea';
import Tag from 'primevue/tag';

const CustomerChoicePop = ref(false)

const props = defineProps({
    showHeader: {
        type: Boolean,
        default: true // 기본값을 true로 설정
    },
})


</script>

<style lang="scss">

</style>