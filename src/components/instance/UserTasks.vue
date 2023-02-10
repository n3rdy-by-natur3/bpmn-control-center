<template>
  <!-- table with instance data -->
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden shadow-sm">
          <table class="min-w-full">
            <thead class="bg-white border-b">
            <tr>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Activity
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Assignee
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Owner
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Creation Date
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Due Date
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Follow Up Date
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Priority
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Delegatrion State
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Task ID
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="task in tasks" :key="task.id" @click="goToInstanceView(instance.id)"
                class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {{ task.name }}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {{ task.assignee }}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {{ task.owner }}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {{ useFormatDate(task.created) }}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {{ useFormatDate(task.due) }}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {{ useFormatDate(task.followUp) }}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {{ task.priority }}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {{ task.delegationState }}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {{ task.id }}
              </td>
            </tr>
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
      const result = await axios.get(`http://localhost:8080/engine-rest/task/?processInstanceId=${props.instanceId}`);
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }

  const tasks = await getTasks();
</script>