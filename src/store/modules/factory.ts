/**
 * @description 공장 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData, getConvertDate } from '@/assets/js/function';

interface SysList {

}

interface SysInfo {
    faCd        : string;
    faNm        : string;
    einItem     : string;
    person      : string;
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

interface OutMsg {
    outFaNm : string;
    tel     : string;
    addr    : string;
}

const getSysInfo = (): SysInfo => {
    return {
        faCd        : '',
        faNm        : '',
        einItem     : '',
        person      : ''
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
        list        : SysList[];
        info        : SysInfo;
        detail      : SysDetail;
        msg         : string;
    },
    out : {
        type    : string;
        list    : OutList[];
        info    : OutInfo;
        msg     : OutMsg;
    }
}

export const useFactoryStore = defineStore('factory', {
    state: (): State => ({
        sys : {
            serachFaCd  : '',
            list        : [],
            info        : getSysInfo(),
            // detail  : getSysDetail(),
            msg         : ''
        },
        out : {
            type    : 'I',
            list    : [],
            info    : getOutInfo(),
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
        getSysMsgSet(msg: string)
        {
            this.sys.msg = msg;
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
    }
});