/**
 * @description 발주 처리 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
// import { getAxiosData } from '@/assets/js/function';

type Nullable<T>    = T | null;
type AmtUnitType    = 'F' | 'P'; /** F : 금액(원) / P : %(퍼센트) */

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

interface Info {
    stCd    : string;
    estiDt  : string;
    conDt   : string;
    deliDt  : string;
    insTime : string;
    insUser : string;
}

/**
 * @description 명세서 제품 결제 내역
 */
const getPayList = (): PayList[] => {
    return [
        {name : 'itemAmt',      title: '상품 금액',         amt: 0, red: false, blue: false},
        {name : 'itemTax',      title: '부가세',            amt: 0, red: false, blue: false},
        {name : 'shapeAmt',     title: '형상 금액',         amt: 0, red: false, blue: false},
        {name : 'heightAmt',    title: '세로길이 추가금액', amt: 0, red: false, blue: false},
        {name : 'addAmt',       title: '추가',              amt: 0, red: true, blue: false},
        {name : 'dcAmt',        title: '할인',              amt: 0, red: true, blue: false},
        {name : 'cutAmt',       title: '절삭 할인',         amt: 0, red: true, blue: false},
        {name : 'conAmt',       title: '계약 선금',         amt: 0, red: false, blue: true},
        {name : 'lastAddAmt',   title: '최종 추가',         amt: 0, red: true, blue: false},
        {name : 'lastDcAmt',    title: '최종 할인',         amt: 0, red: true, blue: false},
        {name : 'payAmt',       title: '결제 금액',         amt: 0, red: false, blue: true}
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

const getInfo = (): Info => {
    return {
        stCd    : '',
        estiDt  : '',
        conDt   : '',
        deliDt  : '',
        insTime : '',
        insUser : ''
    }
}

interface State {
    payList     : PayList[];
    dcInfo      : AmtInfo;
    addInfo     : AmtInfo;
    info        : Info;
}

export const useOrderStore = defineStore('order', {
    state: (): State => ({
        payList     : getPayList(),
        dcInfo      : getAmtInfo(),
        addInfo     : getAmtInfo(),
        info        : getInfo()
    }),
    getters: {
    },
    actions : {
        async getList(params)
        {
            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/orderV1/getList`, params);

                console.log(res);
                const list = [];
                
                res.data['factory'].map(fa => {
                    list.push({
                        fcCd       : fa.fcCd,
                        title      : fa.faNm,
                        masterStCd : fa.masterStCd,
                        cardLists  : res.data['orderList'].map(order => {
                            let buttonText = '';

                            if(fa.fcCd === order.fcCd)
                            {
                                const rows = [];
                                const tags = [];

                                switch(order.unit)
                                {
                                    case '001':
                                        if(order.division === 'D')
                                        {
                                            rows.push(...order.detail.map(dItem => ({
                                                width   : dItem.width,
                                                height  : dItem.height,
                                                leftQty : dItem.handle === '좌' ? 1 : 0,
                                                rightQty: dItem.handle === '우' ? 1 : 0,
                                                size    : dItem.size + order.unitNm
                                            })));
                                        }
                                        else
                                        {
                                            rows.push({
                                                width   : order.width,
                                                height  : order.height,
                                                leftQty : order.leftCnt,
                                                rightQty: order.rightCnt,
                                                size    : order.totalUnit + order.unitNm
                                            });
                                        }
                                    break;
                                    case '002': case '003':
                                        rows.push({
                                            width   : order.width,
                                            height  : order.height,
                                            proc    : order.proc === '001' ? '나비주름' : '평주름',
                                            split   : order.split === '001' ? '양개' : '편개',
                                            size    : order.totalUnit + order.unitNm
                                        });
                                    break;
                                }

                                if(order.shape === 'Y')
                                {
                                    tags.push({ spanText: "형상옵션" });
                                }

                                if(order.ordGb === 'O')
                                {
                                    /** 외주 공장 카카오톡 발주 */
                                    if(order.detailStCd === '006')
                                    {
                                        buttonText = '발주 완료';
                                    }
                                    else
                                    {
                                        buttonText = '메세지 발주';
                                    }
                                }
                                else
                                {
                                    /** 시스템 공장 발주 버튼 처리 */
                                    switch(order.detailStCd)
                                    {
                                        case '005': /** 발주대기 */
                                            buttonText = '시스템 발주';
                                        break;
                                        case '006': /** 발주완료 */
                                            buttonText = '배송완료';
                                        break;
                                        // case '007': /** 발주취소 */
                                        // break;
                                        // case '008': /** 발주 승인취소 */
                                            
                                        // break;
                                        case '009': /** 발주진행 */
                                            buttonText = '발주 취소';
                                        break;
                                        case '010': /** 발주승인 */
                                            buttonText = '발주 취소 요청';
                                        break;
                                    }
                                }

                                return {
                                    edCd         : order.edCd,
                                    ordGb        : order.ordGb,
                                    detailStCd   : order.detailStCd,
                                    productTitle : order.colorTitle === '' ? '' : order.productTitle,
                                    colorTitle   : order.colorTitle === '' ? order.productTitle : '',
                                    showDelete   : false,
                                    amt          : Number(order.totalSaleAmt) + Number(order.totalSaleTax),
                                    isRed        : true,
                                    columns      : getCardColumns(order.unit),
                                    rows         : rows,
                                    showTag      : tags.length > 0 ? true : false,
                                    tags         : tags,
                                    spanText     : order.memo,
                                    showButton   : true,
                                    buttonText   : `(${fa.faNm})`+ buttonText,
                                    blueButton   : order.ordGb === 'S' && order.detailStCd === '005' ? true : false,
                                    greyButton   : order.detailStCd === '006' ? true : false,
                                    cyanButton   : order.ordGb === 'O' && order.detailStCd === '005' ? true : false,
                                    softOrange   : order.ordGb === 'S' && order.detailStCd === '009' ? true : false,
                                    vividOrange  : order.ordGb === 'S' && order.detailStCd === '010' ? true : false,
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
        getPayAmt(name: string, amt: number)
        {
            const item = this.payList.find(item => item.name === name);

            if(item)
            {
                item.amt = Number(amt);
            }
        },
        getAmtInfo(name: string, info: AmtInfo)
        {
            this[name] = info;
        }
    }
});