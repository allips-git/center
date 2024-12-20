<template>
    <BackHeader title="메세지" v-if="showHeader"/>
    <main class="w-full p-5 pb-32">
        <section class="flex justify-between">
            <div>
                <Button label="고객 선택" icon="pi pi-plus" outlined size="small" rounded @click="CustomerChoicePop = true"></Button>
            </div>
            <div class="flex gap-2">
                <Button label="메세지 저장" size="small"></Button>
                <!-- <Button label="메세지 삭제" size="small" severity="danger"></Button> -->
            </div>
        </section>
        <section class="flex items-start py-3 mt-5 border-y">
            <h2 class="flex-none mt-2 mr-3 text-sm font-bold">받는 사람</h2>
            <div class="flex flex-wrap gap-1">
                    <Tag severity="secondary" value="선택된 고객 이름"></Tag>
                    <Tag severity="secondary" value="선택된 고객 이름"></Tag>
                    <Tag severity="secondary" value="선택된 고객 이름"></Tag>
                    <Tag severity="secondary" value="선택된 고객 이름"></Tag>
                    <Tag severity="secondary" value="선택된 고객 이름"></Tag>
                    <Tag severity="secondary" value="선택된 고객 이름"></Tag>
                    <Tag severity="secondary" value="선택된 고객 이름"></Tag>
                    <Tag severity="secondary" value="선택된 고객 이름"></Tag>
                    <Tag severity="secondary" value="선택된 고객 이름"></Tag>
                    <Tag severity="secondary" value="선택된 고객 이름"></Tag>
                </div>
        </section>
        <section class="flex flex-col gap-5 mt-5">
            
            <IftaLabel class="w-full">
                <InputText class="w-full"/>
                <label for="emali">문자 제목</label>
            </IftaLabel>
            
            <IftaLabel class="w-full">
                <Textarea class="w-full" autoResize rows="5" cols="30"/>
                <label for="emali">문자 제목</label>
            </IftaLabel>
            
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
            <Button size="large" icon="pi pi-arrow-up-right" class="flex-none" severity="secondary"/>
        </div>
    </div>
<Dialog
    v-model:visible="CustomerChoicePop" 
    header="고객선택" 
    :modal=true
    position="center"
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