/**
 * @description 견적서 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData, getConvertDate } from '@/assets/js/function';
import axios from 'axios';

interface Spec {
    width   : number;
    hegith  : number;
    handle  : string;
    cnt     : string;
    unit    : number;
}

interface List {
    itemNm  : string;
    icNm    : string;
    cnt     : number;
    amt     : string;
    unitNm  : string;
    spec    : Spec[];
    option  : [];
}

interface Info {
    sign                : string;
    ceoNm               : string;
    conPerson           : string;
    tel                 : string;
    addr                : string;
    addrDetail          : string;
    estiDt              : string;
    conDt               : string;
    list                : List[];
    clientSet           : 'Y' | 'N';
    clientNm            : string;
    clientTel           : string;
    clientAddr          : string;
    clientAddrDetail    : string;
    clientSign          : string;
    clientSignFile      : string | File | null;
    clientSignImage     : string;
    agreeContents       : string;
}

interface PayList {
    name    : string;
    amtGb   : string;
    title   : string;
    amt     : number;
    red     : boolean;
    blue    : boolean;
    memo    : string;
}

interface State {
    base    : 'Y' | 'N';
    gb      : 'E' | 'C';
    view    : 'Y' | 'N';
    sizeYn  : 'Y' | 'N';
    unitYn  : 'Y' | 'N';
    signYn  : 'Y' | 'N';
    info    : Info;
    payList : Amt;
}

const getList = () => {
    return [
        {
            itemNm  : '아르카디아 / 아이스화이트',
            icNm    : '',
            cnt     : 3,
            amt     : 320000,
            unitNm  : '회베',
            spec    : [
                { width : 240, hegith : 120, handle : '좌', cnt : 1, unit : 2.4 }, 
                { width : 240, hegith : 120, handle : '우', cnt : 1, unit : 2.4 }, 
                { width : 240, hegith : 120, handle : '우', cnt : 1, unit : 2.4 }
            ],
            option  : ['솜피 알투스 402모터']
        },
        {
            itemNm  : '커튼 소니아 / 화이트',
            icNm    : '',
            cnt     : 33,
            amt     : 412320000,
            unitNm  : '폭',
            spec    : [
                { width : 240, hegith : 120, handle : '', cnt : 1, unit : 4 }
            ],
            option  : ['형상옵션']
        },
        {
            itemNm  : '커튼 쉬폰 / 화이트',
            icNm    : '',
            cnt     : 111,
            amt     : 320000,
            unitNm  : '폭',
            spec    : [
                { width : 240, hegith : 120, handle : '', cnt : 1, unit : 10.4 }
            ],
            option  : ['형상옵션']
        }
    ]
}

const getInfo = (): Info => {
    return {
        sign                : '',
        ceoNm               : '',
        conPerson           : '',
        tel                 : '',
        addr                : '',
        addrDetail          : '',
        estiDt              : '',
        conDt               : '',
        list                : [],
        clientSet           : 'N',
        clientNm            : '',
        clientTel           : '',
        clientAddr          : '',
        clientAddrDetail    : '',
        clientSign          : '',
        clientSignFile      : null,
        clientSignImage     : '',
        agreeContents       : ''
    }
}

const getPayList = (): PayList => {
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
        {name : 'conAmt',       amtGb : '004', title: '계약 선금',         amt: 0, red: false, blue: true, memo : ''}
    ]
}

const filePath = 'https://data.planorder.kr/image/sign/';

export const useMateStore = defineStore('mate', {
    state: (): State => ({
        base    : 'Y',
        gb      : 'C',
        view    : 'Y',
        sizeYn  : 'N',
        unitYn  : 'N',
        signYn  : 'N',
        info    : getInfo(),
        payList : getPayList()
    }),
    actions : {
        async getEstiMate(params, yn: Y | N = 'Y')
        {
            let res;
            params['yn'] = yn;

            try
            {
                if(yn === 'N')
                {
                    res = await axios.post(`https://data.planorder.kr/estiV1/getEstiMateInfo`, params);
                }
                else
                {
                    const instance  = await getAxiosData();
                    res = await instance.post(`https://data.planorder.kr/estiV1/getEstiMateInfo`, params);
                }

                console.log(res);

                this.base = 'N';
                this.gb   = 'E';
                this.view = yn;

                this.sizeYn = res.data.info.sizeYn;
                this.unitYn = res.data.info.unitYn;
                this.signYn = res.data.info.signYn;

                this.info.sign       = res.data.info.file !== '' ? filePath + res.data.info.file : '';
                this.info.ceoNm      = res.data.info.ceNm;
                this.info.tel        = res.data.info.tel;
                this.info.addr       = res.data.info.addr;
                this.info.addrDetail = res.data.info.addrDetail;
                this.info.estiDt     = getConvertDate(new Date(res.data.info.stDt), 'yy.mm.dd');
                this.info.clientSet  = 'N';

                this.info.list = res.data.estiList.map(item => {
                    let cnt = 0;
                    const rows = [];

                    switch(item.unit)
                    {
                        case '001':
                            if(item.division === 'D')
                            {
                                cnt  = item.detail.reduce((c, i) => c + Number(i.cnt), 0);
                                item.detail.map(detail => {
                                    rows.push({
                                        width   : detail.width,
                                        height  : detail.height,
                                        handle  : detail.handle === '' ? detail.handle : (detail.handle === 'L' ? '좌' : '우'),
                                        cnt     : detail.cnt,
                                        unit    : detail.size
                                    })
                                })
                            }
                            else
                            {
                                cnt = Number(item.leftCnt) + Number(item.rightCnt);
                                rows.push({
                                    width   : item.width,
                                    height  : item.height,
                                    handle  : '',
                                    cnt     : `좌${item.leftCnt} / 우${item.rightCnt}`,
                                    unit    : item.totalUnit
                                })
                            }
                        break;
                        case '002': case '003': case '004': case '005': case '006':
                            cnt = item.cnt;
                            item.detail.map(detail => {
                                rows.push({
                                    width   : detail.width,
                                    height  : detail.height,
                                    handle  : '',
                                    cnt     : detail.cnt,
                                    unit    : item.totalUnit
                                })
                            })
                        break;
                    }

                    return {
                        itemNm  : item.colorTitle,
                        icNm    : '',
                        cnt     : cnt,
                        amt     : Number(item.totalSaleAmt) + Number(item.totalSaleTax),
                        unitNm  : item.unitNm,
                        spec    : rows,
                        option  : item.option.map(option => {
                            return option.itemNm + ' / ' + option.icNm
                        })
                    }
                })

                console.log(this.info.list);

                if(res.data['amtList'].length === 0)
                {
                    this.payList = getPayList();
                }
                else
                {
                    res.data['amtList'].map((amt) => {
                        this.getPayAmt(amt['amtGb'], Number(amt['amt']), amt['memo']);
                    });
                }

                this.getItemAmt('itemAmt', Number(res.data['itemAmt']));
                this.getItemAmt('itemTax', Number(res.data['itemTax']));
                this.getItemAmt('optionAmt', Number(res.data['optionAmt']));
                this.getItemAmt('procAmt', Number(res.data['procAmt']));
                this.getItemAmt('bprocAmt', Number(res.data['bprocAmt']));
                this.getItemAmt('shapeAmt', Number(res.data['shapeAmt']));
                this.getItemAmt('heightAmt', Number(res.data['heightAmt']));

                console.log(this.info);
            }
            catch(e)
            {
                console.log(e);
            }
        },
        async getConMate(params, yn: Y | N = 'Y')
        {
            let res;
            params['yn'] = yn;

            try
            {
                if(yn === 'N')
                {
                    res = await axios.post(`https://data.planorder.kr/estiV1/getConMateInfo`, params);
                }
                else
                {
                    const instance  = await getAxiosData();
                    res = await instance.post(`https://data.planorder.kr/estiV1/getConMateInfo`, params);
                }

                console.log(res);

                this.base = 'N';
                this.gb   = 'C';
                this.view = yn;

                this.sizeYn = res.data.info.sizeYn;
                this.unitYn = res.data.info.unitYn;
                this.signYn = res.data.info.signYn;

                this.info.sign       = res.data.info.file !== '' ? filePath + res.data.info.file : '';
                this.info.ceoNm      = res.data.info.ceNm;
                this.info.tel        = res.data.info.tel;
                this.info.addr       = res.data.info.addr;
                this.info.addrDetail = res.data.info.addrDetail;
                this.info.estiDt     = getConvertDate(new Date(res.data.info.stDt), 'yy.mm.dd');
                this.info.conDt      = getConvertDate(new Date(res.data.info.conDt), 'yy.mm.dd');
                this.info.conPerson  = res.data.info.conPerson;
                this.info.clientSet  = res.data.info.clientSign === '' ? 'N' : 'Y';
                this.info.clientNm   = res.data.info.clientNm;
                this.info.clientTel  = res.data.info.clientTel;
                this.info.clientAddr = res.data.info.clientAddr;

                this.info.clientAddrDetail  = res.data.info.clientAddrDetail;
                this.info.clientSignImage   = filePath + res.data.info.clientSign;

                this.info.list = res.data.estiList.map(item => {
                    let cnt = 0;
                    const rows = [];

                    switch(item.unit)
                    {
                        case '001':
                            if(item.division === 'D')
                            {
                                cnt  = item.detail.reduce((c, i) => c + Number(i.cnt), 0);
                                item.detail.map(detail => {
                                    rows.push({
                                        width   : detail.width,
                                        height  : detail.height,
                                        handle  : detail.handle === '' ? detail.handle : (detail.handle === 'L' ? '좌' : '우'),
                                        cnt     : detail.cnt,
                                        unit    : detail.size
                                    })
                                })
                            }
                            else
                            {
                                cnt = Number(item.leftCnt) + Number(item.rightCnt);
                                rows.push({
                                    width   : item.width,
                                    height  : item.height,
                                    handle  : '',
                                    cnt     : `좌${item.leftCnt} / 우${item.rightCnt}`,
                                    unit    : item.totalUnit
                                })
                            }
                        break;
                        case '002': case '003': case '004': case '005': case '006':
                            cnt = item.cnt;
                            item.detail.map(detail => {
                                rows.push({
                                    width   : detail.width,
                                    height  : detail.height,
                                    handle  : '',
                                    cnt     : detail.cnt,
                                    unit    : item.totalUnit
                                })
                            })
                        break;
                    }

                    return {
                        itemNm  : item.colorTitle,
                        icNm    : '',
                        cnt     : cnt,
                        amt     : Number(item.totalSaleAmt) + Number(item.totalSaleTax),
                        unitNm  : item.unitNm,
                        spec    : rows,
                        option  : item.option.map(option => {
                            return option.itemNm + ' / ' + option.icNm
                        })
                    }
                })

                console.log(this.info);

                if(res.data['amtList'].length === 0)
                {
                    this.payList = getPayList();
                }
                else
                {
                    res.data['amtList'].map((amt) => {
                        this.getPayAmt(amt['amtGb'], Number(amt['amt']), amt['memo']);
                    });
                }

                this.getItemAmt('itemAmt', Number(res.data['itemAmt']));
                this.getItemAmt('itemTax', Number(res.data['itemTax']));
                this.getItemAmt('optionAmt', Number(res.data['optionAmt']));
                this.getItemAmt('procAmt', Number(res.data['procAmt']));
                this.getItemAmt('bprocAmt', Number(res.data['bprocAmt']));
                this.getItemAmt('shapeAmt', Number(res.data['shapeAmt']));
                this.getItemAmt('heightAmt', Number(res.data['heightAmt']));
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
        getPayAmt(amtGb: string, amt: number, memo: string='')
        {
            const item = this.payList.find(item => item.amtGb === amtGb);

            if(item)
            {
                item.amt  = Number(amt);
                item.memo = memo;
            }
        },
        getFile(file: File, image: string)
        {
            this.info.clientSignFile  = file;
            this.info.clientSignImage = image;
        },
        getReset()
        {
            this.base       = 'N';
            this.gb         = 'E';
            this.info       = getInfo();
            this.payList    = getPayList();
        },
        getBaseSet()
        {
            this.base = 'Y';
            this.gb   = 'C';
            this.info = {
                sign                : '@/assets/img/img-seal.png',
                ceoNm               : '하현재',
                conPerson           : '홍길동',
                tel                 : '010-3445-2105',
                addr                : '부산광역시 수영구 수영로 411-1',
                addrDetail          : '디자인윈도우',
                estiDt              : '2025.01.18',
                conDt               : '2025.02.18',
                list                : getList(),
                clientSet           : 'N',
                clientNm            : '홍길동',
                clientTel           : '010-3445-2105',
                clientAddr          : '부산광역시 수영구 411-1',
                clientAddrDetail    : '디자인윈도우',
                clientSignFile      : '',
                clientSignImage     : '@/assets/img/img-seal.png',
                agreeContents       : ''
            };
            this.payList = [
                {name : 'itemAmt',      amtGb : '', title: '상품 금액',         amt: 603253, red: false, blue: false, memo : ''},
                {name : 'itemTax',      amtGb : '', title: '부가세',            amt: 0, red: false, blue: false, memo : ''},
                {name : 'optionAmt',      amtGb : '', title: '옵션',            amt: 0, red: false, blue: false, memo : ''},
                {name : 'procAmt',      amtGb : '', title: '나비주름',            amt: 0, red: false, blue: false, memo : ''},
                {name : 'bprocAmt',      amtGb : '', title: '리드밴드',            amt: 0, red: false, blue: false, memo : ''},
                {name : 'shapeAmt',     amtGb : '', title: '형상',         amt: 0, red: false, blue: false, memo : ''},
                {name : 'heightAmt',    amtGb : '', title: '세로길이 추가금액', amt: 0, red: false, blue: false, memo : ''},
                {name : 'addAmt',       amtGb : '001', title: '추가',              amt: 0, red: true, blue: false, memo : ''},
                {name : 'dcAmt',        amtGb : '002', title: '할인',              amt: 50000, red: true, blue: false, memo : ''},
                {name : 'cutAmt',       amtGb : '003', title: '절삭 할인',         amt: 3253, red: true, blue: false, memo : ''},
                {name : 'conAmt',       amtGb : '004', title: '계약 선금',         amt: 50000, red: false, blue: true, memo : '계좌: 농협 0101111221132'}
            ]
        }
    }
});