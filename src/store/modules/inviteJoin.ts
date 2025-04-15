/**
 * @description 초대 시 회원가입 관리 모듈 pinia
 */
import { defineStore } from 'pinia';
import axios from 'axios';
import { getTodayTimeDate } from '@/assets/js/function';

/** 이용약관 동의 여부 */
interface Agree {
    all    : boolean;
    age    : { yn : boolean, date : string },
    use    : { yn : boolean, date : string },
    info   : { yn : boolean, date : string },
    choice : { yn : boolean, date : string }
}

interface State {
    state       : boolean;
    certified   : boolean;
    agree       : Agree;
    platform    : string;
    email       : string;
    pw          : string;
    pwChk       : string;
}

const getAgreeInfo = (gb: boolean): Agree => {
    const date = gb ? getTodayTimeDate() : '';

    return {
        all    : gb,
        age    : { yn : gb, date : date },
        use    : { yn : gb, date : date },
        info   : { yn : gb, date : date },
        choice : { yn : gb, date : date }
    }
}

export const useInviteJoinStore = defineStore('inviteJoin', {
    state: (): State => ({
        state       : true,
        certified   : false,
        agree       : getAgreeInfo(false),
        platform    : 'C',
        email       : '',
        pw          : '',
        pwChk       : ''
    }),
    actions: {
        async getEmail(email: string)
        {   
            try
            {
                const res = await axios.post(`https://center.data./hr/emplMng/duplicateCheck`, { email : email });
                
                if(res.data)
                {
                    this.state = true;
                    this.email = email;
                }
                else
                {
                    alert(t('alert.invite_email_error'));
                }
            }
            catch(e)
            {
                console.log(e);
                alert('error')
            }
        },
        getCertified(state: boolean)
        {
            this.certified = state;
        },
        getAgree(gb: boolean)
        {
            this.agree = getAgreeInfo(gb);
        },
        getReset()
        {
            this.state = false;
            this.agree = getAgreeInfo();
            this.email = '';
            this.pw    = '';
            this.pwChk = '';
        }
    }
});