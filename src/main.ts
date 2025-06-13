import './assets/main.css'
import 'primeicons/primeicons.css';
import './assets/primevue_custom.scss';

const isAndroid = /Android/i.test(navigator.userAgent);
const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

if (isAndroid) {
  document.documentElement.classList.add('android');
} else if (isIOS) {
  document.documentElement.classList.add('ios');
}

if (/iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent) && 'ontouchend' in document) {
    document.documentElement.classList.add('ios');
  }

import { createApp } from 'vue'

import { definePreset } from '@primevue/themes';
import PrimeVue from 'primevue/config';

import App from './App.vue'
import router from './router'
import { setupStore } from '@/store'
import { datePickerLocales } from '@/locales/datepicker'; // 데이트 피크 언어 변경 로케일

import Button from 'primevue/button';
import InputText from 'primevue/inputtext'; 
import Select from 'primevue/select'; 
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import Dialog from 'primevue/dialog'; 
import Tooltip from 'primevue/tooltip';
import KeyFilter from 'primevue/keyfilter';

const app = createApp(App)

app.use(ConfirmationService);
app.use(ToastService);
// PrimeVue 컴포넌트 등록
app.component('Button', Button);
app.component('InputText', InputText);
app.component('ConfirmDialog', ConfirmDialog);
app.component('Dialog', Dialog);
app.component('Select', Select);
app.directive('tooltip', Tooltip);
app.directive('keyfilter', KeyFilter);

import Aura from '@primevue/themes/aura';

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{sky.50}',
            100: '{sky.100}',
            200: '{sky.200}',
            300: '{sky.300}',
            400: '{sky.400}',
            500: '{sky.500}',
            600: '{sky.600}',
            700: '{sky.700}',
            800: '{sky.800}',
            900: '{sky.900}',
            950: '{sky.950}'
        },
        sky:{
            500: '#00AEF2',
        },
        overlay: {
            popover: {
                padding: '0.75rem',
            },
        },
        colorScheme: {
            light: {
                formField: {
                    placeholderColor: '#C1C1C1',
                    disabledBackground: '{surface.100}',
                    borderColor:'#E4E5E9'
                },
            },
        }
    }, 
});
const storedLocale = (localStorage.getItem('locale') || 'ko') as 'en' | 'ko';
// PrimeVue에 테마 적용
app.use(PrimeVue, {
    theme: {
        preset: MyPreset,
        options: {
            darkModeSelector: '.dark', // 다크 모드 선택기
        }
    },
    locale: datePickerLocales[storedLocale as keyof typeof datePickerLocales] // 초기 로케일 설정
});

setupStore(app);
app.use(router);
app.mount('#app');
