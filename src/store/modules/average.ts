/**
 * @description 통계계 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData } from '@/assets/js/function';

type Nullable<T>    = T | null;

interface State {
    search      : string;
    totalAmt    : number;
    
    sale        : number;
    purc        : number;
    exp         : number;
}

export const useAverageStore = defineStore('average', {
    state: (): State => ({
        search : '',

    }),
    getters: {
    },
    actions : {
        async getList(params)
        {
            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/accV1/getList`, params);

                console.log(res);
                const list = [];
            }
            catch(e)
            {
                console.log(e);
            }
        }
    }
});