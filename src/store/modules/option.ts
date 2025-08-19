/**
 * @description 옵션 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData } from '@/assets/js/function';

interface State {
    search      : string;
    itemCd      : string;
    icCd        : string;
    list        : [];
}

export const useOptionStore = defineStore('option', {
    state: (): State => ({
        search      : '',
        itemCd      : '',
        icCd        : '',
        list        : []
    }),
    actions: {
        /**
         * @description 옵션 리스트
         */
        async getList(ogCd: string)
        {
            try
            {
                const params = {
                    search  : this.search,
                    ogCd    : ogCd,
                };

                console.log(params);

                const instance      = await getAxiosData();
                const res           = await instance.post(`https://data.planorder.kr/estiV1/getOptionList`, params);
                const optionList    = [];

                console.log(res);

                res.data['list'].map(item => {
                    const colorLists = [];

                    item.icList.map(ic => {
                        colorLists.push({
                            icCd     : ic.icCd,
                            icNm     : ic.icNm,
                            name     : 'icCd'+item.itemCd,
                            disabled : ic.useYn === 'Y' ? false : true
                        })
                    })

                    optionList.push({
                        itemCd      : item.itemCd,
                        itemNm      : item.itemNm,
                        unit        : item.unitNm,
                        amt         : Number(item.saleAmt),
                        colorLists  : colorLists,
                        noUsed      : item.useYn === 'N' ? true : false
                    })
                });

                this.list = optionList;
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