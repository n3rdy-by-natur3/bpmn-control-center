<template>
  <div class="flex h-full">
    <LeftBarNavigation/>

    <div class="flex flex-1 flex-col">
      <TopBar/>

      <main class="flex-1 pb-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
  import TopBar from "@/components/shared/TopBar.vue";
  import LeftBarNavigation from "@/components/shared/LeftBarNavigation.vue";
  import { RouterView } from "vue-router";
</script>