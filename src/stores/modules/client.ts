/**
 * @description 고객 관련 모듈 pinia
 */
import { defineStore } from 'pinia';

interface List {
    step        : number;
    clientCd    : string;
    clientNm    : string;
    tel         : number;
    zip         : number;
    addr        : string;
    addrDetail  : string;
    date        : string;
    amt         : number;
}

interface State {
    search  : string;
    stCd    : string;
    list    : List[];
}

export const useClientStore = defineStore('client', {
    state: (): State => ({
        search  : '',
        stCd    : '',
        list    : []
    }),
    // getters: {
    // },
    actions: {
        async getList()
        {
            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/client/getList`, params);

                console.log(res);
            }
            catch(e)
            {
                console.log(e);
            }
        }
    }
});