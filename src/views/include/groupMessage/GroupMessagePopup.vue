<template>
    <main class="w-full">
        <div class="w-full px-5 text-center">
            <h1>발송 내용</h1>
            <div class="flex items-center justify-center mt-4">
                <div class="w-full min-h-[500px] bg-gray-200 max-w-96 rounded-lg text-left p-5">
                    <p>발송된 내용임 [Web 발신] 발송된 내용임 발송된 내용임발송된 내용임발송된 내용임발송된 내용임발송된 내용임내용임발송된 내용임내용임발송된 내용임</p>
                </div>
            </div>
            <!-- <TalkAlert :showEditGuide="false"/> -->
        </div>
        <div class="w-full">
            <div class="w-full my-10 overflow-x-scroll">
                      <table class="w-full max-w-full overflow-x-scroll border">
                <colgroup class="*:whitespace-nowrap *:min-w-min">
                    <col class="whitespace-nowrap min-w-min"/>
                    <col/>
                    <col/>
                    <col/>
                    <col/>
                </colgroup>
                <thead>
                <tr class="text-sm text-nowrap">
                    <th class="sticky top-0 h-12 px-4 text-sm text-left border-b border-zinc-300 bg-neutral-50">발송 시간</th>
                    <th class="sticky top-0 h-12 px-4 text-sm text-left border-b border-zinc-300 bg-neutral-50">수신 확인 시간</th>
                    <th class="sticky top-0 h-12 px-4 text-sm text-left border-b border-zinc-300 bg-neutral-50">고객 이름</th>
                    <th class="sticky top-0 h-12 px-4 text-sm text-left border-b border-zinc-300 bg-neutral-50">고객 연락처</th>
                    <th class="sticky top-0 h-12 px-4 text-sm text-left border-b border-zinc-300 bg-neutral-50">발송 상태</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td class="px-4 py-3 text-base text-gray-500 border-b whitespace-nowrap">
                        2022년 11월 21일 오후 5:35
                    </td>
                    <td class="px-4 overflow-hidden text-sm text-gray-500 border-b h-11 text-ellipsis whitespace-nowrap">
                        오후 05:36
                    </td>
                    <td class="px-4 overflow-hidden text-sm text-gray-500 border-b h-11 text-ellipsis whitespace-nowrap">
                        하현재
                    </td>
                    <td class="px-4 overflow-hidden text-sm text-gray-500 border-b h-11 text-ellipsis whitespace-nowrap">
                        010-3445-2105
                    </td>
                    <td class="px-4 overflow-hidden text-sm text-green-500 border-b h-11 text-ellipsis whitespace-nowrap">
                        <!-- text-yellow-500 text-red-500 text-green-500 -->
                        성공
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import TalkAlert from "@/components/list/TalkAlert.vue";
</script>

<style lang="scss">

</style>