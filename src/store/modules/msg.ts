/**
 * @description 문자메세지 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData } from '@/assets/js/function';

interface Info {
    title     : string;
    contents  : string;
}

interface ClientList {
    clientCd : string;
    clientNm : string;
    tel      : string;
}

interface Msg {
    title       : string;
    contents    : string;
    clientList  : string;
}

interface State {
    msCd        : string;
    type        : 'I' | 'U';
    info        : Info;
    clientList  : ClientList[];
}

const getInfo = (): Info => {
    return {
        title       : '',
        contents    : ''
    }
}

const getMsgInfo = (): Msg => {
    return {
        title       : '',
        contents    : ''
    }
}

const getMsg = (): Msg => {
    return {
        title       : '',
        contents    : '',
        clientList  : ''
    }
}

export const useMsgStore = defineStore('msg', {
    state: (): State => ({
        msCd        : '',
        type        : 'I',
        info        : getInfo(),
        clientList  : [],
        msg         : getMsg()
    }),
    actions : {
        async getInfo()
        {
            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/msgV1/getInfo`, { msCd : this.msCd });

                this.type = 'U';
                this.info = res.data.info;
            }
            catch(e)
            {
                console.log(e);
            }
        },
        getMsgSet(msg: string, id: string)
        {
            this.msg        = getMsgInfo();
            this.msg[id]    = msg;
        },
        getMsCd(msCd: string)
        {
            this.msCd = msCd;
        },
        getReset()
        {
            this.type       = 'I';
            this.clientList = [];
            this.info       = getInfo();
            this.msg        = getMsgInfo();
        }
    }
});