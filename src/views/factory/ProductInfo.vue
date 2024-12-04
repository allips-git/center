<template>
    <main>
        <BackHeader title="해당 공장 이름~~~~" />
        <div class="p-5">
            <div class="flex gap-2 mb-4">
                <Select placeholder="선택" /> 
                <IconField class="table-search-input w-full">
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText placeholder="제품명 검색" class="w-full" />
                </IconField>
            </div>

            <div class="pt-4">
                <MoreList/>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import IconField from 'primevue/iconfield'; 
import InputText from 'primevue/inputtext'; 
import InputIcon from 'primevue/inputicon'; 

import BackHeader from '@/components/layouts/BackHeader.vue'
import MoreList from "@/components/list/MoreList.vue";

</script>

<style lang="scss">

</style>