/**
 * @description 외주 발주서 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData, getCardColumns, getConvertDate } from '@/assets/js/function';
import axios from 'axios';

interface State {
    ceNm        : string;
    faNm        : string;
    headers     : [],
    list        : [],
    sizeYn      : boolean;
}

export const useOutOrderMateStore = defineStore('outOrderMate', {
    state: (): State => ({
        ceNm        : '',
        faNm        : '',
        headers     : [],
        list        : [],
        sizeYn      : false
    }),
    actions : {
        async getInfo(params, yn: Y | N = 'Y')
        {
            let res;
            params['yn'] = yn;

            try
            {
                if(yn === 'N')
                {
                    res = await axios.post(`https://data.planorder.kr/orderV1/getOutOrderDoc`, params);
                }
                else
                {
                    const instance  = await getAxiosData();
                    res = await instance.post(`https://data.planorder.kr/orderV1/getOutOrderDoc`, params);
                }

                console.log(res);
                
                this.ceNm       = res.data['info']['ceNm'];
                this.faNm       = res.data['info']['faNm'];
                this.clientNm   = res.data['info']['clientNm'];

                const headers = [
                    { label: "매장번호", value: res.data['info']['tel'] },
                    { label: "시공명", value: res.data['info']['clientNm']+' 고객' },
                    { label: "주문일", value: getConvertDate(new Date(res.data['info']['ordDt']), 'yy.mm.dd.w') },
                    { label: "출고일", value: getConvertDate(new Date(res.data['info']['outDt']), 'yy.mm.dd.w') },
                    { label: "배송명", value: `(${res.data['info']['shippingGbNm']}) ${res.data['info']['addr']} ${res.data['info']['addrDetail']}` },
                    { label: "요청사항", value: res.data['info']['memo'] }
                ];

                this.headers = headers;

                const list = [];

                res.data['location'].map(location => {
                    list.push({
                        title     : location.title,
                        cardLists : res.data['outList'].map(esti => {
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
                                    case '002': case '003': case '005': case '006':
                                        rows.push({
                                            width   : esti.width,
                                            height  : esti.height,
                                            proc    : esti.proc === '001' ? '나비주름' : '평주름',
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

                                if(esti.shape === 'Y')
                                {
                                    tags.push({ spanText: "형상옵션" });
                                }

                                return {
                                    edCd         : esti.edCd,
                                    productTitle : esti.productTitle,
                                    colorTitle   : esti.colorTitle,
                                    // amt          : Number(esti.totalSaleAmt) + Number(esti.totalSaleTax),
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
            }
            catch(e)
            {
                console.log(e);
            }
        }
    }
});