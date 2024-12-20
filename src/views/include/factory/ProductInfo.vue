<template>
    <main>
        <div class="p-5">
            <div class="flex gap-2">
                <Select placeholder="선택" /> 
                <IconField class="w-full table-search-input">
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText placeholder="제품명 검색" class="w-full" />
                </IconField>
            </div>

            <div class="flex flex-col gap-4">
                <MoreCard/>
                <MoreCard/>
                <MoreCard/>
                <MoreCard/>
            </div>
        </div>
    </main>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import IconField from 'primevue/iconfield'; 
import InputText from 'primevue/inputtext'; 
import InputIcon from 'primevue/inputicon'; 
import OutMng from "@/views/include/factory/OutMng.vue";

const OutMngPop = ref(false)

import MoreCard from "@/components/card/MoreCard.vue";

const dummyData = ref({
    title: '견적서 관련 정보',
    lists: [
        { label: '견적서 발송', content: '무슨 내용이 들어감 여기?' },
        { label: '견적서 확인', content: '확인 후 연락 주세요.' },
    ]
});

</script>

<style lang="scss">

</style>