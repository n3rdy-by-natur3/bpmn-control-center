<template>
  <nav v-show="pagination.pages > 1" class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
    <div class="-mt-px flex w-0 flex-1">
      <a :class="{ 'text-gray-300 pointer-events-none': pagination.current === 1, 'text-gray-500 hover:border-gray-300 hover:text-gray-700': pagination.current !== 1 }"
         @click="pagination.current !== 1 ? changePage(pagination.current - 1) : null"
         href="#" class="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium">
        <svg  :class="{ 'text-gray-300': pagination.current === 1, 'text-gray-400': pagination.current !== 1 }"
            class="mr-3 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z" clip-rule="evenodd" />
        </svg>
        Vorherige
      </a>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <a v-for="page in pagination.pages" href="#"
         @click="pagination.current !== page ? changePage(page) : null"
         :class="{ 'border-cyan-700 text-cyan-700': pagination.current === page, 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300': pagination.current !== page }"
         class="inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium">
        {{ page }}
      </a>
      <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" -->
      <!--
      <a href="#" class="inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600" aria-current="page">2</a>
      <a href="#" class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">3</a>
      <span class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">...</span>
      <a href="#" class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">8</a>
      <a href="#" class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">9</a>
      <a href="#" class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">10</a>
      -->
    </div>
    <div class="-mt-px flex w-0 flex-1 justify-end">
      <a :class="{ 'text-gray-300 pointer-events-none': pagination.current === pagination.pages, 'text-gray-500 hover:border-gray-300 hover:text-gray-700': pagination.current !== pagination.pages }"
          @click="pagination.current !== pagination.pages ? changePage(pagination.current + 1) : null"
          class="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium">
        Nächste
        <svg  :class="{ 'text-gray-300': pagination.current === pagination.pages, 'text-gray-400': pagination.current !== pagination.pages }"
              class="ml-3 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clip-rule="evenodd" />
        </svg>
      </a>
    </div>
  </nav>
</template>

<script setup>
import { reactive, watch } from "vue";

  const emit = defineEmits(['pageChanged'])
  const props = defineProps({
    size: { // number of entries per page
      type: Number,
      default: 10
    },
    count: { // number of entries
      type: Number,
      required: true
    },
    id: { // special component ID
      type: String,
      required: true
    }
  });

  const pagination = reactive({
    current: 1,
    pages: 1
  });

  // page link was clicked, handle it
  const changePage = (page) => {
    if (page !== pagination.current) {
      const index = page * props.size - props.size;
      pagination.current = page;

      // emit event with index as payload
      emit('pageChanged', props.id, index);
    }
  }

  // pagination initialization
  const computePagination = () => {
    if (props.count > props.size) {
      pagination.pages = Math.ceil(props.count / props.size);
    } else {
      pagination.pages = 1;
    }
  }

  // initialize the pagination when the count has changed
  watch(
      () => props.count,
      (count, prevCount) => {
        //console.log("PAGINATION props count changed: " + props.count);
        computePagination();
      }, { immediate: true }
  )
</script>