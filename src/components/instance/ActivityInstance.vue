<template>
  <div class="my-4">
    <Hint v-if="!available" :text="err_text" :text-type="err_type"/>
  </div>

  <Suspense>
    <BpmnViewer :do-draw="true" :overlays="activities"/>
    <template #fallback>
      <p>Loading ...</p>
    </template>
  </Suspense>
</template>

<script setup>
  import BpmnViewer from "../shared/BpmnViewer.vue";
  import Hint from "../shared/Hint.vue";
  import { mapInstances, filterCalledInstances } from '@/composables/process.js'
  import { useInstanceStore } from '@/stores/InstanceStore';
  import { useAuthStore } from '@/stores/AuthStore';
  import {ref} from "vue";

  const props = defineProps({
    instanceId: {
      type: String,
      required: true
    }
  });

  const store = useInstanceStore();
  const authStore = useAuthStore();

  const err_text = ref('');
  const err_type = ref('warn');
  const available = ref(true);

  const getActivityInstance = async () => {
    try {
      const result = await authStore.getAxios()
          .get(`/process-instance/${props.instanceId}/activity-instances`)
          .catch(function (error) {
            if (error.response && error.response.status === 401) {
              available.value = false;
              err_text.value = "Es besteht keine Berechtigung, die aktiven Instanzen im Diagramm zu sehen.";
            } else {
              console.log('error: ' + error);
            }
          });
      if (result) {
        store.called_instances = filterCalledInstances(result.data.childActivityInstances); // stores called instances
      }
      return result? mapInstances(result.data.childActivityInstances) : undefined;
    } catch (err) {
      console.log(err);
    }
  }

  const activities = await getActivityInstance();
</script>