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
            <tr v-for="incident in incidents.values" :key="incident.id" @click="goToInstanceView(incident.id)">
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">{{ incident.id }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ incident.activityId }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ incident.incidentType }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ incident.incidentMessage }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ incident.configuration }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ useFormatDate(incident.incidentTimestamp) }}</td>
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
  import { useFormatDate } from '@/composables/date'
  import { useAuthStore } from '@/stores/AuthStore';

  const props = defineProps({
    instanceId: {
      type: String,
      required: true
    }
  });

  const authStore = useAuthStore();

  const getIncidents = async () => {
    try {
      const result = await authStore.getAxios()
          .get(`/incident/?processInstanceId=${props.instanceId}`)
          .catch(function (error) {
            // we don't care for 401 here because it's already checked by the count call at ProcessInstanceView
            console.log("error: " + error);
          });
      return result? result.data : [];
    } catch (err) {
      console.log(err);
    }
  }

  const incidents = await getIncidents();
</script>