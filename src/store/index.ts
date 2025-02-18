import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import type { App } from 'vue';

import { useDataStore } from './modules/data';
import { usePopupStore } from './modules/popup';
import { useJoinStore } from './modules/join';
import { useLoginStore } from './modules/login';
import { useMainStore } from './modules/main';
import { useClientStore } from './modules/client';
import { useProductStore } from './modules/product';
import { useEstiStore } from './modules/esti';
import { useContractStore } from './modules/contract';
import { useEstiMateStore } from './modules/estiMate';
import { useConMateStore } from './modules/conMate';
import { useOrderStore } from './modules/order';
import { useOutOrderMateStore } from './modules/outOrderMate';
import { useFactoryStore } from './modules/factory';
import { useAccStore } from './modules/acc';
import { useAverageStore } from './modules/average';
import { useCalendarStore } from './modules/calendar';
import { useTimeStore } from './modules/time';
import { useCostStore } from './modules/cost';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export function setupStore(app: App) {
    app.use(pinia);
}

export {
    pinia,
    useDataStore,
    usePopupStore,
    useJoinStore,
    useLoginStore,
    useMainStore,
    useClientStore,
    useProductStore,
    useEstiStore,
    useContractStore,
    useEstiMateStore,
    useConMateStore,
    useOrderStore,
    useOutOrderMateStore,
    useFactoryStore,
    useAccStore,
    useAverageStore,
    useCalendarStore,
    useTimeStore,
    useCostStore
};