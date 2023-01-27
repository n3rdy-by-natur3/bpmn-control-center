<template>
  <main>
    <div class="px-4 bg-white block sm:flex items-center justify-between border-b border-gray-200">
      <div class="w-full">
        <div class="mb-4">
          <h1 class="text-xl sm:text-2xl font-semibold text-gray-900">Prozesse</h1>
        </div>
      </div>
    </div>

    <div class="flex flex-col">
      <div class="m-4 h-screen flex flex-wrap scrollbar-hide">
        <div class="mr-4">
          <Suspense>
            <ProcessDefinitionList/>
            <template #fallback>
              <p>Loading ...</p>
            </template>
          </Suspense>
        </div>

        <div class="flex-grow">
          <Suspense>
            <ProcessInstanceList/>
            <template #fallback>
              <p>Loading ...</p>
            </template>
          </Suspense>

          <Suspense>
            <InstanceDiagram/>
            <template #fallback>
              <p>Loading ...</p>
            </template>
          </Suspense>
        </div>
      </div>
    </div>


  </main>
</template>

<script setup>
  import ProcessDefinitionList from "../components/ProcessDefinitionList.vue";
  import ProcessInstanceList from "../components/instance/ProcessInstanceList.vue";
  import InstanceDiagram from "../components/instance/InstanceDiagram.vue";
  import { onMounted } from "vue";
  import { useDefinitionStore } from '@/stores/DefinitionStore';

  const store = useDefinitionStore();

  // reset store when component is shown
  onMounted(() => {
    store.$reset();
  });
</script>