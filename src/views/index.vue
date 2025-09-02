<template>
<div class="flex flex-col h-full">
    <div class="flex-1 min-h-0">
        <div class="overflow-y-auto h-full">
            <div class="flex flex-col gap-[14px] bg-gray-100 md:p-4 md:gap-4 pb-20 h-full">
                <!-- 배너 섹션 -->
                <section class="w-full">
                    <div class="relative w-full px-5 overflow-hidden bg-blue-100 md:rounded-md h-[9.1875rem] flex justify-between items-center">
                        <div class="flex flex-col">
                            <p class="mb-3 text-t-lv3 text-11">아주 쉬운 플랜오더 가이드 #1</p>
                            <p class="font-bold text-18 leading-[1.3]">모든 맴버 일정 <br>모아보기</p>
                        </div>
                    
                        <div class="flex gap-2">
                            <img src="/src/assets/img/banner_01.png" class="w-[3.375rem]" alt="">
                            <img src="/src/assets/img/banner_02.png" class="w-[3.375rem]" alt="">
                        </div>
                    </div>
                </section>

                <!-- 메인 그리드 섹션 -->
                <main class="flex flex-col w-full gap-[14px] px-[16px] md:px-0">
                    <div class="flex flex-col gap-2 w-full main-card-container-box">
                        <div class="pt-1 pl-2 sm:pt-0 main-card-tilte-box">
                            <h2 class="flex justify-center items-center text-base">전체 고객</h2>
                            <div class="flex items-center">
                                <div class="flex items-center text-lg px-2 text-t-lv1 gap-[1px] mr-[1px] cursor-pointer" @click="getStCd('')">
                                    <strong>{{ main['clientCnt'] }}</strong>
                                    <span class="text-19">명</span>
                                </div>
                                <div class="block mr-2 w-px h-5 bg-gray-200" />
                                <!-- <Button label="고객 등록" size="small" class="cursor-pointer" @click="getPopOpen"></Button> -->
                                <Button label="고객 등록" size="small" severity="secondary" variant="text" class="cursor-pointer my-btn"  @click="getPopOpen">
                                    <IconAddCircle />
                                </Button>
                            </div>
                        </div>
                        <ul class="grid grid-cols-5 mx-[-0.25rem] pt-3 pb-1.5 main-card-container-box-padding">
                            <li v-for="(item, index) in main['stCnt']" :key="index" class="flex flex-col items-center cursor-pointer justify-center border-r h-[2.25rem] gap-[0.125rem] last:border-r-0" @click="getStCd(item['stCd'])">
                                <strong class="text-data text-sky-500 h-[1.4375rem] flex items-center">{{ item.count }}</strong>
                                <div class="text-caption">{{ item.label }}</div>
                            </li>
                        </ul>
                    </div>
                    <div class="flex w-full gap-[10px] md:gap-[14px] justify-between items-center">
                        <router-link to="/factory/list" class="block flex-1 main-card-container-box">
                            <h2 class="flex gap-2 justify-start items-center text-sm font-bold whitespace-nowrap sm:text-base">
                                <img src="@/assets/img/img-factory.svg" alt="공장" title="공장" class="w-[1rem] sm:w-[1.375rem]"/>
                                공장
                            </h2>
                            <div class="mt-[0.125rem] text-11 sm:text-13 text-t-lv4">공장전체</div>
                            <div class="mt-[0.125rem] flex justify-between items-center w-full">
                                <strong class="flex h-[1.375rem] pl-[1px] items-center text-22 font-bold text-sky-500">{{ main['factoryCnt'] }}</strong>
                                <IconLeftArrow class="fill-l-lv2"/>
                            </div>
                        </router-link>
                        
                        <div class="block flex-1 main-card-container-box" @click="getChatOpen">
                            <h2 class="flex gap-1.5 justify-start items-center text-sm font-bold whitespace-nowrap sm:text-base">
                                <img src="@/assets/img/img-chat.svg" alt="고객채팅" title="고객채팅" class="w-[1rem] sm:w-[1.375rem]"/>
                                고객채팅
                            </h2>
                            <div class="mt-[0.125rem] text-11 sm:text-13 text-t-lv4">안읽은 채팅방</div>
                            <div class="mt-[0.125rem] flex justify-between items-center w-full">
                                <strong class="flex h-[1.375rem] pl-[1px] items-center text-22 font-bold text-[#07DABF]">0</strong>
                                <IconLeftArrow class="fill-l-lv2"/>
                            </div>
                        </div>
                       
                        <router-link to="/factory/list" class="block flex-1 main-card-container-box">
                            <h2 class="flex gap-2 justify-start items-center text-sm font-bold whitespace-nowrap sm:text-base">
                                <img src="@/assets/img/img-truck.svg" alt="배송대기" title="배송 대기" class="w-[1rem] sm:w-[1.375rem] m-[-1px]"/>
                                배송대기
                            </h2>
                            <div class="mt-[0.125rem] text-11 sm:text-13 text-t-lv4">배송 대기</div>
                            <div class="mt-[0.125rem] flex justify-between items-center w-full">
                                <strong class="flex h-[1.375rem] pl-[1px] items-center text-22 font-bold text-yellow-300">0</strong>
                                <IconLeftArrow class="fill-l-lv2"/>
                            </div>
                        </router-link>
                    </div>
                </main>
                
                <!-- aside 섹션 -->
                <aside class="flex flex-col gap-[14px] px-[16px] md:px-0">
                    <!-- 플랜톡 -->
                    <section class="main-card-container-box">
                        <div class="main-card-tilte-box">
                            <div class="flex gap-2.5 justify-center items-center">
                                <div class="flex justify-center items-center p-2 bg-yellow-300 rounded-full size-8">
                                    <img src="@/assets/img/icon-kakao.svg" alt="카카오톡" title="카카오톡" class="mx-auto"/>
                                </div>
                                <div>
                                    <div class="flex gap-1 items-center">
                                        <h2 class="text-xs sm:text-sm">플랜톡</h2>
                                        <span v-if="main['kakaoYn'] === 'N'" class="text-xs text-t-lv3">OFF</span>
                                        <span v-else class="text-xs text-sky-500 rounded-full">ON</span>
                                        <!-- <span v-if="main['kakaoYn'] === 'N'" class="px-1.5 text-xs text-white bg-red-500 rounded-full">OFF</span>
                                        <span v-else class="px-1.5 text-xs text-white bg-sky-400 rounded-full">ON</span> -->
                                    </div>
                                    <div v-if="main['kakaoYn'] === 'Y'" class="flex gap-2 text-11 sm:text-13 !font-normal text-t-lv4 mt-[-0.125rem]">
                                        <span>{{ main.kakaoUseCnt }}개 사용중</span>
                                        <span>|</span>
                                        <span>잔여 포인트 <span class="">0P</span></span>
                                    </div>
                                </div>
                            </div>
                            <Button v-if="main['kakaoYn'] === 'Y'" label="설정" severity="secondary" size="small" class="!px-3 !py-2  !bg-bg-lv2 *:!text-xs *:!text-t-lv2" @click="router.push({ path : '/plantalk' });"></Button>
                        </div>
                        <div class="main-card-container-box-padding">
                            <div v-if="main['kakaoYn'] === 'N'">
                                <p class="px-3 py-2 w-full bg-[#FFFBE2] border border-yellow-100 rounded text-11 leading-[1.3]">일일이 세팅하지 말고, 꼭 필요한 예약 메시지를 자동으로 고객에게 전달해 보세요!</p>
                                <Button label="플랜톡 사용하기" class="w-full mt-[14px] *:!text-sm !border-none !py-[0.625rem] *:!font-semibold" @click="getPlanTalk"></Button>
                            </div>        
                            <ul v-else class="grid grid-cols-2 gap-2 *:bg-bg-lv1 *:p-3 *:rounded-lg *:flex *:flex-col *:gap-px text-xs mt-[0.875rem]">
                                <li class="cursor-pointer" @click="getKakaoHistory('Y')">
                                    <h5 class="font-bold">예약된 알림</h5>
                                    <div class="flex justify-between items-center">
                                        <p class="text-zinc-400">상세보기</p>
                                        <IconLeftArrow class="w-[0.4375rem] fill-l-lv2"/>
                                    </div>
                                </li>
                                <li class="cursor-pointer" @click="getKakaoHistory('N')">
                                    <h5 class="font-bold">보낸 알림</h5>
                                    <div class="flex justify-between items-center">
                                        <p class="text-zinc-400">
                                            오늘
                                            <span class="text-red-500">{{ main.kakaoSendCnt }}건</span>
                                        </p>
                                        <IconLeftArrow class="w-[0.4375rem] fill-l-lv2"/>
                                    </div>
                                </li>
                            </ul>                            
                        </div>
                    </section>
                    <div class="grid grid-cols-2 gap-[14px]">
                        <!-- 나의 메시지 -->
                        <section class="col-span-2 lg:col-span-1 main-card-container-box">
                            <div class="!items-start main-card-tilte-box">
                                <div class="flex items-center gap-[10px]">
                                    <div class="flex flex-none items-center justify-center w-[2.75rem] h-[2.75rem] rounded-full bg-[#E2F0FF] text-[1.625rem] overflow-hidden">
                                        <div class="imoji-shadow">📨</div>
                                    </div>
                                    <div class="flex flex-col-reverse gap-0.5 items-start">
                                        <h2 class="flex justify-center items-center font-bold text-18">
                                            나의 메시지
                                        </h2>
                                        <p class="font-semibold truncate text-10 text-t-lv4 sm:text-11">
                                            매장 응대 톤앤매너도 통일돼요!
                                        </p>
                                    </div>
                                </div>
                                <Button label="메세지 추가" size="small" class="mt-0.5" @click="getMsg('', 'I')"></Button>
                            </div>
                            <ul class="flex flex-col pt-2 pb-3 w-full">
                                <li v-for="(item, index) in main['msgList']" :key="index" class="flex gap-3.5 justify-between items-center pl-1 w-full cursor-pointer" @click="getMsg(item.msCd, 'U')">
                                    <div class="flex flex-none items-center justify-center w-[2.25rem] h-[2.25rem] rounded-full bg-[#eef0f2] text-[1.25rem]">😊</div>
                                    <!-- {{ index + 1 }} -->
                                    <div class="flex flex-1 gap-2 items-center py-2.5 min-w-0 border-b border-l-lv5">
                                        <div class="flex flex-col flex-1 gap-0.5 mt-0.5 min-w-0">
                                            <strong class="text-xs font-bold leading-tight truncate sm:text-sm text-t-lv1">
                                                {{ item.title }}
                                            </strong>
                                            <div class="font-semibold truncate text-10 text-t-lv4 sm:text-11">
                                                {{ item.description }}
                                            </div>
                                        </div>
                                        <div class="flex flex-none justify-end items-center w-[2rem] pr-1.5 size-7">
                                            <IconLeftArrow class="w-3 fill-l-lv3"/>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </section>
                        
                        <!-- 메세지 템플릿 -->
                        <section class="col-span-2 lg:col-span-1 main-card-container-box">
                            <div class="!items-start main-card-tilte-box">
                                <div class="flex items-center gap-[10px]">
                                    <div class="flex flex-none items-center justify-center w-[2.75rem] h-[2.75rem] rounded-full bg-[#FEEDEA] text-[1.625rem] overflow-hidden">
                                        <div class="imoji-shadow">💊</div>
                                    </div>
                                    <div class="flex flex-col-reverse gap-0.5 items-start">
                                        <h2 class="flex justify-center items-center font-bold text-18">
                                            방역관리 안심문자
                                        </h2>
                                        <p class="font-semibold truncate text-10 text-t-lv4 sm:text-11">
                                            고객이 안심하고 방문하도록 안내해요.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <ul class="flex flex-col pt-2 pb-3 w-full">
                                <li class="flex gap-3.5 justify-between items-center pl-1 w-full cursor-pointer">
                                    <div class="flex flex-none items-center justify-center w-[2.25rem] h-[2.25rem] rounded-full bg-[#eef0f2] text-[1.25rem]">😷</div>
                                    <div class="flex flex-1 gap-2 items-center py-2.5 min-w-0 border-b border-l-lv5">
                                        <div class="flex flex-col flex-1 gap-0.5 mt-0.5 min-w-0">
                                            <strong class="text-xs font-bold leading-tight truncate sm:text-sm text-t-lv1">
                                                매장 방역관리 알리기
                                            </strong>
                                            <div class="font-semibold truncate text-10 text-t-lv4 sm:text-11">
                                                매장이 수시로 안전하게 방역중임을 알리세요.
                                            </div>
                                        </div>
                                        <div class="flex flex-none justify-end items-center w-[2rem] pr-1.5 size-7">
                                            <IconLeftArrow class="w-3 fill-l-lv3"/>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </section>

                        <!-- 퍼블 확인용 Draft -->
                        <section class="col-span-2 lg:col-span-1 main-card-container-box">
                            <div class="!items-start main-card-tilte-box">
                                <div class="flex items-center gap-[10px]">
                                    <div class="flex flex-none items-center justify-center w-[2.75rem] h-[2.75rem] rounded-full bg-[#CFF9E3] text-[1.625rem] overflow-hidden">
                                        <div class="imoji-shadow">⏳</div>
                                    </div>
                                    <div class="flex flex-col-reverse gap-0.5 items-start">
                                        <h2 class="flex justify-center items-center font-bold text-18">
                                            견적후 고민 중인 고객 문자
                                        </h2>
                                        <p class="font-semibold truncate text-10 text-t-lv4 sm:text-11">
                                            견적서 받은 후 “생각해볼게요" 상황 응대문자
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <ul class="flex flex-col pt-2 pb-3 w-full">
                                <li class="flex gap-3.5 justify-between items-center pl-1 w-full cursor-pointer">
                                    <div class="flex flex-none items-center justify-center w-[2.25rem] h-[2.25rem] rounded-full bg-[#eef0f2] text-[1.25rem]">🕰</div>
                                    <div class="flex flex-1 gap-2 items-center py-2.5 min-w-0 border-b border-l-lv5">
                                        <div class="flex flex-col flex-1 gap-0.5 mt-0.5 min-w-0">
                                            <strong class="text-xs font-bold leading-tight truncate sm:text-sm text-t-lv1">
                                                견적 리마인드 문자
                                            </strong>
                                            <div class="font-semibold truncate text-10 text-t-lv4 sm:text-11">
                                                고객이 며칠째 답이 없을때 자연스럽게 문자해보아요.
                                            </div>
                                        </div>
                                        <div class="flex flex-none justify-end items-center w-[2rem] pr-1.5 size-7">
                                            <IconLeftArrow class="w-3 fill-l-lv3"/>
                                        </div>
                                    </div>
                                </li>
                                <li class="flex gap-3.5 justify-between items-center pl-1 w-full cursor-pointer">
                                    <div class="flex flex-none items-center justify-center w-[2.25rem] h-[2.25rem] rounded-full bg-[#eef0f2] text-[1.25rem]">💬</div>
                                    <div class="flex flex-1 gap-2 items-center py-2.5 min-w-0 border-b border-l-lv5">
                                        <div class="flex flex-col flex-1 gap-0.5 mt-0.5 min-w-0">
                                            <strong class="text-xs font-bold leading-tight truncate sm:text-sm text-t-lv1">
                                                결정을 도와드리는 배려형 문자
                                            </strong>
                                            <div class="font-semibold truncate text-10 text-t-lv4 sm:text-11">
                                                고객이 고민 중이라고 말했을 때, 배려 있는 제안
                                            </div>
                                        </div>
                                        <div class="flex flex-none justify-end items-center w-[2rem] pr-1.5 size-7">
                                            <IconLeftArrow class="w-3 fill-l-lv3"/>
                                        </div>
                                    </div>
                                </li>
                                <li class="flex gap-3.5 justify-between items-center pl-1 w-full cursor-pointer">
                                    <div class="flex flex-none items-center justify-center w-[2.25rem] h-[2.25rem] rounded-full bg-[#eef0f2] text-[1.25rem]">🎁</div>
                                    <div class="flex flex-1 gap-2 items-center py-2.5 min-w-0 border-b border-l-lv5">
                                        <div class="flex flex-col flex-1 gap-0.5 mt-0.5 min-w-0">
                                            <strong class="text-xs font-bold leading-tight truncate sm:text-sm text-t-lv1">
                                                혜택으로 부드럽게 유도하기
                                            </strong>
                                            <div class="font-semibold truncate text-10 text-t-lv4 sm:text-11">
                                                이번 주만 가능한 작은 혜택으로 제안해보아요.
                                            </div>
                                        </div>
                                        <div class="flex flex-none justify-end items-center w-[2rem] pr-1.5 size-7">
                                            <IconLeftArrow class="w-3 fill-l-lv3"/>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </section>
                        <section class="col-span-2 lg:col-span-1 main-card-container-box">
                            <div class="!items-start main-card-tilte-box">
                                <div class="flex items-center gap-[10px]">
                                    <div class="flex flex-none items-center justify-center w-[2.75rem] h-[2.75rem] rounded-full bg-[#FFF5EC] text-[1.625rem] overflow-hidden">
                                        <div class="imoji-shadow">✋</div>
                                    </div>
                                    <div class="flex flex-col-reverse gap-0.5 items-start">
                                        <h2 class="flex justify-center items-center font-bold text-18">
                                            재구매 유도 환영문자
                                        </h2>
                                        <p class="font-semibold truncate text-10 text-t-lv4 sm:text-11">
                                            시공완료후 재구매와 지인소개를 유도하세요.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <ul class="flex flex-col pt-2 pb-3 w-full">
                                <li class="flex gap-3.5 justify-between items-center pl-1 w-full cursor-pointer">
                                    <div class="flex flex-none items-center justify-center w-[2.25rem] h-[2.25rem] rounded-full bg-[#eef0f2] text-[1.25rem]">👱‍♀</div>
                                    <div class="flex flex-1 gap-2 items-center py-2.5 min-w-0 border-b border-l-lv5">
                                        <div class="flex flex-col flex-1 gap-0.5 mt-0.5 min-w-0">
                                            <strong class="text-xs font-bold leading-tight truncate sm:text-sm text-t-lv1">
                                                젊은 고객 환영하기
                                            </strong>
                                            <div class="font-semibold truncate text-10 text-t-lv4 sm:text-11">
                                                처음 방문하는 젊은고객을 환영해요.
                                            </div>
                                        </div>
                                        <div class="flex flex-none justify-end items-center w-[2rem] pr-1.5 size-7">
                                            <IconLeftArrow class="w-3 fill-l-lv3"/>
                                        </div>
                                    </div>
                                </li>
                                <li class="flex gap-3.5 justify-between items-center pl-1 w-full cursor-pointer">
                                    <div class="flex flex-none items-center justify-center w-[2.25rem] h-[2.25rem] rounded-full bg-[#eef0f2] text-[1.25rem]">👨‍🦳</div>
                                    <div class="flex flex-1 gap-2 items-center py-2.5 min-w-0 border-b border-l-lv5">
                                        <div class="flex flex-col flex-1 gap-0.5 mt-0.5 min-w-0">
                                            <strong class="text-xs font-bold leading-tight truncate sm:text-sm text-t-lv1">
                                                중년 고객 환영하기
                                            </strong>
                                            <div class="font-semibold truncate text-10 text-t-lv4 sm:text-11">
                                                처음 방문하는 중년고객을 환영해요.
                                            </div>
                                        </div>
                                        <div class="flex flex-none justify-end items-center w-[2rem] pr-1.5 size-7">
                                            <IconLeftArrow class="w-3 fill-l-lv3"/>
                                        </div>
                                    </div>
                                </li>
                                <li class="flex gap-3.5 justify-between items-center pl-1 w-full cursor-pointer">
                                    <div class="flex flex-none items-center justify-center w-[2.25rem] h-[2.25rem] rounded-full bg-[#eef0f2] text-[1.25rem]">🌈</div>
                                    <div class="flex flex-1 gap-2 items-center py-2.5 min-w-0 border-b border-l-lv5">
                                        <div class="flex flex-col flex-1 gap-0.5 mt-0.5 min-w-0">
                                            <strong class="text-xs font-bold leading-tight truncate sm:text-sm text-t-lv1">
                                                할인과 함께 재구매 유도하기
                                            </strong>
                                            <div class="font-semibold truncate text-10 text-t-lv4 sm:text-11">
                                                할인쿠폰으로 고객의 방문을 환영해요.
                                            </div>
                                        </div>
                                        <div class="flex flex-none justify-end items-center w-[2rem] pr-1.5 size-7">
                                            <IconLeftArrow class="w-3 fill-l-lv3"/>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </section>
                        <section class="col-span-2 lg:col-span-1 main-card-container-box">
                            <div class="!items-start main-card-tilte-box">
                                <div class="flex items-center gap-[10px]">
                                    <div class="flex flex-none items-center justify-center w-[2.75rem] h-[2.75rem] rounded-full bg-[#F4F1FE] text-[1.625rem] overflow-hidden">
                                        <div class="imoji-shadow">🤬</div>
                                    </div>
                                    <div class="flex flex-col-reverse gap-0.5 items-start">
                                        <h2 class="flex justify-center items-center font-bold text-18">
                                            불만고객 사과문자
                                        </h2>
                                        <p class="font-semibold truncate text-10 text-t-lv4 sm:text-11">
                                            고객의 서운한 마음을 풀어주세요.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <ul class="flex flex-col pt-2 pb-3 w-full">
                                <li class="flex gap-3.5 justify-between items-center pl-1 w-full cursor-pointer">
                                    <div class="flex flex-none items-center justify-center w-[2.25rem] h-[2.25rem] rounded-full bg-[#eef0f2] text-[1.25rem]">👿</div>
                                    <div class="flex flex-1 gap-2 items-center py-2.5 min-w-0 border-b border-l-lv5">
                                        <div class="flex flex-col flex-1 gap-0.5 mt-0.5 min-w-0">
                                            <strong class="text-xs font-bold leading-tight truncate sm:text-sm text-t-lv1">
                                                불만 해결로 고객 달래기
                                            </strong>
                                            <div class="font-semibold truncate text-10 text-t-lv4 sm:text-11">
                                                간접적으로 불만을 표현하는 고객을 달래보세요.
                                            </div>
                                        </div>
                                        <div class="flex flex-none justify-end items-center w-[2rem] pr-1.5 size-7">
                                            <IconLeftArrow class="w-3 fill-l-lv3"/>
                                        </div>
                                    </div>
                                </li>
                                <li class="flex gap-3.5 justify-between items-center pl-1 w-full cursor-pointer">
                                    <div class="flex flex-none items-center justify-center w-[2.25rem] h-[2.25rem] rounded-full bg-[#eef0f2] text-[1.25rem]">🛠</div>
                                    <div class="flex flex-1 gap-2 items-center py-2.5 min-w-0 border-b border-l-lv5">
                                        <div class="flex flex-col flex-1 gap-0.5 mt-0.5 min-w-0">
                                            <strong class="text-xs font-bold leading-tight truncate sm:text-sm text-t-lv1">
                                                재 시공으로 불만고객 붙잡기
                                            </strong>
                                            <div class="font-semibold truncate text-10 text-t-lv4 sm:text-11">
                                                강한 불만을 표현하는 고객에게 사과해보아요.
                                            </div>
                                        </div>
                                        <div class="flex flex-none justify-end items-center w-[2rem] pr-1.5 size-7">
                                            <IconLeftArrow class="w-3 fill-l-lv3"/>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </section>
                    </div>
                </aside>
            </div>
        </div>
    </div>
    <Dialog v-model:visible="popup['pop']['estiDetail']" header="견적 목록" 
        :modal=true position="center" class="custom-dialog-full" 
        @update:visible="getPopupClose('estiDetail', true)">
        <template #header>
            <div class="modal-backheader">
                <Button @click="getPopupClose('estiDetail', true)" severity="contrast" text icon="pi pi-times" />
                <h2 class="modal-backheader-title">견적 목록</h2>
            </div>
        </template>
        <EstiDetail/>
    </Dialog>
    <Dialog v-model:visible="popup['pop']['chatRoom']" header="채팅방 목록" 
        :modal=true position="center" class="custom-dialog-full" 
        @update:visible="getPopupClose('chatRoom', true)">
        <template #header>
            <div class="modal-backheader">
                <Button @click="getPopupClose('chatRoom', true)" severity="contrast" text icon="pi pi-times" />
                <h2 class="modal-backheader-title">채팅방</h2>
            </div>
        </template>
        <ChatRoomModal/>
    </Dialog>

    <Dialog v-model:visible="popup['pop']['clientChoice']" 
        :modal=true position="center" class="w-96 max-w-96 custom-dialog-center" :dismissable-mask="true"
        @update:visible="getPopupClose(true, 'clientChoice')">
        <template #header>
            <div class="modal-backheader">
                <Button @click="getPopupClose(true, 'clientChoice')" severity="contrast" text icon="pi pi-times"/>
                <h2 class="modal-backheader-title">고객 구분</h2>
            </div>
        </template>
        <div class="pt-3">
            <CustomerChoice :gubun="'E'" @getApply="getDisApply" @getClose="getPopupClose('clientChoice', true)"/>
        </div>
    </Dialog>

    <Dialog v-model:visible="popup['pop']['clientSet']" 
        header="고객 등록"
        :modal=true
        position="center"
        class="custom-dialog-full"
        @update:visible="getPopupClose('clientSet', true)">
        <template #header>
            <div class="modal-backheader">
                <Button @click="getPopupClose('clientSet', true)" severity="contrast" text icon="pi pi-times" iconPos="right"/>
                <h2 class="modal-backheader-title">고객등록</h2>
            </div>
        </template>
        <CustomerListSet/>
    </Dialog>
</div>  
</template>

<script setup lang="ts">
import { useConfirm } from "primevue/useconfirm";
import { onMounted } from 'vue';
import { useMainStore, usePopupStore, useClientStore, useKakaoStore, useChatStore, useMsgStore } from '@/store';
import { useRouter } from 'vue-router';
import IconAddCircle from '@/components/icons/IconAddCircle.vue';
import IconLeftArrow from '@/components/icons/IconLeftArrow.vue';
import EstiDetail from "@/views/include/customer/EstiDetail.vue";
import ChatRoomModal from "@/views/customer/ChatRoomModal.vue";
import CustomerChoice from '@/components/modal/CustomerChoice.vue'
import CustomerListSet from '@/views/include/CustomerListSet.vue'
import { usePopup } from '@/assets/js/popup';

const confirm   = useConfirm();
const main      = useMainStore();
const popup     = usePopupStore();
const client    = useClientStore();
const kakao     = useKakaoStore();
const chat      = useChatStore();
const msg       = useMsgStore();
const router    = useRouter();

const { getPopupOpen, getPopupClose } = usePopup();

const getPopOpen = () => {
    getPopupOpen('clientChoice');
    client.getReset();
}

const getChatOpen = async () => {
    await chat.getCrCdNull();
    await chat.getRoom();

    router.push({ path : '/customer/chatList' });
}

const getStCd = async (stCd: string) => {
    await client.getStCd(stCd);
    if(client.stCd === '')
    {
        router.push({ path : '/customer/list' });
    }
    else
    {
        router.push({ path : '/customer/estiDetail' });
    }
}

const getKakaoHistory = async (resGb: 'Y' | 'N') => {
    await kakao.getResGb(resGb);
    router.push({ path : '/plantalk/res' })
}

const getPlanTalk = () => {
    confirm.require({
        message     : '카카오톡을 사용하시겠습니까?',
        header      : '카카오톡',
        rejectProps : {
            label       : '취소',
            severity    : 'secondary',
            outlined    : true
        },
        acceptProps : {
            label: '확인'
        },
        accept : async () => {
            const data = await kakao.getKakaoActive();

            if(data['result'])
            {
                main.getData();
            }
        }
    });
}

const getMsg = async (msCd: string, type: 'I'|'U') => {
    await msg.getReset();

    if(type === 'U')
    {
        await msg.getMsCd(msCd);
    }

    router.push({ path : '/msg' });
}

onMounted(() => {
    main.getData();
})
</script>

<style lang="scss">

.scroll-bar-thin {
  scrollbar-width:thin;
}
</style>