<template>
    <div class="flex flex-col items-center justify-center w-full px-4 py-10 mt-5 bg-kakaoBg rounded-2xl">
            <p class="w-auto px-4 py-1 text-sm bg-white bg-opacity-50 rounded-full" v-if="showEditGuide">아래 on/off 버튼을 클릭해 플랜톡 내용을 편집해보세요.</p>
            <div class="w-full mt-5 overflow-hidden rounded-xl max-w-96">
                <div class="py-2 text-center bg-yellow-300"> 알림톡 도착</div>
                <div class="p-5 bg-white">
                    <ul class="flex flex-col gap-4 text-sm">
                        <li class="">[견적 알림]</li>
                        <li>
                            <div class="flex items-center gap-1">
                                <p class="px-2 font-bold bg-gray-100 border rounded-sm ">고객이름</p>
                                <span class="">고객님</span>
                            </div>
                            <p class="mt-1"> <!-- getMsg --> 견적이 진행되었습니다 </p>
                        </li>
                        <li>
                            <p class=""><!-- getStNm --> 견적일: 2012-12-12</p>    
                            <p> 대표번호: 매장 대표번호</p>
                        </li>
                        <li class="*:px-2 font-bold *:bg-gray-100 *:border *:rounded-sm flex items-start justify-center flex-col gap-3">
                            <p>담당자: getStNm 담당 맴버</p>
                            <p>주소: 매장주소 + 상세주소</p>
                            <p>홈페이지: URL</p>
                            <p>주차: getParkMsg </p>
                            <Button label="계약서 상세 보기"  class="w-full mt-2 !bg-yellow-300 !border-yellow-300 !text-gray-900 !cursor-default"></Button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
</template>

<script setup lang="ts">

const props = defineProps({
    showEditGuide: {
        type: Boolean,
        default: true // 기본값을 true로 설정
    },
})

</script>