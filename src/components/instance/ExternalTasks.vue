<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flow-root">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
            <tr>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Aktivitäts ID</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Ablaufdatum</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Priorität</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Task ID</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Aktiv</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Wiederholungen</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Fehlermeldung</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Topic</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
            <tr v-for="task in tasks" :key="task.id" @click="goToInstanceView(task.id)">
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">{{ task.activityId }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ useFormatDate(task.lockExpirationTime) }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ task.priority }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ task.id }}</td>
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                <ActiveIcon :active="!task.suspended"/>
              </td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ task.retries }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ task.errorMessage }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ task.topicName }}</td>
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
  import ActiveIcon from "../shared/ActiveIcon.vue";
  import { useFormatDate } from '../../composables/date.js'

  const props = defineProps({
    instanceId: {
      type: String,
      required: true
    }
  });

  const getTasks = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/engine-rest/external-task?processInstanceId=${props.instanceId}`);
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }

  const tasks = await getTasks();
</script>