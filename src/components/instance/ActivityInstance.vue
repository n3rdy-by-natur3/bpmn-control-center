<template>
  <Suspense>
    <BpmnViewer :do-draw="true" :overlays="activities"/>
    <template #fallback>
      <p>Loading ...</p>
    </template>
  </Suspense>
</template>

<script setup>
  import BpmnViewer from "../shared/BpmnViewer.vue";
  import axios from "axios";
  import { mapInstances, filterCalledInstances } from '@/composables/process.js'
  import { useInstanceStore } from '@/stores/InstanceStore';

  const props = defineProps({
    instanceId: {
      type: String,
      required: true
    }
  });

  const store = useInstanceStore();

  const getActivityInstance = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/engine-rest/process-instance/${props.instanceId}/activity-instances`);
      store.called_instances = filterCalledInstances(result.data.childActivityInstances); // stores called instances
      return mapInstances(result.data.childActivityInstances);
    } catch (err) {
      console.log(err);
    }
  }

  const activities = await getActivityInstance();
</script>