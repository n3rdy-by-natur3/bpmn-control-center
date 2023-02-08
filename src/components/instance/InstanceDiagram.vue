<template>
  <div class="m-4">
    <div class="flex">
      <div class="w-full mt-6">
        <Suspense>
          <BpmnViewer v-if="showDiagram" :do-draw="true" :overlays="activities"/>
          <template #fallback>
            <p>Loading ...</p>
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>

<script setup>
  import BpmnViewer from "../shared/BpmnViewer.vue";
  import axios from "axios";
  import { reactive, ref } from "vue";
  import { mapInstances } from "@/composables/process";
  import { useDefinitionStore } from '@/stores/DefinitionStore';

  const store = useDefinitionStore();
  const activities = reactive({ values: {}});

  const showDiagram = ref(false);

  const getActivityInstance = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/engine-rest/history/activity-instance?processDefinitionId=${store.selectedDefId}&unfinished=true`);
      return mapInstances(result.data);
    } catch (err) {
      console.log(err);
    }
  }

  store.$subscribe((mutation, state) => {
    if (mutation.type === 'patch object' && store.selectedDefId !== '') {
      showDiagram.value = true;

      getActivityInstance().then(data => {
        activities.values = data;
      });
    }
  });
</script>