/**
 * @description 카카오 플랜톡 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData, getConvertDate } from '@/assets/js/function';

interface List {
    kdCd        : string;
    kdNm        : string;
    descrip     : string;
    useYn       : boolean;
}

interface Info {
    kdGb        : string;
    kdNm        : string;
    descrip     : string;
    useYn       : boolean;
    client      : boolean;
    person      : boolean;
    shopAddr    : boolean;
    park        : Y | N | C | number; // Y: 무료, N: 불가능, C: 유료, number: 시간
    account     : boolean;
    url         : boolean;
}

interface SendList {
    khCd        : string;
    emCd        : string;
    ikey        : string;
    clientNm    : string;
    kdNm        : string;
    tel         : string;
    status      : string;
    resDt       : string;
    regDt       : string;
}

interface State {
    searchDt    : Date;
    resGb       : Y | N;
    kdCd        : string;
    khCd        : string;
    status      : boolean;
    cnt         : number;
    point       : number;
    sendCnt     : number;
    list        : List[];
    info        : Info;
    dateList    : string[];
    sendList    : SendList[];
    constents   : string;
    more        : boolean;
    start       : number;
}

const getInfo = (): Info => {
    return {
        kdGb        : '001',
        kdNm        : '',
        descrip     : '',
        useYn       : false,
        client      : false,
        person      : false,
        shopAddr    : false,
        park        : 'N',
        account     : false,
        url         : false
    };
}

export const useKakaoStore = defineStore('kakao', {
    state: (): State => ({
        searchDt    : new Date(),
        resGb       : 'N',
        kdCd        : '',
        khCd        : '',
        status      : false,
        cnt         : 0,
        point       : 0,
        sendCnt     : 0,
        list        : [],
        info        : getInfo(),
        dateList    : [],
        sendList    : [],
        contents    : '',
        more        : true,
        start       : 0
    }),
    actions : {
        async getKakao()
        {
            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/kakaoV1/getKakao`);

                console.log(res);

                this.status  = res.data['useYn'] === 'Y' ? true : false;
                this.cnt     = res.data['useCnt'];
                this.point   = res.data['point'];
                this.sendCnt = res.data['sendCnt'];
                this.list    = res.data['list'].map((item) => {
                    return {
                        kdCd        : item.kdCd,
                        kdNm        : item.kdNm,
                        descrip     : item.descrip,
                        useYn       : item.useYn === 'Y' ? true : false
                    };
                });
            }
            catch(e)
            {
                console.log(e);
            }
        },
        async getKakaoInfo()
        {
            const params = {
                kdCd: this.kdCd
            };

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/kakaoV1/getKakaoInfo`, params);

                console.log(res);

                this.info.kdGb      = res.data.info.kdGb;
                this.info.kdNm      = res.data.info.kdNm;
                this.info.descrip   = res.data.info.descrip;
                this.info.useYn     = res.data.info.useYn === 'Y' ? true : false;
                this.info.client    = res.data.info.client === 'Y' ? true : false;
                this.info.person    = res.data.info.person === 'Y' ? true : false;
                this.info.shopAddr  = res.data.info.shopAddr === 'Y' ? true : false;
                this.info.park      = res.data.info.park === 'Y' ? 'Y' : res.data.info.park === 'N' ? 'N' : res.data.info.park === 'C' ? 'C' : Number(res.data.info.park);
                this.info.account   = res.data.info.account === 'Y' ? true : false;
                this.info.url       = res.data.info.url === 'Y' ? true : false;
            }
            catch(e)
            {
                console.log(e);
            }
        },
        async getKakaoResult(params)
        {
            try
            {
                const instance  = await getAxiosData();
                await instance.post(`https://data.planorder.kr/kakaoV1/getKakaoResult`, params);
                return { result: true, msg: 'success' };
            }
            catch(e)
            {
                console.log(e);
                return { result: false, msg: 'error' };
            }
        },
        async getKakaoActive()
        {
            try
            {
                const instance  = await getAxiosData();
                const res = await instance.post(`https://data.planorder.kr/kakaoV1/getKakaoActive`);

                console.log(res);
                return { result: true, msg: 'success' };
            }
            catch(e)
            {
                console.log(e);
                return { result: false, msg: 'error' };
            }
        },
        async getKakaoSendList()
        {
            const params = {
                date    : getConvertDate(this.searchDt, 'yyyymm'),
                resGb   : this.resGb,
                start   : this.start
            };

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/kakaoV1/getKakaoSendList`, params);

                console.log(res);

                const uniqueDates   = [...new Set(res.data['list'].map(item => item.regDt.split(' ')[0]))];
                const newDates      = uniqueDates.filter(date => !this.dateList.includes(date));
                this.dateList       = [...this.dateList, ...newDates];

                const list: SendList[] = [];

                res.data['list'].forEach((item) => {
                    list.push({
                        khCd        : item.khCd,
                        emCd        : item.emCd,
                        ikey        : item.ikey,
                        clientNm    : item.clientNm,
                        kdNm        : item.kdNm,
                        tel         : item.tel,
                        status      : item.status,
                        resDt       : item.resDt,
                        regDt       : item.regDt
                    });
                });

                this.sendList   = [...this.sendList, ...list];
                this.start      = this.start + 10;

                if(res.data['list'].length === 0)
                {
                    this.more = false;
                }
            }
            catch(e)
            {
                console.log(e);
            }
        },
        async getKakaoSendInfo()
        {
            const params = {
                khCd: this.khCd
            };

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/kakaoV1/getKakaoSendInfo`, params);

                console.log(res);

                this.contents = res.data['info'];
            }
            catch(e)
            {
                console.log(e);
            }
        },
        getSendReset()
        {
            this.searchDt    = new Date();
            this.start       = 0;
            this.more        = true;
            this.dateList    = [];
            this.sendList    = [];
        },
        getResGb(resGb: Y | N)
        {
            this.resGb = resGb;
        },
        getKdCd(kdCd: string)
        {
            this.kdCd = kdCd;
        },
        getKhCd(khCd: string)
        {
            this.khCd = khCd;
        }
    }
});