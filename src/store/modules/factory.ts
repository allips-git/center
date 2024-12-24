/**
 * @description 공장 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData } from '@/assets/js/function';

type AppGb = 'Y' | 'N' | 'E'; /** Y : 승인 / N : 거절 / E : 대기기 */

interface SysList {
    faCd        : string;
    faNm        : string;
    appGb       : AppGb;
    einItem     : string;
    person      : string;
    imgUrl      : string;
    tel         : string;
    zip         : number;
    addr        : string;
    addrDetail  : string;
}

interface SysInfo {
    faNm        : string;
    tel         : string;
    boon        : string;
    time        : string;
    zip         : number;
    addr        : string;
    addrDetail  : string;
    bankNm      : string;
    accNum      : string;
    itemCnt     : number;
}

interface SysItemList {
    itemCd  : string;
    itemNm  : string;
    size    : number;
    unitNm  : string;
    saleAmt : number;
    purcAmt : number;
    useYn   : string;
}

interface SysColors {
    icCd : string;
    icNm : string;
}

interface SysItemInfo {
    itemNm  : string;
    colors  : SysColors[];
    size    : number;
    unitNm  : string;
    purcAmt : number;
    saleAmt : number;
}

interface OutInfo {
    faNm        : string;
    tel         : number;
    zip         : number;
    addr        : string;
    addrDetail  : string;
    accInfo     : string;
    kakaoTel    : string;
    memo        : string;
}

interface OutDetailHeader {
    label   : string;
    value   : string;
}

interface OutDetailInfo {
    name    : string;
    amtGb   : string;
    title   : string;
    amt     : number;
    red     : boolean;
    blue    : boolean;
}

interface SysMsg {
    sysFaCd : string;
}

interface OutMsg {
    outFaNm : string;
    tel     : string;
    addr    : string;
}

const getSysInfo = (): SysInfo => {
    return {
        faNm        : '',
        tel         : '',
        boon        : '',
        time        : '',
        zip         : 0,
        addr        : '',
        addrDetail  : '',
        bankNm      : '',
        accNum      : 0,
        itemCnt     : 0
    }
}

const getSysItemInfo = (): SysItemInfo => {
    return {
        itemNm  : '',
        colors  : [],
        size    : 0,
        unitNm  : '',
        purcAmt : 0,
        saleAmt : 0
    }
}

const getSysMsg = (): SysMsg => {
    return {
        sysFaCd : ''
    }
}

const getOutInfo = (): OutInfo => {
    return {
        faNm        : '',
        tel         : '',
        zip         : '',
        addr        : '',
        addrDetail  : '',
        accInfo     : '',
        kakaoTel    : '',
        memo        : '',
        itemCnt     : 0
    }
}

const getOutMsg = (): OutMsg => {
    return {
        outFaNm : '',
        tel     : '',
        addr    : ''
    }
}

interface State {
    sys : {
        serachFaCd  : string;
        faCd        : string;
        list        : SysList[];
        info        : SysInfo;
        itemSearch  : string;
        itemList    : SysItemList[];
        msg         : SysMsg;
    },
    out : {
        type    : string;
        fcCd    : string;
        list    : OutList[];
        info    : OutInfo;
        detail  : {
            header   : OutDetailHeader[];
            info     : OutDetailInfo[];
            totalAmt : number;
            itemCnt  : number;
        };
        msg     : OutMsg;
    }
}

export const useFactoryStore = defineStore('factory', {
    state: (): State => ({
        sys : {
            serachFaCd  : '',
            faCd        : '',
            list        : [],
            info        : getSysInfo(),
            itemSearch  : '',
            itemCd      : '',
            itemList    : [],
            itemInfo    : getSysItemInfo(),
            msg         : getSysMsg()
        },
        out : {
            type    : 'I',
            fcCd    : '',
            list    : [],
            info    : getOutInfo(),
            detail  : {
                header : [
                    { label: '공장명', value: '' },
                    { label: '전화번호', value: '' },
                    { label: '주소', value: '' },
                    { label: '계좌', value: '' },
                    { label: '메모', value: '' },
                ],
                info    : [
                    { name : 'itemAmt', amtGb : '', title: '이달 매입금', amt: 0, red: false, blue: false }
                ],
                totalAmt : 0,
                itemCnt  : 0
            },
            msg     : getOutMsg()
        }
    }),
    actions: {
        async getList()
        {
            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/factoryV1/getList`);

                console.log(res);

                this.sys.list = res.data['sys'];
                this.out.list = res.data['out'];
            }
            catch(e)
            {
                console.log(e);
            }
        },
        async getSysFactorySearch()
        {
            const params    = {
                faCd : this.sys['serachFaCd']
            };

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/factoryV1/getSysFactorySearch`, params);

                console.log(res);

                const info = {
                    faCd        : res.data['info']['faCd'],
                    faNm        : res.data['info']['faNm'],
                    einItem     : res.data['info']['einItem'],
                    person      : res.data['info']['person']
                }

                this.sys.info = info;
                return { status : true, code : 2000, message : 'success' };
            }
            catch(e)
            {
                console.log(e);
                await this.getSysInfoReset();
                return { status : false, code : e.response.data['code'], message : e.response.data['message'] };
            }
        },
        async getSysFactoryDetail()
        {
            const params    = {
                faCd : this.sys['faCd']
            };

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/factoryV1/getSysFactoryDetail`, params);

                console.log(res);

                const info = {
                    faNm        : res.data['info']['faNm'],
                    tel         : res.data['info']['tel'],
                    boon        : '',
                    time        : '',
                    zip         : res.data['info']['zip'],
                    addr        : res.data['info']['addr'],
                    addrDetail  : res.data['info']['addrDetail'],
                    bankNm      : res.data['info']['bankNm'],
                    accNum      : res.data['info']['accNum'],
                    itemCnt     : res.data['itemCnt']
                }

                this.sys.info = info;
            }
            catch(e)
            {
                console.log(e);
            }
        },
        async getSysItemList()
        {
            const params    = {
                faCd    : this.sys['faCd'],
                search  : this.sys['itemSearch']
            };

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/factoryV1/getSysItemList`, params);

                console.log(res);

                this.sys.itemList = res.data['list'];
            }
            catch(e)
            {
                console.log(e);
            }
        },
        async getSysItemInfo()
        {
            const params    = {
                faCd    : this.sys['faCd'],
                itemCd  : this.sys['itemCd']
            };

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/factoryV1/getSysItemInfo`, params);

                console.log(res);

                const info = {
                    itemNm  : res.data['info']['itemNm'],
                    colors  : res.data['info']['colors'],
                    size    : res.data['info']['size'],
                    unitNm  : res.data['info']['unitNm'],
                    purcAmt : res.data['info']['purcAmt'],
                    saleAmt : Number(res.data['info']['saleAmt'])
                };

                this.sys.itemInfo = info;
            }
            catch(e)
            {
                console.log(e);
            }
        },
        async getOutFactoryDetail()
        {
            const params    = {
                fcCd    : this.out['fcCd']
            };

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/factoryV1/getOutFactoryInfo`, params);

                console.log(res);

                this.out.detail.header  = [
                    { label: '공장명', value: res.data['info']['faNm'] },
                    { label: '전화번호', value: res.data['info']['tel'] },
                    { label: '주소', value: res.data['info']['addr'] + ' ' + res.data['info']['addrDetail'] },
                    { label: '계좌', value: res.data['info']['accInfo'] },
                    { label: '메모', value: res.data['info']['memo'] }
                ];

                this.out.detail.info    = [
                    { name : 'amt', amtGb: '', title: '이달 매입금', amt: res.data['purcAmt'], red: false, blue: false }
                ];

                this.out.detail.totalAmt = res.data['totalAmt'];
                this.out.detail.itemCnt  = res.data['itemCnt'];
            }
            catch(e)
            {
                console.log(e);
            }
        },
        getSysFaCd(faCd: string)
        {
            this.sys.faCd = faCd;
        },
        getOutFcCd(fcCd: string)
        {
            this.out.fcCd = fcCd;
        },
        getSysItemCd(itemCd: string)
        {
            this.sys.itemCd = itemCd;
        },
        getSysMsgSet(msg: string)
        {
            this.sys.msg.sysFaCd = msg;
        },
        getSysMsgReset()
        {
            this.sys.msg = getSysMsg();
        },
        getOutMsgSet(msg: string, name: string)
        {
            this.out.msg        = getOutMsg();
            this.out.msg[name]  = msg;
        },
        getSysInfoReset()
        {
            this.sys.serachFaCd = '';
            this.sys.info       = getSysInfo();
            this.sys.msg        = getSysMsg();
        },
        getOutType(type: string)
        {
            this.out.type = type;
        },
        getOutInfoReset()
        {
            this.getOutType('I');
            this.out.info = getOutInfo();
            this.out.msg  = getOutMsg();
        }
    },
    persist: {
        key     : 'factory',
        storage : localStorage,
        paths   : ['sys.faCd', 'out.fcCd'],
        reducer : (state) => {
            return {
                faCd: state.sys.faCd
            };
        }
    }
});