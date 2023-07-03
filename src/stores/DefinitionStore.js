import { defineStore } from 'pinia';
import { useAuthStore } from './AuthStore';

export const useDefinitionStore = defineStore('DefinitionStore', {
    state: () => ({
        selectedDefId: '', // selected process
        selectedVersion: '', // version of the selected process
        selectedName: '', // name of the selected process
        instanceCount: 0 // number of instances for the selected process
    }),
    actions: {
        /**
         * Getting instance count from the REST API and storing it in instanceCount.
         * In case of 401 a -1 is stored and in case of any other error, a -2 is stored.
         * @returns {Promise<void>}
         */
        async getInstanceCount() {
            const authStore = useAuthStore();

            try {
                const result = await authStore.getAxios()
                    .get(`/process-instance/count?processDefinitionId=` + this.selectedDefId)
                    .catch(function (error) {
                        // we don't handle here the error directly
                        if (error.response && error.response.status === 401) {
                            this.instanceCount = -1;
                        } else {
                            this.instanceCount = -2;
                        }
                    });

                if (result && result.data) {
                    this.instanceCount = result.data.count;
                }
            } catch(err) {
                console.log(err);
            }
        }
    }/*,
    persist: {
        storage: sessionStorage, // data in sessionStorage is cleared when the page session ends.
    }*/
});