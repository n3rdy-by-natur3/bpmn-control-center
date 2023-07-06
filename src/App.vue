<template>
  <component :is="layout" />
</template>

<script>
  import PlainPageLayout from "./layouts/PlainPageLayout.vue";
  import DashboardLayout from "./layouts/DashboardLayout.vue";
  import { useAuthStore } from '@/stores/AuthStore';

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
          const authStore = useAuthStore();

          if (to.meta.layout === 'authOrNotAuth') {
            if (authStore.isLoggedIn()) {
              this.layout = "DashboardLayout";
            } else {
              this.layout = "PlainPageLayout";
            }
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
