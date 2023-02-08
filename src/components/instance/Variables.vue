<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden shadow-sm">
          <table class="w-full">
            <thead class="bg-white border-b">
              <tr>
                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Name
                </th>
                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Type
                </th>
                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(value, key) in variables" :key="key"
                  class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td class="text-sm text-gray-900 font-light pr-6 pl-8 py-4 whitespace-nowrap">
                  {{ key }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ value['type'] }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ formatValue(value['value'], value['type'], value['valueInfo']) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import axios from "axios";
  import { formatValue } from '@/composables/process.js'

  const props = defineProps({
    instanceId: {
      type: String,
      required: true
    }
  });

  const getVariables = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/engine-rest/process-instance/${props.instanceId}/variables`);
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }

  const variables = await getVariables();
</script>