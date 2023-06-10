<template>
  <PageTitle title="Prozesse"/>

  <div class="mt-8">
    <div class="mx-auto px-4">
      <div class="flex flex-col">
        <div class="min-w-full min-h-96 overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg bg-white p-5">
          <Suspense>
            <ProcessDefinitionList/>
            <template #fallback>
              <p>Loading ...</p>
            </template>
          </Suspense>

          <div class="flex-grow mt-4">
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
    </div>
  </div>
</template>

<script setup>
  import ProcessDefinitionList from "../components/ProcessDefinitionList.vue";
  import ProcessInstanceList from "../components/instance/ProcessInstanceList.vue";
  import InstanceDiagram from "../components/instance/InstanceDiagram.vue";
  import PageTitle from "../components/shared/PageTitle.vue";
  import { onMounted } from "vue";
  import { useDefinitionStore } from '@/stores/DefinitionStore';

  const store = useDefinitionStore();

  // reset store when component is shown
  onMounted(() => {
    store.$reset();
  });
</script>