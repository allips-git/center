import { defineStore } from 'pinia';
import axios from 'axios';

interface State {
    token   : null | string;
    name    : string;
}

export const useLoginStore = defineStore('login', {
    state: (): State => ({
        token   : null,
        name    : ''
    }),
    actions: {
        async getLogin(params) {
            try 
            {
                const res  = await axios.post('https://data.planorder.kr/login/getLogin', params, { withCredentials: true });
                console.log(res);
                this.token = res.data['access_token'];
                this.name  = res.data['name'];

                return true;
            }
            catch(e)
            {
                console.log(e);
                return false;
            }
        },
        async getLogout()
        {
            this.token = null;
            this.name  = '';
        },
        getToken(token: string)
        {
            this.token = token;
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