<template>
  <h2 class="text-l sm:text-xl font-semibold text-gray-900">{{ store.selectedName }}</h2>

  <div class="flex flex-wrap" v-show="isFilled">
    <div class="mr-4">Version: {{ store.selectedVersion }}</div>
    <div>Laufende Instanzen: {{ store.instanceCount }}</div>
  </div>
  <div class="w-full mt-6">
    <Suspense>
      <BpmnViewer/>
      <template #fallback>
        <p>Loading ...</p>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
  import BpmnViewer from "./BpmnViewer.vue";
  import { onMounted } from 'vue'
  import { useDefinitionStore } from '@/stores/DefinitionStore';

  const store = useDefinitionStore();
  let isFilled = false;

  // reset store when component is shown
  onMounted(() => {
    store.$reset();
  });

  store.$subscribe((mutation, state) => {
    if (mutation.type === 'patch object') {
      if (store.selectedDefId !== '') {
        isFilled = true;
      }
    }
  });
</script>