import axios from "axios";
import { useJoinStore } from '@/store';

const IMP = window.IMP;
IMP.init("imp36139043");

export async function getCertified()
{
    return new Promise((resolve, reject) => {
        IMP.certification({
            merchant_uid    : 'merchant_' + getRandomStr(15),
            popup           : false
        }, async rsp => {
            if (rsp.success) 
            {
                // 인증 성공
                const token = await getDanalToken();

                if(token['status']) 
                {
                    const info = await getDanal(rsp.imp_uid, token['data']['token']);
                    resolve(info);
                }
                else 
                {
                    resolve(token);
                }
            } 
            else 
            {
                // 인증 취소 or 인증 실패 시
                const msg = {
                    status : false,
                    data   : '',
                    msg    : '인증에 실패하였습니다.' + rsp.error_msg
                };

                reject(msg);
            }
        });
    });
}

async function getDanalToken()
{
    try 
    {
        const instance = axios.create({
            withCredentials : true
        });
    
        const res    = await instance.get(`https://data.planorder.kr/api/danal/getToken`);
        const token  = res.data;

        return {
            status : true,
            data   : { token : token },
            msg    : 'success'
        }
    }
    catch(error)
    {
        console.log(error);
        return {
            status  : false,
            data    : '',
            msg     : '토큰 발급 중에 문제가 생겼습니다. 잠시 후 다시 시도해주세요'
        }
    }
}

/**
 * @description 다날 SMS본인인증결과 조회 및 관리
 * @param => uid   다날 SMS 인증성공 key
 * @param => token access_token
 */
async function getDanal(uid, token)
{
    const join      = useJoinStore();
    const params    = {
        impUid  : uid,
        token   : token['response']['access_token']
    };

    try 
    {
        const instance = axios.create({
            withCredentials : true
        });
    
        const res    = await instance.post(`https://data.planorder.kr/api/danal/getDanalCheckInfo`, params);
        const result = res.data;

        if(result.response.certified)
        {
            /** 본인인증 성공 */
            join.getAuth(result.response.name, result.response.phone);
            
            return {
                status  : true,
                data    : '',
                msg     : '본인인증에 성공하였습니다.'
            }
        }
        else
        {
            /** 본인인증 실패 */
            return {
                status  : false,
                data    : '',
                msg     : '본인인증에 실패하였습니다. 지속될 경우 관리자에게 문의하세요.'
            }
        }
    }
    catch(error)
    {
        console.log(error);
        return {
            status  : false,
            data    : '',
            msg     : '본인인증에 실패하였습니다. 지속될 경우 관리자에게 문의하세요.'
        }
    }
}

/**
 * @description 랜덤 함수 생성
 */
function getRandomStr(length) 
{
    const str  = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    
    for (let i = 0; i < length; i++) 
    {
        const randomIndex = Math.floor(Math.random() * str.length);
        result += str.charAt(randomIndex);
    }
    
    return result;
}