<template>
  <main class="">
      <div class="flex flex-col">
          <TopHeader  @toggleHeader="toggleHeader"/>
        <div class="flex">
            <SideHeader />
        <div class="z-0 overflow-y-auto w-full">
            <RouterView/>
        </div>
        <!-- <ConfirmDialog></ConfirmDialog>
        <Toast></Toast> -->
        </div>
      </div>
  </main>
  </template>
  
  <script setup lang="ts">
  import SideHeader from '@/components/layouts/SideHeader.vue';
  import TopHeader from '@/components/layouts/TopHeader.vue';
  
  </script>
  
  <style lang="scss">
  
  </style>