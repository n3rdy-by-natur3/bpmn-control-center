<template>
  <PageTitle :title="'Instanz ' + instanceId"/>

  <div class="mt-8">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col">
        <div class="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg bg-white p-5">
          <div>
            <div class="sm:hidden">
              <label for="tabs" class="sr-only">Select a tab</label>
              <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
              <select id="tabs" name="tabs" class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm">
                <option selected>Activity Instanzen</option>

                <option>Variablen</option>

                <option>Incidents</option>

                <option>Aufgerufene Prozesse</option>
              </select>
            </div>
            <div class="hidden sm:block">
              <div class="border-b border-gray-200">
                <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                  <!-- Current: "border-cyan-700 text-cyan-700", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
                  <a href="#tabs-diagram" @click="changeTab" :class="{ 'border-cyan-700 text-cyan-700 pointer-events-none': currentTab === 'tabs-diagram',
                  'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': currentTab !== 'tabs-diagram' }"
                     class="whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium" aria-current="page">Activity Instanzen</a>

                  <a href="#tabs-variables" @click="changeTab" :class="{ 'border-cyan-700 text-cyan-700 pointer-events-none': currentTab === 'tabs-variables',
                  'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': currentTab !== 'tabs-variables' }"
                     class="whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium">Variablen</a>

                  <a href="#tabs-incidents" @click="changeTab" v-show="hasIncidents" :class="{ 'border-cyan-700 text-cyan-700 pointer-events-none': currentTab === 'tabs-incidents',
                  'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': currentTab !== 'tabs-incidents' }"
                     class="whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium">Incidents</a>

                  <a href="#tabs-tasks" @click="changeTab" v-show="hasTasks" :class="{ 'border-cyan-700 text-cyan-700 pointer-events-none': currentTab === 'tabs-tasks',
                  'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': currentTab !== 'tabs-tasks' }"
                     class="whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium">User Tasks</a>
                  <a href="#tabs-called" @click="changeTab" v-show="hasCalledInstances" :class="{ 'border-cyan-700 text-cyan-700 pointer-events-none': currentTab === 'tabs-called',
                  'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': currentTab !== 'tabs-called' }"
                     class="whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium">Aufgerufene Prozesse</a>
                </nav>
              </div>
            </div>

            <div class="tab-content" id="tabs-tabContent">
              <div v-show="currentTab === 'tabs-diagram'" class="tab-pane fade show active" id="tabs-diagram" role="tabpanel" aria-labelledby="tabs-diagram-tab">
                <Suspense>
                  <ActivityInstance :instance-id="instanceId"/>
                  <template #fallback>
                    <p>Loading ...</p>
                  </template>
                </Suspense>
              </div>
              <div v-show="currentTab === 'tabs-variables'" class="tab-pane fade" id="tabs-variables" role="tabpanel" aria-labelledby="tabs-variables-tab">
                <Suspense>
                  <Variables :instance-id="instanceId"/>
                  <template #fallback>
                    <p>Loading ...</p>
                  </template>
                </Suspense>
              </div>
              <div v-show="currentTab === 'tabs-incidents'" class="tab-pane fade" id="tabs-incidents" role="tabpanel" aria-labelledby="tabs-incidents-tab"  v-if="hasIncidents">
                <Suspense v-if="hasIncidents">
                  <Incidents :instance-id="instanceId"/>
                  <template #fallback>
                    <p>Loading ...</p>
                  </template>
                </Suspense>
              </div>
              <div v-show="currentTab === 'tabs-tasks'" class="tab-pane fade" id="tabs-tasks" role="tabpanel" aria-labelledby="tabs-tasks-tab">
                <Suspense v-if="hasTasks">
                  <UserTasks :instance-id="instanceId"/>
                  <template #fallback>
                    <p>Loading ...</p>
                  </template>
                </Suspense>
              </div>
              <div v-show="currentTab === 'tabs-called'" class="tab-pane fade" id="tabs-called" role="tabpanel" aria-labelledby="tabs-called-tab">
                <Suspense v-if="hasCalledInstances">
                  <CalledProcessInstances :instance-id="instanceId"/>
                  <template #fallback>
                    <p>Loading ...</p>
                  </template>
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import ActivityInstance from "../components/instance/ActivityInstance.vue";
  import Variables from "../components/instance/Variables.vue";
  import Incidents from "../components/instance/Incidents.vue";
  import UserTasks from "../components/instance/UserTasks.vue";
  import PageTitle from "../components/shared/PageTitle.vue";
  import CalledProcessInstances from "../components/instance/CalledProcessInstances.vue";

  import {onMounted, ref} from "vue";
  import { useRoute } from "vue-router";
  import axios from "axios";
  import { useInstanceStore } from '@/stores/InstanceStore';

  const route = useRoute();
  const store = useInstanceStore();
  const instanceId = route.params.id;
  const hasIncidents = ref(false);
  const hasTasks = ref(false);
  const hasCalledInstances = ref(false);
  const currentTab = ref("tabs-diagram");

  const getIncidentCount = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/engine-rest/incident/count?processInstanceId=${instanceId}`);
      return result.data.count;
    } catch (err) {
      console.log(err);
    }
  }

  const getUserTaskCount = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/engine-rest/task/count?processInstanceId=${instanceId}`);
      return result.data.count;
    } catch (err) {
      console.log(err);
    }
  }

  const changeTab = (event) => {
    if (event) {
      var target = event.target || event.srcElement;

      if (target instanceof HTMLAnchorElement) {
        console.log(target.getAttribute('href'));
        currentTab.value = target.getAttribute('href').substring(1);
      }
    }
  }

  onMounted(() => {
    store.$reset();

    getIncidentCount().then(count => {
      hasIncidents.value = count > 0;
    });

    getUserTaskCount().then( count => {
      hasTasks.value = count > 0;
    });
  });

  store.$subscribe((mutation, state) => {
    if (mutation.type === 'direct' && mutation.events.key === 'called_instances' && mutation.events.newValue.length > 0) {
      hasCalledInstances.value = true;
    }
  });
</script>