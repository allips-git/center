/**
 * @description 공장 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData, getConvertDate } from '@/assets/js/function';

interface SysList {

}

interface SysInfo {
    compCd      : string;
    faCd        : string;
    faNm        : string;
    item        : string;
    imgUrl      : string;
    person      : string;
    tel         : number;
    zip         : number;
    addr        : string;
    addrDetail  : string;
}

interface SysDetail {

}

interface OutList {

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

const getSysInfo = (): SysInfo => {
    return {
        compCd      : '',
        faCd        : '',
        faNm        : '',
        item        : '',
        imgUrl      : '',
        person      : '',
        tel         : '',
        zip         : '',
        addr        : '',
        addrDetail  : ''
    }
}

const getSysDetail = (): SysDetail => {
    return {
        faNm     : '',
        imgUrl   : '',
        infoList : [
            { title: "혜택", content: "" },
            { title: "전화번호", content: "", background: true },
            { title: "영업시간", content: "" },
            { title: "주소", content: "" },
            { title: "계좌", content: "" }
        ],
        countList : [
            { label: "주문", count: 0  },
            { label: "생산", count: 0 },
            { label: "생산완료", count: 0 },
            { label: "출고", count: 0 }
        ],
        amtList : [
            {name : '1', title: '이월 잔액', amt: 0},
            {name : '2', title: '이달 매입금', amt: 0},
            {name : '3', title: '이달 수정 / 반품', amt: 0},
            {name : '4', title: '이달 결제', amt: 0}
        ],
        totalAmt   : 0,
        noticeList : [],
        itemCnt    : 0
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
        memo        : ''
    }
}

interface State {
    sys : {
        serachFaCd  : string;
        list        : SysList[];
        info        : SysInfo;
        detail      : SysDetail;
    },
    out : {
        type    : string;
        list    : OutList[];
        info    : OutInfo;
    }
}

export const useFactoryStore = defineStore('factory', {
    state: (): State => ({
        sys : {
            list    : [],
            info    : getSysInfo(),
            // detail  : getSysDetail(),
        },
        out : {
            type    : 'I',
            list    : [],
            info    : getOutInfo()
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

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://po-data.plansys.kr/v1/center/biz/purcBizInfo/getFacInfo`, params);

                const info = {
                    compCd      : params['faCd'],
                    faCd        : params['faCd'],
                    faNm        : res.data['data']['faNm'],
                    item        : res.data['data']['item'],
                    imgUrl      : res.data['data']['imgUrl'],
                    person      : res.data['data']['person'],
                    tel         : res.data['data']['tel'],
                    zip         : res.data['data']['zip'],
                    addr        : res.data['data']['addr'],
                    addrDetail  : res.data['data']['addrDetail']
                }

                this.sys.info = info;
                return true;
            }
            catch(e)
            {
                console.log(e);
                return false;
            }
        },
        getOutType(type: string)
        {
            this.out.type = type;
        },
        getOutInfoReset()
        {
            getOutType('I');
            this.out.info = getOutInfo();
        }
    }
});