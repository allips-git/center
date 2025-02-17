/**
 * @description 공장 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData } from '@/assets/js/function';

type Nullable<T>    = T | null;
type AppGb          = 'Y' | 'N' | 'E'; /** Y : 승인 / N : 거절 / E : 대기기 */

interface SysSearchInfo {
    faCd        : string;
    faNm        : string;
    einItem     : string;
    person      : string;
}

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
    filePath    : string;
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

interface OutItemList {
    itemCd  : string;
    itemNm  : string;
    size    : number;
    unitNm  : string;
    saleAmt : number;
    purcAmt : number;
}

interface OutColors {
    icCd  : Nullable<string>;
    icNm  : string;
    delYn : Y | N;
}

interface OutItemInfo {
    itemNm      : string;
    colors      : OutColors[];
    size        : Nullable<number>;
    unit        : string;
    minHeight   : Nullable<number>;
    pokSpec     : Nullable<number>;
    purcAmt     : Nullable<number>;
    saleAmt     : Nullable<number>;
}

interface OutItemMsg {
    itemNm      : string;
    colors      : string;
    size        : string;
    unit        : string;
    minHeight   : string;
    pokSpec     : string;
    purcAmt     : string;
    saleAmt     : string;
}

interface SysMsg {
    sysFaCd : string;
}

interface OutMsg {
    outFaNm : string;
    tel     : string;
    addr    : string;
}

const getSysSearchInfo = (): SysSearchInfo => {
    return {
        faCd        : '',
        faNm        : '',
        einItem     : '',
        person      : ''
    }
}

const getSysInfo = (): SysInfo => {
    return {
        faNm        : '',
        filePath    : '',
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

const getOutItemInfo = (): OutItemInfo => {
    return {
        itemNm      : '',
        colors      : [{ icCd: null, icNm: '', delYn: 'N' }],
        size        : null,
        unit        : '001',
        minHeight   : null,
        pokSpec     : null,
        purcAmt     : null,
        saleAmt     : null
    }
}

const getOutItemMsg = (): OutItemMsg => {
    return {
        itemNm      : '',
        colors      : '',
        size        : '',
        unit        : '',
        minHeight   : '',
        pokSpec     : '',
        purcAmt     : '',
        saleAmt     : ''
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
        searchFaCd  : string;
        searchInfo  : SysSearchInfo;
        faCd        : string;
        list        : SysList[];
        info        : SysInfo;
        itemSearch  : string;
        itemList    : SysItemList[];
        msg         : SysMsg;
    },
    out : {
        type        : string;
        fcCd        : string;
        list        : OutList[];
        info        : OutInfo;
        detail      : {
            header   : OutDetailHeader[];
            info     : OutDetailInfo[];
            totalAmt : number;
            itemCnt  : number;
        };
        itemSearch  : string;
        itemList    : OutItemList[];
        itemInfo    : OutItemInfo;
        itemType    : string;
        start       : number;
        itemMsg     : OutItemMsg;
        msg         : OutMsg;
    }
}

export const useFactoryStore = defineStore('factory', {
    state: (): State => ({
        sys : {
            searchFaCd  : '',
            searchInfo  : getSysSearchInfo(),
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
            type        : 'I',
            fcCd        : '',
            list        : [],
            info        : getOutInfo(),
            detail      : {
                header : [
                    { label: '공장명', value: '' },
                    { label: '전화번호', value: '' },
                    { label: '주소', value: '' },
                    { label: '계좌', value: '' },
                    { label: '메모', value: '' }
                ],
                info    : [
                    { name : 'itemAmt', amtGb : '', title: '이달 매입금', amt: 0, red: false, blue: false }
                ],
                totalAmt : 0,
                itemCnt  : 0
            },
            itemSearch  : '',
            itemCd      : '',
            itemList    : [],
            itemInfo    : getOutItemInfo(),
            itemType    : 'I',
            start       : 0,
            itemMsg     : getOutItemMsg(),
            msg         : getOutMsg()
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
                faCd : this.sys['searchFaCd']
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

                this.sys.searchInfo = info;
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
                    filePath    : res.data['info']['imgUrl'],
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
                const res       = await instance.post(`https://data.planorder.kr/factoryV1/getOutFactoryDetail`, params);

                console.log(res);

                this.out.detail.header  = [
                    { label: '공장명', value: res.data['info']['faNm'] },
                    { label: '전화번호', value: res.data['info']['tel'] },
                    { label: '주소', value: res.data['info']['addr'] + ' ' + res.data['info']['addrDetail'] },
                    { label: '계좌', value: res.data['info']['accInfo'] },
                    { label: '메모', value: res.data['info']['memo'] }
                ];

                this.out.detail.info    = [
                    { name : 'amt', amtGb: '', title: '이달 매입금', amt: res.data['purcAmt'], red: false, blue: false, memo : '' }
                ];

                this.out.detail.totalAmt = res.data['totalAmt'];
                this.out.detail.itemCnt  = res.data['itemCnt'];
            }
            catch(e)
            {
                console.log(e);
            }
        },
        async getOutFactoryInfo()
        {
            const params    = {
                fcCd    : this.out['fcCd']
            };

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/factoryV1/getOutFactoryInfo`, params);

                const info      = {
                    faNm        : res.data['info']['faNm'],
                    tel         : res.data['info']['tel'],
                    zip         : res.data['info']['zip'],
                    addr        : res.data['info']['addr'],
                    addrDetail  : res.data['info']['addrDetail'],
                    accInfo     : res.data['info']['accInfo'],
                    kakaoTel    : res.data['info']['kakaoTel'],
                    memo        : res.data['info']['memo']
                };

                this.out.type = 'U';
                this.out.info = info;
            }
            catch(e)
            {
                console.log(e);
            }
        },
        async getOutFactoryItemList()
        {
            const params    = {
                fcCd    : this.out['fcCd'],
                search  : this.out['itemSearch'],
                start   : this.out['start']
            };

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/factoryV1/getOutFactoryItemList`, params);

                console.log(res);

                this.out.itemList = res.data['list'];
            }
            catch(e)
            {
                console.log(e);
            }
        },
        async getOutFactoryItemInfo()
        {
            const params    = {
                fcCd    : this.out['fcCd'],
                itemCd  : this.out['itemCd']
            };

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/factoryV1/getOutFactoryItemInfo`, params);

                console.log(res);

                this.out.itemType = 'U';
                this.out.itemInfo = res.data['info'];
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
        getOutItemCd(itemCd: string)
        {
            this.out.itemCd = itemCd;
        },
        getSysMsgSet(msg: string)
        {
            this.sys.msg.sysFaCd = msg;
        },
        getSysMsgReset()
        {
            this.sys.msg = getSysMsg();
        },
        getOutAddColor()
        {
            this.out.itemInfo.colors.push({ icCd: null, icNm: '', delYn: 'N' });
        },
        getOutDelColor(index: number)
        {
            if(this.out.itemInfo.colors[index]['icCd'] !== null)
            {
                this.out.itemInfo.colors[index]['delYn'] = 'Y';
            }
            else
            {
                this.out.itemInfo.colors.splice(index, 1);
            }
        },
        getOutColorRestore(icCd: string)
        {
            const index = this.out.itemInfo.colors.findIndex((item) => item.icCd === icCd);
            this.out.itemInfo.colors[index]['delYn'] = 'N';

            return index;
        },
        getOutItemInfoReset()
        {
            this.out.itemType = 'I';
            this.out.itemInfo = getOutItemInfo();
            this.out.itemMsg  = getOutItemMsg();
        },
        getOutItemMsgSet(msg: string, name: string)
        {
            this.out.itemMsg = getOutItemMsg();
            if (name.includes('icNm')) 
            {
                this.out.itemMsg.colors = msg;
            }
            else
            {
                this.out.itemMsg[name]  = msg;
            }
        },
        getOutMsgSet(msg: string, name: string)
        {
            this.out.msg        = getOutMsg();
            this.out.msg[name]  = msg;
        },
        getSysInfoReset()
        {
            this.sys.searchFaCd = '';
            this.sys.searchInfo = getSysSearchInfo();
            this.sys.msg        = getSysMsg();
        },
        getOutInfoReset()
        {
            this.out.type = 'I';
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