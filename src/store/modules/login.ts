import { defineStore } from 'pinia';
import axios from 'axios';

interface State {
    token       : null | string;
    ceNm        : string;
    name        : string;
    addr        : string;
    addrDetail  : string;
    rank        : C | M | B | C;
}

export const useLoginStore = defineStore('login', {
    state: (): State => ({
        token       : null,
        ceNm        : '',
        name        : '',
        addr        : '',
        addrDetail  : '',
        rank        : ''
    }),
    actions: {
        async getLogin(params) {
            try 
            {
                const res  = await axios.post('https://data.planorder.kr/login/getLogin', params, { withCredentials: true });
                console.log(res);
                this.token = res.data['access_token'];
                this.name  = res.data['name'];
                this.rank  = res.data['rank'];

                return 200;
            }
            catch(e)
            {
                console.log(e);
                if(e.response.data.code === 4100)
                {
                    this.token      = null;
                    this.ceNm       = e.response.data.data['ceNm'];
                    this.name       = e.response.data.data['userNm'];
                    this.addr       = e.response.data.data['addr'];
                    this.addrDetail = e.response.data.data['addrDetail'];
                    this.rank       = '';

                    return 4100;
                }
                else
                {
                    return 4000;
                }
            }
        },
        async getTemLogin(ceNm: string, name: string, addr: string, addrDetail: string)
        {
            this.ceNm       = ceNm;
            this.name       = name;
            this.addr       = addr;
            this.addrDetail = addrDetail;
        },
        async getLogout()
        {
            this.token = null;
            this.name  = '';
        },
        getToken(token: string)
        {
            this.token = token;
        },
        getId(id: string)
        {
            this.id = id;
        }
    },
    persist: {
        enabled     : true,
        strategies  : [
            {
                key     : 'loginStore',
                storage : localStorage
            }
        ]
    }
});