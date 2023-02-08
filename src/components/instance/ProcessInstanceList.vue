<template>
  <!-- table with instance data -->
  <div class="flex flex-col" v-show="showData">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden shadow-sm">
          <table class="min-w-full">
            <thead class="bg-white border-b">
            <tr>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Aktiv
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                ID
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Business Key
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Startzeit
              </th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="instance in instances.values" :key="instance.id" @click="goToInstanceView(instance.id)"
                  class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                <td class="text-sm text-gray-900 font-light pr-6 pl-8 py-4 whitespace-nowrap">
                  <CheckCircleIcon v-show="!(instance.ended || instance.suspended)"
                      class="w-5 h-5 text-green-700 flex-shrink-0 inline"/>
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-bpmn-p-hover">
                  {{ instance.id }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ instance.businessKey }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ useFormatDate(instance.startTime) }}
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
    <Pagination v-if="showData" :size="size" :count="count" id="instance_list" @page-changed="pageChanged"/>
    <template #fallback>
      <p>Loading ...</p>
    </template>
  </Suspense>
</template>

<script setup>
  import { useFormatDate } from '../../composables/date.js'
  import Pagination from "../shared/Pagination.vue";
  import { ref, reactive } from "vue";
  import { useRouter } from "vue-router";
  import { useDefinitionStore } from '@/stores/DefinitionStore';
  import axios from "axios";
  import { CheckCircleIcon } from '@heroicons/vue/24/solid'

  const store = useDefinitionStore();
  const router = useRouter();

  const showData = ref(false);
  const instances = reactive({ values: []});
  const instanceTimes = reactive({ values: new Map()});
  const size = 2;
  const count = ref(0);

  const getInstances = async (index) => {
    try {
      const result = await axios.get(`http://localhost:8080/engine-rest/process-instance?processDefinitionId=${store.selectedDefId}&maxResults=${size}&firstResult=${index}`);
      return result.data;
    } catch(err) {
      console.log(err);
    }
  }

  const getStartTimes = async (instanceIds) => {
    try {
      const result = await axios.get(`http://localhost:8080/engine-rest/history/process-instance?unfinished=true&processInstanceIds=${instanceIds}`);
      return result.data;
    } catch(err) {
      console.log(err);
    }
  }

  const enhanceInstances = (instances, times) => {
    for (let i of instances) {
      const start = times.get(i.id);
      if (start) {
        i.startTime = start;
      }
    }
  }

  const computeStartTimes = () => {
    const ids = instances.values.map(instance => instance.id).join(','); // collect all instance IDs

    // with instance IDs get history data
    getStartTimes(ids).then(list => {
      // get all start times from list and map it to the instance ID
      instanceTimes.values = new Map(list.map(instance => [instance.id, instance.startTime]));

      enhanceInstances(instances.values, instanceTimes.values);
    });
  }

  // callback for event from pagination component
  const pageChanged = (id, index) => {
    if (id === 'instance_list') {
      getInstances(index).then(result => {
        instances.values = result;
        computeStartTimes();
      });
    }
  }

  const goToInstanceView = (instanceId) => {
    router.push({ name: 'instance', params: { id: instanceId }});
  }

  store.$subscribe((mutation, state) => {
    if (mutation.type === 'patch object' && store.selectedDefId !== '') {
      showData.value = true;

      // at first get all process instances
      getInstances(0).then(result => {
        instances.values = result;
        computeStartTimes();
      });
    }

    if (mutation.type === 'direct') {
      count.value = store.instanceCount;
    }
  });
</script>