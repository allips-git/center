<template>
<main class="p-4">
    <div class="">
        <div class="flex gap-2 mb-4">
            <Select placeholder="업종 전체" /> 
            <IconField class="table-search-input w-full">
                <InputIcon>
                    <i class="pi pi-search" />
                </InputIcon>
                <InputText placeholder="제품명 검색" class="w-full" />
            </IconField>
        </div>
        <section class="border-b py-4">
            <div class="flex justify-between items-center">
                <p class="text-lg font-bold text-indigo-600">블라인드</p>
                <Button label="제품 추가" showIcon icon="pi pi-plus" size="small" rounded @click="OutMngPop = true" />
            </div>
            <div class="flex flex-col gap-4">
                <MoreCard/>
            </div>
        </section>

        <section class="border-b py-4">
            <div class="flex justify-between items-center">
                <p class="text-lg font-bold text-indigo-600">커튼</p>
                <Button label="제품 추가" showIcon icon="pi pi-plus" size="small" rounded  @click="OutMngPop = true"/>
            </div>
            <!-- 카드 UI -->
            <div class="flex flex-col gap-4">
                <MoreCard/>
            </div>
        </section>
    </div>    
</main>

<Dialog v-model:visible="OutMngPop" header="외주공장 이름 제품관리" 
    :modal=true position="center" class="custom-dialog-bottom"
    >
    <OutMng/>
</Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IconField from 'primevue/iconfield'; 
import InputText from 'primevue/inputtext'; 
import InputIcon from 'primevue/inputicon'; 
import MoreCard from '@/components/card/MoreCard.vue'; 
import OutMng from "@/views/include/factory/OutMng.vue";


const OutMngPop = ref(false)

</script>