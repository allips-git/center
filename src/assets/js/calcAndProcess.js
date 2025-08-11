import { getHebe, hebeCalculation, pokCalculation, yardCalculation, cmCalculation } from 'planorder-calculator';

/**
 * @description 회배 계산 처리
 */
export function getHebeCalc(common, blind)
{
    const hebe = [];

    const division = Number(blind['division']);
    const leftQty  = Number(blind['leftQty']);
    const rightQty = Number(blind['rightQty']);
    const qty      = Number(blind['bQty']);

    if(division === 1)
    {
        const data = {
            width       : Number(common['width']),
            height      : Number(common['height']),
            minWidth    : Number(blind['minWidth']),
            minHeight   : Number(blind['minHeight']),
            size        : Number(common['unitSize']),
            roundGb     : common['roundGb']
        };

        hebe.push(getHebe(data));
    } 
    else
    {
        blind['divSpec'].forEach(item => {
            hebe.push(Number(item.size));
        });
    }

    const params = {
        purcAmt  : Number(common['purcUnit']),
        saleAmt  : Number(common['saleUnit']),
        hebe     : hebe,
        division : division,
        qty      : division === 1 ? (leftQty + rightQty) : qty,
        option   : [], /** 옵션 추후 추가 필요 */
        dcUnit   : common['dcUnit'],
        dcAmt    : Number(common['dcAmt']),
        vat      : common['vat'],
        vmRate   : common['vmRate']
    };

    return hebeCalculation(params);
}

/**
 * @description 야드 계산 처리
 */
export function getYardCalc(common, curtain)
{
    const params = {
        purcAmt         : Number(common['purcUnit']),
        saleAmt         : Number(common['saleUnit']),
        shapeSaleAmt    : Number(curtain['shapeSaleAmt']),
        shapePurcAmt    : Number(curtain['shapePurcAmt']),
        shapeGb         : curtain['shape'],
        qty             : curtain['cQty'],
        yard            : Number(curtain['size']),
        height          : Number(common['height']),
        option          : [], /** 옵션 추후 추가 필요 */
        dcUnit          : common['dcUnit'],
        dcAmt           : Number(common['dcAmt']),
        vat             : common['vat'],
        vmRate          : common['vmRate']
    };

    return yardCalculation(params);
}

/**
 * @description 폭 계산 처리 
 */
export function getPokCalc(common, curtain) 
{
    const params = {
        purcAmt         : Number(common['purcUnit']),
        saleAmt         : Number(common['saleUnit']),
        shapeSaleAmt    : curtain['shapeSaleAmt'],
        shapePurcAmt    : curtain['shapePurcAmt'],
        shapeGb         : curtain['shape'],
        qty             : curtain['cQty'],
        pok             : Number(curtain['size']),
        height          : Number(common['height']),
        heightLen       : Number(curtain['heightLen']),
        addPrice        : Number(curtain['addPrice']),
        option          : [], /** 옵션 추후 추가 필요 */
        dcUnit          : common['dcUnit'],
        dcAmt           : Number(common['dcAmt']),
        vat             : common['vat'],
        vmRate          : common['vmRate']
    };

    return pokCalculation(params);
}

/** 
 * @description CM 계산 처리
 */
export function getCmCalc(common, curtain)
{
    const params = {
        purcAmt : Number(common['purcUnit']),
        saleAmt : Number(common['saleUnit']),
        cm      : Number(curtain['size']),
        cnt     : curtain['cQty'],
        option  : [],
        dcUnit  : common['dcUnit'],
        dcAmt   : Number(common['dcAmt']),
        vat     : common['vat'],
        vmRate  : common['vmRate']
    }

    return cmCalculation(params);
}

/**
 * @description 블라인드 Request 파라미터 가공
 */
export function getBlindParams(common, blind)
{
    const params = getCommonParams(common);

    params['division'] = blind['division'];
    params['width']    = common['width'];
    params['height']   = common['height'];
    params['leftCnt']  = blind['leftQty'] ? blind['leftQty'] : 0;
    params['rightCnt'] = blind['rightQty'] ? blind['rightQty'] : 0;
    params['cnt']      = blind['bQty'];
    params['spec']     = blind['divSpec'];

    return params;
}

/**
 * @description 커튼 Request 파라미터 가공
 */
export function getCurtainParams(common, curtain)
{
    const params = getCommonParams(common);

    params['width']     = common['width'];
    params['height']    = common['height'];
    params['size']      = curtain['size'];
    params['proc']      = curtain['proc'];
    params['bproc']     = curtain['bproc'];
    params['los']       = curtain['los'];
    params['addColor']  = curtain['addColor'];
    params['shape']     = curtain['shape'];
    params['split']     = curtain['split'];
    params['use']       = curtain['use'];
    params['cnt']       = curtain['cQty'];
    params['inColor']   = curtain['inColor'];
    params['inSize']    = curtain['inSize'];
    params['outSize']   = curtain['size'] - curtain['inSize'];

    if(params['unit'] === '003')
    {
        params['pokSpec'] = curtain['pokSpec'];
    }

    return params;
}

/**
 * @description EA Request 파라미터 가공
 */
export function getEaParams(common, ea)
{
    const params  = getCommonParams(common);

    params['cnt'] = ea['qty'];

    return params;
}

/**
 * @description 공통 Request 파라미터 가공
 */
export function getCommonParams(common)
{
    const params = {
        fcCd        : common['fcCd'],
        ordGb       : common['ordGb'],
        vat         : common['vat'],
        itemCd      : common['itemCd'],
        itemNm      : common['itemNm'],
        icCd        : common['icCd'],
        icNm        : common['icNm'],
        setLocate   : common['location'] === '' ? '기타' : common['location'],
        unit        : common['unit'],
        unitSize    : common['unitSize'],
        saleUnit    : common['saleUnit'],
        purcUnit    : common['purcUnit'],
        roundGb     : common['roundGb'],
        memo        : common['memo']
    }

    return params;
}