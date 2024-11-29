import { useLoginStore } from '@/store';
import axios from 'axios';

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