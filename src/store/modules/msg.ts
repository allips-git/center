/**
 * @description 문자메세지 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData } from '@/assets/js/function';
import { useLoginStore } from '@/store';

interface Info {
    color       : string;
    emoji       : string;
    title       : string;
    contents    : string;
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
    mhCd        : string;
    msCd        : string;
    type        : 'I' | 'U';
    info        : Info;
    clientList  : ClientList[];
}

const getInfo = (): Info => {
    return {
        color       : '#eef0f2',
        emoji       : '😊',
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
        mhCd        : '',
        msCd        : '',
        type        : 'I',
        info        : getInfo(),
        clientList  : [],
        msg         : getMsg()
    }),
    actions : {
        async getInfo()
        {
            const login  = useLoginStore();
            const params = { 
                mbCd    : this.mbCd, 
                msCd    : this.msCd 
            };

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/msgV1/getInfo`, params);

                this.type = 'U';
                this.info = res.data.info;
                // this.info.contents = this.info.contents.replaceAll('${ceNm}', login.ceNm).replaceAll('${name}', login.name);
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
        getData(mhCd: string, mbCd: string, msCd: string)
        {
            this.mhCd = mhCd;
            this.mbCd = mbCd;
            this.msCd = msCd;
        },
        getReset()
        {
            this.type       = 'I';
            this.msCd       = '';
            this.clientList = [];
            this.info       = getInfo();
            this.msg        = getMsgInfo();
        }
    },
    persist: {
        key     : 'msg',
        storage : localStorage,
        paths   : ['type', 'mhCd', 'msCd']
    }
});