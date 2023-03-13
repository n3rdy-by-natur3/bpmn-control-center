<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flow-root">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
            <tr>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Incident ID</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Activity ID</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Incident Type</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Incident Message</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Configuration</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Incident Time</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
            <tr v-for="instance in instances.values" :key="instance.id" @click="goToInstanceView(instance.id)">
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">{{ instance.id }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ instance.activityId }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ instance.incidentType }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ instance.incidentMessage }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ instance.configuration }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ useFormatDate(instance.incidentTimestamp) }}</td>
            </tr>

            <!-- More people... -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import axios from "axios";
  import { useFormatDate } from '@/composables/date'
  import { useApplicationStore } from '@/stores/ApplicationStore';

  const props = defineProps({
    instanceId: {
      type: String,
      required: true
    }
  });

  const appStore = useApplicationStore();

  const getIncidents = async () => {
    try {
      const result = await axios.get(`${appStore.domain}/incident/?processInstanceId=${props.instanceId}`);
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }

  const incidents = await getIncidents();
</script>