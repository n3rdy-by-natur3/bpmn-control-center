<template>
  <component :is="layout" />
</template>

<script>
  import PlainPageLayout from "./layouts/PlainPageLayout.vue";
  import DashboardLayout from "./layouts/DashboardLayout.vue";

  export default {
    components: {
      PlainPageLayout,
      DashboardLayout,
    },
    data() {
      return {
        layout: null
      };
    },
    watch: {
      $route(to) {
        // set layout by route meta
        if (to.meta.layout !== undefined) {
          if (to.meta.layout === 'authOrNotAuth') {
            this.layout = "DashboardLayout"; // TODO have a look for user logged in
          } else {
            this.layout = to.meta.layout;
          }
        } else {
          this.layout = "DashboardLayout"; // this is default layout if route meta is not set
        }
      }
    }
  };
</script>

<style scoped>
  @font-face {
    font-family: "Roboto";
    src: local("Roboto"),
    url(./fonts/Roboto-Regular.ttf) format("truetype");
  }
</style>
