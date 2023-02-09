import { defineStore } from 'pinia';

export const useInstanceStore = defineStore('InstanceStore', {
    state: () => ({
        variables: []
    }),
    actions: {
        saveVariables(variables) {
            this.variables = Object.entries(variables);
        },
        getVariableSublist(index, size) {
            if (this.variables.length === 0) {
                return [];
            }

            return this.variables.slice(index, index + size);
        }
    }/*,
    persist: {
        storage: sessionStorage, // data in sessionStorage is cleared when the page session ends.
    }*/
});