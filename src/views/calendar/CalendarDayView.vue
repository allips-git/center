<template>
    <main class="h-[calc(100vh-56px)] overflow-hidden">
        <BackHeader title="일정" />
        <div class="h-[calc(100vh-110px)] md:h-[calc(100vh-48px)]">
            <CalenderDay class=""/>
        </div>

        <Dialog v-model:visible="popup['pop']['calendarSet']" header="일정" 
            :modal=true position="bottom" class="border-0 custom-dialog-bottom"
            @update:visible="getPopupClose('calendarSet', true)">
            <CalenderSet/>
        </Dialog>

        <Dialog v-model:visible="popup['pop']['calendarEdit']" header="일정" 
            :modal=true position="bottom" class="border-0 custom-dialog-bottom"
            @update:visible="getPopupClose('calendarEdit', true)">
            <CalenaderEdit/>
        </Dialog>
    </main>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import CalenderDay from '@/views/include/calendar/CalenderDay.vue'
import CalenderSet from '@/views/include/calendar/CalenderSet.vue';
import CalenaderEdit from '@/views/include/calendar/CalenaderEdit.vue'
import { usePopupStore } from '@/store';
import { usePopup } from '@/assets/js/popup';

const popup = usePopupStore();
const { getPopupClose } = usePopup();
</script>

<style lang="scss">

</style>