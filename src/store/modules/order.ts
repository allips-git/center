/**
 * @description 발주 처리 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData, getCardColumns, getAddDate } from '@/assets/js/function';

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

interface Order {
    ordDt       : string;
    outDt       : string;
    emer        : Y | N;
    shippingGb  : string;
    zip         : null | number;
    addr        : string;
    addrDetail  : string;
    memo        : string;
}

interface ShippingList {
    shippingGb  : string;
    zip         : string;
    addr        : string;
    addrDetail  : string;
}

/**
 * @description 명세서 제품 결제 내역
 */
const getPayList = (): PayList[] => {
    return [
        {name : 'itemAmt',      amtGb : '', title: '상품 금액',         amt: 0, red: false, blue: false, memo : ''},
        {name : 'itemTax',      amtGb : '', title: '부가세',            amt: 0, red: false, blue: false, memo : ''},
        {name : 'optionAmt',      amtGb : '', title: '옵션',            amt: 0, red: false, blue: false, memo : ''},
        {name : 'procAmt',      amtGb : '', title: '나비주름',            amt: 0, red: false, blue: false, memo : ''},
        {name : 'bprocAmt',      amtGb : '', title: '리드밴드',            amt: 0, red: false, blue: false, memo : ''},
        {name : 'shapeAmt',     amtGb : '', title: '형상',         amt: 0, red: false, blue: false, memo : ''},
        {name : 'heightAmt',    amtGb : '', title: '세로길이 추가금액', amt: 0, red: false, blue: false, memo : ''},
        {name : 'addAmt',       amtGb : '001', title: '추가',              amt: 0, red: true, blue: false, memo : ''},
        {name : 'dcAmt',        amtGb : '002', title: '할인',              amt: 0, red: true, blue: false, memo : ''},
        {name : 'cutAmt',       amtGb : '003', title: '절삭 할인',         amt: 0, red: true, blue: false, memo : ''},
        {name : 'conAmt',       amtGb : '004', title: '계약 선금',         amt: 0, red: false, blue: true, memo : ''},
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

const getOrder = (): Order => {
    return {
        ordDt       : new Date(),
        outDt       : getAddDate(3),
        emer        : 'N',
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
    cutInfo     : CutInfo;
    shippingList: ShippingList[];
    sysInfo     : Order;
    outInfo     : Order;
}

export const useOrderStore = defineStore('order', {
    state: (): State => ({
        edCd        : '',
        list        : [],
        payList     : getPayList(),
        dcInfo      : getAmtInfo(),
        addInfo     : getAmtInfo(),
        cutInfo     : {
            gubun : false,
            amt   : 0
        },
        shippingList: [],
        sysInfo     : getOrder(),
        outInfo     : getOrder()
    }),
    getters : {
        totalAmt : (state) => {
            return state.payList.reduce((acc, cur) => acc + cur.amt, 0);
        }
    },
    actions : {
        async getData()
        {
            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/orderV1/getData`);
    
                console.log(res);

                const data = res.data.list.find(item => item.repYn === 'Y');

                if(data)
                {
                    this.sysInfo.shippingGb = data['shippingGb'];
                    this.sysInfo.zip        = data['zip'];
                    this.sysInfo.addr       = data['addr'];
                    this.sysInfo.addrDetail = data['addrDetail'];
                }

                this.shippingList = res.data.list;
            }
            catch(e)
            {
                console.log(e);
            }
        },
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
                                                leftQty : dItem.handle === 'L' ? dItem.cnt : 0,
                                                rightQty: dItem.handle === 'R' ? dItem.cnt : 0,
                                                size    : (Number(dItem.size) * Number(dItem.cnt)) + order.unitNm
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
                                    case '002': case '003': case '005': case '006':
                                        rows.push({
                                            width   : order.width,
                                            height  : order.height,
                                            // proc    : order.proc === '001' ? '나비주름' : '평주름',
                                            split   : order.split === '001' ? '양개' : '편개',
                                            qty     : order.cnt,
                                            size    : order.totalUnit + order.unitNm
                                        });
                                    break;
                                    case '004':
                                        rows.push({
                                            qty : order.cnt
                                        })
                                    break;
                                }

                                const options = order.option.filter(item => item.poGb === '001');

                                if(options.length !== 0)
                                {
                                    options.map(option => {
                                        tags.push({ spanText: option.itemNm + ' / ' + option.icNm });
                                    })
                                }

                                if(order.shape === 'Y')
                                {
                                    tags.push({ spanText: "형상옵션" });
                                }

                                if(order.proc === '001')
                                {
                                    tags.push({ spanText: "나비주름" });
                                }

                                if(order.bproc === '002')
                                {
                                    tags.push({ spanText: "리드밴드" });
                                }

                                if(order.addColor === 'T')
                                {
                                    tags.push({ spanText: `투톤: 기둥 ${order.outColorNm} ${order.outSize}${order.unitNm} / 안쪽 ${order.inColorNm} ${order.inSize}${order.unitNm}` });
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
                                            buttonType = 'primary';
                                        break;
                                        case '006': /** 발주완료 */
                                            buttonText = '발주 취소 요청';
                                            buttonType = 'warn';
                                        break;
                                        // case '007': /** 발주취소 */
                                        // break;
                                        case '008': /** 발주 승인취소 */
                                            buttonText = '발주 취소 요청 중';                                          
                                        break;
                                        case '009': /** 발주진행 */
                                            buttonText = '발주 취소';
                                            buttonType = 'help';
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
                                    productTitle : order.productTitle,
                                    colorTitle   : order.colorTitle,
                                    showDelete   : order.detailStCd === '005' ? true : false,
                                    amt          : Number(order.totalSaleAmt) + Number(order.totalSaleTax),
                                    purcAmt      : Number(order.totalPurcAmt) + Number(order.totalPurcTax),
                                    isRed        : false,
                                    columns      : getCardColumns(order.unit),
                                    rows         : rows,
                                    showTag      : tags.length > 0 ? true : false,
                                    tags         : tags,
                                    spanText     : order.memo,
                                    orderInfo    : {
                                        shippingGbNm    : order.shippingGbNm,
                                        ordDt           : order.ordDt,
                                        outDt           : order.outDt,
                                        orderMemo       : order.orderMemo
                                    },
                                    outNo        : order.outNo,
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
                this.getItemAmt('optionAmt', Number(res.data['optionAmt']));
                this.getItemAmt('procAmt', Number(res.data['procAmt']));
                this.getItemAmt('bprocAmt', Number(res.data['bprocAmt']));
                this.getItemAmt('shapeAmt', Number(res.data['shapeAmt']));
                this.getItemAmt('heightAmt', Number(res.data['heightAmt']));

                this.getAmtInfo('addInfo', getAmtInfo());
                this.getAmtInfo('dcInfo', getAmtInfo());
                this.getAmtInfo('cutInfo', { gubun : false, amt : 0 });

                res.data['amtList'].map((amt) => {
                    switch(amt.amtGb)
                    {
                        case '001':
                            this.getAmtInfo('addInfo', amt);
                        break;
                        case '002':
                            this.getAmtInfo('dcInfo', amt);
                        break;
                        case '003':
                            if(Number(amt.amt) !== 0)
                            {
                                this.getAmtInfo('cutInfo', { gubun : true, amt : Number(amt.amt) });
                            }
                        break;
                    };

                    this.getPayAmt(amt['amtGb'], Number(amt['amt']), amt['memo'])
                });
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
        getAmtInfo(name: string, info: obejct)
        {
            this[name] = info;
        },
        getEdCd(edCd: string)
        {
            this.edCd = edCd;
        },
        getSysInfoAddrSet()
        {
            this.sysInfo.zip        = null;
            this.sysInfo.addr       = '';
            this.sysInfo.addrDetail = '';

            const data = this.shippingList.find(item => item.shippingGb === this.sysInfo.shippingGb);

            if(data)
            {
                this.sysInfo.zip        = data.zip;
                this.sysInfo.addr       = data.addr;
                this.sysInfo.addrDetail = data.addrDetail;
            }
        },
        getSysInfoReset()
        {
            this.sysInfo = getOrder();
        },
        getOutInfoAddrSet()
        {
            this.outInfo.zip        = null;
            this.outInfo.addr       = '';
            this.outInfo.addrDetail = '';

            const data = this.shippingList.find(item => item.shippingGb === this.sysInfo.shippingGb);

            if(data)
            {
                this.outInfo.zip        = data.zip;
                this.outInfo.addr       = data.addr;
                this.outInfo.addrDetail = data.addrDetail;
            }
        },
        getOutInfoReset()
        {
            this.outInfo = getOrder();
        },
        getReset()
        {
            this.list        = [];
            this.payList     = getPayList();
            this.sysInfo     = getOrder();
            this.outInfo     = getOrder();
        }
    },
    persist: {
        key     : 'order',
        storage : localStorage,
        paths   : ['edCd']
    }
});