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
  import { reactive, ref } from "vue";
  import { mapInstances } from "@/composables/process";
  import { useDefinitionStore } from '@/stores/DefinitionStore';
  import { useAuthStore } from '@/stores/AuthStore';

  const store = useDefinitionStore();
  const authStore = useAuthStore();
  const activities = reactive({ values: {}});

  const showDiagram = ref(false);

  const getActivityInstance = async () => {
    try {
      const result = await authStore.getAxios()
          .get(`/history/activity-instance?processDefinitionId=${store.selectedDefId}&unfinished=true`)
          .catch(function (error) {
            // TODO needs the user to know this problem?
            if (error.response && error.response.status === 401) {
              console.log('Missing authorization for activity instances from history'); // TODO
            } else {
              console.log('error for activity instances from history'); // TODO
            }
          });
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