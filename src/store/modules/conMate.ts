/**
 * @description 계약서 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData, getCardColumns, getConvertDate } from '@/assets/js/function';

interface PayList {
    name    : string;
    amtGb   : string;
    title   : string;
    amt     : number;
    red     : boolean;
    blue    : boolean;
}

/**
 * @description 명세서 제품 결제 내역
 */
const getPayList = (): PayList => {
    return [
        {name : 'itemAmt',      amtGb : '', title: '상품 금액',         amt: 0, red: false, blue: false},
        {name : 'itemTax',      amtGb : '', title: '부가세',            amt: 0, red: false, blue: false},
        {name : 'shapeAmt',     amtGb : '', title: '형상 금액',         amt: 0, red: false, blue: false},
        {name : 'heightAmt',    amtGb : '', title: '세로길이 추가금액', amt: 0, red: false, blue: false},
        {name : 'addAmt',       amtGb : '001', title: '추가',              amt: 0, red: true, blue: false},
        {name : 'dcAmt',        amtGb : '002', title: '할인',              amt: 0, red: true, blue: false},
        {name : 'cutAmt',       amtGb : '003', title: '절삭 할인',         amt: 0, red: true, blue: false},
        {name : 'conAmt',       amtGb : '004', title: '계약 선금',         amt: 0, red: false, blue: true}
    ]
}

interface State {
    ceNm    : string;
    imgUrl  : string;
    headers : [],
    list    : [],
    payList : PayList[];
    sizeYn  : boolean;
}

export const useConMateStore = defineStore('conMate', {
    state: (): State => ({
        ceNm    : '',
        imgUrl  : '',
        headers : [],
        list    : [],
        payList : getPayList(),
        sizeYn  : false
    }),
    getters: {
    },
    actions : {
        async getInfo(params)
        {
            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/estiV1/getConMateInfo`, params);

                console.log(res);
                this.ceNm = res.data['info']['ceNm'];

                const headers = [
                    { label: "전화번호", value: res.data['info']['tel'] },
                    { label: "주소", value: res.data['info']['addr'] },
                    { label: "상세주소", value: res.data['info']['addrDetail'] },
                    { label: "견적일", value: getConvertDate(new Date(res.data['info']['estiDt']), 'yy.mm.dd.w') },
                    { label: "계약일", value: getConvertDate(new Date(res.data['info']['conDt']), 'yy.mm.dd.w') }
                ];

                this.headers = headers;

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

                this.list = list;

                this.getItemAmt('itemAmt', Number(res.data['itemAmt']));
                this.getItemAmt('itemTax', Number(res.data['itemTax']));

                res.data['amtList'].map((amt) => {
                    this.getPayAmt(amt['amtGb'], Number(amt['amt']));
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
        getPayAmt(amtGb: string, amt: number)
        {
            const item = this.payList.find(item => item.amtGb === amtGb);

            if(item)
            {
                item.amt = Number(amt);
            }
        }
    }
});