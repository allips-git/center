/**
 * @description 회계 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData } from '@/assets/js/function';

type Nullable<T>    = T | null;
type AmtUnitType    = 'F' | 'P'; /** F : 금액(원) / P : %(퍼센트) */

interface State {
}

export const useOrderStore = defineStore('order', {
    state: (): State => ({

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