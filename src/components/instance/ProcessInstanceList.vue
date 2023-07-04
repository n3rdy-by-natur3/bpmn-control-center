<template>
  <Hint v-if="!available" :text="err_text" :text-type="err_type"/>

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
  import Pagination from "../shared/Pagination.vue";
  import ActiveIcon from "../shared/ActiveIcon.vue";
  import Hint from "../shared/Hint.vue";
  import { useFormatDate } from '@/composables/date'
  import { ref, reactive } from "vue";
  import { useRouter } from "vue-router";
  import { useDefinitionStore } from '@/stores/DefinitionStore';
  import { useAuthStore } from '@/stores/AuthStore';

  const store = useDefinitionStore();
  const authStore = useAuthStore();
  const router = useRouter();

  const showData = ref(false);
  const instances = reactive({ values: []});
  const instanceTimes = reactive({ values: new Map()});
  const size = 10;
  const count = ref(0);

  const err_text = ref('');
  const err_type = ref('warn');
  const available = ref(true);

  const getInstances = async (index) => {
    const result = await authStore.getAxios()
        .get(`/process-instance?processDefinitionId=${store.selectedDefId}&maxResults=${size}&firstResult=${index}`)
        .catch(function (error) {
          showData.value = false;
          if (error.response && error.response.status === 401) {
            available.value = false;
            err_text.value = 'Es besteht keine Berechtigung, die Liste der Instanzen zu sehen.';
            err_type.value='warn';
          } else {
            available.value = false;
            err_text.value = 'Die Liste der Instanzen kann nicht geladen werden.';
            err_type.value='error';
          }
        });
    return result? result.data : undefined;
  }

  const getStartTimes = async (instanceIds) => {
    try {
      const result = await authStore.getAxios()
          .get(`/history/process-instance?unfinished=true&processInstanceIds=${instanceIds}`)
          .catch(function (error) {
            if (error.response && error.response.status === 401) {
              available.value = false;
              err_text.value = 'Es besteht keine Berechtigung, die Startzeiten anzuzeigen.';
              err_type.value='warn';
            } else {
              available.value = false;
              err_text.value = 'Die Startzeiten konnten nicht geladen werden.';
              err_type.value='warn';
            }
          });
      return result? result.data : undefined;
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
      if (list) {
        // get all start times from list and map it to the instance ID
        instanceTimes.values = new Map(list.map(instance => [instance.id, instance.startTime]));

        enhanceInstances(instances.values, instanceTimes.values);
      }
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
        if (result) {
          instances.values = result;
          computeStartTimes();
        }
      });
    }

    if (mutation.type === 'direct') {
      count.value = store.instanceCount;
    }
  });
</script>