<template>
  <div class="border-l-4 p-4" :class="['bg-' + types[props.textType] + '-50', 'border-' + types[props.textType] + '-400']">
    <div class="flex">
      <div class="flex-shrink-0">
        <ExclamationTriangleIcon v-if="props.textType === 'warn'" class="h-5 w-5 text-yellow-400"/>
        <XCircleIcon v-else-if="props.textType === 'error'" class="h-5 w-5 text-red-400"/>
        <CheckCircleIcon v-else-if="props.textType === 'success'" class="h-5 w-5 text-green-400"/>
        <InformationCircleIcon v-else class="h-5 w-5 text-blue-400"/>
      </div>
      <div class="ml-3">
        <p class="text-sm" :class="['text-' + types[props.textType] + '-700']">
          {{ text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ExclamationTriangleIcon, XCircleIcon, CheckCircleIcon, InformationCircleIcon } from '@heroicons/vue/24/solid'

  const types = { info: 'blue', warn: 'yellow', error: 'red', success: 'green' };
  const test = 'red';
  const props = defineProps({
    text: { // text to show
      type: String,
      required: true
    },
    textType: { // info, warn, error, success
      type: String,
      required: true,
      default: 'info'
    },
    show: { // special component ID
      type: Boolean,
      default: false
    }
  });
</script>