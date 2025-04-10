/**
 * @description 매장 설정 관련련 모듈 pinia
 */
import { defineStore } from 'pinia';
import { getAxiosData, getConvertDate } from '@/assets/js/function';

interface Days {
    text    : string;
    value   : string;
    checked : boolean;
}

interface Info {
    ceNm            : string;
    zip             : null | number;
    addr            : string;
    addrDetail      : string;
    tel             : string;
    einShipping     : string;
    homepage        : string;
    days            : Days[];
    dayStart        : Date;
    dayEnd          : Date;
    holiday         : boolean;
    holidayStart    : Date;
    holidayEnd      : Date;
    memo            : string;
    file            : null | string;
    image           : null | string;
}

interface Msg {
    ceNm        : string;
    addr        : string;
    addrDetail  : string;
    tel         : string;
}

interface State {
    info    : Info;
    msg     : Msg;
}

const getDays = (): Days[] => {
    return [
        {  text: '월', value: 'mon', checked: false },
        {  text: '화', value: 'tue', checked: false },
        {  text: '수', value: 'wed', checked: false },
        {  text: '목', value: 'thu', checked: false },
        {  text: '금', value: 'fri', checked: false },
        {  text: '토', value: 'sat', checked: false },
        {  text: '일', value: 'sun', checked: false }
    ]
}

const getInfo = (): Info => {
    const start = new Date();
    start.setHours(9, 0, 0, 0);

    const end = new Date();
    end.setHours(18, 0, 0, 0);

    return {
        ceNm            : '',
        zip             : null,
        addr            : '',
        addrDetail      : '',
        tel             : '',
        einShipping     : '',
        homepage        : '',
        days            : getDays(),
        dayStart        : start,
        dayEnd          : end,
        holiday         : true,
        holidayStart    : start,
        holidayEnd      : end,
        memo            : '',
        file            : null
    }
}

const getMsg = (): Msg => {
    return {
        ceNm        : '',
        addr        : '',
        addrDetail  : '',
        tel         : ''
    }
}

const filePath = 'https://data.planorder.kr/';

export const useSettingStore = defineStore('setting', {
    state: (): State => ({
        info    : getInfo(),
        msg     : getMsg()
    }),
    actions : {
        async getInfo()
        {
            try
            {
                const params    = {
                    cpCd : this.cpCd
                };

                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/settingV1/getInfo`, params);

                console.log(res);

                const start = new Date();
                start.setHours(9, 0, 0, 0);
            
                const end = new Date();
                end.setHours(18, 0, 0, 0);

                const days = getDays();
                const data = res.data['info'].days ? JSON.parse(res.data['info'].days) : [];

                if(data.length > 0)
                {
                    days.forEach((item) => {
                        data.forEach((day: string) => {
                            if(item.value === day.value)
                            {
                                item.checked = true;
                            }
                        });
                    });
                }

                const date = getConvertDate(new Date(), 'yyyy-mm-dd');

                const info = {
                    ceNm            : res.data['info'].ceNm,
                    zip             : res.data['info'].zip,
                    addr            : res.data['info'].addr,
                    addrDetail      : res.data['info'].addrDetail,
                    tel             : res.data['info'].tel,
                    einShipping     : res.data['info'].einShipping,
                    homepage        : res.data['info'].homepage,
                    days            : days,
                    dayStart        : res.data['info'].dayStart ? new Date(date + ' ' + res.data['info'].dayStart) : start,
                    dayEnd          : res.data['info'].dayEnd ? new Date(date + ' ' + res.data['info'].dayEnd) : end,
                    holiday         : res.data['info'].holiday === 'Y' ? true : false,
                    holidayStart    : res.data['info'].holidayStart ? new Date(date + ' ' + res.data['info'].holidayStart) : start,
                    holidayEnd      : res.data['info'].holidayEnd ? new Date(date + ' ' + res.data['info'].holidayEnd) : end,
                    memo            : res.data['info'].memo,
                    file            : res.data['info'].file,
                    image           : res.data['info'].file ? filePath+res.data['info'].file : null
                }

                this.info = info;

                console.log(this.info)
            }
            catch(e)
            {
                console.log(e);
            }
        },
        getDayCheck(value: string)
        {
            this.info.days.forEach((item) => {
                if (item.value === value) 
                {
                    item.checked = !item.checked;
                }
            });
        },
        getFile(file: string, image: string)
        {
            this.info.file  = file;
            this.info.image = image;
        },
        getMsgSet(msg: string, name: string)
        {
            this.msg        = getMsg();
            this.msg[name]  = msg;
        }
    }
});