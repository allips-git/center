<template>
    <BackHeader title="맴버상세"/>
    <main class="relative pb-32 pc-contents-h-box">
        <section class="">
            <div class="flex items-center justify-between py-3.5 p-4 pb-0">
                <div class="flex items-center gap-3 ">
                    <IconAvatar class="fill-[#78BBFF] size-[51px]"/>
                    <div  class="flex flex-col">
                        <p class="text-base font-bold">{{ member['detail']['userNm'] }}</p>
                        <div class="flex flex-col font-bold text-10 text-t-lv4">
                            <span class="">{{ member['detail']['tel'] }}</span>
                            <span class="">{{ member['detail']['rank'] }}</span> 
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-center rounded-full">
                    <IconPhone />
                </div>
            </div>
        </section>
        <div class="p-4">
            <div class="gray-bar !bg-[#E5E5EC] !h-px  w-full"></div>
        </div>
        <section class="">
            <!-- <h2 class="px-5 text-lg font-bold">이력</h2> -->
            <ul class="w-full">
                <li v-for="(item, index) in member['history']" :key="index" class="flex items-center justify-between w-full gap-2 px-4 md:px-6 py-2.5">
                <div class="flex items-center text-xs gap-2 w-[calc(100%-120px)]">
                    <div class="flex-none rounded-full size-3" :class="item.codeSub === '001' ? 'bg-yellow-300' : item.codeSub === 'N' ? 'bg-red-400' : 'bg-sky-400'"></div>
                    <div class="flex items-center text-t-lv2">
                        (<b class="truncate max-w-[55px] w-full">{{ item.clientNm }}</b>)
                    </div>
                    <p class="truncate text-t-lv2">{{ item.codeNm }} 처리하였습니다.</p>
                </div>
                <span class="text-right text-t-lv2 text-caption whitespace-nowrap">{{ item.regDt }}</span>
                </li>
            </ul>
        </section>
        <div class="bottom-fixed-btn-box">
            <Button label="맴버정보 수정" size="large" severity="secondary" class="" @click="getPopup"/>
            <router-link to="/setting/member_auth">
                <Button label="권한설정" size="large" class="w-full"/>
            </router-link>
        </div>
        <!-- <Dialog v-model:visible="popup['pop']['memberSet']" header="멤버 저장" 
            :modal=true position="bottom" :dismissableMask="true" class="custom-dialog-bottom"
            @update:visible="getPopupClose('memberSet', true)">
            <MemberEdit/>
        </Dialog> -->


     <Dialog v-model:visible="popup['pop']['clientSet']" header="멤버 저장" 
            :modal=true position="center" class="custom-dialog-bottom" 
            @update:visible="getPopClose('memberSet', true)">
            <template #header>
                <div class="modal-backheader">
                    <Button @click="getPopClose(true, 'memberSet')" severity="contrast" text icon="pi pi-times"/>
                    <h2 class="modal-backheader-title">멤버 정보 저장</h2>
                </div>
            </template>
            <MemberEdit/>
        </Dialog> 
    </main>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import IconAvatar from '@/components/icons/IconAvatar.vue';
import IconPhone from '@/components/icons/IconPhone.vue';
import MemberEdit from "@/views/include/setting/MemberEdit.vue";
import { onMounted, onUnmounted } from 'vue';
import { usePopupStore, useMemberStore } from '@/store';
import { usePopup } from '@/assets/js/popup';

const popup     = usePopupStore();
const member    = useMemberStore();

const { getPopupOpen, getPopupClose } = usePopup();

const getPopup = async() => {
    await member.getInfo();
    getPopupOpen('memberSet');
}

onUnmounted(() => {
    member.getList();
})

onMounted(() => {
    member.getDetail();
})
</script>

<style lang="scss">

</style>