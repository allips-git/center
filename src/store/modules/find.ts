/**
 * @description 아이디, 비밀번호 찾기 관리 모듈 pinia
 */
import { defineStore } from 'pinia';

/** 인증정보 */
interface Auth {
    name    : string;
    tel     : string;
}

interface Msg {
    id      : string;
    pw      : string;
    pwChk   : string;
    [key: string]: string;
}

interface State {
    certified : boolean;
    auth      : Auth;
    idList    : string[];
    id        : string;
    code      : string;
    pw        : string;
    pwChk     : string;
    msg       : Msg;
}

const getAuthInfo = (): Auth => {
    return {
        name    : '',
        tel     : ''
    }
}

const getMsg = (): Msg => {
    return {
        id      : '',
        pw      : '',
        pwChk   : ''
    }
}

export const useFindStore = defineStore('find', {
    state: (): State => ({
        certified   : false,
        auth        : getAuthInfo(),
        idList      : [],
        id          : '',
        code        : '',
        pw          : '',
        pwChk       : '',
        msg         : getMsg()
    }),
    actions: {
        getMsgSet(msg: string, name: string)
        {
            this.msg        = getMsg();
            this.msg[name]  = msg;
        },
        getCertified(state: boolean)
        {
            this.certified = state;
        },
        getAuth(data: Auth)
        {
            this.auth = data;
        },
        getIdList(idList: string[])
        {
            this.idList = idList;
        },
        getId(id: string)
        {
            this.id = id;
        },
        getCode(code: string)
        {
            this.code = code;
        },
        setMsg(gb: string, msg: Msg)
        {
            this.msg[gb] = msg;
        },
        getReset()
        {
            this.certified  = false;
            this.auth       = getAuthInfo();
            this.msg        = getMsg();
            this.idList     = [];
        }
    }
});