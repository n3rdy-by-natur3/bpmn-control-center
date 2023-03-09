<template>
  <CheckCircleIcon v-show="props.active"
                   class="w-5 h-5 ml-1 text-green-700 flex-shrink-0 inline"/>
  <XCircleIcon v-show="!props.active"
                   class="w-5 h-5 ml-1 text-red-700 flex-shrink-0 inline"/>
</template>

<script setup>
  import { CheckCircleIcon } from '@heroicons/vue/24/solid';
  import { XCircleIcon } from '@heroicons/vue/24/solid';

  const props = defineProps({
    active: {
      type: Boolean,
      required: true
    }
  });

  console.log("active: " + props.active);
</script>