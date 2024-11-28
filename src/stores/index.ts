import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { App } from 'vue';

import { useDataStore } from './modules/data';
import { useClientStore } from './modules/client';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export function setupStore(app: App) {
    app.use(pinia);
}

export {
    pinia,
    useDataStore,
    useClientStore
};