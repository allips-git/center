/**
 * @description 멤버 관리 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData } from '@/assets/js/function';

interface List {
    userCd : string;
    userNm : string;
    state  : Y | E | P | N | C; /** 승인상태(E:대기, Y:승인, N:취소, C:초대확인, P:진행) */
    rank   : C | M | B | L;     /** 직급(C:대표, M:매니저, B:기본, L:최소) */
}

interface Info {
    id          : string;
    name        : string;
    tel         : string;
    zip         : null | string;
    addr        : string;
    addrDetail  : string;
    rank        : M | B | L;    /** 직급(M:매니저, B:기본, L:최소) */
}

interface Detail {
    userNm : string;
    tel    : string;
    rank   : string;
}

interface History {
    clientNm : string;
    codeSub  : string;
    codeNm   : string;
    regDt    : string;
}

interface Msg {
    id      : string;
    name    : string;
    tel     : string;
    addr    : string;
}

interface State {
    type    : I | U;
    userCd  : string;
    list    : List[];
    info    : Info;
    detail  : Detail;
    history : History[];
    msg     : Msg;
    start   : number;
}

const getInfo = (): Info => {
    return {
        id          : '',
        name        : '',
        tel         : '',
        zip         : null,
        addr        : '',
        addrDetail  : '',
        rank        : 'L'
    }
}

const getDetail = (): Detail => {
    return {
        userNm : '',
        tel    : '',
        rank   : ''
    }
}

const getMsg = (): Msg => {
    return {
        id      : '',
        name    : '',
        tel     : '',
        addr    : ''
    }
}

export const useMemberStore = defineStore('member', {
    state: (): State => ({
        type    : 'I',
        userCd  : '',
        list    : [],
        info    : getInfo(),
        detail  : getDetail(),
        history : [],
        msg     : getMsg(),
        start   : 0
    }),
    actions : {
        async getList()
        {
            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/memberV1/getList`);

                console.log(res);

                this.list = res.data['list'].map(item => {
                    return {
                        userCd : item.userCd,
                        userNm : item.userNm,
                        rank   : item.rank === 'C' ? '대표' : item.rank === 'M' ? '매니저' : item.rank === 'B' ? '기본' : '최소',
                        state  : item.state
                    }
                });
            }
            catch(e)
            {
                console.log(e);
            }
        },
        async getInfo()
        {
            try
            {
                const params    = {
                    userCd : this.userCd
                };

                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/memberV1/getInfo`, params);

                this.info = res.data['info'];
            }
            catch(e)
            {
                console.log(e);
            }
        },
        async getDetail()
        {
            try
            {
                const params    = {
                    userCd : this.userCd,
                    start  : this.start
                };

                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/memberV1/getDetail`, params);

                console.log(res);

                const detail = {
                    userNm  : res.data['detail'].userNm,
                    tel     : res.data['detail'].tel,
                    rank    : res.data['detail'].rank === 'C' ? '대표' : res.data['detail'].rank === 'M' ? '매니저' : res.data['detail'].rank === 'B' ? '기본' : '최소'
                };

                this.detail = detail;

                this.history = res.data['history'].map(item => {
                    return {
                        clientNm : item.clientNm,
                        codeSub  : item.codeSub,
                        codeNm   : item.codeNm,
                        regDt    : item.regDt
                    }
                });
            }
            catch(e)
            {
                console.log(e);
            }
        },
        getInfoReset()
        {
            this.type = 'I';
            this.info = getInfo();
        },
        getMsgSet(msg: string, id: string)
        {
            this.msg = getMsg();
            this.msg[id] = msg;
        },
        getUserCd(userCd: string)
        {
            this.type   = 'U';
            this.userCd = userCd;
        }
    },
    persist: {
        key     : 'member',
        storage : localStorage,
        paths   : ['type', 'userCd']
    }
});