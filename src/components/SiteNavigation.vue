<template>
  <nav class="bg-white border-b border-gray-200 fixed z-30 w-full">
    <div class="px-3 py-2 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <RouterLink :to="{name: 'home'}">
            <div class="text-xl font-bold flex items-center lg:ml-2.5">
              <!-- <img src="/logo.svg" class="h-8 mr-2" alt="n3rdy by natur3 Logo"> -->
              <span class="self-center whitespace-nowrap text-orange-500">BPMN Control Center</span>
            </div>
          </RouterLink>
          <!-- <h1 class="text-4xl text-orange-500 mt-2">BPMN Control Center</h1> -->
        </div>
      </div>
      <!--<div class="flex items-center">
        top right navigation
      </div> -->
    </div>
  </nav>
</template>

<script setup>
  import { RouterLink } from "vue-router";
</script>