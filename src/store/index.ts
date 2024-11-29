import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import type { App } from 'vue';

import { useDataStore } from './modules/data';
import { useLoginStore } from './modules/login';
import { useMainStore } from './modules/main';
import { useClientStore } from './modules/client';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export function setupStore(app: App) {
    app.use(pinia);
}

export {
    pinia,
    useDataStore,
    useLoginStore,
    useMainStore,
    useClientStore
};