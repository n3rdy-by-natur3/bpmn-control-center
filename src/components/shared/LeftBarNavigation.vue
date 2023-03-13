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
            <svg class="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Dashboard
          </router-link>

          <router-link :to="{name: 'instances'}" class="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md">
            <RectangleStackIcon class="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200"/>
            Prozesse
          </router-link>

          <router-link :to="{name: 'definition'}" class="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200">
              <path fill-rule="evenodd" d="m6.916 5.084a6.9161 6.9161 0 0 0-6.916 6.916 6.9161 6.9161 0 0 0 6.916 6.916 6.9161 6.9161 0 0 0 6.8613-6.1367h4.6113v2.4609l5.6113-3.2402-5.6113-3.2402v2.4609h-4.6113a6.9161 6.9161 0 0 0-6.8613-6.1367zm0 1.5879a5.3272 5.3272 0 0 1 5.3281 5.3281 5.3272 5.3272 0 0 1-5.3281 5.3281 5.3272 5.3272 0 0 1-5.3281-5.3281 5.3272 5.3272 0 0 1 5.3281-5.3281z" clip-rule="evenodd"/>
            </svg>
            Prozessdefinitionen
          </router-link>
        </div>
        <!--
        <div class="mt-6 pt-6">
          <div class="space-y-1 px-2">
            <a href="#" class="group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 text-cyan-100 hover:bg-cyan-600 hover:text-white">
              <svg class="mr-4 h-6 w-6 text-cyan-200" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
              </svg>
              Settings
            </a>

            <a href="#" class="group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 text-cyan-100 hover:bg-cyan-600 hover:text-white">
              <svg class="mr-4 h-6 w-6 text-cyan-200" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
              Help
            </a>

            <a href="#" class="group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 text-cyan-100 hover:bg-cyan-600 hover:text-white">
              <svg class="mr-4 h-6 w-6 text-cyan-200" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Privacy
            </a>
          </div>
        </div> -->
      </nav>
    </div>
  </nav>
</template>

<script setup>
  import { RouterLink } from "vue-router";
  import { RectangleStackIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/solid'
</script>