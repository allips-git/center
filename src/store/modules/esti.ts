/**
 * @description 견적 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getHebe, getPok, getYard, getCm, eaCalculation } from 'planorder-calculator';
import { getHebeCalc, getPokCalc, getYardCalc, getCmCalc } from '@/assets/js/calcAndProcess';
import { getAxiosData, getCardColumns, getCommas } from '@/assets/js/function';

type Nullable<T>    = T | null;
type Type           = 'I' | 'M' | 'N'; /** I : 명세표 추가 데이터 / M : 수정 데이터 / N : 신규 명세표 */
type YnType         = 'Y' | 'N';
type OptionGb       = 'P' |'B' | 'S' | 'N';
type OrdGbType      = 'S' | 'O';
type AddColorType   = 'O' | 'T';
type AmtUnitType    = 'F' | 'P'; /** F : 금액(원) / P : %(퍼센트) */

interface Options {
    poCd        : Nullable<string>;
    gb          : OptionGb;
    itemCd      : string;
    itemNm      : string;
    icCd        : string;
    icNm        : string;
    selSpec     : string;
    saleUnit    : Nullable<number>;
    purcUnit    : Nullable<number>;
    saleAmt     : Nullable<number>;
    saleTax     : Nullable<number>;
    purcAmt     : Nullable<number>;
    purcTax     : Nullable<number>;
    delYn       : YnType;
}

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
    roundGb  : string;
    vat      : YnType;
    vmRate   : number;
    options  : Options;
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
    maxWidth    : Nullable<number>;
    maxHeight   : Nullable<number>;
    minWidth    : Nullable<number>;
    minHeight   : Nullable<number>;
    division    : number;
    leftQty     : Nullable<number>;
    rightQty    : Nullable<number>;
    bQty        : number;
    divSpec     : DivSpec[];
}

interface InColorList {
    icCd : string;
    icNm : string;
}

interface CurtainInfo {
    maxWidth        : Nullable<number>;
    maxHeight       : Nullable<number>;
    shapeSaleAmt    : number;
    shapePurcAmt    : number;
    proc            : string;
    bproc           : string;
    addColor        : AddColorType;
    shape           : YnType;
    split           : string;
    use             : number;
    size            : number;
    cQty            : number;
    los             : number;
    pokSpec         : number;
    heightLen       : number;
    autoCalc        : number;
    addPrice        : number;
    inColorList     : InColorList[];
    inColor         : string;
    inColorNm       : string;
    inSize          : number;
    outSize         : Nullable<number>;
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
    eachOptionList      : string[];
    totalProcSaleAmt    : number;
    totalProcSaleTax    : number;
    totalProcPurcAmt    : number;
    totalProcPurcTax    : number;
    totalBprocSaleAmt   : number;
    totalBprocSaleTax   : number;
    totalBprocPurcAmt   : number;
    totalBprocPurcTax   : number;
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

interface PayList {
    name    : string;
    title   : string;
    amt     : number;
    red     : boolean;
    blue    : boolean;
    memo    : string;
}

interface AmtInfo {
    cpCd : string;
    unit : AmtUnitType;
    val  : Nullable<string>;
    amt  : Nullable<string>;
    memo : string;
}

interface CutInfo {
    gubun : boolean;
    amt   : Nullable<string>;
}

interface ConInfo {
    conDt   : date;
    deliDt  : Nullable<date>;
    insTime : date;
    person  : string;
    payGb   : string;
    amt     : Nullable<number>;
    memo    : string;
}

interface MsgInfo {
    ea : {
        qty : string;
    },
    blind : {
        bWidth      : string;
        bHeight     : string;
        leftQty     : string;
        rightQty    : string;
        bQty        : string;
        divWidth    : string;
    },
    curtain : {
        cWidth  : string;
        cHeight : string;
        size    : string;
        cQty    : string;
    }
}

interface ItemInfo {
    fcCd        : string;
    ordGb       : string;
    itemCd      : string;
    itemNm      : string;
    icCd        : string;
    icNm        : string;
    unit        : string;
    unitNm      : string;
    saleUnit    : number;
    purcUnit    : number;
}

const getOption = (): Options => {
    return {
        poCd      : null,
        gb        : 'N', // 옵션 구분 (P: 제품 / B: 블라인드 / S: 커튼 / N: 없음)
        itemCd    : '',
        itemNm    : '',
        icCd      : '',
        icNm      : '',
        selSpec   : '',
        saleUnit  : null,
        purcUnit  : null,
        saleAmt   : null,
        saleTax   : null,
        purcAmt   : null,
        purcTax   : null,
        useYn     : 'Y',
        delYn     : 'N'
    }
}

/**
 * @description 견적 시 공통 정보
 */
const getCommonInfo = (): CommonInfo => {
    return {
        fcCd     : null,            /** 공장코드 */
        ordGb    : 'S',             /** 주문구분 (S:시스템 공장 / O:외주공장) */
        itemCd   : '',              /** 제품코드 */
        itemNm   : '',              /** 제품명 */
        icCd     : '',              /** 제품 색상코드 */
        icNm     : '',              /** 제품 색상명칭 */
        unit     : '',              /** 제품 단위 코드 */
        unitNm   : '',              /** 제품 단위 명칭 */
        unitSize : '',              /** 제품 최소 사이즈 */
        location : '',              /** 위치 */
        width    : null,            /** 가로 */
        height   : null,            /** 세로 */
        saleUnit : null,            /** 판매 단가 */
        purcUnit : null,            /** 매입 단가 */
        dcUnit   : '',              /** 할인 구분 */
        dcAmt    : null,            /** 할인 금액 */
        vat      : 'N',             /** 부가세 여부 (Y : 포함 / N : 미포함), 매입금액 계산용 */
        vmRate   : 0,               /** 부가세율, 매입금액 계산용 */
        roundGb  : '005',           /** 반올림 구분 */
        options  : [getOption()],   /** 추가 옵션 리스트 */
        memo     : ''               /** 지시사항 */
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
        maxWidth    : null,
        maxHeight   : null,
        minWidth    : null,
        minHeight   : null,
        division    : 1,       /** 분할 수 */
        leftQty     : null,    /** 좌 수량 */
        rightQty    : null,    /** 우 수량 */
        bQty        : 1,       /** 단창일 시 수량 */
        divSpec     : []       /** { width(가로) , height(세로), handle(좌/우 구분), size(단위 크기) } */
    }
}

/**
 * @description 커튼 정보
 */
const getCurtainInfo = (): CurtainInfo => {
    return {
        maxWidth        : null,
        maxHeight       : null,
        shapeSaleAmt    : 0,
        shapePurcAmt    : 0,
        proc            : '001', /** 가공방법(나비주름 / 평주름) */
        bproc           : '001', /** 하단 가공법 (기본 / 리드밴드) */
        addColor        : 'O',   /** 색상 구분(원톤 / 투톤) */
        shape           : 'N',   /** 형상 선택(있음 / 없음) */
        split           : '001', /** 분할 구분(양개 / 편개) */
        use             : 2.0,   /** 원단 사용량 */
        size            : 0,     /** 크기 */
        cQty            : 1,     /** 수량 */
        los             : 60,    /** 로스 길이 */
        pokSpec         : 150,   /** 폭 일시 스펙 */
        heightLen       : 0,     /** 세로 길이 제한(기본 세로 길이) */
        autoCalc        : 2.5,   /** 추가 세로 길이 CM당 */
        addPrice        : 0,     /** 추가 비율 */
        inColorList     : [],    /** 투톤일 시 안쪽 색상 리스트 */
        inColor         : '',    /** 투톤일 시 안쪽 색상코드 */
        inColorNm       : '',    /** 투톤일 시 안쪽 색상명칭 */
        inSize          : 0,     /** 투톤일 시 안쪽 사이즈 */
        outSize         : null   /** 투톤일 시 바깥쪽 사이즈 */
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

        totalProcSaleAmt  : 0,    /** 계산된 총 하단가공 옵션 매출 금액 */
        totalProcSaleTax  : 0,    /** 계산된 총 하단가공 옵션 매출 세액 */
        totalProcPurcAmt  : 0,    /** 계산된 총 하단가공 옵션 매입 금액 */
        totalProcPurcTax  : 0,    /** 계산된 총 하단가공 옵션 매입 세액 */

        totalBprocSaleAmt  : 0,    /** 계산된 총 상단가공 옵션 매출 금액 */
        totalBprocSaleTax  : 0,    /** 계산된 총 상단가공 옵션 매출 세액 */
        totalBprocPurcAmt  : 0,    /** 계산된 총 상단가공 옵션 매입 금액 */
        totalBprocPurcTax  : 0,    /** 계산된 총 상단가공 옵션 매입 세액 */

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

/**
 * @description 명세서 제품 결제 내역
 */
const getPayList = (): PayList => {
    return [
        {name : 'itemAmt',      title: '상품 금액',        amt: 0, red: false, blue: false, memo : ''},
        {name : 'itemTax',      title: '부가세',           amt: 0, red: false, blue: false, memo : ''},
        {name : 'optionAmt',    title: '옵션 금액',        amt: 0, red: false, blue: false, memo : ''},
        {name : 'procAmt',      title: '나비주름',         amt: 0, red: false, blue: false, memo : ''},
        {name : 'bprocAmt',     title: '리드밴드',         amt: 0, red: false, blue: false, memo : ''},
        {name : 'shapeAmt',     title: '형상',             amt: 0, red: false, blue: false, memo : ''},
        {name : 'heightAmt',    title: '세로길이 추가금액', amt: 0, red: false, blue: false, memo : ''},
        {name : 'addAmt',       title: '추가',             amt: 0, red: true, blue: false, memo : ''},
        {name : 'dcAmt',        title: '할인',             amt: 0, red: true, blue: false, memo : ''},
        {name : 'cutAmt',       title: '절삭 할인',        amt: 0, red: true, blue: false, memo : ''}
        // {name : 'conAmt', title: '계약 선금', amt: 0, blue: true},
        // {name : 'lastAddAmt', title: '최종 추가', amt: 0, red: true},
        // {name : 'lastDcAmt', title: '최종 할인', amt: 0, red: true},
        // {name : 'payAmt', title: '결제 금액', amt: 0, blue: true}
    ]
}

const getAmtInfo = (): AmtInfo => {
    return {
        cpCd : '',
        unit : 'F',
        val  : null,
        amt  : null,
        memo : ''
    }
}

/**
 * @description 계약서 정보
 */
const getConInfo = (): ConInfo => {
    return {
        conDt   : new Date(),
        deliDt  : '',
        insTime : '',
        person  : '',
        payGb   : '001',
        amt     : 0,
        memo    : ''
    }
}

const getMsgInfo = (): MsgInfo  => {
    return {
        ea : {
            qty : ''
        },
        blind : {
            bWidth      : '',
            bHeight     : '',
            leftQty     : '',
            rightQty    : '',
            bQty        : '',
            divWidth    : ''
        },
        curtain : {
            cWidth  : '',
            cHeight : '',
            cSize   : '',
            cQty    : '',
            inColor : ''
        }
    }
}

interface State {
    type        : Type;
    emCd        : string;
    edCd        : string;
    optionSeq   : number;
    common      : CommonInfo;
    ea          : EaInfo;
    blind       : BlindInfo;
    curtain     : CurtainInfo;
    total       : TotalInfo;
    list        : [],
    detailList  : [],
    msg         : MsgInfo;
    payList     : PayList[];
    dcInfo      : AmtInfo;
    addInfo     : AmtInfo;
    cutInfo     : CutInfo;
    conInfo     : ConInfo;
}

export const useEstiStore = defineStore('esti', {
    state: (): State => ({
        type        : 'N',
        emCd        : '',
        edCd        : '',
        optionSeq   : 0,
        common      : getCommonInfo(),
        ea          : getEaInfo(),
        blind       : getBlindInfo(),
        curtain     : getCurtainInfo(),
        total       : getTotalInfo(),
        list        : [],
        msg         : getMsgInfo(),
        payList     : getPayList(),
        dcInfo      : getAmtInfo(),
        addInfo     : getAmtInfo(),
        cutInfo     : {
            gubun : false,
            amt   : 0
        },
        conInfo     : getConInfo()
    }),
    getters: {
        totalAmtInfo : (state) => {
            const proc = state.common.options.find(i => i.gb === 'P');
            const bproc = state.common.options.find(i => i.gb === 'B');
            const shape = state.common.options.find(i => i.gb === 'S');

            const info = [
                { gb: 'item', title : `${state.common.itemNm + ' / ' + state.common.icNm} (${getCommas(Number(state.common.saleUnit))}원)`, amt : state.total['totalItemSaleAmt'] },
                { gb: 'vat', title : '부가세', amt : state.total['totalItemSaleTax'] },
                { gb: 'option', title : '옵션 금액', amt : state.total['totalOptionSaleAmt'] + state.total['totalOptionSaleTax'] },
                { gb: 'proc',title : `나비주름 ${proc ? '('+Number(proc.saleUnit)+'원)' : ''}`, amt : state.total['totalProcSaleAmt'] + state.total['totalProcSaleTax'] },
                { gb: 'bproc',title : `리드밴드 ${bproc ? '('+Number(bproc.saleUnit)+'원)' : ''}`, amt : state.total['totalBprocSaleAmt'] + state.total['totalBprocSaleTax'] },
                { gb: 'shape',title : `형상 ${shape ? '('+Number(shape.saleUnit)+'원)' : ''}`, amt : state.total['totalShapeSaleAmt'] + state.total['totalShapeSaleTax'] },
                { gb: 'height',title : '세로길이 추가금액', amt : state.total['totalHeightSaleAmt'] + state.total['totalHeightSaleTax'] }
            ];

            return info;
        },
        inColorList : (state) => {
            return state.curtain['inColorList'].filter(item => item.icCd !== state.common['icCd']);
        },
        outSize : (state) => {
            return state.curtain['size'] - state.curtain['inSize'];
        }
    },
    actions : {
        async getList()
        {
            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/estiV1/getList`, { emCd : this.emCd });

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
                                        if(esti.division === 'D' || esti.division === 'A')
                                        {
                                            rows.push(...esti.detail.map(dItem => ({
                                                width   : dItem.width,
                                                height  : dItem.height,
                                                leftQty : dItem.handle === 'L' ? dItem.cnt : 0,
                                                rightQty: dItem.handle === 'R' ? dItem.cnt : 0,
                                                size    : Number(dItem.size) + esti.unitNm
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
                                    case '002': case '003': case '005': case '006':
                                        rows.push({
                                            width   : esti.width,
                                            height  : esti.height,
                                            // proc    : esti.proc === '001' ? '나비주름' : '평주름',
                                            split   : esti.split === '001' ? '양개' : '편개',
                                            qty     : esti.cnt,
                                            size    : esti.totalUnit + esti.unitNm
                                        });
                                    break;
                                    case '004':
                                        rows.push({
                                            qty : esti.cnt
                                        })
                                    break;
                                }

                                const options = esti.option.filter(item => item.poGb === '001');

                                if(options.length !== 0)
                                {
                                    options.map(option => {
                                        tags.push({ spanText: option.itemNm + ' / ' + option.icNm });
                                    })
                                }

                                if(esti.shape === 'Y')
                                {
                                    tags.push({ spanText: "형상옵션" });
                                }

                                if(esti.proc === '001')
                                {
                                    tags.push({ spanText: "나비주름" });
                                }

                                if(esti.bproc === '002')
                                {
                                    tags.push({ spanText: "리드밴드" });
                                }

                                if(esti.addColor === 'T')
                                {
                                    tags.push({ spanText: `투톤: 기둥 ${esti.outColorNm} ${esti.outSize}${esti.unitNm} / 안쪽 ${esti.inColorNm} ${esti.inSize}${esti.unitNm}` });
                                }

                                return {
                                    edCd         : esti.edCd,
                                    productTitle : esti.productTitle,
                                    colorTitle   : esti.colorTitle,
                                    showDelete   : true,
                                    amt          : Number(esti.totalSaleAmt) + Number(esti.totalSaleTax),
                                    isRed        : esti.productTitle ? false : true,
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

                this.list = list;

                this.getPayAmt('itemAmt', Number(res.data['itemAmt']));
                this.getPayAmt('itemTax', Number(res.data['itemTax']));
                this.getPayAmt('optionAmt', Number(res.data['optionAmt']));
                this.getPayAmt('procAmt', Number(res.data['procAmt']));
                this.getPayAmt('bprocAmt', Number(res.data['bprocAmt']));
                this.getPayAmt('shapeAmt', Number(res.data['shapeAmt']));
                this.getPayAmt('heightAmt', Number(res.data['heightAmt']));

                /** 추가 금액 */
                if(res.data['addAmt'])
                {
                    this.getPayAmt('addAmt', Number(res.data['addAmt']['amt']), res.data['addAmt']['memo']);
                    this.getAmtInfo('addInfo', res.data['addAmt']);
                }
                else
                {
                    this.getPayAmt('addAmt', 0);
                    this.getAmtInfo('addInfo', getAmtInfo());
                }

                /** 할인 금액 */
                if(res.data['dcAmt'])
                {
                    this.getPayAmt('dcAmt', Number(res.data['dcAmt']['amt']), res.data['dcAmt']['memo']);
                    this.getAmtInfo('dcInfo', res.data['dcAmt']);
                }
                else
                {
                    this.getPayAmt('dcAmt', 0);
                    this.getAmtInfo('dcInfo', getAmtInfo());
                }

                /** 절삭 할인 금액 */
                if(res.data['cutAmt'])
                {
                    this.getPayAmt('cutAmt', Number(res.data['cutAmt']['amt']));
                    this.getAmtInfo('cutInfo', { gubun : Number(res.data['cutAmt']['amt']) === 0 ? false : true, amt : Number(res.data['cutAmt']['amt']) });
                }
                else
                {
                    this.getPayAmt('cutAmt', 0);
                    this.getAmtInfo('cutInfo', { gubun : false, amt : 0 });
                }
            }
            catch(e)
            {
                console.log(e);
            }
        },
        async getDetail(stCd: string)
        {
            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/estiV1/getDetail`, { stCd : stCd });

                console.log(res);

                this.detail = res.data.list;
            }
            catch(e)
            {
                console.error(e);
            }
        },
        async getInfo()
        {
            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/estiV1/getInfo`, { edCd : this.edCd });

                console.log(res);

                const common   = res.data['common'];
                const itemInfo = res.data['itemInfo'];

                this.getCommonSet(common);

                const unit = common['unit'];

                switch(unit)
                {
                    case '001':
                        this.getBlindSet(itemInfo);
                    break;
                    case '002': case '003': case '005': case '006':
                        this.getCurtainSet(itemInfo);
                    break;
                    case '004':
                        this.getEaSet(itemInfo);
                    break;
                }

                this.getUnitCalc('Y');
            }
            catch(e)
            {
                console.error(e);
            }
        },
        async getCommonSet(info: ItemInfo) 
        {
            let baseOptionData = null;

            for (const data in info) 
            {
                if (data === "baseOption") 
                {
                    baseOptionData = info[data];
                } 
                else if (data === "options") 
                {
                    this.common.options = [getOption()];

                    if (info[data].length !== 0) 
                    {
                        this.common.options = info[data].map(item => ({
                            poCd     : null,
                            gb       : item.gb ?? "N",
                            itemCd   : item.itemCd ?? "",
                            itemNm   : item.itemNm ?? "",
                            icCd     : item.icCd ?? "",
                            icNm     : item.icNm ?? "",
                            selSpec  : item.selSpec ?? "",
                            saleUnit : item.saleUnit ? Number(item.saleUnit) : null,
                            purcUnit : item.purcUnit ? Number(item.purcUnit) : null,
                            saleAmt  : null,
                            saleTax  : null,
                            purcAmt  : null,
                            purcTax  : null,
                            useYn    : item.useYn ?? "Y",
                            delYn    : item.delYn ?? "N"
                        }));
                    }
                } 
                else 
                {
                    this.common[data] = info[data];
                }
            }

            if (baseOptionData) 
            {
                this.common.options = [getOption()];

                baseOptionData.forEach(item => {
                    const optionData = {
                        poCd     : null,
                        gb       : item.gb ?? "N",
                        itemCd   : item.itemCd ?? "",
                        itemNm   : item.itemNm ?? "",
                        icCd     : item.icCd ?? "",
                        icNm     : item.icNm ?? "",
                        selSpec  : item.selSpec ?? "",
                        saleUnit : item.saleUnit ? Number(item.saleUnit) : null,
                        purcUnit : item.purcUnit ? Number(item.purcUnit) : null,
                        saleAmt  : null,
                        saleTax  : null,
                        purcAmt  : null,
                        purcTax  : null,
                        useYn    : item.useYn ?? "Y"
                    };

                    switch (item.gb) 
                    {
                        case "P":
                            optionData.delYn = this.curtain.proc  === "001" ? "N" : "Y";
                            break;
                        case "B":
                            optionData.delYn = this.curtain.bproc === "002" ? "N" : "Y";
                            break;
                        case "S":
                            optionData.delYn = this.curtain.shape === "Y"   ? "N" : "Y";
                            break;
                        default:
                            optionData.delYn = "Y";
                            break;
                    }

                    this.common.options.unshift(optionData);
                });
            }
        },
        getOptionSeq(optionSeq: number)
        {
            this.optionSeq = optionSeq;
        },
        getOptionAdd()
        {
            this.common.options.push(getOption());
        },
        getOptionSet(info: object)
        {
            const option = this.common.options.filter(item => item.gb === 'N');
            const target = option[this.optionSeq];

            if(target)
            {
                Object.assign(target, {
                    poCd      : null,
                    gb        : info.gb ? info.gb : 'N', // 옵션 구분 (P: 제품 / B: 블라인드 / S: 커튼 / N: 없음)
                    itemCd    : info.itemCd ? info.itemCd : '',
                    itemNm    : info.itemNm ? info.itemNm : '',
                    icCd      : info.icCd ? info.icCd : '',
                    icNm      : info.icNm ? info.icNm : '',
                    selSpec   : info.selSpec ? info.selSpec : '',
                    saleUnit  : info.saleUnit ? Number(info.saleUnit) : null,
                    purcUnit  : info.purcUnit ? Number(info.purcUnit) : null,
                    saleAmt   : null,
                    saleTax   : null,
                    purcAmt   : null,
                    purcTax   : null,
                    useYn     : info.useYn ? info.useYn : 'Y',
                    delYn     : info.delYn ? item.delYn : 'N'
                });
            };
        },
        async getBlindSet(info: object)
        {
            for(const data in info){
                this.blind[data] = data === 'division' ? (info[data] !== 'A' ? Number(info[data]) : info[data]) : info[data];
            }
        },
        async getCurtainSet(info: object)
        {
            for(const data in info){
                this.curtain[data] = data === 'use' ? Number(info[data]) : info[data];
            }
        },
        async getEaSet(info: object)
        {
            for(const data in info){
                this.ea[data] = data === 'qty' ? Number(info[data]) : info[data];
            }

            this.curtain['inColor'] = '';
        },
        getDivisionSet()
        {
            const division  = Number(this.blind['division']);

            const specArr   = [];
            const specInfo  = this.blind['divSpec'];

            this.blind.bQty = Number(this.blind.bQty) !== 0 ? Number(this.blind.bQty) : 1;

            if(this.blind['division'] === 'A')
            {
                /** 공사건 계산기일 때 */
                const divCnt = this.blind.divSpec.length === 0 ? 1 : this.blind.divSpec.length;

                for(let i=0; i<divCnt; i++)
                {
                    const spec = {
                        width  : specInfo[i] !== undefined ? specInfo[i]['width'] : '',
                        height : specInfo[i] !== undefined ? specInfo[i]['height'] : '',
                        handle : i === 0 ? 'L' : 'R',
                        size   : getHebe({
                            width       : specInfo[i] !== undefined ? specInfo[i]['width'] : '',
                            height      : specInfo[i] !== undefined ? specInfo[i]['height'] : '',
                            minWidth    : this.blind['minWidth'],
                            minHeight   : this.blind['minHeight'],
                            size        : Number(this.common['unitSize']),
                            roundGb     : this.common['roundGb']
                        }) * (specInfo[i] !== undefined ? specInfo[i]['qty'] : 1),
                        qty    : specInfo[i] !== undefined ? specInfo[i]['qty'] : 1
                    }
            
                    specArr.push(spec);
                }
            }
            else
            {
                for(let i=0; i<division; i++)
                {
                    const spec = {
                        width  : specInfo[i] !== undefined ? specInfo[i]['width'] : '',
                        height : this.common['height'],
                        handle : i === 0 ? 'L' : 'R',
                        size   : getHebe({
                            width       : specInfo[i] !== undefined ? specInfo[i]['width'] : '',
                            height      : Number(this.common['height']),
                            minWidth    : this.blind['minWidth'],
                            minHeight   : this.blind['minHeight'],
                            size        : Number(this.common['unitSize']),
                            roundGb     : this.common['roundGb']
                        }),
                        qty    : 1
                    }
            
                    specArr.push(spec);
                }
            }
        
            this.blind['divSpec'] = specArr;
        },
        getDivisionAdd()
        {
            this.blind['divSpec'].push({
                width  : '',
                height : '',
                handle : 'R',
                size   : getHebe({
                    width       : '',
                    height      : '',
                    minWidth    : this.blind['minWidth'],
                    minHeight   : this.blind['minHeight'],
                    size        : Number(this.common['unitSize']),
                    roundGb     : this.common['roundGb']
                }),
                qty    : 1
            });
        },
        getEqual()
        {
            const width    = Number(this.common['width']);
            const division = Number(this.blind['divSpec'].length);
        
            if(width > 0)
            {
                // 분할이 1개인 경우 (단창)
                if(division === 1) {
                    this.blind['divSpec'][0]['width'] = width;
                    this.blind['divSpec'][0]['size']  = getHebe({
                        width       : width,
                        height      : this.common['height'],
                        minWidth    : this.blind['minWidth'],
                        minHeight   : this.blind['minHeight'],
                        size        : Number(this.common['unitSize']),
                        roundGb     : this.common['roundGb']
                    });
                    return;
                }

                // 기본 분할 길이 계산
                const baseDivisionWidth = width / division;
                
                // 첫 번째 width를 0.5 단위로 반올림
                const firstWidth = Math.round(baseDivisionWidth * 2) / 2;
                
                // 나머지 길이 계산
                const remainingWidth = width - firstWidth;
                const remainingDivisionWidth = Number((remainingWidth / (division - 1)).toFixed(1));
        
                for(let i=0; i<division; i++)
                {
                    let currentWidth: number;
                    
                    if(i === 0) {
                        // 첫 번째는 0.5 단위로 조정된 width
                        currentWidth = firstWidth;
                    } else if(i === division - 1) {
                        // 마지막은 남은 길이로 정확히 맞춤
                        const usedWidth = firstWidth + (remainingDivisionWidth * (division - 2));
                        currentWidth = Number((width - usedWidth).toFixed(1));
                    } else {
                        // 중간들은 균등 분할
                        currentWidth = remainingDivisionWidth;
                    }
                    
                    this.blind['divSpec'][i]['width'] = currentWidth;
                    this.blind['divSpec'][i]['size']  = getHebe({
                        width       : currentWidth,
                        height      : this.common['height'],
                        minWidth    : this.blind['minWidth'],
                        minHeight   : this.blind['minHeight'],
                        size        : Number(this.common['unitSize']),
                        roundGb     : this.common['roundGb']
                    }) * Number(this.blind['divSpec'][i]['qty']);
                }
            }
        },
        getDivBlindWidth(index: number)
        {
            this.blind['divSpec'][index]['size']  = getHebe({
                width       : this.blind['divSpec'][index]['width'],
                height      : this.blind['division'] === 'A' ? Number(this.blind['divSpec'][index]['height']) : Number(this.common['height']),
                minWidth    : this.blind['minWidth'],
                minHeight   : this.blind['minHeight'],
                size        : Number(this.common['unitSize']),
                roundGb     : this.common['roundGb']
            }) * Number(this.blind['divSpec'][index]['qty']);

            const total = this.blind['divSpec'].reduce((acc, val) => acc + Number(val['width']), 0);

            this.common['width'] = Math.round(Number(total) * 10) / 10;
        },
        getDivBlindHeight(index: number)
        {
            this.blind['divSpec'][index]['size']  = getHebe({
                width       : this.blind['divSpec'][index]['width'],
                height      : Number(this.blind['divSpec'][index]['height']),
                minWidth    : this.blind['minWidth'],
                minHeight   : this.blind['minHeight'],
                size        : Number(this.common['unitSize']),
                roundGb     : this.common['roundGb']
            }) * Number(this.blind['divSpec'][index]['qty']);

            const total = this.blind['divSpec'].reduce((acc, val) => acc + Number(val['height']), 0);

            this.common['height'] = Math.round(Number(total) * 10) / 10;
        },
        getDivQty(index: number)
        {
            this.blind['divSpec'][index]['qty']++;
            this.blind['divSpec'][index]['size'] = getHebe({
                width       : this.blind['divSpec'][index]['width'],
                height      : this.blind['division'] === 'A' ? Number(this.blind['divSpec'][index]['height']) : Number(this.common['height']),
                minWidth    : this.blind['minWidth'],
                minHeight   : this.blind['minHeight'],
                size        : Number(this.common['unitSize']),
                roundGb     : this.common['roundGb']
            }) * Number(this.blind['divSpec'][index]['qty']);
        },
        getDivDelete(index: number)
        {
            if(index === 0)
            {
                if(this.blind.divSpec.length === 1)
                {
                    this.blind.divSpec[index] = {
                        width  : '',
                        height : '',
                        handle : 'L',
                        size   : getHebe({
                            width       : '',
                            height      : '',
                            minWidth    : this.blind['minWidth'],
                            minHeight   : this.blind['minHeight'],
                            size        : Number(this.common['unitSize']),
                            roundGb     : this.common['roundGb']
                        }),
                        qty    : 1
                    }
                }
                else
                {
                    this.blind.divSpec.splice(index, 1);
                }
            }
            else
            {
                this.blind.divSpec.splice(index, 1);
            }

            const width = this.blind['divSpec'].reduce((acc, val) => acc + Number(val['width']), 0);
            const height = this.blind['divSpec'].reduce((acc, val) => acc + Number(val['height']), 0);

            this.common['width']    = Math.round(Number(width) * 10) / 10;
            this.common['height']   = Math.round(Number(height) * 10) / 10;

            this.getUnitCalc();
        },
        getHeight()
        {
            
        },
        getUnitCalc(gb: 'Y'|'N' = 'N') /** gb => Y : '단위 직접 수정' / N : '자동계산' */
        {
            let info;

            switch(this.common['unit'])
            {
                case '001':
                    /** 회배 */
                    info = getHebeCalc(this.common, this.blind);

                    this.total['totalQty']      = Number(this.blind['division']) === 1 ? (Number(this.blind['leftQty']) + Number(this.blind['rightQty'])) : Number(this.blind['bQty']);
                    this.total['totalUnitSize'] = info['hebe'];
        
                    if(Number(this.blind['divSpec'].length) > 1)
                    {
                        this.total['eachItemSaleAmt'] = info['eachItemSaleAmt'];
                        this.total['eachItemSaleTax'] = info['eachItemSaleTax'];
                        this.total['eachItemPurcAmt'] = info['eachItemPurcAmt'];
                        this.total['eachItemPurcTax'] = info['eachItemPurcTax'];

                        if(info.optionData.length > 0)
                        {
                            this.total['eachOptionList'] = info.optionData;
                        }
                    }
        
                    this.total['totalShapeSaleAmt']   = 0;
                    this.total['totalHeightSaleAmt']  = 0;
                break;
                case '002':
                    /** 야드 */
                    if(gb === 'N')
                    {
                        this.curtain['size'] = getYard({
                            width   : Number(this.common['width']),
                            usage   : Number(this.curtain['use']),
                            size    : Number(this.common['unitSize']),
                            los     : this.curtain['los'],
                            split   : this.curtain['split'],
                            roundGb : this.common['roundGb']
                        });
                    }
        
                    info = getYardCalc(this.common, this.curtain);
        
                    this.total['totalQty']          = Number(this.curtain['cQty']);
                    this.total['totalUnitSize']     = Number(this.curtain['size']) * Number(this.curtain['cQty']);

                    this.total['totalHeightSaleAmt']   = 0;
                    this.total['totalHeightSaleTax']   = 0;
                    this.total['totalHeightPurcAmt']   = 0;
                    this.total['totalHeightPurcTax']   = 0;
                break;
                case '003': case '005':
                    /** 폭 */
                    if(gb === 'N')
                    {
                        this.curtain['size'] = getPok({
                            width   : Number(this.common['width']),
                            usage   : Number(this.curtain['use']),
                            size    : Number(this.common['unitSize']),
                            los     : this.curtain['los'],
                            proc    : this.curtain['proc'],
                            pokSpec : this.curtain['pokSpec'],
                            roundGb : this.common['roundGb']
                        });
                    }
                    
                    info = getPokCalc(this.common, this.curtain);
        
                    this.total['totalQty']             = Number(this.curtain['cQty']);
                    this.total['totalUnitSize']        = Number(this.curtain['size']) * Number(this.curtain['cQty']);
        
                    this.total['totalHeightSaleAmt']   = Number(info['heightSaleAmt']);
                    this.total['totalHeightSaleTax']   = Number(info['heightSaleTax']);
                    this.total['totalHeightPurcAmt']   = Number(info['heightPurcAmt']);
                    this.total['totalHeightPurcTax']   = Number(info['heightPurcTax']);
                break;
                case '004': /** EA */
                    info = eaCalculation({
                        purcAmt     : Number(this.common['purcUnit']),
                        saleAmt     : Number(this.common['saleUnit']),
                        qty         : Number(this.ea['qty']),
                        option      : [],
                        dcUnit      : this.common['dcUnit'],
                        dcAmt       : this.common['dcAmt'],
                        saleVat     : import.meta.env.VITE_VAT,
                        saleVmRate  : import.meta.env.VITE_VMRATE,
                        purcVat     : this.common['vat'],
                        purcVmRate  : this.common['vmRate']
                    });
            
                    this.total['totalQty']      = Number(this.ea['qty']);
                    this.total['totalUnitSize'] = info['ea'];
                break;
                case '006': /** CM */
                    this.curtain['size'] = getCm({
                        width   : Number(this.common['width']),
                        size    : Number(this.common['unitSize']),
                        roundGb : this.common['roundGb']
                    });
                    
                    info = getCmCalc(this.common, this.curtain);

                    this.total['totalQty']      = Number(this.curtain['cQty']);
                    this.total['totalUnitSize'] = Number(this.curtain['size']) * Number(this.curtain['cQty']);
                break;
            }

            /** 옵션 데이터 처리 */
            if(this.common['unit'] === '001')
            {
                if(info.optionData.length > 0)
                {
                    this.common.options.map(item => {
                        const option = info.optionData[0].find(o => o.gb === item.gb && o.icCd === item.icCd && o.itemCd === item.itemCd);

                        if(option)
                        {
                            item.saleAmt = option.saleAmt;
                            item.saleTax = option.saleTax;
                            item.purcAmt = option.purcAmt;
                            item.purcTax = option.purcTax;
                        }
                    })
                }
            }
            else
            {
                if(info.optionList.length > 0)
                {
                    this.common.options.map(item => {
                        const option = info.optionList.find(o => o.gb === item.gb && o.icCd === item.icCd && o.itemCd === item.itemCd);

                        if(option)
                        {
                            item.saleAmt = option.saleAmt;
                            item.saleTax = option.saleTax;
                            item.purcAmt = option.purcAmt;
                            item.purcTax = option.purcTax;
                        }
                    })
                }
            }

            /** 제품 금액 */
            this.total['totalItemSaleAmt']   = info['itemSaleAmt'];
            this.total['totalItemSaleTax']   = info['itemSaleTax'];
            this.total['totalItemPurcAmt']   = info['itemPurcAmt'];
            this.total['totalItemPurcTax']   = info['itemPurcTax'];

            /** 옵션 금액 */
            this.total['totalOptionSaleAmt']   = info['optionSaleAmt'];
            this.total['totalOptionSaleTax']   = info['optionSaleTax'];
            this.total['totalOptionPurcAmt']   = info['optionPurcAmt'];
            this.total['totalOptionPurcTax']   = info['optionPurcTax'];

            /** 나비주름 / 리드밴드 추가 금액 처리 ( 커튼 단위만 ) */
            switch(this.common['unit'])
            {
                case '002': case '003': case '005': case '006':
                    this.total['totalProcSaleAmt']  = info['procSaleAmt'];
                    this.total['totalProcSaleTax']  = info['procSaleTax'];
                    this.total['totalProcPurcAmt']  = info['procPurcAmt'];
                    this.total['totalProcPurcTax']  = info['procPurcTax'];

                    this.total['totalBprocSaleAmt'] = info['bprocSaleAmt'];
                    this.total['totalBprocSaleTax'] = info['bprocSaleTax'];
                    this.total['totalBprocPurcAmt'] = info['bprocPurcAmt'];
                    this.total['totalBprocPurcTax'] = info['bprocPurcTax'];

                    this.total['totalShapeSaleAmt'] = Number(info['shapeSaleAmt']);
                    this.total['totalShapeSaleTax'] = Number(info['shapeSaleTax']);
                    this.total['totalShapePurcAmt'] = Number(info['shapePurcAmt']);
                    this.total['totalShapePurcTax'] = Number(info['shapePurcTax']);
                break;
            }

            /** 총 매출/매입 금액 */
            this.total['totalSaleAmt']       = info['totalSaleAmt'];
            this.total['totalSaleTax']       = info['totalSaleTax'];
            this.total['totalPurcAmt']       = info['totalPurcAmt'];
            this.total['totalPurcTax']       = info['totalPurcTax'];
            // this.total['totalDcCalcAmt']     = info['dcAmt'];
        },
        getMsgSet(msg: string, id: string)
        {
            this.msg = getMsgInfo();
            
            switch(this.common['unit'])
            {
                case '001':
                    this.msg['blind'][id] = msg;
                break;
                case '002': case '003':
                    this.msg['curtain'][id] = msg;
                break;
                case '004':
                    this.msg['ea'][id] = msg;
                break;
            }
        },
        getType(type: Type)
        {
            this.type = type;
        },
        getEmCd(emCd: string)
        {
            this.emCd = emCd;
        },
        getEdCd(edCd: string, type: 'M' | 'O' = 'M')
        {
            this.type = type;
            this.edCd = edCd;
        },
        getUnitSet(price: number)
        {
            this.common.saleUnit = price;
        },
        getPayAmt(name: string, amt: number, memo: string = '')
        {
            const item = this.payList.find(item => item.name === name);

            if(item)
            {
                item.amt  = Number(amt);
                item.memo = memo;
            }
        },
        getAmtInfo(name: string, info: obejct)
        {
            this[name] = info;
        },
        getOptionReset()
        {
            this.common.options = [getOption()];
        },
        getReset()
        {
            this.common     = getCommonInfo();
            this.ea         = getEaInfo();
            this.blind      = getBlindInfo();
            this.curtain    = getCurtainInfo();
            this.total      = getTotalInfo();
            this.msg        = getMsgInfo();
        }
    },
    persist: {
        key     : 'esti',
        storage : localStorage,
        paths   : ['emCd']
    }
});