<template>
  <!-- Name des eingeloggten Benutzers, Logout Button -->
  <div class="flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:border-none">
    <!-- open sidebar -->
    <button type="button" class="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden">
      <span class="sr-only">Open sidebar</span>
      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
      </svg>
    </button>

    <div class="flex flex-1 justify-end px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
      <div class="ml-4 flex items-center md:ml-6">
        <div class="relative mr-3">
          <div>
            <span class="ml-3 hidden text-sm font-medium text-gray-500 lg:block">Toni Tester</span>
          </div>
        </div>

        <button type="button" class="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500">
          <span class="sr-only">Logout</span>
          <ArrowRightOnRectangleIcon class="h-6 w-6"/>
        </button>
      </div>
    </div>
  </div>
  <!--
  <nav class="bg-white border-b border-gray-200 fixed z-30 w-full">
    <div class="px-3 py-2 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <RouterLink :to="{name: 'home'}">
            <div class="text-xl font-bold flex items-center lg:ml-2.5">
              <span class="self-center whitespace-nowrap text-orange-500">BPMN Control Center</span>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
  -->
</template>

<script setup>
  import { ArrowRightOnRectangleIcon } from '@heroicons/vue/24/solid';
</script>