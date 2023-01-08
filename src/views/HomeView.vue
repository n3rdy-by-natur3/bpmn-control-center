<template>
  <main class="container text-black">
    <h1 class="text-4xl text-orange-500 mt-2">BPMN Control Center</h1>

    <div class="flex flex-wrap">
      <Suspense>
        <ProcessDefinitionList/>
        <template #fallback>
          <p>Loading ...</p>
        </template>
      </Suspense>
      <Suspense>
        <ProcessDefinition/>
        <template #fallback>
          <p>Loading ...</p>
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
  import ProcessDefinitionList from "../components/ProcessDefinitionList.vue";
  import ProcessDefinition from "../components/ProcessDefinition.vue";
</script>
