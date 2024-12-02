import { defineStore } from 'pinia';
import axios from 'axios';

interface State {
    token   : null | string;
}

export const useLoginStore = defineStore('login', {
    state: (): State => ({
        token   : null
    }),
    actions: {
        async getLogin(params) {
            try 
            {
                const res  = await axios.post('https://data.planorder.kr/login/getLogin', params, { withCredentials: true });
                console.log(res);
                this.token = res.data['access_token'];

                return true;
            }
            catch(e)
            {
                console.log(e);
                return false;
            }
        },
        getToken(token: string)
        {
            this.token = string;
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