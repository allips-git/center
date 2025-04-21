/**
 * @description 카카오 플랜톡 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData } from '@/assets/js/function';

interface List {
    kdCd    : string;
    kdNm    : string;
    descrip : string;
    useYn   : boolean;
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
    url         : boolean;
}

interface State {
    kdCd    : string;
    status  : boolean;
    cnt     : number;
    point   : number;
    sendCnt : number;
    list    : List[];
    info    : Info;
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
        url         : false
    };
}

export const useKakaoStore = defineStore('kakao', {
    state: (): State => ({
        kdCd    : '',
        status  : false,
        cnt     : 0,
        point   : 0,
        sendCnt : 0,
        list    : [],
        info    : getInfo()
    }),
    actions : {
        async getKakaoList()
        {
            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/kakaoV1/getKakao`);

                console.log(res);

                this.status     = res.data.useYn === 'Y' ? true : false;
                this.cnt        = res.data.useCnt;
                this.point      = res.data.point;
                this.sendCnt    = res.data.sendCnt;

                const list: List[] = [];

                res.data.list.forEach((item: List) => {
                    list.push({
                        kdCd    : item.kdCd,
                        kdNm    : item.kdNm,
                        descrip : item.descrip,
                        useYn   : item.useYn === 'Y' ? true : false
                    });
                });

                this.list = list;
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
        getKdCd(kdCd: string)
        {
            this.kdCd = kdCd;
        }
    }
});