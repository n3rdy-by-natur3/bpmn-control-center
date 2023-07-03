<template>
  <!-- Static sidebar for desktop -->
  <nav class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col" id="nav-left">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="flex flex-grow flex-col overflow-y-auto bg-cyan-700 pt-5 pb-4">
      <div class="flex flex-shrink-0 items-center px-4">
        <!--
        <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=300" alt="Easywire logo">
        -->
        <span class="text-cyan-200">BPMN Control Center</span>
      </div>
      <nav class="mt-5 flex flex-1 flex-col divide-y divide-cyan-800 overflow-y-auto" aria-label="Sidebar">
        <div class="space-y-1 px-2">
          <!-- Current: "bg-cyan-800 text-white", Default: "text-cyan-100 hover:text-white hover:bg-cyan-600" -->
          <router-link :to="{name: 'home'}" class="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md" aria-current="page">
            <HomeIcon class="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200"/>
            Dashboard
          </router-link>

          <router-link :to="{name: 'instances'}" class="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md">
            <RectangleStackIcon class="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200"/>
            Prozesse
          </router-link>

          <router-link :to="{name: 'definition'}" class="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md">
            <!-- icon is an own creation -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200">
              <path fill-rule="evenodd" d="m6.916 5.084a6.9161 6.9161 0 0 0-6.916 6.916 6.9161 6.9161 0 0 0 6.916 6.916 6.9161 6.9161 0 0 0 6.8613-6.1367h4.6113v2.4609l5.6113-3.2402-5.6113-3.2402v2.4609h-4.6113a6.9161 6.9161 0 0 0-6.8613-6.1367zm0 1.5879a5.3272 5.3272 0 0 1 5.3281 5.3281 5.3272 5.3272 0 0 1-5.3281 5.3281 5.3272 5.3272 0 0 1-5.3281-5.3281 5.3272 5.3272 0 0 1 5.3281-5.3281z" clip-rule="evenodd"/>
            </svg>
            Prozessdefinitionen
          </router-link>
        </div>
      </nav>
    </div>
  </nav>
</template>

<script setup>
  import { RouterLink } from "vue-router";
  import { RectangleStackIcon, HomeIcon } from '@heroicons/vue/24/solid'
</script>