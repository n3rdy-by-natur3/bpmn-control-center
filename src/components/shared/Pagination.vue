<template>
  <div class="flex justify-end" v-show="pagination.pages > 1">
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
        computePagination();
      }
  )
</script>