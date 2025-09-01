<template>
    <Dialog 
        :closeOnEscape="false"
        v-model:visible="visible" 
        pt:mask:class="h-full backdrop-blur-sm"
        pt:root:class="!border-0 !bg-white w-full sm:w-[450px] sm:h-auto h-full !max-h-screen" 
    >
        <template #container>
            <div class="flex flex-col px-6 py-8 rounded-2xl sm:min-h-96 w-full h-full pt-[80px] md:pt-0">
                <div class="flex items-center justify-between mb-6 w-full fixed top-0 h-[50px] left-0 md:relative px-6 md:px-0">
                    <p class="flex items-center justify-center font-bold">아이디 찾기 결과</p>
                    <Button 
                        icon="pi pi-times" 
                        text 
                        class="p-2 md:hidden" 
                        @click="handleClose"
                    />
                </div>
                
                <div v-if="find.idList.length === 0" class="text-center py-8">
                    <div class="mb-4">
                        <i class="pi pi-exclamation-triangle text-4xl text-orange-500"></i>
                    </div>
                    <p class="text-lg font-semibold text-gray-700 mb-2">찾은 아이디가 없습니다</p>
                    <p class="text-sm text-gray-500 mb-6">입력하신 정보로 등록된 아이디를 찾을 수 없습니다.</p>
                    <Button 
                        label="회원가입" 
                        size="large" 
                        class="mb-3"
                        @click="goToJoin"
                    />
                </div>
                
                <div v-else>
                    <p class="text-lg font-semibold text-gray-800 mb-2">
                        총 <span class="text-indigo-600">{{ find.idList.length }}개</span>의 아이디를 찾았습니다
                    </p>
                    <p class="text-sm text-gray-500 mb-4">아래 목록에서 원하시는 아이디를 선택해주세요.</p>
                    
                    <!-- 스크롤 가능한 아이디 리스트 영역 -->
                    <div class="overflow-y-auto max-h-[40vh] sm:max-h-[45vh] mb-6 pr-2">
                        <div class="space-y-3">
                            <div v-for="(item, index) in find.idList" :key="index" class="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-all duration-200 hover:shadow-sm hover:border-gray-300">
                                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <div class="flex items-center space-x-3">
                                        <!-- <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center 
                                                    shadow-sm border border-indigo-200">
                                            <i class="pi pi-user text-indigo-600"></i>
                                        </div> -->
                                        <div>
                                            <p class="font-semibold text-gray-800 text-sm sm:text-base">{{ item.id }}</p>
                                            <p class="text-xs text-gray-500">아이디</p>
                                        </div>
                                    </div>
                                    
                                    <div class="flex flex-col sm:flex-row gap-2">
                                        <Button 
                                            label="로그인" 
                                            size="small"
                                            class="flex-1 sm:flex-none"
                                            @click="goToLogin(item.id)"
                                        />
                                        <Button 
                                            label="비밀번호 찾기" 
                                            size="small"
                                            severity="secondary"
                                            outlined
                                            class="flex-1 sm:flex-none transition-all duration-200 
                                                   hover:bg-gray-50 hover:border-gray-400"
                                            @click="goToFindPassword(item.id)"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex flex-col sm:flex-row gap-3">
                        <Button 
                            label="닫기" 
                            size="large" 
                            severity="secondary"
                            class="flex-1"
                            @click="handleClose"
                        />
                    </div>
                </div>
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { ref } from 'vue';
import { useLoginStore, useFindStore } from '@/store';
import { useRouter } from 'vue-router';

const router    = useRouter();
const login     = useLoginStore();
const find      = useFindStore();
const visible   = ref(true);

const handleClose = () => {
    find.getReset();
    router.push({ path : '/login' });
};

const goToLogin = async (id: string) => {
    await login.getId(id);
    router.push({ 
        path    : '/login',
        query   : { id: id }
    });
};

const goToFindPassword = (id: string) => {
    router.push({ 
        path    : '/find_password', 
        query   : { id: id } 
    });
};
</script>

<style lang="scss" scoped>
</style> 