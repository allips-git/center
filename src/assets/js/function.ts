import { useLoginStore } from '@/store';
import axios from 'axios';

/**
 * @description 숫자 콤마 처리
 */
export const getCommas = (value: number): string => {
    if(typeof value !== 'number')
    {
        return value;
    }
    
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * @description 오늘일자(Y-m-d H:i)
 */
export const getTodayTimeDate = (): string => {
    const currentDate = new Date();

    const year  = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day   = String(currentDate.getDate()).padStart(2, '0');
    const hour  = String(currentDate.getHours()).padStart(2, '0'); // 시 수정
    const min   = String(currentDate.getMinutes()).padStart(2, '0'); // 분 수정

    return `${year}-${month}-${day} ${hour}:${min}`;
}

/**
 * @description 날짜 변환 처리
 */
export const getConvertDate = (date: Date, type: string): string => {
    const y  = date.getFullYear();
    const m  = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1).toString();
    const d  = date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString();
    const h  = date.getHours() < 10 ? '0'+date.getHours() : date.getHours();
    const i  = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
    const s  = String(date.getSeconds()).padStart(2, '0');
    const yy = y.toString().substring(2, 4);

    const weekStr = ['일', '월', '화', '수', '목', '금', '토'];
    const w       = weekStr[date.getDay()];

    let result: string;

    const hourNum = date.getHours();
    const ampm = hourNum < 12 ? '오전' : '오후';
    const hour12 = hourNum % 12 === 0 ? 12 : hourNum % 12;
    const hour12Str = hour12 < 10 ? '0' + hour12 : hour12.toString();

    switch (type) {
        case 'aver':
            result = `${y}년 ${m}월`;
            break;
        case 'accWeek':
            result = `${m}월 ${d}일 (${w})`;
            break;
        case 'monthCalendar':
            result = `${y}년 ${m}월 ${d}일 (${w})`;
            break;
        case 'monthCalendarInfo':
            result = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
            break;
        case 'dayCalendar':
            result = `${y}-${m}-${d}T${h}:${i}`;
            break;
        case 'yyyymm':
            result = y+''+m;
            break;
        case 'yyyy-mm-dd':
            result = `${y}-${m}-${d}`;
            break;
        case 'yy-mm-dd':
            result = `${yy}-${m}-${d}`;
            break;
        case 'yy.mm.dd':
            result = `${yy}.${m}.${d}`;
            break;
        case 'mm%dd%w%':
            result = m+'.'+d+'('+w+')';
            break;
        case 'mm%dd%w% hh:ii':
            result = m+'.'+d+'('+w+') '+h+':'+i;
            break;
        case 'yyyy-mm-dd hh:ii':
            result = `${y}-${m}-${d} ${h}:${i}`;
            break;
        case 'yy.mm.dd.w':
            result = yy +'. '+m+'. '+d+' ('+w+')';
            break;
        case 'hh:ii':
            result = `${h}:${i}`;
            break;
        case 'a hh:ii':
            result = `${ampm} ${hour12Str}:${i}`;
            break;
        default:
            result = `${y}-${m}-${d}`;
    }

    return result;
};

export const getCardColumns = (unit: string) => {
	const data = [];

	switch(unit)
	{
		case '001': /** 블라인드 */
			data.push(
				{ key: 'width', header: '가로' },
				{ key: 'height', header: '세로' },
				{ key: 'leftQty', header: '좌' },
				{ key: 'rightQty', header: '우' },
				{ key: 'size', header: '규격' }
			)
		break;
		case '002': case '003': case '005': case '006': /** 커튼 */
			data.push(
				{ key: 'width', header: '가로' },
				{ key: 'height', header: '세로' },
				// { key: 'proc', header: '가공' },
				{ key: 'split', header: '분할' },
                { key: 'qty', header: '수량' },
				{ key: 'size', header: '규격' }
			)
		break;
		default: /** 기타(EA) */
            data.push(
                { key: 'qty', header: '수량' }
            )
	}

	return data;
}

/**
 * @description 상황별 할인 및 결제 처리할 금액 추출
 */
export const getAmt = (data: Array, type: string) => {
	const arr = ['itemAmt', 'itemTax', 'optionAmt', 'procAmt', 'bprocAmt', 'shapeAmt', 'heightAmt', 'addAmt'];
	let amt   = 0;

	switch(type)
	{
		case 'firstDis': /** 계약 시 할인 적용할 총 금액 */
			amt = data.filter(item => arr.includes(item.name)).reduce((total, item) => total + item.amt, 0);
		break;
		case 'cutDis': /** 천원 단위 절삭 할인 시 */
			arr.push('dcAmt');
			amt = data.filter(item => arr.includes(item.name)).reduce((total, item) => total + item.amt, 0);
		break;
		case 'lastDis': /** 최종 결제 시 할인 적용할 총 금액 */
			arr.push('dcAmt', 'addAmt', 'cutAmt', 'conAmt', 'lastAddAmt');
			amt = data.filter(item => arr.includes(item.name)).reduce((total, item) => total + item.amt, 0);
		break;
		case 'total': /** 모든 총 금액 */
			amt = data.reduce((total, item) => total + item.amt, 0);
		break;
	}

	return amt;
}

/**
 * @description 파일 체크
 */
export const getFileCheck = (file: File, size: number): string | boolean => {
    if(!file)
    {
        return { stat : false, msg : '올바른 파일 형식이 아닙니다. jpg, png, pdf 형식만 가능합니다.' }
    }

    const allowedExtensions: string[] = ['.jpg', '.jpeg', '.png', '.pdf'];
    const fileExtension: string = file.name.toLowerCase().substr(file.name.lastIndexOf('.'));

    if (!allowedExtensions.includes(fileExtension)) 
    {
        return { stat : false, msg : '올바른 파일 형식이 아닙니다. jpg, png, pdf 형식만 가능합니다.' }
    }
  
    const maxSize: number = size * 1024 * 1024;

    if (file.size > maxSize) 
        
    {
        return { stat : false, msg : `파일 크기가 ${size}MB를 초과합니다.`  };
    }
  
    return { stat : true, msg : '' };
}

/**
 * @description 날짜 추가
 */
export const getAddDate = (days: number) => {
	const result = new Date();
	result.setDate(result.getDate() + days);

	return result;
}

/**
 * @description 다음 주소 API 팝업 위치 설정
 */
export function getDaumPopupPosition(layer) {
    layer.style.display = 'block';

    // iframe을 넣은 element의 위치를 설정한다.
    const width = 300; //우편번호서비스가 들어갈 element의 width
    const height = 400; //우편번호서비스가 들어갈 element의 height
    const borderWidth = 5; //샘플에서 사용하는 border의 두께

    // 위에서 선언한 값들을 실제 element에 넣는다.
    layer.style.width = width + 'px';
    layer.style.height = height + 'px';
    layer.style.border = borderWidth + 'px solid';

    // 모달 요소 찾기 (주소 검색이 열린 모달)
    const modal = layer.closest('.p-dialog-content') || layer.closest('.modal-content');
    
    // 모바일 여부 체크 (화면 너비가 480px 이하면 모바일로 간주)
    const isMobile = window.innerWidth <= 480;

    if (modal && (isMobile || window.innerWidth <= 768)) { // 모바일이거나 태블릿(768px 이하)일 때
        // 모달 기준으로 중앙 정렬
        const modalRect = modal.getBoundingClientRect();
        layer.style.position = 'absolute';
        layer.style.left = '50%';
        layer.style.top = '50%';
        layer.style.transform = 'translate(-50%, -50%)';
        // 모달 내부 기준으로 위치 조정
        layer.style.margin = '0';
        // z-index 조정으로 모달 위에 표시
        layer.style.zIndex = '9999';
    } else {
        // 데스크톱에서는 화면 중앙
        layer.style.position = 'fixed';
        layer.style.left = '50%';
        layer.style.top = '50%';
        layer.style.transform = 'translate(-50%, -50%)';
        layer.style.margin = '0';
    }
}

/**
 * @description axios 통신
 */
export const getAxiosData = async () => {
    const loginStore = useLoginStore();

    const token: string | null = loginStore.token;

    const instance = axios.create({
        withCredentials : true,
        headers         : {
            'Authorization': 'Bearer ' + token
        }
    });

    return instance;
};

export const getTokenOut = () => {
    const login = useLoginStore();

    alert('세션이 만료되었습니다. 로그인 화면으로 이동합니다.');
    login.getLogout();
    router.push('/login');
}