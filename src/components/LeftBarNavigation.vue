<template>
  <aside id="sidebar" class="fixed hidden z-20 h-full top-0 left-0 pt-12 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75" aria-label="Sidebar">
    <div class="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
      <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div class="flex-1 px-3 bg-white divide-y space-y-1">
          <ul class="pb-2">
            <li class="p-2 pb-0">
              <RouterLink :to="{name: 'instances'}">
                <div class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2">
                  <RectangleStackIcon class="w-5 h-5 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75 inline"/>
                  <span class="ml-2">Prozesse</span>
                </div>
              </RouterLink>
            </li>

            <li class="p-2 pb-0">
              <RouterLink :to="{name: 'definition'}">
                <div class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2">
                  <ArrowRightOnRectangleIcon class="w-5 h-5 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75 inline mb-1"/>
                  <span class="ml-2">Prozessdefinitionen</span>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
  import { RouterLink } from "vue-router";
  import { RectangleStackIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/solid'
</script>