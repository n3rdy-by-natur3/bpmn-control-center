<template>
  <div id="diagram" class="flex-grow h-screen"></div>
</template>

<script setup>
  import { useDefinitionStore } from '@/stores/DefinitionStore';
  import { isReactive } from "vue";
  import BpmnJS from "bpmn-js";
  import axios from "axios";

  const store = useDefinitionStore();

  const props = defineProps({
    doDraw: {
      type: Boolean,
      required: false
    },
    overlays: {
      type: Object,
      required: false
    },
    customEvent: {
      type: Boolean,
      required: false
    }
  });

  const getDefinitionXml = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/engine-rest/process-definition/${store.selectedDefId}/xml`);

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
      const canvas = viewer.get('canvas');
      const overlayData = isReactive(props.overlays) ? props.overlays.values : props.overlays;
      canvas.zoom('fit-viewport');

      if (overlayData) {
        const overlays = viewer.get('overlays');

        for (const [key, value] of Object.entries(overlayData)) {
          console.log(`${key}: ${value}`);
          //canvas.addMarker(key, 'highlight');
          overlays.add(key, {
            position: {
              bottom: 15,
              right: 15
            },
            html: '<div class="bg-cyan-700 text-white py-1.5 px-2.5 text-center rounded-full text-xs">' + value + '</div>'
          });
        }
      }
    } catch (err) {
      console.error("error loading BPMN 2.0 XML", err);
    }
  }

  console.log('do draw: ' + props.doDraw + " selected: " + store.selectedDefId);
  if (props.doDraw && store.selectedDefId !== '') {
    drawDiagram();
  }

  store.$subscribe((mutation, state) => {
    if (mutation.type === 'patch object' && store.selectedDefId !== '') {
      drawDiagram();
    }
  });
</script>