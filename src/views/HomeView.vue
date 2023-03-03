<template>
  <PageTitle title="Home"/>
</template>

<script setup>
  import { useDefinitionStore } from '@/stores/DefinitionStore';
  import PageTitle from "../components/shared/PageTitle.vue";

  const store = useDefinitionStore();
  store.$reset();
</script>
