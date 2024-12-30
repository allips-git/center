/**
 * @description 문자메세지 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData } from '@/assets/js/function';

interface List {
    date    : string;
    waitAmt : number;
    saleAmt : number;
    purcAmt : number;
    rev     : number;
    margin  : number;
}

interface State {
    list : [];
}

export const useMsgStore = defineStore('msg', {
    state: (): State => ({
        list : []
    }),
    actions : {
        async getList(params)
        {
            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/accV1/getList`, params);

                console.log(res);
            }
            catch(e)
            {
                console.log(e);
            }
        }
    }
});