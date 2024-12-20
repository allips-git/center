<template>
    <main class="h-[calc(100vh-56px)] overflow-hidden">
        <BackHeader title="2024년 12월" />
        <div class="h-[calc(100vh-110px)] md:h-[calc(100vh-48px)]">
            <CalenderDay class=""/>
        </div>
    </main>
</template>

<script setup lang="ts">
import CalenderMonth from '@/views/include/calendar/CalenderMonth.vue'
import BackHeader from '@/components/layouts/BackHeader.vue'

import CalenderDay from '@/views/include/calendar/CalenderDay.vue'


</script>

<style lang="scss">

</style>