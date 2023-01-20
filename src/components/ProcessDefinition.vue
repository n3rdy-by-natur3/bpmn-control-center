<template>
  <h2 class="text-l sm:text-xl font-semibold text-gray-900">{{ store.selectedName }}</h2>

  <div class="flex flex-wrap" v-show="isFilled">
    <div class="mr-4">Version: {{ store.selectedVersion }}</div>
    <div>Laufende Instanzen: {{ store.instanceCount }}</div>
  </div>
  <div class="w-full mt-6">
    <div id="diagram" class="flex-grow h-screen"></div>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { useDefinitionStore } from '@/stores/DefinitionStore';
  import BpmnJS from "bpmn-js";
  import axios from "axios";

  const store = useDefinitionStore();
  let isFilled = false;

  const getDefinitionXml = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/engine-rest/process-definition/` + store.selectedDefId + `/xml`);

      return result.data.bpmn20Xml;
    } catch (err) {
      console.log(err);
    }
  }

  const drawDiagram = async () => {
    const xml = await getDefinitionXml();
    const container = document.getElementById("diagram") ;
    container.innerHTML = ""; // clearing the former SVG
    let viewer = new BpmnJS();
    viewer.attachTo(container);

    try {
      await viewer.importXML(xml);
      viewer.get('canvas').zoom('fit-viewport');
      // TODO
      /*const width = container.offsetWidth;
      const canvas = viewer.get('canvas');
      const svg = container.getElementsByTagName("svg");
      console.log('width: ' + width + ' svg: ' + svg[1].width.baseVal.valueAsString);*/
    } catch (err) {
      console.error("error loading BPMN 2.0 XML", err);
    }
  }

  // reset store when component is shown
  onMounted(() => {
    store.$reset();
  });

  store.$subscribe((mutation, state) => {
    if (mutation.type === 'patch object') {
      if (store.selectedDefId !== '') {
        isFilled = true;
        drawDiagram();
      }
    }
  });
</script>

<style>
  .djs-parent {
    margin-left: -9rem;
  }
</style>