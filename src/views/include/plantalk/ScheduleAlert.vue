<template>
<main>
    <main class="pt-5 pb-10">
        <section class="px-5">
            <h1 class="text-xl font-bold">{{ kakao['info']['kdNm'] }}</h1>
            <p class="mt-2 text-sm text-gray-400">{{ kakao['info']['descrip'] }}</p>
        </section>
        
        <section class="flex items-center justify-between px-5 py-4 my-5 bg-gray-50 flax">
            <p class="font-bold">자동 알림 보내기</p>
            <ToggleSwitch v-model="kakao['info']['useYn']" @change="getToggle('useYn')"/>
        </section>
    
        <section class="px-5">
            <div class="flex items-center justify-between">
                <p class="font-bold">알림내용 미리보기</p>
                <Button label="테스트 발송" size="small" />
            </div>
            <div class="flex flex-col items-center justify-center w-full px-4 py-10 mt-5 bg-kakaoBg rounded-2xl">
                <p class="w-auto px-4 py-1 text-sm bg-white bg-opacity-50 rounded-full" v-if="showEditGuide">아래 on/off 버튼을 클릭해 플랜톡 내용을 편집해보세요.</p>
                <div class="w-full mt-5 overflow-hidden rounded-xl max-w-96">
                    <div class="py-2 text-center bg-yellow-300"> 알림톡 도착</div>
                    <div class="p-5 bg-white">
                        <ul class="flex flex-col gap-4 text-sm">
                            <li class="">{{ getFirstMsg() }} 알림</li>
                            <li>
                                <div class="flex items-center gap-1">
                                    <p v-if="kakao['info']['client']" class="px-2 font-bold bg-gray-100 border rounded-sm ">고객이름</p>
                                    <span class="">고객님</span>
                                </div>
                                <span class="">{{ getMsg() }}</span>
                            </li>
                            <li>
                                <p class="">견적일: 견적일</p>    
                                <p> 대표번호: 매장 대표번호</p>
                            </li>
                            <li class="*:px-2 font-bold *:bg-gray-100 *:border *:rounded-sm flex items-start justify-center flex-col gap-3">
                                <p v-if="kakao['info']['person']">담당자: {{ getStNm() }} 담당 맴버</p>
                                <p v-if="kakao['info']['shopAddr']">주소: 매장주소 + 상세주소</p>
                                <p>주차: {{ getPark() }} </p>
                                <p v-if="kakao['info']['url']">홈페이지: URL</p>
                                <Button v-if="kakao['info']['kdGb'] === '002'" label="계약서 상세"  class="w-full mt-2 !bg-yellow-300 !border-yellow-300 !text-gray-900 !cursor-default"></Button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    
        <section>
           <ul class="flex flex-col py-3 *:border-b *:p-4 *:border-gray-200 *:flex *:justify-between *:items-center">
                <li>
                    <p>고객 이름 표시 여부</p>
                    <ToggleSwitch v-model="kakao['info']['client']" @change="getToggle('client')"/>
                </li>
                <li>
                    <p>담당 맴버 표시 여부</p>
                    <ToggleSwitch v-model="kakao['info']['person']" @change="getToggle('person')"/>
                </li>
                <li>
                    <p>샵 주소</p>
                    <ToggleSwitch v-model="kakao['info']['shopAddr']" @change="getToggle('shopAddr')"/>
                </li>
                <li>
                    <p>홈페이지 링크 표시 여부</p>
                    <ToggleSwitch v-model="kakao['info']['url']" @change="getToggle('url')"/>
                </li>
                <li>
                    <p>주차 시간 설정</p>
                    <Select id="park" v-model="kakao['info']['park']" optionLabel="label" optionValue="value" :options="data['parking']" size="small" class="!border-none !shadow-none" @change="getSelect"/>
                </li>
           </ul> 
        </section>
    
        <section class="px-5 mt-10 text-center">
            <h2 class="text-lg">카카오톡 발신 계정 연결</h2>
            <p class="mt-1 text-sm text-gray-400">연동 설정 전에는 플랜오더 대표 계정으로 발송이 되며, <br>
                카카오톡 계정 연결 시, 샵 해당 계정으로 고객에게 자동 고객 알림이 발송됩니다.</p>
                <Button class="w-full mt-5" size="large" severity="secondary" label="카카오 비즈니스 계정 등록"/>
        </section>
    </main>
</main>
</template>

<script setup lang="ts">
import ToggleSwitch from 'primevue/toggleswitch';
import { useLoginStore, useDataStore, useKakaoStore } from '@/store';

const login     = useLoginStore();
const data      = useDataStore();
const kakao     = useKakaoStore();

const getFirstMsg = () => {
    switch(kakao['info']['kdGb'])
    {
        case '001':
            return '견적';
        case '002':
            return '계약완료';
        case '003':
            return '시공일';
        case '004':
            return '결제';
        case '005':
            return 'A/S';
    }
}

const getMsg = () => {
    switch(kakao['info']['kdGb'])
    {
        case '001':
            return login['name']+' 견적이 진행되었습니다.';
        case '002':
            return login['name']+' 계약이 완료되었습니다.';
        case '003':
            return '금일 시공일 입니다. 감사합니다 :)';
        case '004':
            return '입금 부탁드리겠습니다 :)';
        case '005':
            return 'A/S 요청';
    }
}

const getStNm = () => {
    switch(kakao['info']['kdGb'])
    {
        case '001':
            return '견적';
        case '002':
            return '계약';
        case '003':
            return '시공';
        case '004': case '005':
            return '';
    }
}

const getPark = () => {
    switch(kakao['info']['park'])
    {
        case 'Y':
            return '주차 무료';
        case 'N':
            return '주차 불가';
        case 'C':
            return '주차 유료';
        case 1: case 2: case 3: case 4: case 5:
            return kakao['info']['park']+'시간 무료';
    }
}

const getToggle = (id: string) => {
    const val       = event.target.checked ? 'Y' : 'N';
    const params    = {
        kdCd    : kakao['kdCd'],
        id      : id,
        val     : val
    };

    getResult(params);
}

const getSelect = () => {
    const params = {
        kdCd    : kakao['kdCd'],
        id      : 'park',
        val     : kakao['info']['park']
    };

    getResult(params);
}

const getResult = (params) => {
    const result = kakao.getKakaoResult(params);

    result.then((res) => {
        if(res['result'])
        {
            if(params['id'] === 'useYn')
            {
                kakao.getKakaoList();
            }

            alert('변경되었습니다.');
        }
        else
        {
            alert('상태 변경에 실패하였습니다. 지속될 경우 관리자에게 문의하세요.');
        }
    });
}

</script>

<style lang="scss">

</style>