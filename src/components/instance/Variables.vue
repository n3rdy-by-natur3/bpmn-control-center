<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flow-root">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
            <tr>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Name</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Type</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Value</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
            <tr  v-for="variable in variables.values" :key="variable[0]">
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">{{ variable[0] }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ variable[1]['type'] }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ formatValue(variable[1]['value'], variable[1]['type'], variable[1]['valueInfo']) }}</td>
            </tr>
            </tbody>
          </table>

          <!-- pagination -->
          <Suspense>
            <Pagination :size="size" :count="count" id="variables_list" @page-changed="pageChanged"/>
            <template #fallback>
              <p>Loading ...</p>
            </template>
          </Suspense>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import Pagination from "../shared/Pagination.vue";
  import axios from "axios";
  import { formatValue } from '@/composables/process.js'
  import { ref, reactive } from "vue";
  import { useInstanceStore } from '@/stores/InstanceStore';
  import { useApplicationStore } from '@/stores/ApplicationStore';

  const count = ref(0);
  const variables = reactive({ values: []});

  const props = defineProps({
    instanceId: {
      type: String,
      required: true
    }
  });
  const store = useInstanceStore();
  const appStore = useApplicationStore();
  const size = 10;

  const pageChanged = (id, index) => {
    console.log('VARIABLES event ID: ' + id);
    if (id === 'variables_list') {
      variables.values = store.getVariableSublist(index, size);
    }
  }

  const getVariables = async () => {
    try {
      const result = await axios.get(`${appStore.domain}/process-instance/${props.instanceId}/variables`);
      store.saveVariables(result.data);
      count.value = store.variables.length;

      return count.value > size ? store.getVariableSublist(0, size) : store.variables;
    } catch (err) {
      console.log(err);
    }
  }

  variables.values = await getVariables();
</script>