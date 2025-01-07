/**
 * @description 발주 처리 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData, getCardColumns, getAddDate, getConvertDate } from '@/assets/js/function';

type Nullable<T>    = T | null;
type AmtUnitType    = 'F' | 'P'; /** F : 금액(원) / P : %(퍼센트) */

interface PayList {
    name    : string;
    amtGb   : string;
    title   : string;
    amt     : number;
    red     : boolean;
    blue    : boolean;
    memo    : string;
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

interface Order {
    ordDt       : string;
    outDt       : string;
    shippingGb  : string;
    zip         : null | number;
    addr        : string;
    addrDetail  : string;
    memo        : string;
}

interface Pay {
    totalPayAmt : number;
    payGb       : string;
    payAmt      : number;
    memo        : string;
}

/**
 * @description 명세서 제품 결제 내역
 */
const getPayList = (): PayList[] => {
    return [
        {name : 'itemAmt',      amtGb : '', title: '상품 금액',         amt: 0, red: false, blue: false, memo : ''},
        {name : 'itemTax',      amtGb : '', title: '부가세',            amt: 0, red: false, blue: false, memo : ''},
        {name : 'shapeAmt',     amtGb : '', title: '형상 금액',         amt: 0, red: false, blue: false, memo : ''},
        {name : 'heightAmt',    amtGb : '', title: '세로길이 추가금액', amt: 0, red: false, blue: false, memo : ''},
        {name : 'addAmt',       amtGb : '001', title: '추가',              amt: 0, red: true, blue: false, memo : ''},
        {name : 'dcAmt',        amtGb : '002', title: '할인',              amt: 0, red: true, blue: false, memo : ''},
        {name : 'cutAmt',       amtGb : '003', title: '절삭 할인',         amt: 0, red: true, blue: false, memo : ''},
        {name : 'conAmt',       amtGb : '004', title: '계약 선금',         amt: 0, red: false, blue: true, memo : ''},
        {name : 'lastAddAmt',   amtGb : '005', title: '최종 추가',         amt: 0, red: true, blue: false, memo : ''},
        {name : 'lastDcAmt',    amtGb : '006', title: '최종 할인',         amt: 0, red: true, blue: false, memo : ''},
        {name : 'payAmt',       amtGb : '007', title: '결제 금액',         amt: 0, red: false, blue: true, memo : ''}
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

const getPay = (): Pay => {
    return {
        totalPayAmt : 0,
        payGb       : '001',
        payAmt      : 0,
        memo        : ''
    }
}

const getOrder = (): Order => {
    return {
        ordDt       : getConvertDate(new Date(), 'yyyy-MM-dd'),
        outDt       : getConvertDate(getAddDate(3), 'yyyy-MM-dd'),
        shippingGb  : '001',
        zip         : null,
        addr        : '',
        addrDetail  : '',
        memo        : ''
    }
}

interface State {
    edCd        : string;
    list        : [];
    payList     : PayList[];
    dcInfo      : AmtInfo;
    addInfo     : AmtInfo;
    info        : Info;
    outInfo     : OrderInfo;
    pay         : Pay;
}

export const useOrderStore = defineStore('order', {
    state: (): State => ({
        edCd        : '',
        list        : [],
        payList     : getPayList(),
        dcInfo      : getAmtInfo(),
        addInfo     : getAmtInfo(),
        info        : getInfo(),
        outInfo     : getOrder(),
        pay         : getPay()
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
                            let buttonType = '';

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
                                        buttonType = 'secondary';
                                    }
                                    else
                                    {
                                        buttonText = '메세지 발주';
                                        buttonType = 'success';
                                    }
                                }
                                else
                                {
                                    /** 시스템 공장 발주 버튼 처리 */
                                    switch(order.detailStCd)
                                    {
                                        case '005': /** 발주대기 */
                                            buttonText = '시스템 발주';
                                            buttonType = 'success';
                                        break;
                                        case '006': /** 발주완료 */
                                            buttonText = '배송완료';
                                            buttonType = 'secondary';
                                        break;
                                        // case '007': /** 발주취소 */
                                        // break;
                                        // case '008': /** 발주 승인취소 */
                                            
                                        // break;
                                        case '009': /** 발주진행 */
                                            buttonText = '발주 취소';
                                            buttonType = 'warn';
                                        break;
                                        case '010': /** 발주승인 */
                                            buttonText = '발주 취소 요청';
                                            buttonType = 'danger';
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
                                    buttonType   : buttonType
                                }
                            }
                        }).filter(Boolean)
                    })
                });

                this.list = list;

                this.getItemAmt('itemAmt', Number(res.data['itemAmt']));
                this.getItemAmt('itemTax', Number(res.data['itemTax']));

                res.data['amtList'].map((amt) => {
                    this.getPayAmt(amt['amtGb'], Number(amt['amt']), amt['memo'])
                });

                const [hours, minutes] = res.data['info']['insTime'].split(':').map(Number);

                const info = {
                    stCd    : res.data['info']['stCd'],
                    estiDt  : res.data['info']['estiDt'],
                    conDt   : res.data['info']['conDt'],
                    deliDt  : res.data['info']['deliDt'],
                    insTime : `${hours}시간 ${minutes}분`,
                    insUser : res.data['info']['insUser']
                }

                this.info = info;
            }
            catch(e)
            {
                console.log(e);
            }
        },
        getItemAmt(name: string, amt: number)
        {
            const item = this.payList.find(item => item.name === name);
            
            if(item)
            {
                item.amt = Number(amt);
            }
        },
        getPayAmt(amtGb: string, amt: number, memo: string)
        {
            const item = this.payList.find(item => item.amtGb === amtGb);
            
            if(item)
            {
                item.amt  = Number(amt);
                item.memo = memo;
            }
        },
        getAmtInfo(name: string, info: AmtInfo)
        {
            this[name] = info;
        },
        getEdCd(edCd: string)
        {
            this.edCd = edCd;
        },
        getOutInfoAddrReset()
        {
            this.outInfo.zip    = null;
            this.outInfo.addr   = '';
        },
        getOutInfoReset()
        {
            this.outInfo = getOrder();
        },
        getReset()
        {
            this.list        = [];
            this.payList     = getPayList();
            this.dcInfo      = getAmtInfo();
            this.addInfo     = getAmtInfo();
            this.info        = getInfo();
            this.outInfo     = getOrder();
            this.pay         = getPay();
        }
    },
    persist: {
        key     : 'order',
        storage : localStorage,
        paths   : ['edCd']
    }
});