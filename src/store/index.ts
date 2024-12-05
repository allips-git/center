import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import type { App } from 'vue';

import { useDataStore } from './modules/data';
import { usePopupStore } from './modules/popup';
import { useLoginStore } from './modules/login';
import { useMainStore } from './modules/main';
import { useClientStore } from './modules/client';
import { useProductStore } from './modules/product';
import { useEstiStore } from './modules/esti';
import { useFactoryStore } from './modules/factory';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export function setupStore(app: App) {
    app.use(pinia);
}

export {
    pinia,
    useDataStore,
    usePopupStore,
    useLoginStore,
    useMainStore,
    useClientStore,
    useProductStore,
    useEstiStore,
    useFactoryStore
};