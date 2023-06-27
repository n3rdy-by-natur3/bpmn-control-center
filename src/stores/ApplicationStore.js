import { defineStore } from 'pinia';

export const useApplicationStore = defineStore('ApplicationStore', {
    state: () => ({
        domain: '',
        redirected: false, // TODO needed?
        error: '', // flash message
        warn: '', // flash message
        user_name: ''
    }),
    actions: {
        getError() {
            const msg = this.error;
            this.error = '';
            return msg;
        },
        getWarn() {
            const msg = this.warn;
            this.warn = '';
            return msg;
        },
        // helper method to avoid infinite loops in router
        isRedirected() {
            const isRedirected = this.redirected;
            this.redirected = false;
            return isRedirected;
        },
        setDomain(host) {
           this.domain = host;
           this.warn = '';
        }
    },
    persist: true // persist to the local storage
});