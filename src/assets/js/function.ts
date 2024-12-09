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
    const yy = y.toString().substring(2, 4);

	const weekStr = ['일', '월', '화', '수', '목', '금', '토'];
	const w       = weekStr[date.getDay()];

    let result: string;

    switch (type) {
        case "yyyy-mm-dd":
            result = `${y}-${m}-${d}`;
            break;
        case "yy-mm-dd":
            result = `${yy}-${m}-${d}`;
            break;
        case "yy.mm.dd":
            result = `${yy}.${m}.${d}`;
            break;
        case "mm%dd%w%" :
            result = m+'.'+d+'('+w+')';
            break;
        case "mm%dd%w% hh:ii" :
            result = m+'.'+d+'('+w+') '+h+':'+i;
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
		case '002': case '003': /** 커튼 */
			data.push(
				{ key: 'width', header: '가로' },
				{ key: 'height', header: '세로' },
				{ key: 'proc', header: '가공' },
				{ key: 'split', header: '분할' },
				{ key: 'size', header: '규격' }
			)
		break;
		default: /** 기타(EA) */
	}

	return data;
}

/**
 * @description 다음 주소 API 팝업 위치 설정
 */
export function getDaumPopupPosition(layer)
{
    layer.style.display = 'block';

    // iframe을 넣은 element의 위치를 화면의 가운데로 이동시킨다.
    const width 		= 300; //우편번호서비스가 들어갈 element의 width
    const height 		= 400; //우편번호서비스가 들어갈 element의 height
    const borderWidth   = 5; //샘플에서 사용하는 border의 두께

    // 위에서 선언한 값들을 실제 element에 넣는다.
    layer.style.width 	= width + 'px';
    layer.style.height 	= height + 'px';
    layer.style.border 	= borderWidth + 'px solid';

    // 실행되는 순간의 화면 너비와 높이 값을 가져와서 중앙에 뜰 수 있도록 위치를 계산한다.
    layer.style.left 	= (((window.innerWidth || document.documentElement.clientWidth) - width)/2 - borderWidth) + 'px';
    layer.style.top 	= (((window.innerHeight || document.documentElement.clientHeight) - height)/2 - borderWidth) + 'px';
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