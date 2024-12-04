/**
 * @description 견적 관련 모듈 pinia
 */
import { defineStore } from 'pinia';

type Nullable<T>    = T | null;
type YnType         = 'Y' | 'N';
type OrdGbType      = 'S' | 'O';
type AddColorType   = 'O' | 'T';

interface CommonInfo {
    fcCd     : Nullable<string>;
    ordGb    : OrdGbType;
    itemCd   : string;
    itemNm   : string;
    icCd     : string;
    icNm     : string;
    unit     : string;
    unitNm   : string;
    unitSize : string;
    location : string;
    width    : Nullable<number>;
    height   : Nullable<number>;
    saleUnit : Nullable<number>;
    purcUnit : Nullable<number>;
    dcUnit   : string;
    dcAmt    : Nullable<number>;
    vat      : YnType;
    memo     : string;
}

interface EaInfo {
    qty : Nullable<number>;
}

interface DivSpec {
    width   : number;
    height  : number;
    handle  : string;
    size    : number;
}

interface BlindInfo {
    division : number;
    leftQty  : Nullable<number>;
    rightQty : Nullable<number>;
    bQty     : number;
    divSpec  : DivSpec[];
}

interface CurtainInfo {
    shapeSaleAmt    : number;
    shapePurcAmt    : number;
    proc            : string;
    addColor        : AddColorType;
    shape           : YnType;
    split           : string;
    use             : number;
    size            : number;
    cQty            : number;
    los             : number;
    pokSpec         : number;
    heightLen       : number;
    addPrice        : number;
}

interface TotalInfo {
    totalQty            : number;
    totalUnitSize       : number;
    totalItemSaleAmt    : number;
    totalItemSaleTax    : number;
    totalItemPurcAmt    : number;
    totalItemPurcTax    : number;
    eachItemSaleAmt     : number;
    eachItemSaleTax     : number;
    eachItemPurcAmt     : number;
    eachItemPurcTax     : number;
    totalOptionSaleAmt  : number;
    totalOptionSaleTax  : number;
    totalOptionPurcAmt  : number;
    totalOptionPurcTax  : number;
    totalShapeSaleAmt   : number;
    totalShapeSaleTax   : number;
    totalShapePurcAmt   : number;
    totalShapePurcTax   : number;
    totalHeightSaleAmt  : number;
    totalHeightSaleTax  : number;
    totalHeightPurcAmt  : number;
    totalHeightPurcTax  : number;
    totalSaleAmt        : number;
    totalSaleTax        : number;
    totalPurcAmt        : number;
    totalPurcTax        : number;
}

/**
 * @description 견적 시 공통 정보
 */
const getCommonInfo = (): CommonInfo => {
    return {
        fcCd     : null,    /** 공장코드 */
        ordGb    : 'S',     /** 주문구분 (S:시스템 공장 / O:외주공장) */
        itemCd   : '',      /** 제품코드 */
        itemNm   : '',      /** 제품명 */
        icCd     : '',      /** 제품 색상코드 */
        icNm     : '',      /** 제품 색상명칭 */
        unit     : '',      /** 제품 단위 코드 */
        unitNm   : '',      /** 제품 단위 명칭 */
        unitSize : '',      /** 제품 최소 사이즈 */
        location : '기타',  /** 위치 */
        width    : null,    /** 가로 */
        height   : null,    /** 세로 */
        saleUnit : null,    /** 판매 단가 */
        purcUnit : null,    /** 매입 단가 */
        dcUnit   : '',      /** 할인 구분 */
        dcAmt    : null,    /** 할인 금액 */
        vat      : 'N',     /** 부가세 여부 (Y : 포함 / N : 미포함) */
        memo     : ''       /** 지시사항 */
    }
}

/**
 * @description EA 정보
 */
const getEaInfo = (): EaInfo => {
    return {
        qty : null
    }
}

/**
 * @description 블라인드 정보
 */
const getBlindInfo = (): BlindInfo => {
    return {
        division : 1,       /** 분할 수 */
        leftQty  : null,    /** 좌 수량 */
        rightQty : null,    /** 우 수량 */
        bQty     : 1,       /** 단창일 시 수량 */
        divSpec  : []       /** { width(가로) , height(세로), handle(좌/우 구분), size(단위 크기) } */
    }
}

/**
 * @description 커튼 정보
 */
const getCurtainInfo = (): CurtainInfo => {
    return {
        shapeSaleAmt    : 0,
        shapePurcAmt    : 0,
        proc            : '001', /** 가공방법(나비주름 / 평주름) */
        addColor        : 'O',   /** 색상 구분(원톤 / 투톤) */
        shape           : 'N',   /** 형상 선택(있음 / 없음) */
        split           : '001', /** 분할 구분(양개 / 편개) */
        use             : 2.0,   /** 원단 사용량 */
        size            : 0,     /** 크기 */
        cQty            : 1,     /** 수량 */
        los             : 60,    /** 로스 길이 */
        pokSpec         : 150,   /** 폭 일시 스펙 */
        heightLen       : 0,     /** 세로 길이 제한 */
        addPrice        : 0      /** 추가 비율 */
    }
}

/**
 * @description 총 합계 정보
 */
const getTotalInfo = (): TotalInfo => {
    return {
        totalQty            : 0,    /** 총 수량 */
        totalUnitSize       : 0,    /** 총 단위 */

        totalItemSaleAmt    : 0,    /** 계산된 총 제품 매출 금액 */
        totalItemSaleTax    : 0,    /** 계산된 총 제품 매출 세액 */
        totalItemPurcAmt    : 0,    /** 계산된 총 제품 매입 금액 */
        totalItemPurcTax    : 0,    /** 계산된 총 제품 매입 세액 */

        /** 블라인드 분할 시 사용 */
        eachItemSaleAmt     : 0,    /** 각 제품별 매출 금액 */
        eachItemSaleTax     : 0,    /** 각 제품별 매출 세액 */
        eachItemPurcAmt     : 0,    /** 각 제품별 매입 금액 */
        eachItemPurcTax     : 0,    /** 각 제품별 매입 세액 */

        totalOptionSaleAmt  : 0,    /** 계산된 총 옵션 매출 금액 */
        totalOptionSaleTax  : 0,    /** 계산된 총 옵션 매출 세액 */
        totalOptionPurcAmt  : 0,    /** 계산된 총 옵션 매입 금액 */
        totalOptionPurcTax  : 0,    /** 계산된 총 옵션 매입 세액 */

        totalShapeSaleAmt   : 0,    /** 계산된 총 형상 매출 금액 */
        totalShapeSaleTax   : 0,    /** 계산된 총 형상 매출 세액 */
        totalShapePurcAmt   : 0,    /** 계산된 총 형상 매입 금액 */
        totalShapePurcTax   : 0,    /** 계산된 총 형상 매입 세액 */

        totalHeightSaleAmt  : 0,    /** 계산된 총 세로길이 추가 매출 금액 */
        totalHeightSaleTax  : 0,    /** 계산된 총 세로길이 추가 매출 세액 */
        totalHeightPurcAmt  : 0,    /** 계산된 총 세로길이 추가 매입 금액 */
        totalHeightPurcTax  : 0,    /** 계산된 총 세로길이 추가 매입 세액 */

        // totalDcCalcAmt      : 0,    /** 계산된 총 할인 금액 */
        totalSaleAmt        : 0,    /** 총 매출 금액 */
        totalSaleTax        : 0,    /** 총 매출 세액 */
        totalPurcAmt        : 0,    /** 총 매입 금액 */
        totalPurcTax        : 0     /** 총 매입 세액 */
    }
}

interface State {
    emCd        : string;
    common      : CommonInfo;
    ea          : EaInfo;
    blind       : BlindInfo;
    curtain     : CurtainInfo;
    total       : TotalInfo;
    list        : []
}

export const useEstiStore = defineStore('esti', {
    state: (): State => ({
        emCd        : '',
        common      : getCommonInfo(),
        ea          : getEaInfo(),
        blind       : getBlindInfo(),
        curtain     : getCurtainInfo(),
        total       : getTotalInfo(),
        list        : [],
        // payList     : getPayList(),
        // dcInfo      : getAmtInfo(),
        // addInfo     : getAmtInfo(),
        // cutInfo     : {
        //     gubun : 'N',
        //     amt   : 0
        // },
        // conInfo     : getConInfo()
    }),
    actions : {
        async getList()
        {
            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/esti/getList`, { emCd : this.emCd });

                console.log(res);

                const list = [];

                res.data['location'].map(location => {
                    list.push({
                        title     : location.title,
                        cardLists : res.data['estiList'].map(esti => {
                            if(location.title === esti.title)
                            {
                                const rows = [];
                                const tags = [];

                                switch(esti.unit)
                                {
                                    case '001':
                                        if(esti.division === 'D')
                                        {
                                            rows.push(...esti.detail.map(dItem => ({
                                                width   : dItem.width,
                                                height  : dItem.height,
                                                leftQty : dItem.handle === '좌' ? 1 : 0,
                                                rightQty: dItem.handle === '우' ? 1 : 0,
                                                size    : dItem.size + esti.unitNm
                                            })));
                                        }
                                        else
                                        {
                                            rows.push({
                                                width   : esti.width,
                                                height  : esti.height,
                                                leftQty : esti.leftCnt,
                                                rightQty: esti.rightCnt,
                                                size    : esti.totalUnit + esti.unitNm
                                            });
                                        }
                                    break;
                                    case '002': case '003':
                                        rows.push({
                                            width   : esti.width,
                                            height  : esti.height,
                                            proc    : esti.proc === '001' ? '나비주름' : '평주름',
                                            split   : esti.split === '001' ? '양개' : '편개',
                                            size    : esti.totalUnit + esti.unitNm
                                        });
                                    break;
                                }

                                if(esti.shape === 'Y')
                                {
                                    tags.push({ spanText: "형상옵션" });
                                }

                                return {
                                    edCd         : esti.edCd,
                                    productTitle : esti.productTitle,
                                    colorTitle   : esti.colorTitle,
                                    showDelete   : true,
                                    amt          : Number(esti.totalSaleAmt) + Number(esti.totalSaleTax),
                                    isRed        : esti.productTitle === '' ? true : false,
                                    columns      : getCardColumns(esti.unit),
                                    rows         : rows,
                                    showTag      : tags.length > 0 ? true : false,
                                    tags         : tags,
                                    spanText     : esti.memo
                                }
                            }
                        }).filter(Boolean)
                    })
                });
            }
            catch(e)
            {
                console.log(e);
            }
        }
    },
    persist: {
        key     : 'esti',
        storage : localStorage,
        paths   : ['emCd']
    }
});