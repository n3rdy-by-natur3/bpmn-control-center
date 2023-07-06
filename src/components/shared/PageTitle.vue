<template>
  <div class="bg-white shadow">
    <div class="px-4 lg:mx-auto">
      <div class="py-3 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
        <div class="min-w-0 flex-1">
          <!-- Profile -->
          <div class="flex items-center">
            <h1 class="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">{{ title }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    title: {
      type: String,
      required: true
    }
  });
</script>