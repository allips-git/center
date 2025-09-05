/**
 * @description 매장 설정 관련련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData } from '@/assets/js/function';

interface State {
    repSet      : 'B' | 'E';
    sizeYn      : 'Y' | 'N';
    unitYn      : 'Y' | 'N';
    signYn      : 'Y' | 'N';
    file        : null | string;
    image       : null | string;
    terms       : string;
}

const filePath = 'https://data.planorder.kr/image/sign/';

export const useEstiAndConSetStore = defineStore('estiAndConSet', {
    state: (): State => ({
        repSet      : 'B',
        sizeYn      : 'N',
        unitYn      : 'N',
        signYn      : 'N',
        file        : null,
        image       : null,
        terms       : ''
    }),
    actions : {
        async getData()
        {
            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/estiAndConSetV1/getData`);

                console.log(res);

                if(res.data.info)
                {
                    const info = res.data.info;

                    this.repSet = info.repSet;
                    this.sizeYn = info.sizeYn;
                    this.unitYn = info.unitYn;
                    this.signYn = info.signYn;
                    this.file   = info.file;
                    this.image  = filePath + info.file;
                    this.terms  = info.terms;
                }

                console.log(this.file);
            }
            catch(e)
            {
                console.log(e);
            }
        },
        getFile(file: string, image: string)
        {
            this.file  = file;
            this.image = image;
        }
    }
});