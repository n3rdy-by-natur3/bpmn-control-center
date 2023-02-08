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
                Incident ID
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Activity ID
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Incident Type
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Incident Message
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Configuration
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Incident Time
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="instance in instances.values" :key="instance.id" @click="goToInstanceView(instance.id)"
                class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
              <td class="text-sm text-gray-900 font-light pr-6 pl-8 py-4 whitespace-nowrap">

              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-bpmn-p-hover">

              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">

              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">

              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">

              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">

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

  const props = defineProps({
    instanceId: {
      type: String,
      required: true
    }
  });

  const getIncidents = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/engine-rest/incident/?processInstanceId=${props.instanceId}`);
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }

  const incidents = await getIncidents();
</script>