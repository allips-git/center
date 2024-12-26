<template>
    <main class="h-[calc(100vh-60px)]">
        <BackHeader title="일정" />
        <div class="md:grid items-start justify-start md:grid-cols-[1fr_400px] md:h-[calc(100vh-108px)]">
            <CalenderMonth class="flex-grow md:w-full md:block"/>
            <CalenderDay class="flex-grow hidden border-l border-gray-200 md:w-full md:block md:max-w-[400px] md:h-full" />
        </div>
    </main>
</template>

<script setup lang="ts">
import CalenderMonth from '@/views/include/calendar/CalenderMonth.vue'
import CalenderDay from '@/views/include/calendar/CalenderDay.vue'
import BackHeader from '@/components/layouts/BackHeader.vue'
</script>

<style lang="scss">

</style>