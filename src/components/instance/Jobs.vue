<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flow-root">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
            <tr>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">ID</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Job Definiton ID</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Erstellt</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Ablaufdatum</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Wiederholungen</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Fehlermeldung</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Aktiv</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Priorität</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
            <tr  v-for="job in jobs.values" :key="job.id">
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">{{ job.id }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ job.jobDefinitionId }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ useFormatDate(job.createTime) }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ useFormatDate(job.dueDate) }}</td>
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">{{ job.retries }}</td>
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">{{ job.exceptionMessage }}</td>
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                <ActiveIcon :active="!job.suspended"/>
              </td>
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">{{ job.priority }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive } from "vue";
  import { useFormatDate } from '@/composables/date'
  import ActiveIcon from "../shared/ActiveIcon.vue";
  import { useAuthStore } from '@/stores/AuthStore';

  const props = defineProps({
    instanceId: {
      type: String,
      required: true
    }
  });

  const authStore = useAuthStore();
  const jobs = reactive({ values: []});

  const getJobs = async () => {
    try {
      const result = await authStore.getAxios()
          .get(`/job?processInstanceId=${props.instanceId}`)
          .catch(function (error) {
            // we don't care for 401 here because it's already checked by the count call at ProcessInstanceView
            console.log("error: " + error);
          }
      );

      return result? result.data : [];
    } catch (err) {
      console.log(err);
    }
  }

  jobs.values = await getJobs();
</script>