import { useLoginStore } from '@/store';
import axios from 'axios';

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
    const yy = y.toString().substring(2, 4);

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
        default:
            result = `${y}-${m}-${d}`;
    }

    return result;
};

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