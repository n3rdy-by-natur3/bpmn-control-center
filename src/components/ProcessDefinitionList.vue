<template>
  <div class="w-64 py-12">
    <h2 class="mb-4 text-2xl text-bpmn-dark">Prozessdefinitionen</h2>

    <ul class="text-white bg-bpmn-secondary w-40">
      <li v-for="def in data" :key="def.id"
          class="p-2 cursor-pointer text-center hover:bg-bpmn-primary"
          :class="{ 'bg-cyan-600': isSelected(def.id) }"
          @click="showDiagram(def)">
        {{ def.name }} <span class="text-sm">(v {{ def.version }})</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import axios from "axios";
  import { useDefinitionStore } from '@/stores/DefinitionStore'

  const store = useDefinitionStore();

  const getProcessDefinitions = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/engine-rest/process-definition?latestVersion=true`);
      store.$patch({ selectedDefId: result.data[0].id });

      return result.data;
    } catch (err) {
      console.log(err);
    }
  };

  const showDiagram = (definition) => {
    store.$patch({ selectedDefId: definition.id });
  };

  const isSelected  = (defId) => {
    return defId === store.selectedDefId;
  }

  const data = await getProcessDefinitions();
</script>