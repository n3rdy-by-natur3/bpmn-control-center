<template>
  <div class="block w-full" v-if="showDropdown">
    <div class="relative block text-left">
      <div>
        <button @click="toggle" type="button" :class="{ 'ring-red-700 border-red-700 focus:ring-red-700': props.showError,
                'ring-gray-300': !props.showError }"
                class="w-full inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white
                px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset border-1 hover:bg-gray-50"
                id="menu-button" aria-expanded="true" aria-haspopup="true">
            {{ text }}
          <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400"/>
        </button>

        <p v-show="props.showError" class="mt-2 text-sm text-red-600" id="domain-error">Bitte eine Engine auswählen.</p>
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
  import { ref, watch } from "vue";
  import { useApplicationStore } from '@/stores/ApplicationStore';
  import { ChevronDownIcon } from '@heroicons/vue/24/solid';
  import appConfig from "../../app.config.json";

  const props = defineProps({
    showError: { // number of entries per page
      type: Boolean,
      default: false
    }
  });
  const emit = defineEmits(['hostSelected'])

  const store = useApplicationStore();
  const hosts = appConfig.hosts;
  const isOpen = ref(false);
  const showDropdown = hosts && hosts.length > 1;
  const text = ref('Camunda engines');

  if (hosts && hosts.length === 1) {
    store.domain = hosts[0];
  } else if (showDropdown && store.domain) {
    text.value = store.domain;
  }

  const toggle = () => {
    isOpen.value = !isOpen.value;
  }

  const select = (host) => {
    store.domain = host;
    text.value = host;
    emit('hostSelected');
    toggle();
  }

watch(
    () => props.showError,
    (current, prev) => {
      console.log("error property value: " + current);
    }, { immediate: true }
)
</script>