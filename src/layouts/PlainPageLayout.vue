<template>
  <main class="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
    <div class="text-center">
      <RouterView />
    </div>
  </main>
</template>

<script setup>
  import { RouterView } from "vue-router";
</script>