import { defineStore } from 'pinia';
import axios from "axios";

export const useDefinitionStore = defineStore('DefinitionStore', {
    state: () => ({
        selectedDefId: '',
        selectedVersion: '',
        selectedName: '',
        instanceCount: 0
    }),
    actions: {
        async getInstanceCount() {
            try {
                const result = await axios.get(`http://localhost:8080/engine-rest/process-instance/count?processDefinitionId=` + this.selectedDefId);
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