<template>
  <div id="diagram" class="flex-grow h-screen" v-show="available"></div>

  <Hint v-if="!available" :text="err_text" :text-type="err_type"/>

</template>

<script setup>
  import Hint from "./Hint.vue";
  import { useDefinitionStore } from '@/stores/DefinitionStore';
  import { useAuthStore } from '@/stores/AuthStore';
  import { isReactive, ref } from "vue";
  import BpmnJS from "bpmn-js";

  const store = useDefinitionStore();
  const authStore = useAuthStore();
  const err_text = ref('');
  const err_type = ref('warn');
  const available = ref(true);

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
      const result = await authStore.getAxios()
          .get(`/process-definition/${store.selectedDefId}/xml`)
          .catch(function (error) {
            if (error.response && error.response.status === 401) {
              available.value = false;
              err_text.value = 'Es besteht keine Berechtigung, das angeforderte Diagramm zu sehen.';
              err_type.value='warn';
            } else {
              available.value = false;
              err_text.value = 'Das Diagramm konnte nicht geladen werden.';
              err_type.value='error';
            }
          });

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