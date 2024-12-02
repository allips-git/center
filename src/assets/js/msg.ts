interface OutFactoryMsg {
    faNm    : string;
    tel     : string;
    addr    : string;
}

/**
 * @description 외주공장 저장 시 유효성 검사
 */
export const outFactoryMsg = (params: VatParams): { msg: string; id: string, state: boolean } => {
    if(params['outFaNm'] === '')
    {
        return { msg : '공장명을 입력해주세요.', id : 'outFaNm', state : false };
    }

    if(!params['tel'] || params['tel'] === 0)
    {
        return { msg : '전화번호를 입력해주세요.', id : 'tel', state : false };
    }

    if(params['addr'] === '')
    {
        return { msg : '주소를 입력해주세요.', id : 'addr', state : false };
    }

    return { msg : '', id : '', state : true };
}

