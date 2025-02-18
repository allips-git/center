/**
 * @description 시공시간 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData } from '@/assets/js/function';

interface State {
    curtainTime : number;
    blindTime   : number;
}

export const useTimeStore = defineStore('time', {
    state: (): State => ({
        curtainTime : 0,
        blindTime   : 0
    }),
    actions : {
        async getTime()
        {
            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/timeSettingV1/getTime`);

                this.curtainTime    = res.data['curtainTime'];
                this.blindTime      = res.data['blindTime'];
            }
            catch(e)
            {
                console.log(e);
            }
        }
    }
});