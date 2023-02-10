<template>
  <main>
    <div class="px-4 bg-white block sm:flex items-center justify-between border-b border-gray-200">
      <div class="w-full">
        <div class="mb-4">
          <h1 class="text-xl sm:text-2xl font-semibold text-gray-900">Instanz {{ instanceId }}</h1>
        </div>
      </div>
    </div>

    <div class="bg-white">
      <div class="m-4">
        <ul class="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4" id="tabs-tab"
            role="tablist">
          <li class="nav-item" role="presentation">
            <a href="#tabs-diagram" class="nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0
               border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent active"
               id="tabs-diagram-tab" data-bs-toggle="pill" data-bs-target="#tabs-diagram" role="tab" aria-controls="tabs-diagram"
               aria-selected="true">Activity Instanzen</a>
          </li>
          <li class="nav-item" role="presentation">
            <a href="#tabs-variables" class="nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0
               border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent"
               id="tabs-variables-tab" data-bs-toggle="pill" data-bs-target="#tabs-variables" role="tab"
               aria-controls="tabs-variables" aria-selected="false">Variablen</a>
          </li>
          <li class="nav-item" role="presentation" v-show="showIncidents">
            <a href="#tabs-incidents" class="nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0
               border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent"
               id="tabs-incidents-tab" data-bs-toggle="pill" data-bs-target="#tabs-incidents" role="tab"
               aria-controls="tabs-incidents" aria-selected="false">Incidents</a>
          </li>
          <li class="nav-item" role="presentation">
            <a href="#tabs-user" class="nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0
               border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent"
               id="tabs-user-tab" data-bs-toggle="pill" data-bs-target="#tabs-user" role="tab"
               aria-controls="tabs-user" aria-selected="false">User Tasks</a>
          </li>
          <li class="nav-item" role="presentation">
            <a href="#tabs-user" class="nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0
               border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent"
               id="tabs-user-tab" data-bs-toggle="pill" data-bs-target="#tabs-user" role="tab"
               aria-controls="tabs-user" aria-selected="false">Aufgerufene Prozesse</a>
          </li>

        </ul>
        <div class="tab-content" id="tabs-tabContent">
          <div class="tab-pane fade show active" id="tabs-diagram" role="tabpanel" aria-labelledby="tabs-diagram-tab">
            <Suspense>
              <ActivityInstance :instance-id="instanceId"/>
              <template #fallback>
                <p>Loading ...</p>
              </template>
            </Suspense>
          </div>
          <div class="tab-pane fade" id="tabs-variables" role="tabpanel" aria-labelledby="tabs-variables-tab">
            <Suspense>
              <Variables :instance-id="instanceId"/>
              <template #fallback>
                <p>Loading ...</p>
              </template>
            </Suspense>
          </div>
          <div class="tab-pane fade" id="tabs-incidents" role="tabpanel" aria-labelledby="tabs-incidents-tab"  v-if="showIncidents">
            <Suspense>
              <Incidents :instance-id="instanceId"/>
              <template #fallback>
                <p>Loading ...</p>
              </template>
            </Suspense>
          </div>
          <div class="tab-pane fade" id="tabs-user" role="tabpanel" aria-labelledby="tabs-user-tab">
            <Suspense>
              <UserTasks :instance-id="instanceId"/>
              <template #fallback>
                <p>Loading ...</p>
              </template>
            </Suspense>
          </div>
          <div class="tab-pane fade" id="tabs-user" role="tabpanel" aria-labelledby="tabs-user-tab">

          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
  import ActivityInstance from "../components/instance/ActivityInstance.vue";
  import Variables from "../components/instance/Variables.vue";
  import Incidents from "../components/instance/Incidents.vue";
  import UserTasks from "../components/instance/UserTasks.vue";

  import {onMounted, ref} from "vue";
  import { useRoute } from "vue-router";
  import axios from "axios";

  const route = useRoute();
  const instanceId = route.params.id;
  const showIncidents = ref(false);

  const getIncidentCount = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/engine-rest/incident/count?processInstanceId=${instanceId}`);
      return result.data.count;
    } catch (err) {
      console.log(err);
    }
  }

  onMounted(() => {
    getIncidentCount().then(count => {
      console.log("count: " + count);
      showIncidents.value = count > 0;
    });
  });
</script>