<template>
    <main class="pb-32">
        <div class="flex justify-between items-center px-4 md:px-6 no-print">
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
        <section>
            <ul class="flex flex-col mt-[0.625rem] px-2 gap-1.5">
                <li v-for="(item, index) in client.list" :key="index" 
                    class="flex items-center gap-[14px] flex-none w-full p-2 rounded-md md:px-6 cursor-pointer border border-transparent" 
                    @click="toggleCustomerSelection(item.clientCd)" 
                    :class="{ 'bg-p-lv5/50 !border-p-lv4': getClientCheck(item.clientCd) }"
                >
                    <div :class="getStatusClass(item.step)" 
                        class="flex items-center justify-center flex-none font-bold text-white rounded-md text-xs md:text-sm w-[2.5rem] sm:w-[3rem] aspect-square">
                        {{ getStatusName(item.step) }}
                    </div>
                    <div class="flex gap-2 justify-between w-full pt-[0.125rem]">
                        <div class="flex flex-col flex-grow min-w-0">
                            <strong class="text-sm font-bold sm:text-base text-t-lv1">{{ item.clientNm }}</strong>
                            <div class="flex-1 text-xs sm:text-13 truncate text-t-lv3 whitespace-nowrap max-w-[200px] sm:max-w-[100%]">{{ item.addr }} {{ item.addrDetail }}</div>
                        </div>
                        <div class="flex flex-col whitespace-nowrap">
                            <div class="text-xs text-right sm:text-13 text-t-lv3">{{ item.date }}</div>
                            <strong class="text-sm font-medium text-right sm:text-base text-t-lv1">{{ item.amt }}원</strong>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
    </main>
    <div class="z-10 flex-col bottom-fixed-btn-box">
        <Button
            size="large"
            :label="msg.clientList.length === 0 ? '닫기' : msg.clientList.length + '명 선택하기'"
            :severity="msg.clientList.length === 0 ? 'secondary' : undefined"
            @click="getPopupClose('clientChoice', true)"
        />
    </div>
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

