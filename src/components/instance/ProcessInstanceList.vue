<template>
  <table class="min-w-full divide-y divide-gray-200" v-show="showData">
    <thead>
      <tr>
        <th class="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900" scope="col">Aktiv</th>
        <th class="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900" scope="col">ID</th>
        <th class="hidden bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900 md:block" scope="col">Business Key</th>
        <th class="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900" scope="col">Startzeit</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200 bg-white">
      <tr  v-for="instance in instances.values" :key="instance.id" @click="goToInstanceView(instance.id)"
           class="bg-white hover:bg-gray-100 cursor-pointer">
        <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
          <ActiveIcon :active="!(instance.ended || instance.suspended)"/>
        </td>
        <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
          {{ instance.id }}
        </td>
        <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
          {{ instance.businessKey }}
        </td>
        <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
          {{ useFormatDate(instance.startTime) }}
        </td>
      </tr>
    </tbody>
  </table>

  <!-- pagination -->
  <Suspense>
    <Pagination v-if="showData" :count="count" :size="size" id="instance_list" @page-changed="pageChanged"/>
    <template #fallback>
      <p>Loading ...</p>
    </template>
  </Suspense>
</template>

<script setup>
  import { useFormatDate } from '@/composables/date'
  import Pagination from "../shared/Pagination.vue";
  import ActiveIcon from "../shared/ActiveIcon.vue";
  import { ref, reactive } from "vue";
  import { useRouter } from "vue-router";
  import { useDefinitionStore } from '@/stores/DefinitionStore';
  import { useApplicationStore } from '@/stores/ApplicationStore';
  import axios from "axios";

  const store = useDefinitionStore();
  const appStore = useApplicationStore();
  const router = useRouter();

  const showData = ref(false);
  const instances = reactive({ values: []});
  const instanceTimes = reactive({ values: new Map()});
  const size = 10;
  const count = ref(0);

  const getInstances = async (index) => {
    try {
      const result = await axios.get(`${appStore.domain}/process-instance?processDefinitionId=${store.selectedDefId}&maxResults=${size}&firstResult=${index}`);
      return result.data;
    } catch(err) {
      console.log(err);
    }
  }

  const getStartTimes = async (instanceIds) => {
    try {
      const result = await axios.get(`${appStore.domain}/history/process-instance?unfinished=true&processInstanceIds=${instanceIds}`);
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