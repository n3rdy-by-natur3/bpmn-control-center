import { defineStore } from 'pinia';
import axios from "axios";

export const useDefinitionStore = defineStore('DefinitionStore', {
    state: () => ({
        selectedDefId: '',
        selectedVersion: '',
        selectedName: '',
        selectedInstanceCount: 0,
        diagram: ''
    }),
    actions: {
        async getDefinitionXml() {
            try {
                const result = await axios.get(`http://localhost:8080/engine-rest/process-definition/` + this.selectedDefId + `/xml`);

                this.diagram = result.data.bpmn20Xml;
            } catch (err) {
                console.log(err);
            }
        },
        async getInstanceCount() {
            try {
               const result = await axios.get(`http://localhost:8080/engine-rest/process-instance/count?processDefinitionId=` + this.selectedDefId);
                this.selectedInstanceCount = result.data.count;
            } catch(err) {
                console.log(err);
            }
        }
    }
});