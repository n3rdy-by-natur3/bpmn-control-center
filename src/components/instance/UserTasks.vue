<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flow-root">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
            <tr>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Activity</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Assignee</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Owner</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Creation Date</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Due Date</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Follow Up Date</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Priority</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Delegatrion State</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Task ID</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
            <tr v-for="task in tasks" :key="task.id" @click="goToInstanceView(instance.id)">
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">{{ task.name }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500"> {{ task.assignee }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ task.owner }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ useFormatDate(task.created) }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ useFormatDate(task.due) }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ useFormatDate(task.followUp) }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ task.priority }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ task.delegationState }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ task.id }}</td>
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
  import { useFormatDate } from '../../composables/date.js'

  const props = defineProps({
    instanceId: {
      type: String,
      required: true
    }
  });

  const getTasks = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/engine-rest/task?processInstanceId=${props.instanceId}`);
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }

  const tasks = await getTasks();
</script>