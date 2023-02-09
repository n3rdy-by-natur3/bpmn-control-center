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
              <tr v-for="variable in variables.values" :key="variable[0]"
                  class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td class="text-sm text-gray-900 font-light pr-6 pl-8 py-4 whitespace-nowrap">
                  {{ variable[0] }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ variable[1]['type'] }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ formatValue(variable[1]['value'], variable[1]['type'], variable[1]['valueInfo']) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- pagination -->
  <Suspense>
    <Pagination :size="size" :count="count" id="variables_list" @page-changed="pageChanged"/>
    <template #fallback>
      <p>Loading ...</p>
    </template>
  </Suspense>
</template>

<script setup>
  import Pagination from "../shared/Pagination.vue";
  import axios from "axios";
  import { formatValue } from '@/composables/process.js'
  import { ref, reactive } from "vue";
  import { useInstanceStore } from '@/stores/InstanceStore';

  const count = ref(0);
  const variables = reactive({ values: []});

  const props = defineProps({
    instanceId: {
      type: String,
      required: true
    }
  });
  const store = useInstanceStore();
  const size = 10;

  const pageChanged = (id, index) => {
    console.log('VARIABLES event ID: ' + id);
    if (id === 'variables_list') {
      variables.values = store.getVariableSublist(index, size);
    }
  }

  const getVariables = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/engine-rest/process-instance/${props.instanceId}/variables`);
      store.saveVariables(result.data);
      count.value = store.variables.length;

      return count.value > size ? store.getVariableSublist(0, size) : store.variables;
    } catch (err) {
      console.log(err);
    }
  }

  variables.values = await getVariables();
</script>