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
    estiList            : boolean;
    estiMate            : boolean;
    conMate             : boolean;
    orderList           : boolean;
    ordList             : boolean;
    disAmtSet           : boolean;
    addAmtSet           : boolean;
    conInfoSet          : boolean;
    sysFactorySearch    : boolean;
    sysFactoryItemList  : boolean;
    sysFactoryItemSet   : boolean;
    outFactorySet       : boolean;
    outFactoryItemList  : boolean;
    outFactoryItemSet   : boolean;
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
    memberSet           : boolean;
    kakaoDetail         : boolean;
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
        estiList            : false,
        estiMate            : false,
        conMate             : false,
        orderList           : false,
        ordList             : false,
        disAmtSet           : false,
        addAmtSet           : false,
        conInfoSet          : false,
        sysFactorySearch    : false,
        sysFactoryItemList  : false,
        sysFactoryItemSet   : false,
        outFactorySet       : false,
        outFactoryItemList  : false,
        outFactoryItemSet   : false,
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
        memberSet           : false,
        kakaoDetail         : false,
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