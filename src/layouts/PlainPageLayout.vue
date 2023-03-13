<template>
  <div class="min-h-full">
    <div class="flex flex-1 flex-col lg:pl-64">
      <main class="flex-1 pb-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
  import { RouterView } from "vue-router";
</script>