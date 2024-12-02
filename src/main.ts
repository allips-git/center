import './assets/main.css'
import 'primeicons/primeicons.css';
import './assets/primevue_custom.scss';

import { createApp } from 'vue'

import { definePreset } from '@primevue/themes';
import PrimeVue from 'primevue/config';

import App from './App.vue'
import router from './router'
import { setupStore } from '@/store'

import Button from 'primevue/button';
import InputText from 'primevue/inputtext'; 
import Select from 'primevue/select'; 
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import Dialog from 'primevue/dialog'; 
import Tooltip from 'primevue/tooltip';

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

import Aura from '@primevue/themes/aura';

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{indigo.50}',
            100: '{indigo.100}',
            200: '{indigo.200}',
            300: '{indigo.300}',
            400: '{indigo.400}',
            500: '{indigo.500}',
            600: '{indigo.600}',
            700: '{indigo.700}',
            800: '{indigo.800}',
            900: '{indigo.900}',
            950: '{indigo.950}'
        },
        overlay: {
            popover: {
                padding: '0.75rem',
            },
        },
        colorScheme: {
            light: {
                formField: {
                    placeholderColor: '{surface.400}',
                    disabledBackground: '{surface.100}',
                },
            },
        }
    }, 
});

// PrimeVue에 테마 적용
app.use(PrimeVue, {
    theme: {
        preset: MyPreset,
        options: {
            darkModeSelector: '.dark', // 다크 모드 선택기
        }
    },
});

setupStore(app);
app.use(router);
app.mount('#app');
