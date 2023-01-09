<template>
  <div class="px-4 bg-white block sm:flex items-center justify-between border-b border-gray-200">
    <div class="mb-1 w-full">
      <div class="mb-4">
        <h1 class="text-xl sm:text-2xl font-semibold text-gray-900">{{ store.selectedName }}</h1>
      </div>
      <div class="pb-2 flex flex-wrap">
        <div class="">Version: {{ store.selectedVersion }}</div>
        <div class="px-2">Laufende Instanzen: {{ store.selectedInstanceCount }}</div>
      </div>
    </div>
  </div>

  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div class="align-middle inline-block min-w-full">
        <div class="shadow overflow-hidden">
          <div id="diagram" class="flex-grow h-screen"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import BpmnJS from "bpmn-js";
  import { useDefinitionStore } from '@/stores/DefinitionStore';

  const store = useDefinitionStore();

  store.$subscribe((mutation, state) => {
    console.log("state: " + state.selectedDefId + " mutation type: " + mutation.type);

    // definition was selected, so trigger diagram and instance count
    if (mutation.type === 'patch object') {
      store.getDefinitionXml();
      store.getInstanceCount();
    }

    // diagram XML in store has changed, so redraw the SVG
    if (mutation.type === 'direct' && mutation.events.key === 'diagram') {
      const container = document.getElementById("diagram") ;
      container.innerHTML = ""; // clearing the former SVG
      let viewer = new BpmnJS();
      viewer.attachTo(container);

      try {
        viewer.importXML(store.diagram);
        // TODO
        /*const width = container.offsetWidth;
        const canvas = viewer.get('canvas');
        const svg = container.getElementsByTagName("svg");
        console.log('width: ' + width + ' svg: ' + svg[1].width.baseVal.valueAsString);*/
      } catch (err) {
        console.error("error loading BPMN 2.0 XML", err);
      }
    }
  });
</script>