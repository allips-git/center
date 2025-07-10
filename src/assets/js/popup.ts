import { usePopupStore } from '@/store/modules/popup';

export const usePopup = () => {
    const popup  = usePopupStore();

    const getPopupOpen = async (popNm: string): Promise<void> => {
        await popup.getOpen(popNm);
    };

    const getPopupClose = async (popNm: string, gb: boolean = false): Promise<void> => {
        const lastPopNm = popup.list[popup.list.length - 1];

        if (popup['pop'][popNm]) 
        {
            console.log('pop')
            await popup.getClose(popNm);
        }

        if (gb) 
        {
            console.log('gb')
            await popup.getClose(lastPopNm);
        }
    };

    return { getPopupOpen, getPopupClose };
};