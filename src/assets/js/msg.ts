interface JoinFirstParams {
    email   : string;
    pwd     : string;
    pwChk   : string;
    einFile : string;
}

/**
 * @description 회원가입 시 유효성 검사 1
 */
export const joinFirstMsg = (params: JoinFirstParams): { msg: string; id: string, state: boolean } => {
    if(params['email'] === '')
    {
        return { msg : '이메일을 입력해주세요.', id : 'email', state : false };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const stat       = emailRegex.test(params['email']);

    if(!stat)
    {
        return { msg : '잘못된 이메일 형식입니다.', id : 'email', state : false };
    }

    if(params['pwd'] === '')
    {
        return { msg : '비밀번호를 입력해주세요.', id : 'pwd', state : false };
    }

    if(params['pwChk'] === '')
    {
        return { msg : '비밀번호 확인란을 입력해주세요.', id : 'pwChk', state : false };
    }

    if(params['pwd'] !== params['pwChk'])
    {
        return { msg : '비밀번호가 일치하지 않습니다.', id : 'pwChk', state : false };
    }

    if(params['pwd'].length < 8)
    {
        return { msg : '비밀번호는 8자리 이상 입력해주세요.', id : 'pwd', state : false };
    }

    return { msg : '', id : '', state : true };
}

interface JoinSecondParams {
    ceNm    : string;
    einNum  : string;
    ceoNm   : string;
    addr    : string;
    ceoTel  : string;
}

/**
 * @description 회원가입 시 유효성 검사 1
 */
export const joinSecondMsg = (params: JoinSecondParams): { msg: string; id: string, state: boolean } => {
    if(params['ceNm'] === '')
    {
        return { msg : '센터 시설명을 입력해주세요', id : 'ceNm', state : false };
    }

    if(params['einNum'] === '' )
    {
        return { msg : '사업자 등록번호를 입력해주세요.', id : 'einNum', state : false };
    }

    if(params['ceoNm'] === '')
    {
        return { msg : '대표자 이름을 입력해주세요.', id : 'ceoNm', state : false };
    }

    if(params['addr'] === '')
    {
        return { msg : '주소를 입력해주세요.', id : 'addr', state : false };
    }

    if(params['ceoTel'] === '')
    {
        return { msg : '대표 연락처를 입력해주세요.', id : 'ceoTel', state : false };
    }

    return { msg : '', id : '', state : true };
}

interface ClientMsg {
    gb          : Y | N;
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

    if(params['gb'] === 'Y')
    {
        if(!params['tel'] || params['tel'] === 0)
        {
            return { msg : '전화번호를 입력해주세요.', id : 'tel', state : false };
        }

        if(params['addr'] === '')
        {
            return { msg : '주소를 입력해주세요.', id : 'addr', state : false };
        }
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

interface DivSpec {
    width   : number;
    height  : number;
    handle  : string;
    size    : number;
}

interface EstiBlindMsg {
    maxWidth    : number;
    maxHeight   : number;
    minWidth    : number;
    minHeight   : number;
    width       : number;
    height      : number;
    leftQty     : number;
    rightQty    : number;
    qty         : number;
    division    : number;
    divSpec     : DivSpec[];
}

/**
 * @description 견적 저장 시 값 체크 (단위 : 회배)
 */
export const estiBlindMsg = (params: EstiBlindMsg): { msg: string; id: string, index: null | number, state: boolean } => {
    if(!Number(params['width']) || Number(params['width']) === 0)
    {
        return { msg : '가로를 입력해주세요.', id : 'bWidth', index: null, state : false };
    }

    if(!Number(params['height']) || Number(params['height']) === 0)
    {
        return { msg : '세로를 입력해주세요.', id : 'bHeight', index: null, state : false };
    }

    if(params['ordGb'] === 'S')
    {
        /** 시스템 공장 제품 */
        if(Number(params['division'] === 1))
        {
            if(params['minWidth'] && params['maxWidth'])
            {
                if((Number(params['width']) > Number(params['maxWidth'])))
                {
                    return { msg : `해당 제품 최대 가로 ${params['maxWidth']}cm 입니다.`, id : 'bWidth', index: null, state : false };
                }
            }
        }
        else
        {
            for(let index = 0; index < params['divSpec'].length; index++)
            {
                const item = params['divSpec'][index];

                if((Number(item['width']) > Number(params['maxWidth'])))
                {
                    return { msg : `해당 제품 최대 가로 ${params['maxWidth']}cm 입니다.`, id : `bWidth${index}`, index: index, state : false };
                }
            }
        }
        
        if(params['division'] !== 'A')
        {
            if(params['minHeight'] && params['maxHeight'])
            {
                if((Number(params['height']) > Number(params['maxHeight'])))
                {
                    return { msg : `해당 제품 최대 세로 ${params['maxHeight']}cm 입니다.`, id : 'bHeight', index: null, state : false };
                }
            }
        }
        else
        {
            for(let index = 0; index < params['divSpec'].length; index++)
            {
                const item = params['divSpec'][index];

                if((Number(item['height']) > Number(params['maxHeight'])))
                {
                    return { msg : `해당 제품 최대 세로 ${params['maxHeight']}cm 입니다.`, id : `bHeight${index}`, index: index, state : false };
                }
            }
        }
    }
    else
    {
        /** 센터 외주 제품 */
        if((Number(params['height']) < Number(params['minHeight'])))
        {
            return { msg : `해당 제품 기본 세로 ${params['minHeight']}cm 입니다.`, id : 'bHeight', index: null, state : false };
        }
    }

    if(params['division'] === 1)
    {
        if((!Number(params['leftQty']) || Number(params['leftQty']) === 0) && (!Number(params['rightQty']) || Number(params['rightQty']) === 0))
        {
            return { msg : '좌, 우 중 수량을 입력해주세요.', id : 'leftQty', index: null, state : false };
        }
    }
    else
    {
        if(!Number(params['qty']) || Number(params['qty']) === 0)
        {
            return { msg : '수량을 입력해주세요.', id : 'bQty', index: null, state : false };
        }

        for(let index = 0; index < params['divSpec'].length; index++)
        {
            const item = params['divSpec'][index];
    
            if(!Number(item['width']) || Number(item['width']) === 0)
            {
                return { msg : '분할 가로 길이를 입력해주세요.', id : `bWidth${index}`, index: index, state : false };
            }

            if(params['division'] === 'A')
            {
                if(!Number(item['height']) || Number(item['height']) === 0)
                {
                    return { msg : '분할 세로 길이를 입력해주세요.', id : `bHeight${index}`, index: index, state : false };
                }
            }
        }

        const sumWidth = params['divSpec'].reduce((sum, item) => sum + Number(item.width), 0);

        if(Number(params['width']) !== Number(sumWidth))
        {
            return { msg : '분할 가로 길이 합계가 맞지않습니다.', id : 'bWidth', index: null, state : false };
        }
    }

    return { msg : '', id : '', state : true };
}

interface EstiCurtainMsg {
    maxWidth    : number;
    maxHeight   : number;
    minWidth    : number;
    minHeight   : number;
    width       : number;
    height      : number;
    leftQty     : number;
    rightQty    : number;
    qty         : number;
    division    : number;
    divSpec     : DivSpec[];
}

/**
 * @description 견적 저장 시 값 체크 (단위 : 야드, 폭)
 */
export const estiCurtainMsg = (params: EstiCurtainMsg): { msg: string; id: string, state: boolean } => {
    if(!Number(params['width']) || Number(params['width'] === 0))
    {
        return { msg : '가로를 입력해주세요.', id : 'cWidth', state : false };
    }

    if(!Number(params['height']) || params['height'] === 0)
    {
        return { msg : '세로를 입력해주세요.', id : 'cHeight', state : false };
    }

    if(params['maxWidth'])
    {
        if(Number(params['width']) > Number(params['maxWidth']))
        {
            return { msg : `해당 제품 최대 가로 ${params['maxWidth']}cm 입니다.`, id : 'cWidth', state : false };
        }
    }

    if(params['maxHeight'])
    {
        if(Number(params['height']) > Number(params['maxHeight']))
        {
            return { msg : `해당 제품 최대 세로 ${params['maxHeight']}cm 입니다.`, id : 'cHeight', state : false };
        }
    }

    if(!Number(params['size']) || Number(params['size'] === 0))
    {
        return { msg : `최종 계산된 사이즈가 필요합니다.`, id : 'cSize', state : false };
    }

    if(params['addColor'] === 'T' && params['inColor'] === '')
    {
        return { msg : `안쪽 컬러를 선택해주세요.`, id : 'inColor', state : false };
    }

    if(params['addColor'] === 'T' && (!Number(params['inSize']) || Number(params['inSize'] === 0)))
    {
        return { msg : `안쪽 컬러의 최종 계산된 사이즈가 필요합니다.`, id : 'inSize', state : false };
    }

    if(params['addColor'] === 'T' && (Number(params['inSize']) > Number(params['size'])))
    {
        return { msg : `사이즈에 맞는 안쪽 컬러 최종 값으로 수정해주세요.`, id : 'inSize', state : false };
    }

    return { msg : '', id : '', state : true };
}

interface EstiEaMsg {
    qty : number;
}

/**
 * @description 견적 저장 시 값 체크 (단위 : EA)
 */
export const estiEaMsg = (params: EstiEaMsg): { msg: string; id: string, state: boolean } => {
    if(!params['qty'] || params['qty'] === 0)
    {
        return { msg : '수량을 입력해주세요.', id : 'qty', state : false };
    }

    return { msg : '', id : '', state : true };
}

interface ContractMsg {
    deliDt      : string;
    insHour     : number;
    insMinute   : number;
}

/**
 * @description 계약 처리 시 저장 값 체크
 */
export const contractMsg = (params: ContractMsg): { msg: string; id: string, state: boolean } => {
    if(params['deliDt'] === '')
    {
        return { msg : '시공일을 입력해주세요.', id : 'deliDt', state : false };
    }

    if(Number(params['insHour']) === 0 && Number(params['insMinute']) === 0)
    {
        return { msg : '설치시간을 입력해주세요.', id : 'insTime', state : false };
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

interface OutFactoryColors {
    icNm    : string;
}

interface OutFactoryItemMsg {
    itemNm      : string;
    colors      : OutFactoryColors[];
    size        : string;
    unit        : string;
    minHeight   : number;
    pokSpec     : number;
    purcAmt     : number;
    saleAmt     : number;
}

/**
 * @description 외주공장 제품 저장 시 유효성 검사
 */
export const outFactoryItemMsg = (params: OutFactoryItemMsg): { msg: string; id: string, state: boolean } => {
    if(params['itemNm'] === '')
    {
        return { msg : '제품명을 입력해주세요.', id : 'itemNm', state : false };
    }

    for(let index = 0; index < params['colors'].length; index++)
    {
        const item = params['colors'][index];

        if(item['icNm'] === '')
        {
            return { msg : '색상 이름을 입력해주세요.', id : `icNm${index}`, state : false };
        }
    }
    if(params['colors'].length === 0)
    {
        return { msg : '컬러를 선택해주세요.', id : 'colors', state : false };
    }

    if(!Number(params['size']) || Number(params['size'] === 0))
    {
        return { msg : '기본 단위를 입력해주세요.', id : 'size', state : false };
    }

    if(params['unit'] !== '004')
    {
        if(!Number(params['minHeight']) || Number(params['minHeight'] === 0))
        {
            return { msg : '기본 높이를 입력해주세요.', id : 'minHeight', state : false };
        }
    }

    if(params['unit'] === '003')
    {
        if(!Number(params['pokSpec']) || Number(params['pokSpec'] === 0))
        {
            return { msg : '원단 폭을 입력해주세요.', id : 'pokSpec', state : false };
        }
    }

    if(!Number(params['purcAmt']) || Number(params['purcAmt'] === 0))
    {
        return { msg : '매입 가격을을 입력해주세요.', id : 'purcAmt', state : false };
    }

    if(!Number(params['saleAmt']) || Number(params['saleAmt'] === 0))
    {
        return { msg : '판매 가격을을 입력해주세요.', id : 'saleAmt', state : false };
    }

    return { msg : '', id : '', state : true };
}


interface CouponMsg {
    cpNm    : string;
    val     : string;
}

/**
 * @description 쿠폰 저장 시 유효성 검사
 */
export const couponMsg = (params: CouponMsg): { msg: string; id: string, state: boolean } => {
    if(params['cpNm'] === '')
    {
        return { msg : '쿠폰이름을을 입력해주세요.', id : 'cpNm', state : false };
    }

    if(!Number(params['val']) || Number(params['val'] === 0))
    {
        return { msg : '할인금액 또는 할인율을 입력해주세요.', id : 'val', state : false };
    }

    return { msg : '', id : '', state : true };
}

interface SettingMsg {
    cpNm    : string;
    val     : string;
}

/**
 * @description 매장 설정 시 유효성 검사
 */
export const settingMsg = (params: SettingMsg): { msg: string; id: string, state: boolean } => {
    if(params['ceNm'] === '')
    {
        return { msg : '매장이름을 입력해주세요.', id : 'ceNm', state : false };
    }

    if(params['addr'] === '')
    {
        return { msg : '주소를 검색해주세요.', id : 'addr', state : false };
    }

    if(params['addrDetail'] === '')
    {
        return { msg : '상세주소를 입력해주세요.', id : 'addrDetail', state : false };
    }

    if(params['tel'] === '')
    {
        return { msg : '대표 전화번호를 입력해주세요.', id : 'tel', state : false };
    }

    return { msg : '', id : '', state : true };
}

interface MemberMsg {
    type    : 'I' | 'U';
    id      : string;
    pw      : string;
    pwChk   : string;
    name    : string;
    tel     : string;
    addr    : string;
}

/**
 * @description 멤버 저장 시 유효성 검사
 */
export const memberMsg = (params: MemberMsg): { msg: string; id: string, state: boolean } => {
    if(params['id'] === '')
    {
        return { msg : 'ID를 입력해주세요.', id : 'id', state : false };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const stat       = emailRegex.test(params['id']);

    if(!stat)
    {
        return { msg : '잘못된 이메일 형식입니다.', id : 'id', state : false };
    }

    if(params['type'] === 'I')
    {
        if(params['pw'] === '')
        {
            return { msg : '비밀번호를 입력해주세요.', id : 'pw', state : false };
        }

        if(params['pwChk'] === '')
        {
            return { msg : '비밀번호 확인란을 입력해주세요.', id : 'pwChk', state : false };
        }

        if(params['pw'] !== params['pwChk'])
        {
            return { msg : '비밀번호가 일치하지 않습니다.', id : 'pwChk', state : false };
        }

        if(params['pw'].length < 8)
        {
            return { msg : '비밀번호는 8자리 이상 입력해주세요.', id : 'pw', state : false };
        }
    }

    if(params['name'] === '')
    {
        return { msg : '이름을 입력해주세요.', id : 'name', state : false };
    }

    if(params['tel'] === '')
    {
        return { msg : '대표 전화번호를 입력해주세요.', id : 'tel', state : false };
    }

    if(params['addr'] === '')
    {
        return { msg : '주소를 검색해주세요.', id : 'addr', state : false };
    }

    return { msg : '', id : '', state : true };
}

interface MessageMsg {
    gb          : 'S' | 'M';
    title       : string;
    contents    : string;
    clientList  : [];
}

/**
 * @description 메세지 저장 시 유효성 검사
 */
export const messageMsg = (params: MessageMsg): { msg: string; id: string, state: boolean } => {
    if(params['title'] === '')
    {
        return { msg : '문자 제목을 입력해주세요.', id : 'title', state : false };
    }

    if(params['contents'] === '')
    {
        return { msg : '문자 내용을 입력해주세요.', id : 'contents', state : false };
    }

    if(params['gb'] === 'M')
    {
        if(params['clientList'].length === 0)
        {
            return { msg : '전송할 고객을 선택해주세요.', id : 'clientList', state : false };
        }
    }

    return { msg : '', id : '', state : true };
}