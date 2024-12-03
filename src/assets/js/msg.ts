interface ClientMsg {
    clientNm    : string;
    tel         : string;
    addr        : string;
    person      : string;
    groupCd     : string;
    groupNm     : string;
}

/**
 * @description 고객 저장 시 유효성 검사
 */
export const clientMsg = (params: ClientMsg): { msg: string; id: string, state: boolean } => {
    if(params['clientNm'] === '')
    {
        return { msg : '고객명을 입력해주세요.', id : 'clientNm', state : false };
    }

    if(!params['tel'] || params['tel'] === 0)
    {
        return { msg : '전화번호를 입력해주세요.', id : 'tel', state : false };
    }

    if(params['addr'] === '')
    {
        return { msg : '주소를 입력해주세요.', id : 'addr', state : false };
    }

    if(params['person'] === '')
    {
        return { msg : '담당자를 선택해주세요.', id : 'person', state : false };
    }

    if(params['groupCd'] === 'N' && params['groupNm'] === '')
    {
        return { msg : '그룹명을 입력해주세요.', id : 'groupNm', state : false };
    }

    return { msg : '', id : '', state : true };
}

interface OutFactoryMsg {
    faNm    : string;
    tel     : string;
    addr    : string;
}

/**
 * @description 외주공장 저장 시 유효성 검사
 */
export const outFactoryMsg = (params: OutFactoryMsg): { msg: string; id: string, state: boolean } => {
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