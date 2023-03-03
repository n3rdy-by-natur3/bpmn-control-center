<template>
  <div class="relative inline-block text-left">
    <div>
      <button @click="toggle" type="button" class="inline-flex w-full justify-center rounded-md bg-cyan-700
      px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-600 focus:bg-cyan-800" id="menu-button" aria-expanded="true" aria-haspopup="true">
        {{ defText }}
        <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5"/>
      </button>
    </div>

    <transition
        enter-active-class="transition ease-out duration-100" enter-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75" leave-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95"
    >
      <div v-if="isOpen" class="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
        <div class="py-1" role="none">
          <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
          <a v-for="def in data" :key="def.id" @click="showData(def)" href="#" class="text-gray-700 hover:bg-gray-100 block px-4 py-2 text-sm"
             role="menuitem" tabindex="-1">
            {{ def.name }}
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import axios from "axios";
  import { useDefinitionStore } from '@/stores/DefinitionStore';
  import { ChevronDownIcon } from '@heroicons/vue/24/solid';

  const store = useDefinitionStore();
  const defaultDefText = 'Auswahl Definition';
  const defText = ref(defaultDefText);

  const isOpen = ref(false);

  const toggle = () => {
    isOpen.value = !isOpen.value;
  }

  const getProcessDefinitions = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/engine-rest/process-definition?latestVersion=true`);

      return result.data;
    } catch (err) {
      console.log(err);
    }
  };

  const showData = (definition) => {
    defText.value = definition.name;

    store.$patch({
      selectedDefId: definition.id,
      selectedVersion: definition.version,
      selectedName: definition.name
    });
    store.getInstanceCount();
    isOpen.value = false;
  };

  const data = await getProcessDefinitions();
</script>