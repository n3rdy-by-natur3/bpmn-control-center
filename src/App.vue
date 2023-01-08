<template>
  <SiteNavigation/>

  <div class="flex flex-col min-h-screen font-Roboto bg-bpmn-light">
    <RouterView />
  </div>
</template>

<script setup>
  import SiteNavigation from "@/components/SiteNavigation.vue";
  import { RouterView } from "vue-router";
</script>

<style scoped>
  @font-face {
    font-family: "Roboto";
    src: local("Roboto"),
    url(./fonts/Roboto-Regular.ttf) format("truetype");
  }
</style>
