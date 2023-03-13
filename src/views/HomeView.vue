<template>
  <PageTitle title="Dashboard"/>
  <Warn/>
</template>

<script setup>
  import { useDefinitionStore } from '@/stores/DefinitionStore';
  import PageTitle from "../components/shared/PageTitle.vue";
  import Warn from "../components/shared/Warn.vue";

  const store = useDefinitionStore();
  store.$reset();
</script>
