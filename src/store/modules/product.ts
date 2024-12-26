/**
 * @description 제품 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData } from '@/assets/js/function';

interface Select {
    label   : string;
    value   : string;
}

interface ItemInfo {
    fcCd        : string;
    ordGb       : string;
    itemCd      : string;
    itemNm      : string;
    icCd        : string;
    icNm        : string;
    unit        : string;
    unitNm      : string;
    saleUnit    : number;
    purcUnit    : number;
}

interface ExInfo {
    fcCd        : null;
    ordGb       : string;
    itemCd      : string;
    itemNm      : string;
    icCd        : string;
    icNm        : string;
    unit        : string;
    unitNm      : string;
    unitSize    : number;
    saleUnit    : number;
    purcUnit    : number;
}

/**
 * @description 커튼 실측 데이터
 */
const getExCurtainInfo = (): ExInfo => {
    return {
        fcCd        : null,
        ordGb       : 'O',
        itemCd      : 'EX000001',
        itemNm      : '커튼 실측',
        icCd        : '',
        icNm        : '',
        unit        : '003',
        unitNm      : '폭',
        unitSize    : 1,
        saleUnit    : 0,
        purcUnit    : 0
    }
}

/**
 * @description 블라인드 실측 데이터
 */
const getExBlindInfo = (): ExInfo => {
    return {
        fcCd        : null,
        ordGb       : 'O',
        itemCd      : 'EX000002',
        itemNm      : '블라인드 실측',
        icCd        : '',
        icNm        : '',
        unit        : '001',
        unitNm      : '회베',
        unitSize    : 1,
        saleUnit    : 0,
        purcUnit    : 0
    }
}

/**
 * @description 제품 데이터
 */
const getItemInfo = (): ItemInfo => {
    return {
        fcCd        : '',
        ordGb       : '',
        itemCd      : '',
        itemNm      : '',
        icCd        : '',
        icNm        : '',
        unit        : '',
        unitNm      : '',
        unitSize    : 0,
        saleUnit    : 0,
        purcUnit    : 0
    }
}

interface State {
    option      : Select[];
    fcCd        : string;
    search      : string;
    itemCd      : string;
    icCd        : string;
    list        : [];
    info        : ItemInfo;
    exItem      : {
        blind   : ExInfo;
        curtain : ExInfo;
    };
    start       : number;
}

export const useProductStore = defineStore('product', {
    state: (): State => ({
        option      : [{ label: "브랜드_검색", value: "" }],
        fcCd        : '',
        search      : '',
        itemCd      : '',
        icCd        : '',
        list        : [],
        info        : getItemInfo(),
        exItem      : {
            blind   : getExBlindInfo(),
            curtain : getExCurtainInfo()
        },
        start       : 0
    }),
    getters: {
        // inIcList : (state) => {
        //     const itemInfo  = state.list.find(item => item.itemCd === state.itemCd);
        //     const colorList = itemInfo['colorLists'].filter(item => item.icCd !== state.icCd);

        //     return colorList;
        // }
    },
    actions: {
        /**
         * @description 연동된 공장 / 외주공장 데이터 가져오기
         */
        async getFactory()
        {
            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/estiV1/getFactory`);

                res.data['list'].forEach(item => {
                    if (!this.option.some(item1 => item1.label === item.label)) 
                    {
                        this.option.push(item);
                    }
                });
            }
            catch(e)
            {
                console.error(e);
            }
        },
        /**
         * @description 제품 리스트
         */
        async getList()
        {
            if(this.fcCd === '')
            {
                this.list = [];
                return;
            }

            try
            {
                const params = {
                    fcCd    : this.fcCd,
                    itemNm  : this.search,
                    start   : this.start
                };

                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/estiV1/getItemList`, params);
                const itemList  = [];

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

                    itemList.push({
                        itemCd      : item.itemCd,
                        itemNm      : item.itemNm,
                        unit        : item.unitNm,
                        amt         : Number(item.saleAmt),
                        colorLists  : colorLists,
                        noUsed      : item.useYn === 'N' ? true : false
                    })
                });

                this.list = itemList;
            }
            catch(e)
            {
                console.error(e);
            }
        },
        async getInfo()
        {
            try
            {
                const params = {
                    fcCd   : this.fcCd,
                    itemCd : this.itemCd,
                    icCd   : this.icCd
                };

                console.log(params);

                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/estiV1/getItemInfo`, params);

                console.log(res);

                this.info = res.data['info'];

                return { result : true, calc : res.data['calc'] };
            }
            catch(e)
            {
                console.error(e);
                return { result : false, calc : null };
            }
        },
        getEx(itemCd: string)
        {
            this.info = itemCd === 'EX000001' ? this.exItem['curtain'] : this.exItem['blind'];
        },
        getReset()
        {
            this.fcCd   = '';
            this.search = '';
            this.list   = [];
        }
    }
});