<template>
  <Suspense>
    <BpmnViewer :do-draw="true" :overlays="activities"/>
    <template #fallback>
      <p>Loading ...</p>
    </template>
  </Suspense>
</template>

<script setup>
  import BpmnViewer from "../BpmnViewer.vue";
  import axios from "axios";
  import { mapInstances } from '@/composables/process.js'

  const props = defineProps({
    instanceId: {
      type: String,
      required: true
    }
  });

  const getActivityInstance = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/engine-rest/process-instance/${props.instanceId}/activity-instances`);
      return mapInstances(result.data.childActivityInstances);
    } catch (err) {
      console.log(err);
    }
  }

  const activities = await getActivityInstance();
</script>