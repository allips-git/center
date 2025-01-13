/**
 * @description 메인 화면 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData } from '@/assets/js/function';

interface StCnt {
    count : number;
    label : string;
    stCd  : string;
}

interface MsgList {
    msgCd       : string;
    title       : string;
    description : string;
}

interface State {
    clientCnt  : number;
    stCnt      : StCnt[];
    factoryCnt : number;
    kakaoYn    : string;
    msgList    : MsgList[];
}

const getStCnt = (): StCnt[] => {
    return [
        // { count: 0, label: "대기", stCd : '001' },
        { count: 0, label: "견적", stCd : '002' },
        { count: 0, label: "발주", stCd : '003' },
        { count: 0, label: "시공", stCd : '006' },
        { count: 0, label: "결제", stCd : '011' },
        { count: 0, label: "A/S", stCd : '' }
    ]
}

export const useMainStore = defineStore('main', {
    state: (): State => ({
        clientCnt  : 0,
        stCnt      : getStCnt(),
        factoryCnt : 0,
        kakaoYn    : 'N',
        msgList    : []
    }),
    actions: {
        async getData()
        {
            this.stCnt = getStCnt();
            
            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/mainV1/getData`);

                console.log(res);

                this.clientCnt  = res.data['clientCnt'];
                this.stCnt.forEach(item => {
                    res.data['stCnt'].map(s => {
                        if(s.stNm === item.label)
                        {
                            item.count = Number(item.count) + Number(s.count);
                        }
                    })
                })
                this.factoryCnt = res.data['factoryCnt'];
                this.kakaoYn    = res.data['kakaoYn'];
                this.msgList    = res.data['msgList'];
            }
            catch(e)
            {
                console.log(e);
            }
        }
    }
});