<template>
<header class="bg-white h-[48px] border-b border-gray-100 flex justify-between items-center md:pl-4 md:pr-3 px-3 w-full z-50 dark:bg-zinc-800 dark:border-zinc-700 no-print  top-0 md:h-[60px] md:shadow-[0px_1px_4px_1px_rgba(0,0,0,0.05)] flex-none">
    <div class="flex items-center gap-2"> 
        <!-- <div class="pc-hidden">
            <Button icon="pi pi-bars" severity="contrast" text  plain size="large" @click="moSideHeader=true"/>
        </div> -->
        <div class="mobile-hidden">
            <Button icon="pi pi-bars" variant="text" rounded severity="contrast" text  plain size="large" @click="handleClick"/>
        </div>
        <!-- pc button -->
        <div class="flex items-center flex-none gap-1">
            <li class="w-full h-[32px] md:h-[48px] pl-2 flex items-center justify-center"><IconLogo class="fill-indigo-600 dark:fill-indigo-500 size-7"/></li>            
            <router-link class="" to="/"><p class="hidden text-2xl text-indigo-600 md:blockfont-extrabold whitespace-nowrap dark:text-indigo-500">PlanOrder Center</p></router-link>
        </div>
    </div>
    
    <div class="flex items-center gap-2">
        <!-- <Button class="*:!text-xl" icon="pi pi-bell" severity="contrast" text plain  @click="toggleAlarmPopover($event)" />
        <Popover class="custom-popover" ref="AlarmPopover" dismissable> 
            <div class="w-full p-3 overflow-y-auto min-w-80 max-w-96 max-h-96">
                <h1 class="mb-2 text-sm font-bold">알림</h1>
                <Alarm :headerState="headerState"/>
            </div>
        </Popover> -->
        <!-- <Button class="*:!text-2xl h-12" icon="pi pi-cog" severity="contrast" text  plain @click="toggle"/>
        <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup>
            <template #item="{ item, props }">
                <a class="flex items-center !gap-1" v-bind="props.action" inert>
                    <span class="!text-sm" :class="item.icon" />
                    <span class="text-sm">{{ item.label }}</span>
                </a>
            </template>
        </TieredMenu> -->
        <Button class="w-12 !p-0 flex items-center justify-center h-12" text plain @click="toggleNotificationPopover($event)">
            <IconAvatar class="*:text-blue-200 w-7 h-7 md:w-9 md:h-9"/>
        </Button>
        <Popover class="" ref="notificationPopover" dismissable> 
            <div class="flex flex-col">
                <Button :label="t('btn.logout')" icon="pi pi-sign-out" severity="danger" text  size="small" @click="getLogOut"/>
            </div>
        </Popover>

        <!-- <div class="pc-hidden">
            <Button icon="pi pi-bars" severity="contrast" text  plain size="large" @click="moSideHeader=true"/>
        </div> -->
    </div>
</header>
    <Drawer v-model:visible="moSideHeader" header="" class="custom-drawer" position="left">
        <template #header>
            <div class="flex items-center justify-end w-full gap-2" >
            </div>
        </template>
        <SideHeader 
        :drawerClass="true" 
        @closeDrawer="moSideHeader = false"
        />
    </Drawer>
</template>

<script setup lang="ts">
import { ref, nextTick, watch, defineEmits,onMounted } from 'vue';

// import { changeLanguage } from '@/locales/i18n'; // named import로 수정
import IconAvatar from '@/components/icons/IconAvatar.vue';
import IconLogo from '@/components/icons/IconLogo.vue';
import Button from 'primevue/button';
import Popover from 'primevue/popover';
import TieredMenu from 'primevue/tieredmenu';
import Drawer from 'primevue/drawer';
import SideHeader from '@/components/layouts/SideHeader.vue'
import Alarm from '@/components/Alarm.vue'

const headerState = ref(true); // 불리언 변수, 중요 여부


const headMenu = ref([]); // 메뉴 항목을 정의합니다.
const hoveredIndex = ref(-1); // 현재 hover된 인덱스를 저장합니다.


const emit = defineEmits<{
  (e: 'toggleHeader'): void;
}>();

function handleClick() {
  emit('toggleHeader'); // 부모에 toggleHeader 이벤트를 발생시킴
}

const moSideHeader = ref(false);

// const login = useLoginStore();

// const getLogOut = () => {
//     login.getLogout();
// }

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

