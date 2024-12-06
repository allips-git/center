<template>
    <main class="p-5">
        <section class="flex justify-end w-full mb-1">
            <Select class="w-40"/>
        </section>
        <!-- 날짜 포함 v-for -->
       <section class="flex flex-col mt-8">
        <div class="flex items-center justify-center gap-4 text-sm">
            <span class="w-full h-px bg-gray-300"></span>
            <p class="flex-none font-bold text-gray-600">2022.12.24일 (오늘)</p>
            <span class="w-full h-px bg-gray-300"></span>
        </div>
        <!-- 메세지 v-for -->
        <ul class="flex flex-col gap-5">
            <li class="flex flex-col gap-2 p-4 border border-gray-200 rounded-md first:mt-2">
                <div class="flex items-center justify-between font-bold">
                    <div class="flex items-center gap-1">
                        <h1 class="font-bold">하현재</h1>
                        <span class="text-gray-400">·</span>
                        <p class="flex-none text-base font-normal">계약 완료 알림</p>
                    </div>
                    <Tag value="발송 대기" severity="warn"></Tag>
                </div>
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="flex items-center gap-2">
                            <div class="flex items-center justify-center p-[3px] bg-yellow-300 rounded-full size-4">
                                <img src="@/assets/img/icon-kakao.svg" alt="카카오톡" title="카카오톡" class="mx-auto"/>
                            </div>
                            <p class="text-sm text-gray-600">010-1212-1212</p>    
                        </div>
                    </div>
                    <span class="flex-none text-sm text-gray-400">2022.12.24일 오후 06:21</span>
                </div>
            </li>
        </ul>
       </section> 
    </main>
    </template>
    
    <script setup lang="ts">
    import Tag from 'primevue/tag';
    
    </script>
    
    <style lang="scss">
    
    </style>