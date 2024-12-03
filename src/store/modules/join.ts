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

interface State {
    certified   : boolean;
    agree       : AgreeInfo;
    auth        : AuthInfo;
    login       : LoginInfo;
    center      : CenterInfo;
}

export const useJoinStore = defineStore('join', {
    state: (): State => ({
        certified   : false,
        agree       : getAgreeInfo(false),
        auth        : getAuthInfo(),
        login       : getLoginInfo(),
        center      : getCenterInfo()
    }),
    actions: {
        getAgree(status: boolean, gb: string)
        {
            if(gb === 'all')
            {
                this.agree = getAgreeInfo(status);
            }
            else
            {
                const date = status ? getTodayTimeDate() : '';

                this.agree[gb]['yn']    = status;
                this.agree[gb]['date']  = date;
            }
        }
    }
});