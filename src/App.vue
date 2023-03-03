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
  import TopBar from "@/components/TopBar.vue";
  import LeftBarNavigation from "@/components/LeftBarNavigation.vue";
  import { RouterView } from "vue-router";
</script>

<style scoped>
  @font-face {
    font-family: "Roboto";
    src: local("Roboto"),
    url(./fonts/Roboto-Regular.ttf) format("truetype");
  }
</style>
