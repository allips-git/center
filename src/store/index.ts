import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import type { App } from 'vue';

import { useDataStore } from './modules/data';
import { usePopupStore } from './modules/popup';
import { useJoinStore } from './modules/join';
import { useFindStore } from './modules/find';
import { useLoginStore } from './modules/login';
import { useInviteJoinStore } from './modules/inviteJoin';
import { useMainStore } from './modules/main';
import { useClientStore } from './modules/client';
import { useProductStore } from './modules/product';
import { useOptionStore } from './modules/option';
import { useEstiStore } from './modules/esti';
import { useContractStore } from './modules/contract';
import { useEstiMateStore } from './modules/estiMate';
import { useConMateStore } from './modules/conMate';
import { useOrderStore } from './modules/order';
import { usePayStore } from './modules/pay';
import { useOutOrderMateStore } from './modules/outOrderMate';
import { useFactoryStore } from './modules/factory';
import { useAccStore } from './modules/acc';
import { useAverageStore } from './modules/average';
import { useCalendarStore } from './modules/calendar';
import { useTimeStore } from './modules/time';
import { useCostStore } from './modules/cost';
import { useCouponStore } from './modules/coupon';
import { useSettingStore } from './modules/setting';
import { useMemberStore } from './modules/member';
import { useKakaoStore } from './modules/kakao';
import { useChatStore } from './modules/chat';
import { useMsgStore } from './modules/msg';
import { useEstiAndConSetStore } from './modules/estiAndConSet';
import { useMateStore } from './modules/mate';
import { useActualStore } from './modules/actual';

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
    useFindStore,
    useLoginStore,
    useInviteJoinStore,
    useMainStore,
    useClientStore,
    useProductStore,
    useOptionStore,
    useEstiStore,
    useContractStore,
    useEstiMateStore,
    useConMateStore,
    useOrderStore,
    usePayStore,
    useOutOrderMateStore,
    useFactoryStore,
    useAccStore,
    useAverageStore,
    useCalendarStore,
    useTimeStore,
    useCostStore,
    useCouponStore,
    useSettingStore,
    useMemberStore,
    useKakaoStore,
    useChatStore,
    useMsgStore,
    useEstiAndConSetStore,
    useMateStore,
    useActualStore
};