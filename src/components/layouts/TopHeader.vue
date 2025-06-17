<template>
<header class=" bg-white px-4 border-b border-gray-100 flex justify-between items-center md:pl-4 md:pr-3 w-full z-50 dark:bg-zinc-800 dark:border-zinc-700 no-print  top-0 md:h-[60px] md:shadow-[0px_1px_4px_1px_rgba(0,0,0,0.05)] flex-none top-header">
    <div class="flex items-center gap-2"> 

        <div class="mobile-hidden">
            <Button icon="pi pi-bars" variant="text" rounded severity="contrast" text  plain size="large" @click="handleClick"/>
        </div>
        <!-- pc button -->
        <div class="flex items-center justify-between flex-none md:gap-1">
            <router-link class="" to="/"><p class="hidden text-2xl text-indigo-600 md:blockfont-extrabold whitespace-nowrap dark:text-indigo-500">PlanOrder Center</p></router-link>
            <Button class="w-[1.875rem] !p-0 flex items-center justify-center h-12" text plain @click="toggleNotificationPopover($event)">
                <IconAvatar class="*:text-blue-200 w-7 h-7 md:w-9 md:h-9"/>
            </Button>
        </div>
    </div>

    <h1 class="text-sm font-bold">{{ login['name'] }}</h1>
    <IconBell class="cursor-pointer fill-t-lv2" @click="open  = true"/>
    <TransitionRoot as="template" :show="open">
        <Dialog class="relative z-10" @close="open = false">
            <div class="fixed inset-0" />
                <div class="fixed inset-0 overflow-hidden">
                    <div class="absolute inset-0 overflow-hidden">
                        <div class="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none sm:pl-16">
                            <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
                                <DialogPanel class="w-screen max-w-md pointer-events-auto ">
                                <div class="flex flex-col h-full overflow-y-auto bg-white shadow-xl">
                                    <div class="p-4">
                                        <div class="flex items-start justify-between">
                                    <DialogTitle class="flex items-center text-base font-semibold text-gray-900">
                                        <p>알림</p>
                                        <IconBell class="fill-t-lv2" />
                                    </DialogTitle>
                                    <div class="flex items-center ml-3 h-7">
                                        <button type="button" class="relative text-gray-400 bg-white rounded-md hover:text-gray-500 focus-visible:ring-2 focus-visible:ring-indigo-500" @click="open = false">
                                            <span class="absolute -inset-2.5" />
                                            <span class="sr-only">Close panel</span>
                                            <XMarkIcon class="size-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                        </div>
                                    </div>
                                <div class="border-b border-gray-200">
                                  
                                </div>
                                <div class="h-full bg-bg-lv2">
                                   <ul>
                                        <li class="border-b border-[#EAEDF2] p-4">
                                            <div class="flex justify-between">
                                                <h3 class="mb-2 text-base">발주가 반려되었습니다.</h3>
                                                <p class="text-xs">2025.06.07</p>
                                            </div>
                                            <h5 class="text-sm text-t-lv2">반려사유</h5>
                                            <h5 class="text-sm text-t-lv2">반려사유</h5>
                                        </li>
                                   </ul>
                                </div>
                                </div>
                            </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </div>
           
        </Dialog>
    </TransitionRoot>

</header>
<div class="">
    <Popover class="custom-logout" ref="notificationPopover" dismissable> 
        <div class="flex flex-col">
            <Button :label="'로그아웃'" icon="pi pi-sign-out" severity="danger" text  size="small" @click="getLogOut"/>
        </div>
    </Popover>
</div>
    <Drawer v-model:visible="moSideHeader" header="" class="custom-drawer" position="left">
        <template #header>
            <div class="flex items-center justify-end w-full gap-2" >
            </div>
        </template>
        <SideHeader 
        :drawerClass="false" 
        @closeDrawer="moSideHeader = true"
        />
    </Drawer>
</template>

<script setup lang="ts">
import { ref, nextTick, defineEmits } from 'vue';

// import { changeLanguage } from '@/locales/i18n'; // named import로 수정
import IconAvatar from '@/components/icons/IconAvatar.vue';
import IconLogo from '@/components/icons/IconLogo.vue';
import Button from 'primevue/button';
import Popover from 'primevue/popover';
import Drawer from 'primevue/drawer';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import SideHeader from '@/components/layouts/SideHeader.vue'
import { useRouter } from 'vue-router';
import { useLoginStore } from '@/store';
import IconBell from '../icons/IconBell.vue';

const open = ref(false);
const router = useRouter();

const emit = defineEmits<{
  (e: 'toggleHeader'): void;
}>();

function handleClick() {
    console.log('test');
  emit('toggleHeader'); // 부모에 toggleHeader 이벤트를 발생시킴
}

const moSideHeader = ref(false);

const login = useLoginStore();

const getLogOut = () => {
    login.getLogout();
    router.push({ path : '/login' });
}

const toggleDarkMode = () => {
    const element = document.querySelector('html');
    isDarkMode.value = !isDarkMode.value; // 상태 반전
    if (isDarkMode.value) {
        element.classList.add('dark');
        // 다크 모드일 때
        items.value[0].label = '라이트 모드로 변경';
        items.value[0].icon = 'pi pi-sun';
    } else {
        element.classList.remove('dark');
        // 라이트 모드일 때
        items.value[0].label = '다크 모드로 변경';
        items.value[0].icon = 'pi pi-moon';
    }
};


const notificationPopover = ref<InstanceType<typeof Popover> | null>(null);

// notificationPopover 토글 함수 정의
const toggleNotificationPopover = async (event: MouseEvent) => {
    await nextTick();
    if (notificationPopover.value) {
        notificationPopover.value.toggle(event);
    }
};

const AlarmPopover = ref<InstanceType<typeof Popover> | null>(null);

const toggleAlarmPopover = async (event: MouseEvent) => {
    await nextTick();
    if (AlarmPopover.value) {
        AlarmPopover.value.toggle(event);
    }
};

const isDarkMode = ref(false); 
const menu = ref();
const items = ref([
    {
        label: isDarkMode.value ? '라이트 모드로 변경' : '다크 모드로 변경',
        icon: isDarkMode.value ? 'pi pi-sun' : 'pi pi-moon',
        command: () => toggleDarkMode(),
    },
    {
        label: '언어 변경',
        icon: ' pi pi-language',
        items: [
            {   label: '한국어',
                command: () => changeLanguage('ko'),
            },
            { 
                label: 'Engilsh',
                command: () => changeLanguage('en'),
            }
        ],
    },
]);

// const { t, locale } = useI18n();
// const currentLanguage = ref(locale.value);

// const datePickerLocale = ref(datePickerLocales.ko); // 초기 로케일 설정

// watch(locale, (newLocale) => {
//     currentLanguage.value = newLocale === 'ko' ? 'KO' : 'EN';
//     datePickerLocale.value = datePickerLocales[newLocale]; // 데이트 피커 로케일 업데이트
//     localStorage.setItem('locale', newLocale); // 로컬 스토리지에 저장
// });

// const changeLanguage = (newLocale) => {
//   locale.value = newLocale; // vue-i18n의 locale 변경
//   localStorage.setItem('locale', newLocale); // 로컬 스토리지에 저장
//   location.reload(); // 페이지 새로 고침
// };


// const toggle = (event) => {
//     menu.value.toggle(event);
// };

// 컴포넌트가 마운트될 때 기본 로케일 설정
// onMounted(() => {
   
//     datePickerLocale.value = datePickerLocales[locale.value]; // 초기 데이트 피커 로케일 설정
// });
 </script>

