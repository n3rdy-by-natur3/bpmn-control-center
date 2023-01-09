<template>
  <ul class="space-y-2 pb-2">
    <li class="p-2 pb-0">
      <PhotoIcon class="w-5 h-5 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75 inline mb-1"/>
      <span class="ml-2">Prozessdefinitionen</span>
    </li>
    <li v-for="def in data" :key="def.id"
        class="text-base text-gray-900 font-normal rounded-lg flex items-center
        p-2 hover:bg-gray-100 group cursor-pointer"
        :class="{ 'bg-gray-300': isSelected(def.id) }"
        @click="showDiagram(def)">
      <i style="width: 24px;">&nbsp;</i>
      <span class="ml-1">{{ def.name }}</span>
    </li>
  </ul>
</template>

<script setup>
  import axios from "axios";
  import { useDefinitionStore } from '@/stores/DefinitionStore';

  import { PhotoIcon } from '@heroicons/vue/24/solid'

  const store = useDefinitionStore();

  const getProcessDefinitions = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/engine-rest/process-definition?latestVersion=true`);
      const definition = result.data[0];
      store.$patch({
        selectedDefId: definition.id,
        selectedVersion: definition.version,
        selectedName: definition.name
      });

      return result.data;
    } catch (err) {
      console.log(err);
    }
  };

  const showDiagram = (definition) => {
    store.$patch({
      selectedDefId: definition.id,
      selectedVersion: definition.version,
      selectedName: definition.name
    });
  };

  const isSelected  = (defId) => {
    return defId === store.selectedDefId;
  }

  const data = await getProcessDefinitions();
</script>