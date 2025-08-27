<template>
<main class="pb-32">
    <section class="flex gap-2 px-5 mt-4">
        <div class="flex items-center justify-between px-4 py-[10px] md:px-6 no-print ">
            <div class="flex justify-between self-center w-full">
                <div class="flex gap-2 w-full">
                    <Select v-model="client['stCd']" :options="data['clientStat']" optionLabel="name" optionValue="value" placeholder="상태" class="bg w-[36%]" @change="client.getList()">
                        <template #dropdownicon>
                            <IconArrowDropDown class="w-4 h-4 text-l-lv0" />
                        </template>
                    </Select>
                    <IconField class="w-full bg">
                        <InputIcon class="z-10">
                            <IconSearch class="w-4 h-4 text-t-lv2" />
                        </InputIcon>
                        <InputText v-model="client['search']" placeholder="이름,주소,전화번호로 검색" class="w-full" @keyup.enter="client.getList()"/>
                    </IconField>
                </div>
            </div>
        </div>
    </section>
    <section>
        <div class="flex items-center justify-between gap-2 first:mt-5">
            <ul class="flex flex-col w-full">
                <li v-for="(item, index) in client.list" :key="index" class="flex items-center justify-between w-full px-5 py-3" 
                    @click="toggleCustomerSelection(item.clientCd)" :class="{ 'bg-gray-100': getClientCheck(item.clientCd) }">
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
        <div class="z-10 flex-col bottom-fixed-btn-box">
            <p class="mb-1 text-lg font-bold text-sky-500">{{ msg.clientList.length }}명 선택됨</p>
            <div class="flex w-full gap-2 *:w-full">
                <Button size="large"  label="선택완료" @click="getPopupClose('clientChoice', true)"/>
            </div>
        </div>
    </section>
</main>
</template>

<script setup lang="ts">
import Select from 'primevue/select';
import IconField from 'primevue/iconfield'; 
import InputText from 'primevue/inputtext'; 
import InputIcon from 'primevue/inputicon';
import IconArrowDropDown from '@/components/icons/IconArrowDropDown.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import { onMounted } from 'vue'
import { useDataStore, useClientStore, useMsgStore } from '@/store';
import { usePopup } from '@/assets/js/popup';

const data   = useDataStore();
const client = useClientStore();
const msg    = useMsgStore();
const { getPopupClose } = usePopup();

const toggleCustomerSelection = (clientCd: string) => {
    const index = msg.clientList.findIndex(item => item.clientCd === clientCd);
    const info  = client.list.find(item => item.clientCd === clientCd);

    if (index === -1) 
    {
        msg.clientList.push({ clientCd : clientCd, clientNm : info['clientNm'], tel : info['tel'] });
    } 
    else 
    {
        msg.clientList.splice(index, 1);
    }
};

const getClientCheck = (clientCd: string) => {
    const check = msg.clientList.find(item => item.clientCd === clientCd);

    if(check)
    {
        return true
    }
    else
    {
        return false;
    }
}

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

onMounted(() => {
    client.getList();
});

</script>

<style lang="scss">

</style>

