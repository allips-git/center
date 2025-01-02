<template>
    <BackHeader title="발주서" />
    <main class="!pb-36">
        <div class="relative">
            <section class="relative rounded-t-xl overflow-hidden bg-white">
                <InfoCard :title="'수신'" :info="info" />
                <div class="gray-bar"></div>

                <section class="px-5">
                    <div class="flex flex-col gap-5">
                        <TableCard title="어떤 텍스트?" />
                    </div>
                </section>
            </section>
        </div>
    </main>
    <section class="fixed bg-white border-t border-gray-200 rounded-t-2xl p-5 bottom-0 w-full overflow-hidden">
        <div class="flex justify-between *:flex *:gap-2 *:items-center text-sm w-full">
            <div>
                <div class="label-checkbox-box">
                    <RadioButton />
                    <label for="">일반양식</label>
                </div>
                <div class="label-checkbox-box">
                    <RadioButton />
                    <label for="">엑셀양식</label>
                </div>
            </div>
        </div>

        <div class="pt-4 btn-2-layout-box">
            <InputText :value="''+domain+'/customer/conDoc?cd='+emCd+''" readonly/>
        </div>
        <div class="btn-2-layout-box pt-4">
            <Button label="링크 발주" severity="success"/>
        </div>
    </section>
</template>
    
<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import InfoCard from "@/components/card/InfoCard.vue";
import TableCard from "@/components/card/TableCard.vue";
import RadioButton from 'primevue/radiobutton';
</script>

<style lang="scss">

</style>