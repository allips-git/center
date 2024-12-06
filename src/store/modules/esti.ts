/**
 * @description 견적 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getHebe, getPok, eaCalculation } from '@/assets/js/order';
import { getHebeCalc, getPokCalc, getYardCalc, getBlindParams, getCurtainParams } from '@/assets/js/calcAndProcess';

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
    getters: {
        totalAmtInfo : (state) => {
            const info = [
                { title : '제품 금액', amt : state.total['totalItemSaleAmt'] + state.total['totalItemSaleTax'] },
                { title : '옵션 금액', amt : state.total['totalOptionSaleAmt'] + state.total['totalOptionSaleTax'] },
                { title : '형상 금액', amt : state.total['totalShapeSaleAmt'] + state.total['totalShapeSaleTax'] },
                { title : '세로길이 추가 금액', amt : state.total['totalHeightSaleAmt'] + state.total['totalHeightSaleTax'] }
            ];

            console.log(info);

            return info;
        }
    },
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
        },
        async getCommonSet(info: ItemInfo)
        {
            for (const data in info) {
                this.common[data] = info[data];
            }
        },
        getDivisionSet()
        {
            console.log('division');
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
                case '001': /** 회배 */
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
                    this.curtain['size'] = getYard({
                        width   : Number(this.common['width']),
                        usage   : Number(this.curtain['use']),
                        size    : Number(this.common['unitSize']),
                        los     : this.curtain['los']
                    });
        
                    info = getYardCalc(this.common, this.curtain);
        
                    this.total['totalQty']          = Number(this.curtain['cQty']);
                    this.total['totalUnitSize']     = info['yard'];
                    
                    this.total['totalShapeSaleAmt']    = Number(info['shapeSaleAmt']);
                    this.total['totalShapeSaleTax']    = Number(info['shapeSaleTax']);
                    this.total['totalShapePurcAmt']    = Number(info['shapePurcAmt']);
                    this.total['totalShapePurcTax']    = Number(info['shapePurcTax']);
                break;
                case '003': /** 폭 */
                    this.curtain['size'] = getPok({
                        width   : Number(this.common['width']),
                        usage   : Number(this.curtain['use']),
                        size    : Number(this.common['unitSize']),
                        pokSpec : this.curtain['pokSpec'],
                        los     : this.curtain['los']
                    });
                    
                    info = getPokCalc(this.common, this.curtain);
        
                    this.total['totalQty']             = Number(this.curtain['cQty']);
                    this.total['totalUnitSize']        = info['pok'];
        
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
        }
    },
    persist: {
        key     : 'esti',
        storage : localStorage,
        paths   : ['emCd']
    }
});