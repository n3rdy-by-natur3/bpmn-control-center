<template>
  <div class="min-h-full">
    <LeftBarNavigation/>

    <div class="flex flex-1 flex-col lg:pl-64">
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