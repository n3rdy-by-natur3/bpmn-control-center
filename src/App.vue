<template>
  <SiteNavigation/>

  <div class="flex overflow-hidden bg-white pt-16">
    <LeftBarNavigation/>

    <div class="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>

    <div id="main-content" class="w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
  import SiteNavigation from "@/components/SiteNavigation.vue";
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
