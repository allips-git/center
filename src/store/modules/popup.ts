/**
 * @description 각 화면 팝업 관리 모듈 pinia
 */
import { defineStore } from 'pinia';

/** 리스트 데이터 */
interface Pop {
    confirm             : boolean;
    clientSet           : boolean;
    clientDetail        : boolean;
    itemList            : boolean;
    itemSet             : boolean;
    optionList          : boolean;
    estiList            : boolean;
    estiMate            : boolean;
    estiDetail          : boolean;
    priceChange         : boolean;
    conMate             : boolean;
    orderList           : boolean;
    ordList             : boolean;
    disAmtSet           : boolean;
    addAmtSet           : boolean;
    conInfoSet          : boolean;
    sysFactorySearch    : boolean;
    sysFactoryNameSet   : boolean;
    sysFactoryItemList  : boolean;
    sysFactoryItemSet   : boolean;
    sysFactoryDetail    : boolean;
    outFactorySet       : boolean;
    outFactoryItemList  : boolean;
    outFactoryItemSet   : boolean;
    outFactoryDetail    : boolean;
    sysOrderSet         : boolean;
    outOrderSet         : boolean;
    outOrderMate        : boolean;
    accMonth            : boolean;
    accWeek             : boolean;
    accDay              : boolean;
    payList             : boolean;
    paymentSet          : boolean;
    calendarSet         : boolean;
    calendarDetail      : boolean;
    calendarEdit        : boolean;
    staticSet           : boolean;
    couponDetail        : boolean;
    memberDetail        : boolean;
    memberSet           : boolean;
    kakaoList           : boolean;
    kakaoDetail         : boolean;
    kakaoHistory        : boolean;
    settingStore        : boolean;
    memberList          : boolean;
    couponMenu          : boolean;
    timeSetting         : boolean;
    privacyView         : boolean;
    shippingGbList      : boolean;
    shippingGbSet       : boolean;
    chatList            : boolean;
}

interface State {
    pop  : Pop,
    list : []
}

const getPopInfo = (): Pop => {
    return {
        confirm             : false,
        clientSet           : false,
        clientDetail        : false,
        itemList            : false,
        itemSet             : false,
        optionList          : false,
        estiList            : false,
        estiMate            : false,
        estiDetail          : false,
        priceChange         : false,
        conMate             : false,
        orderList           : false,
        ordList             : false,
        disAmtSet           : false,
        addAmtSet           : false,
        conInfoSet          : false,
        sysFactorySearch    : false,
        sysFactoryNameSet   : false,
        sysFactoryItemList  : false,
        sysFactoryItemSet   : false,
        sysFactoryDetail    : false,
        outFactorySet       : false,
        outFactoryItemList  : false,
        outFactoryItemSet   : false,
        outFactoryDetail    : false,
        sysOrderSet         : false,
        outOrderSet         : false,
        outOrderMate        : false,
        accMonth            : false,
        accWeek             : false,
        accDay              : false,
        payList             : false, 
        paymentSet          : false,
        calendarSet         : false,
        calendarDetail      : false,
        calendarEdit        : false,
        staticSet           : false,
        couponDetail        : false,
        memberDetail        : false,
        memberSet           : false,
        kakaoList           : false,
        kakaoDetail         : false,
        kakaoHistory        : false,
        settingStore        : false,
        memberList          : false,
        couponMenu          : false,
        timeSetting         : false,
        privacyView         : false,
        shippingGbList      : false,
        shippingGbSet       : false,
        chatRoom            : false,
    }
}

export const usePopupStore = defineStore('popup', {
    state: (): State => ({
        pop  : getPopInfo(),
        list : []
    }),
    actions: {
        getOpen(popNm : string)
        {
            this.pop[popNm] = true;

            const index = this.list.indexOf(popNm);

            if(index !== -1)
            {
                this.list.splice(index, 1);
            }

            this.list.push(popNm);
        },
        getClose(popNm : string)
        {
            this.pop[popNm] = false;

            const index = this.list.indexOf(popNm);

            if(index !== -1)
            {
                this.list.splice(index, 1);
            }
        },
        getReset()
        {
            this.pop = getPopInfo();
        }
    }
});