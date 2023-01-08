<template>
  <div id="diagram" class="flex-grow h-screen"></div>
</template>

<script setup>
  import BpmnJS from "bpmn-js";
  import { useDefinitionStore } from '@/stores/DefinitionStore';

  const store = useDefinitionStore();

  store.$subscribe((mutation, state) => {
    console.log("state: " + state.selectedDefId + " mutation type: " + mutation.type);

    if (mutation.type === 'patch object') {
      store.getDefinitionXml();
    }

    if (mutation.type === 'direct') {
      const container = document.getElementById("diagram") ;
      container.innerHTML = "";
      let viewer = new BpmnJS();
      viewer.attachTo(container);

      try {
        viewer.importXML(store.diagram);
      } catch (err) {
        console.error("error loading BPMN 2.0 XML", err);
      }
    }
  });

</script>