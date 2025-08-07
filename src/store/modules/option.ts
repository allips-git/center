/**
 * @description 옵션 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData } from '@/assets/js/function';

interface State {
    search      : string;
    ogCd        : string;
    itemCd      : string;
    icCd        : string;
    list        : [];
}

export const useOptionStore = defineStore('option', {
    state: (): State => ({
        search      : '',
        ogCd        : '',
        itemCd      : '',
        icCd        : '',
        list        : [],
    }),
    actions: {
        /**
         * @description 옵션 리스트
         */
        async getList()
        {
            try
            {
                const params = {
                    ogCd    : this.ogCd,
                };

                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/estiV1/getOptionList`, params);

                console.log(res);
            }
            catch(e)
            {
                console.error(e);
            }
        },
        getReset()
        {
            this.search = '';
            this.list   = [];
        }
    }
});