<template>
  <div class="flex flex-1" v-if="showDropdown">
    <div class="py-4 relative inline-block text-left">
      <div>
        <button @click="toggle" type="button" class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white
                px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                id="menu-button" aria-expanded="true" aria-haspopup="true">
          Camunda engines
          <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400"/>
        </button>
      </div>

      <transition
          enter-active-class="transition ease-out duration-100" enter-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75" leave-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95"
      >
        <div v-if="isOpen" class="absolute left-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
          <div class="py-1" role="none">
            <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
            <a v-for="host in hosts" :key="host" @click="select(host)" href="#"
               class="text-gray-700 hover:bg-gray-100 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">
              {{ host }}
            </a>
          </div>
        </div>
      </transition>
    </div>

    <!--
    <div class="py-4 relative inline-block text-left">
      <div class="px-3 py-2 text-sm font-semibold">{{ store.domain }}</div>
    </div>
    -->
  </div>
</template>

<script setup>
  import {ref} from "vue";
  import { useApplicationStore } from '@/stores/ApplicationStore';
  import { ChevronDownIcon } from '@heroicons/vue/24/solid';
  import appConfig from "../../../app.config.json";

  const store = useApplicationStore();
  const hosts = appConfig.hosts;
  const isOpen = ref(false);
  const showDropdown = hosts && hosts.length > 1;

  const toggle = () => {
    isOpen.value = !isOpen.value;
  }

  const select = (host) => {
    store.domain = host;
    toggle();
  }
</script>