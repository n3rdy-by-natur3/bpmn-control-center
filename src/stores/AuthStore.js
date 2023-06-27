import { defineStore } from 'pinia';
import axios from "axios";
import CryptoJS from 'crypto-js';
import VueCookies from 'vue-cookies';
import { useApplicationStore } from './ApplicationStore';

/*
    authorization is handled with this store (and not with ApplicationStore), because it's only a session store
 */
export const useAuthStore = defineStore('AuthStore', {
    state: () => ({
        axios: undefined,
        type: '', // username
        part: '', // encrypted password
    }),
    actions: {
        isLoggedIn() {
          return this.type !== '' && this.part !== '' && VueCookies.get('word');
        },
        setCredentials(name, password) {
            this.type = name;
            this.part = CryptoJS.AES.encrypt(password, this.generateSecret()).toString();
        },
        /* generate random secret, encode it, store encoded secret to cookie */
        generateSecret() {
            const rnd = (len, chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') => [...Array(len)].map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
            const secret = rnd(32); // this is a random secret
            const encodedWord = CryptoJS.enc.Utf8.parse(secret);
            const encoded = CryptoJS.enc.Base64.stringify(encodedWord); // we encode it, so it's not plain stored

            VueCookies.set('word' , encoded, "12h"); // we store the secret on another place

            return secret;
        },
        getDecodedSecret() {
            const encoded = VueCookies.get('word');
            const encodedWord = CryptoJS.enc.Base64.parse(encoded);

            return CryptoJS.enc.Utf8.stringify(encodedWord);
        },
        /* decrypt the password from the session with the decoded secret from the cookie */
        decryptedPassword() {
            if (this.type !== '' && this.part !== '') {
                const secret = this.getDecodedSecret();
                return CryptoJS.AES.decrypt(this.part, secret).toString(CryptoJS.enc.Utf8)
            }

            return '';
        },
        logout() {
            this.type = '';
            this.part = '';
            VueCookies.remove('word');
        },
        /* helper for getting the HTTP connection object config with Basic Auth credentials and the base URL */
        getAxios() {
            if (this.axios) {
                return this.axios;
            }

            const appStore = useApplicationStore();
            const name = this.type;
            const password = this.decryptedPassword();

            this.axios = axios.create({
                auth:{
                    username: name,
                    password: password
                },
                baseURL: appStore.domain
            });

            return this.axios;
        }
    },
    persist: {
        storage: sessionStorage, // data in sessionStorage is cleared when the page session ends.
        paths: [ 'type', 'part' ] // don't store axios because of credentials
    }
});