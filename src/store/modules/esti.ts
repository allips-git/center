/**
 * @description 견적 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getHebe, getPok, eaCalculation } from '@/assets/js/order';
import { getHebeCalc, getPokCalc, getYardCalc } from '@/assets/js/calcAndProcess';
import { getAxiosData, getCardColumns } from '@/assets/js/function';

type Nullable<T>    = T | null;
type Type           = 'I' | 'M' | 'N'; /** I : 명세표 추가 데이터 / M : 수정 데이터 / N : 신규 명세표 */
type YnType         = 'Y' | 'N';
type OrdGbType      = 'S' | 'O';
type AddColorType   = 'O' | 'T';
type AmtUnitType    = 'F' | 'P'; /** F : 금액(원) / P : %(퍼센트) */

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

interface CurtainInfo {
    maxWidth        : Nullable<number>;
    maxHeight       : Nullable<number>;
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
    inColor         : string;
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
}

interface AmtInfo {
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
        addColor        : 'O',   /** 색상 구분(원톤 / 투톤) */
        shape           : 'N',   /** 형상 선택(있음 / 없음) */
        split           : '001', /** 분할 구분(양개 / 편개) */
        use             : 2.0,   /** 원단 사용량 */
        size            : 0,     /** 크기 */
        cQty            : 1,     /** 수량 */
        los             : 60,    /** 로스 길이 */
        pokSpec         : 150,   /** 폭 일시 스펙 */
        heightLen       : 0,     /** 세로 길이 제한(기본 세로 길이) */
        addPrice        : 0,     /** 추가 비율 */
        inColor         : '',    /** 투톤일 시 안쪽 색상코드 */
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
        {name : 'itemAmt',      title: '상품 금액',         amt: 0, red: false, blue: false},
        {name : 'itemTax',      title: '부가세',            amt: 0, red: false, blue: false},
        {name : 'shapeAmt',     title: '형상 금액',         amt: 0, red: false, blue: false},
        {name : 'heightAmt',    title: '세로길이 추가금액', amt: 0, red: false, blue: false},
        {name : 'addAmt',       title: '추가',              amt: 0, red: true, blue: false},
        {name : 'dcAmt',        title: '할인',              amt: 0, red: true, blue: false},
        {name : 'cutAmt',       title: '절삭 할인',         amt: 0, red: true, blue: false}
        // {name : 'conAmt', title: '계약 선금', amt: 0, blue: true},
        // {name : 'lastAddAmt', title: '최종 추가', amt: 0, red: true},
        // {name : 'lastDcAmt', title: '최종 할인', amt: 0, red: true},
        // {name : 'payAmt', title: '결제 금액', amt: 0, blue: true}
    ]
}

const getAmtInfo = (): AmtInfo => {
    return {
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
            bQty        : ''
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
    common      : CommonInfo;
    ea          : EaInfo;
    blind       : BlindInfo;
    curtain     : CurtainInfo;
    total       : TotalInfo;
    list        : [],
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
            const info = [
                { title : '제품 금액', amt : state.total['totalItemSaleAmt'] + state.total['totalItemSaleTax'] },
                { title : '옵션 금액', amt : state.total['totalOptionSaleAmt'] + state.total['totalOptionSaleTax'] },
                { title : '형상 금액', amt : state.total['totalShapeSaleAmt'] + state.total['totalShapeSaleTax'] },
                { title : '세로길이 추가 금액', amt : state.total['totalHeightSaleAmt'] + state.total['totalHeightSaleTax'] }
            ];

            return info;
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
                                        if(esti.division === 'D')
                                        {
                                            rows.push(...esti.detail.map(dItem => ({
                                                width   : dItem.width,
                                                height  : dItem.height,
                                                leftQty : dItem.handle === 'L' ? 1 : 0,
                                                rightQty: dItem.handle === 'R' ? 1 : 0,
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
                                    case '004':
                                        rows.push({
                                            qty : esti.cnt
                                        })
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

                console.log(list);

                this.list = list;

                this.getPayAmt('itemAmt', Number(res.data['itemAmt']));
                this.getPayAmt('itemTax', Number(res.data['itemTax']));

                /** 추가 금액 */
                if(res.data['addAmt'])
                {
                    this.getPayAmt('addAmt', Number(res.data['addAmt']['amt']));
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
                    this.getPayAmt('dcAmt', Number(res.data['dcAmt']['amt']));
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
                    this.getAmtInfo('cutInfo', { gubun : true, amt : Number(res.data['cutAmt']['amt']) });
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
                    case '002': case '003':
                        this.getCurtainSet(itemInfo);
                    break;
                    case '004':
                        this.getEaSet(itemInfo);
                    break;
                }

                this.getUnitCalc();
            }
            catch(e)
            {
                console.error(e);
            }
        },
        async getCommonSet(info: ItemInfo)
        {
            for (const data in info) {
                this.common[data] = info[data];
            }
        },
        async getBlindSet(info: object)
        {
            for(const data in info){
                this.blind[data] = data === 'division' ? Number(info[data]) : info[data];
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
        
            for(let i=0; i<division; i++)
            {
                const spec = {
                    width  : specInfo[i] !== undefined ? specInfo[i]['width'] : '',
                    height : this.common['height'],
                    handle : i === 0 ? 'L' : 'R',
                    size   : getHebe({
                        width  : specInfo[i] !== undefined ? specInfo[i]['width'] : '',
                        height : Number(this.common['height']),
                        size   : Number(this.common['unitSize'])
                    })
                }
        
                specArr.push(spec);
            }
        
            this.blind['divSpec'] = specArr;
        },
        getEqual()
        {
            const width    = Number(this.common['width']);
            const division = Number(this.blind['division']);
        
            let divisionWidth, nam, lastWidth;
        
            if(width > 0)
            {
                divisionWidth   = Number(Math.floor((width / division) * 10) / 10); /** 분할길이 */
                nam             = (divisionWidth * (division - 1)).toFixed(1);      /** 나머지 값 */
                lastWidth       = Number((width - nam).toFixed(1));                 /** 나머지 길이 */
        
                for(let i=0; i<division; i++)
                {
                    this.blind['divSpec'][i]['width'] = (i === (division-1) ? lastWidth : divisionWidth);
                    this.blind['divSpec'][i]['size']  = getHebe({
                        width  : i === (division-1) ? lastWidth : divisionWidth,
                        height : this.common['height'],
                        size   : 0
                    })
                }
            }
        },
        getDivBlindWidth(index: number)
        {
            this.blind['divSpec'][index]['size']  = getHebe({
                width  : this.blind['divSpec'][index]['width'],
                height : Number(this.common['height']),
                size   : 0
            });

            const total = this.blind['divSpec'].reduce((acc, val) => acc + Number(val['width']), 0);

            this.common['width'] = Math.round(Number(total) * 10) / 10;
        },
        getUnitCalc()
        {
            let info;

            switch(this.common['unit'])
            {
                case '001':
                    /** 회배 */
                    info = getHebeCalc(this.common, this.blind);

                    this.total['totalQty']      = Number(this.blind['division']) === 1 ? (Number(this.blind['leftQty']) + Number(this.blind['rightQty'])) : Number(this.blind['bQty']);
                    this.total['totalUnitSize'] = info['hebe'];
        
                    if(Number(this.blind['division']) > 1)
                    {
                        this.total['eachItemSaleAmt'] = info['eachItemSaleAmt'];
                        this.total['eachItemSaleTax'] = info['eachItemSaleTax'];
                        this.total['eachItemPurcAmt'] = info['eachItemPurcAmt'];
                        this.total['eachItemPurcTax'] = info['eachItemPurcTax'];
                    }
        
                    this.total['totalShapeSaleAmt']   = 0;
                    this.total['totalHeightSaleAmt']  = 0;
                break;
                case '002':
                    /** 야드 */
                    this.curtain['size'] = getYard({
                        width   : Number(this.common['width']),
                        usage   : Number(this.curtain['use']),
                        size    : Number(this.common['unitSize']),
                        los     : this.curtain['los']
                    });
        
                    info = getYardCalc(this.common, this.curtain);
        
                    this.total['totalQty']          = Number(this.curtain['cQty']);
                    this.total['totalUnitSize']     = Number(this.curtain['size']);
                    
                    this.total['totalShapeSaleAmt']    = Number(info['shapeSaleAmt']);
                    this.total['totalShapeSaleTax']    = Number(info['shapeSaleTax']);
                    this.total['totalShapePurcAmt']    = Number(info['shapePurcAmt']);
                    this.total['totalShapePurcTax']    = Number(info['shapePurcTax']);
                break;
                case '003':
                    /** 폭 */
                    this.curtain['size'] = getPok({
                        width   : Number(this.common['width']),
                        usage   : Number(this.curtain['use']),
                        size    : Number(this.common['unitSize']),
                        pokSpec : this.curtain['pokSpec'],
                        los     : this.curtain['los']
                    });
                    
                    info = getPokCalc(this.common, this.curtain);
        
                    this.total['totalQty']             = Number(this.curtain['cQty']);
                    this.total['totalUnitSize']        = Number(this.curtain['size']);
        
                    this.total['totalHeightSaleAmt']   = Number(info['heightSaleAmt']);
                    this.total['totalHeightSaleTax']   = Number(info['heightSaleTax']);
                    this.total['totalHeightPurcAmt']   = Number(info['heightPurcAmt']);
                    this.total['totalHeightPurcTax']   = Number(info['heightPurcTax']);
        
                    this.total['totalShapeSaleAmt']    = Number(info['shapeSaleAmt']);
                    this.total['totalShapeSaleTax']    = Number(info['shapeSaleTax']);
                    this.total['totalShapePurcAmt']    = Number(info['shapePurcAmt']);
                    this.total['totalShapePurcTax']    = Number(info['shapePurcTax']);
                break;
                case '004': /** EA */
                    info = eaCalculation({
                        purcAmt : Number(this.common['purcUnit']),
                        saleAmt : Number(this.common['saleUnit']),
                        qty     : Number(this.ea['qty']),
                        option  : [],
                        dcUnit  : this.common['dcUnit'],
                        dcAmt   : this.common['dcAmt'],
                        vat     : this.common['vat']
                    });
            
                    this.total['totalQty']      = Number(this.ea['qty']);
                    this.total['totalUnitSize'] = info['ea'];
                break;
            }

            this.total['totalItemSaleAmt']   = info['itemSaleAmt'];
            this.total['totalItemSaleTax']   = info['itemSaleTax'];
            this.total['totalItemPurcAmt']   = info['itemPurcAmt'];
            this.total['totalItemPurcTax']   = info['itemPurcTax'];
            /** 옵션 추가 필요 */
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
        getEdCd(edCd: string)
        {
            this.type = 'M';
            this.edCd = edCd;
        },
        getPayAmt(name: string, amt: number)
        {
            const item = this.payList.find(item => item.name === name);

            if(item)
            {
                item.amt = Number(amt);
            }
        },
        getAmtInfo(name: string, info: obejct)
        {
            this[name] = info;
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