<template>
  <main>
      <Suspense>
        <ProcessDefinition/>
        <template #fallback>
          <p>Loading ...</p>
        </template>
      </Suspense>

  </main>
</template>

<script setup>
  import ProcessDefinition from "../components/ProcessDefinition.vue";
</script>
