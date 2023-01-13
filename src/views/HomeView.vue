<template>
  <main>
    <div class="px-4 bg-white block sm:flex items-center justify-between border-b border-gray-200">
      <div class="mb-1 w-full">
        <div class="mb-4">
          <h1 class="text-xl sm:text-2xl font-semibold text-gray-900">Home</h1>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
  import { useDefinitionStore } from '@/stores/DefinitionStore';

  const store = useDefinitionStore();
  store.$reset();
</script>
