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
                Aktiv
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                ID
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Business Key
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Startzeit
              </th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="instance in instances.values" :key="instance.id" @click="goToInstanceView(instance.id)"
                  class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                <td class="text-sm text-gray-900 font-light pr-6 pl-8 py-4 whitespace-nowrap">
                  <CheckCircleIcon v-show="!(instance.ended || instance.suspended)"
                      class="w-5 h-5 text-green-700 flex-shrink-0 inline"/>
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-bpmn-p-hover">
                  {{ instance.id }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ instance.businessKey }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ useFormatDate(instance.startTime) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- pagination -->
  <div class="flex justify-end" v-show="showData && pagination.pages > 1">
    <nav aria-label="Page navigation example">
      <ul class="flex list-style-none">
        <li class="page-item" :class="{ 'disabled': pagination.current === 1 }">
          <a :class="{ 'text-gray-500 pointer-events-none': pagination.current === 1, 'text-gray-800 hover:bg-gray-200': pagination.current !== 1 }"
             @click="pagination.current !== 1 ? changePage(pagination.current - 1) : null"
            class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded focus:shadow-none"
            href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="page in pagination.pages" :class="{ 'active': pagination.current === page }">
          <a :class="{ 'text-white bg-bpmn-p-active': pagination.current === page, 'text-gray-800 hover:bg-gray-200': pagination.current !== page }"
             @click="pagination.current !== page ? changePage(page) : null"
            class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded focus:shadow-none"
            href="#">{{ page }}</a>
        </li>
        <li class="page-item"  :class="{ 'disabled': pagination.current === pagination.pages }">
          <a :class="{ 'text-gray-500 pointer-events-none': pagination.current === pagination.pages, 'text-gray-800 hhover:bg-gray-200': pagination.current !== pagination.pages }"
             @click="pagination.current !== pagination.pages ? changePage(pagination.current + 1) : null"
            class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded focus:shadow-none"
            href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
  import { useFormatDate } from '../../composables/date.js'
  import { onMounted, ref, reactive } from "vue";
  import { useRouter } from "vue-router";
  import { useDefinitionStore } from '@/stores/DefinitionStore';
  import axios from "axios";
  import { CheckCircleIcon } from '@heroicons/vue/24/solid'

  const store = useDefinitionStore();
  const router = useRouter();

  const showData = ref(false);
  const instances = reactive({ values: []});
  const instanceTimes = reactive({ values: new Map()});
  const size = 10;
  const pagination = reactive({
    current: 1,
    count: 0,
    pages: 1
  });

  const getInstances = async (index) => {
    try {
      const result = await axios.get(`http://localhost:8080/engine-rest/process-instance?processDefinitionId=${store.selectedDefId}&maxResults=${size}&firstResult=${index}`);
      return result.data;
    } catch(err) {
      console.log(err);
    }
  }

  const getStartTimes = async (instanceIds) => {
    try {
      const result = await axios.get(`http://localhost:8080/engine-rest/history/process-instance?unfinished=true&processInstanceIds=${instanceIds}`);
      return result.data;
    } catch(err) {
      console.log(err);
    }
  }

  const enhanceInstances = (instances, times) => {
    for (let i of instances) {
      const start = times.get(i.id);
      if (start) {
        i.startTime = start;
      }
    }
  }

  const computePagination = () => {
    if (pagination.count > size) {
      pagination.pages = Math.ceil(pagination.count / size);
    } else {
      pagination.pages = 1;
    }
  }

  const changePage = (page) => {
    if (page !== pagination.current) {
      const index = page * size - size;

      getInstances(index).then(result => {
        pagination.current = page;
        instances.values = result;
      });
    }
  }

  const goToInstanceView = (instanceId) => {
    router.push({ name: 'instance', params: { id: instanceId }});
  }

  store.$subscribe((mutation, state) => {
    if (mutation.type === 'patch object' && store.selectedDefId !== '') {
      showData.value = true;

      // at first get all process instances
      getInstances(0).then(result => {
        instances.values = result;
        const ids = result.map(instance => instance.id).join(','); // collect all instance IDs

        // with instance IDs get history data
        getStartTimes(ids).then(list => {
          // get all start times from list and map it to the instance ID
          instanceTimes.values = new Map(list.map(instance => [instance.id, instance.startTime]));

          enhanceInstances(instances.values, instanceTimes.values);
        });
      });
    }

    if (mutation.type === 'direct') {
      pagination.count = store.instanceCount;
      pagination.current = 1;
      computePagination();
    }
  });
</script>