/**
 * @description 회원가입 관련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getTodayTimeDate } from '@/assets/js/function'

interface Info {
    yn      : boolean;
    date    : string;
}

interface AgreeInfo {
    age     : Info;
    use     : Info;
    info    : Info;
    choice  : Info;
}

interface AuthInfo {
    name : string;
    tel  : string;
}

interface LoginInfo {
    id      : string;
    pw      : string;
    pwChk   : string
    einFile : {
        file : null | File;
        name : string;
    }
}

interface CenterInfo {
    ceNm        : string;
    area        : string;
    gb          : string;
    einNum      : string;
    ceoNm       : string;
    zip         : number;
    addr        : string;
    addrDetail  : string;
    ceoTel      : string;
}

interface Msg {
    id      : string;
    pw      : string;
    pwChk   : string;
    einFile : string;
}

interface State {
    certified   : boolean;
    agree       : AgreeInfo;
    auth        : AuthInfo;
    login       : LoginInfo;
    center      : CenterInfo;
    msg         : Msg;
}

const getAgreeInfo = (gb): AgreeInfo => {
    const date = gb === 'Y' ? getTodayTimeDate() : '';

    return {
        age    : { yn : gb, date : date },
        use    : { yn : gb, date : date },
        info   : { yn : gb, date : date },
        choice : { yn : gb, date : date }
    }
}

const getAuthInfo = (): AuthInfo => {
    return {
        name    : '',
        tel     : ''
    }
}

const getLoginInfo = (): LoginInfo => {
    return {
        id      : '',
        pw      : '',
        pwChk   : '',
        einFile : {
            file : null,
            name : ''
        }
    }
}

const getCenterInfo = (): CenterInfo => {
    return {
        ceNm        : '',
        area        : 'SE',
        gb          : 'P',
        einNum      : '',
        ceoNm       : '',
        zip         : '',
        addr        : '',
        addrDetail  : '',
        ceoTel      : ''
    }
}

const getMsg = (): Msg => {
    return {
        id      : '',
        pw      : '',
        pwChk   : '',
        einFile : ''
    }
}

export const useJoinStore = defineStore('join', {
    state: (): State => ({
        certified   : false,
        agree       : getAgreeInfo(false),
        auth        : getAuthInfo(),
        login       : getLoginInfo(),
        center      : getCenterInfo(),
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
        getAgree(status: boolean)
        {
            this.agree = getAgreeInfo(status);
        },
        getAuth(name: string, tel: number)
        {
            this.auth['name'] = name;
            this.auth['tel']  = tel;
        },
        getFile(file: File, fileName: string)
        {
            this.login['einFile']['file'] = file;
            this.login['einFile']['name'] = fileName;
        },
        getMsgReset()
        {
            this.msg = getMsg();
        },
        getReset()
        {
            this.certified  = false;
            this.agree      = getAgreeInfo(false);
            this.auth       = getAuthInfo();
            this.login      = getLoginInfo();
            this.center     = getCenterInfo();
            this.msg        = getMsg();
        }
    }
});