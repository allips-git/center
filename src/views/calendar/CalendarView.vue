<template>
    <main class="h-[calc(100vh-60px)]">
        <BackHeader title="일정"/>
        <div class="md:grid items-start justify-start md:grid-cols-[1fr_400px] md:h-[calc(100vh-108px)]">
            <CalenderMonth class="flex-grow md:w-full md:block"/>
            <CalenderDay class="flex-grow hidden border-l border-gray-200 md:w-full md:block md:max-w-[400px] md:h-full" />
        </div>
        <Dialog v-model:visible="popup['pop']['calendarSet']" header="일정" 
            :modal=true position="bottom" class="border-0 custom-dialog-bottom"
            @update:visible="getPopupClose('calendarSet', true)">
            <CalenderSet/>
        </Dialog>

        <Dialog v-model:visible="popup['pop']['calendarDetail']" header="일정" 
            :modal=true position="bottom" class="border-0 custom-dialog-bottom"
            @update:visible="getPopupClose('calendarDetail', true)">
            <CalenderDetail/>
        </Dialog>

        <Dialog v-model:visible="popup['pop']['calendarEdit']" header="일정" 
            :modal=true position="bottom" class="border-0 custom-dialog-bottom"
            @update:visible="getPopupClose('calendarEdit', true)">
            <CalenaderEdit/>
        </Dialog>
    </main>
</template>

<script setup lang="ts">
import CalenderMonth from '@/views/include/calendar/CalenderMonth.vue'
import CalenderDay from '@/views/include/calendar/CalenderDay.vue'
import CalenderSet from '@/views/include/calendar/CalenderSet.vue';
import CalenderDetail from '@/views/include/calendar/CalenderDetail.vue';
import CalenaderEdit from '@/views/include/calendar/CalenaderEdit.vue'
import BackHeader from '@/components/layouts/BackHeader.vue';
import { usePopupStore } from '@/store';
import { usePopup } from '@/assets/js/popup';

const popup = usePopupStore();
const { getPopupClose } = usePopup();
</script>

<style lang="scss">

</style>