<template>
<main class="w-full p-5 overflow-y-auto">
    <section class="flex items-center justify-between">
        <h1 class="text-lg font-bold">문자 메세지 발송</h1>
        <div class="flex gap-2">
            <Button label="메세지 삭제" severity="danger" size="small"/>
            <Button label="메세지 저장" size="small"/>
        </div>
    </section>

    <section class="mt-4 form-gap-box">
        <ul class="gap-3 p-4 text-sm text-blue-600 rounded-lg bg-blue-50">
            <li class="flex"><span class="w-4">1.</span> <p>문자 제목은 최대 40자 까지 입력 가능합니다.</p></li>
            <li class="flex"><span class="w-4">2.</span> <p>문자 제목은 장문 문자, 이미지 문자에만 적용됩니다. (단문 문자는 제목 없이 발송됩니다.)</p></li>
        </ul>
        

        <div class="label-input-box">
            <h1 class="mb-2 font-bold">문자 제목</h1>
            <InputText placeholder="문자 제목을 입력해주세요."/>
            <p class="text-sm text-right text-gray-400">총 0/40자</p>
        </div>
    </section>
    
    <section class="mt-10">
        <h1 class="mb-2 font-bold">문자 내용</h1>
    </section>
    <div class="flex items-stretch gap-5">
        <div class="flex flex-col w-full min-h-full overflow-hidden border border-gray-200 rounded-lg">
            <Textarea rows="5"   class="!h-full w-full !rounded-none !border-none !shadow-none resize-none"/>
            <div class="flex items-center justify-between h-10 px-4 border-t">
                <span class="text-gray-400 pi pi-image"></span>
                <span class="text-gray-400">(0/60kb)</span>
            </div>
        </div>
        <div class="flex flex-col items-center justify-center w-full p-5 border border-gray-100 rounded-lg bg-gray-50">
            <p class="font-bold text-center ">미리보기</p>
            <div class="flex items-center justify-center mt-4">
                <div class="w-full min-h-[400px] bg-gray-200 max-w-96 rounded-lg text-left p-5">
                    <p>발송된 내용임 [Web 발신] 발송된 내용임 발송된 내용임발송된 내용임발송된 내용임발송된 내용임발송된 내용임내용임발송된 내용임내용임발송된 내용임</p>
                </div>
            </div>
        </div>
    </div>
    
    <div class="p-4 my-4 text-center bg-gray-50">
        <p>총 288 byte / 2000 byte 장문 문자</p>
        <p class="text-gray-400">90 byte 초과 시 자동으로 장문 문자로 전환됩니다.</p>
    </div>

    <div class="gray-bar !h-px"></div>

    <section class="flex flex-col gap-10">
        <div>
            <h1 class="mb-3 font-bold">발송 설정</h1>    
            <div class="label-checkbox-box">
                <RadioButton />
                <label for="">광고 홍보성 메세지</label>
            </div>

            <div class="p-4 mt-3 text-sm rounded-lg bg-gray-50">
                <p>광고/홍보성 [휴무/세미나 포함] 문자 메시지는 필수로 (광고), 상호명, 무료수신거부 080번호를 표기해야 합니다. 표기 의무 위반 시 별도의 공지 없이 메시지가 차단될 수 있습니다.</p>
                <span class="text-red-500">필수 표기: 1. 시작 부분에 (광고) 및 상호 표기 2. 끝부분에 무료수신거부 080 번호 표기</span>
                <div class="flex mt-4">
                    <span class="w-4">•</span>
                    <p>정보통신망법 제 50조에 의거하여 광고/홍보성 메시지를 전송하려면 수신자로부터 명시적인 사전 동의를 받아야 합니다.</p>
                </div>
            </div>
        </div>

        <div>
            <div class="label-checkbox-box">
                <RadioButton />
                <label for="">광고 홍보성 메세지</label>
            </div>

            <div class="p-4 mt-3 text-sm rounded-lg bg-gray-50">
                <div class="flex mt-4 text-red-500">
                    <span class="w-4">•</span>
                    <p>야간시간대(오후 9시~다음날 오전 8시)에는 문자 메시지 발송이 제한됩니다.</p>
                </div>

                <div class="flex mt-4">
                    <span class="w-4 text-red-500">•</span>
                    <p><span class="text-red-500">야간시간대 광고/홍보성 문자 메시지 발송 시,</span>영리 목적의 광고성 문제 메시지 수신에 대한 일반적 사전 동의 외에 별도의 동의를 받지 않았을 경우, 3천만원 이하의 과태료가 부과될 수 있습니다.</p>
                </div>
            </div>
        </div>

        <div>
            <div class="label-input-box">
                <p>발신 번호</p>
                <InputText class="w-full" placeholder="발신 번호 입력" />

            </div>

            <div class="p-4 mt-2 text-sm rounded-lg bg-gray-50">
                <p>전기통신사업법 제 84조의 2에 의거하여 2015년 10월 16일 부터 거짓으로 표시된 전화번호로 인한 이용자 피해 예방을 위해서 발신번호 사전등록제가 시행됩니다. 발신번호로는 개인 또는 기업이 소유한 유효 전화번호를 사용해야하며 사전등록이 안된 발신번호는 문자 메시지 발송이 차단됩니다.</p>
            </div>
        </div>

            

         
    </section>

    <div class="flex gap-2 *:w-full w-full my-8">
        <Button severity="secondary" outlined label="테스트 발송"/>
        <Button label="메세지 발송"/>
    </div>
</main>
</template>

<script setup lang="ts">
import Textarea from 'primevue/textarea';
import RadioButton from 'primevue/radiobutton';

</script>

<style lang="scss">

</style>