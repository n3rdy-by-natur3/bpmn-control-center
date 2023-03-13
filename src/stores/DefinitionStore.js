import { defineStore } from 'pinia';
import axios from "axios";
import { useApplicationStore } from './ApplicationStore';

export const useDefinitionStore = defineStore('DefinitionStore', {
    state: () => ({
        selectedDefId: '', // selected process
        selectedVersion: '', // version of the selected process
        selectedName: '', // name of the selected process
        instanceCount: 0 // number of instances for the selected process
    }),
    actions: {
        async getInstanceCount() {
            const appStore = useApplicationStore();

            try {
                const result = await axios.get(`${appStore.domain}/process-instance/count?processDefinitionId=` + this.selectedDefId);
                this.instanceCount = result.data.count;
            } catch(err) {
                console.log(err);
            }
        }
    }/*,
    persist: {
        storage: sessionStorage, // data in sessionStorage is cleared when the page session ends.
    }*/
});