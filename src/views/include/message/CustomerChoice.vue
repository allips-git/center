<template>
<main class="pb-32">
    <section class="flex gap-2 px-5 mt-4">
        <Select placeholder="선택" /> 
        <IconField class="w-full table-search-input">
            <InputIcon>
                <i class="pi pi-search" />
            </InputIcon>
            <InputText placeholder="이름, 주소, 전화번호 검색" class="w-full" />
        </IconField>
    </section>

    <section>
        <div 
        class="flex items-center justify-between gap-2 first:mt-5">
        <ul class="flex flex-col w-full">
                <li 
                v-for="(item, index) in client.list" 
                :key="index" 
                class="flex items-center justify-between w-full px-5 py-3" 
                @click="toggleCustomerSelection(item.clientCd)" 
                 :class="{ 'bg-gray-100': selectedCustomers.includes(item.clientCd) }"
                >
                <!-- 상태 -->
                <div :class="getStatusClass(item.step)" 
                    class="flex items-center justify-center mr-4 text-sm font-bold text-white rounded-md size-10">
                    {{ getStatusName(item.step) }}
                </div>
                <div class="flex justify-between gap-2 w-[calc(100%-40px)]">
                    <div class="flex flex-col">
                    <p class="font-bold">{{ item.clientNm }}</p>
                    <span class="text-xs text-gray-400">{{ item.addr }} {{ item.addrDetail }}</span>
                    </div>
                    <div class="flex flex-col">
                    <span class="text-sm text-right text-gray-400">{{ item.date }}</span>
                    <p class="font-bold text-right">{{ item.amt }}원</p>
                    </div>
                </div>
                </li>
            </ul>
        </div>        
    </section>
</main>

<div class="z-10 flex-col bottom-fixed-btn-box">
    <p class="mb-1 text-lg font-bold text-sky-500">0명 선택됨</p>
    <div class="flex w-full gap-2 *:w-full">
        <Button size="large"  label="선택완료"/>
    </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IconField from 'primevue/iconfield'; 
import InputText from 'primevue/inputtext'; 
import InputIcon from 'primevue/inputicon'; 
import Tag from 'primevue/tag';

const SelectedCustaomer = ref(true)


// 선택된 고객 코드 배열
const selectedCustomers = ref<string[]>([]);

// 고객 선택 토글 핸들러
const toggleCustomerSelection = (clientCd: string) => {
  const index = selectedCustomers.value.indexOf(clientCd);
  if (index === -1) {
    // 선택되지 않은 경우 추가
    selectedCustomers.value.push(clientCd);
  } else {
    // 이미 선택된 경우 제거
    selectedCustomers.value.splice(index, 1);
  }
};

// 더미 데이터
const client = ref({
  list: [
    {
      clientCd: 'C001',
      clientNm: '홍길동',
      addr: '서울시 강남구',
      addrDetail: '역삼동 123-45',
      date: '2023-10-01',
      amt: 100000,
      step: 1, // 대기
    },
    {
      clientCd: 'C002',
      clientNm: '김철수',
      addr: '부산시 해운대구',
      addrDetail: '해운대해수욕장 1',
      date: '2023-10-02',
      amt: 200000,
      step: 2, // 견적
    },
    {
      clientCd: 'C003',
      clientNm: '이영희',
      addr: '대구시 중구',
      addrDetail: '동성로 456',
      date: '2023-10-03',
      amt: 150000,
      step: 3, // 발주
    },
    {
      clientCd: 'C004',
      clientNm: '박민수',
      addr: '인천시 남동구',
      addrDetail: '구월동 789',
      date: '2023-10-04',
      amt: 300000,
      step: 4, // 시공
    },
    {
      clientCd: 'C005',
      clientNm: '최지우',
      addr: '서울시 송파구',
      addrDetail: '잠실동 321',
      date: '2023-10-05',
      amt: 250000,
      step: 5, // 결제
    },
    {
      clientCd: 'C006',
      clientNm: '이준호',
      addr: '경기도 성남시',
      addrDetail: '분당구 정자동 123',
      date: '2023-10-06',
      amt: 50000,
      step: 6, // 취소
    },
  ],
});

const getStatusClass = (step: number) => {
    switch (step) 
    {
        case 1:
            return 'bg-blue-300';
        case 2:
            return 'bg-blue-400';
        case 3:
            return 'bg-blue-500';
        case 4:
            return 'bg-blue-700';
        case 5:
            return 'bg-blue-800';
        case 6:
            return 'bg-red-500';
        default:
            return 'bg-gray-500';
    }
};

const getStatusName = (step: number) => {
    switch (step) 
    {
        case 1:
            return '대기';
        case 2:
            return '견적';
        case 3:
            return '발주';
        case 4:
            return '시공';
        case 5:
            return '결제';
        case 6:
            return '취소';
        default:
            return '';
    }
}


</script>

<style lang="scss">

</style>

