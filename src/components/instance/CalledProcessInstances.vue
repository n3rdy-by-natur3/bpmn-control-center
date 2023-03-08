<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flow-root">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
            <tr>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Aufgerufener Prozess</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Prozessdefinition</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Aktivität</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
            <tr v-for="activity in activities" :key="activity.activityId">
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">{{ activity.processInstanceId }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ activity.activityName }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ activity.activityId }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  /* data is loaded by ActivityInstance component, so we avoid to call the API twice */
  import { useInstanceStore } from '@/stores/InstanceStore';

  const store = useInstanceStore();
  const activities = store.called_instances;
</script>