<template>
  <main>
    <div class="px-4 bg-white block sm:flex items-center justify-between border-b border-gray-200">
      <div class="w-full">
        <div class="mb-4">
          <h1 class="text-xl sm:text-2xl font-semibold text-gray-900">Instanz {{ instanceId }}</h1>
        </div>
      </div>
    </div>

    <div class="bg-white h-screen">
      <div class="m-4">
        <ul class="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4" id="tabs-tab"
            role="tablist">
          <li class="nav-item" role="presentation">
            <a href="#tabs-home" class="nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0
               border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent active"
               id="tabs-home-tab" data-bs-toggle="pill" data-bs-target="#tabs-home" role="tab" aria-controls="tabs-home"
               aria-selected="true">Activity Instances</a>
          </li>
          <li class="nav-item" role="presentation">
            <a href="#tabs-profile" class="nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0
               border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent"
               id="tabs-profile-tab" data-bs-toggle="pill" data-bs-target="#tabs-profile" role="tab"
               aria-controls="tabs-profile" aria-selected="false">Profile</a>
          </li>
          <li class="nav-item" role="presentation">
            <a href="#tabs-messages" class="nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0
               border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent"
               id="tabs-messages-tab" data-bs-toggle="pill" data-bs-target="#tabs-messages" role="tab"
               aria-controls="tabs-messages" aria-selected="false">Messages</a>
          </li>
        </ul>
        <div class="tab-content" id="tabs-tabContent">
          <div class="tab-pane fade show active" id="tabs-home" role="tabpanel" aria-labelledby="tabs-home-tab">
            Tab 1 content
          </div>
          <div class="tab-pane fade" id="tabs-profile" role="tabpanel" aria-labelledby="tabs-profile-tab">
            Tab 2 content
          </div>
          <div class="tab-pane fade" id="tabs-messages" role="tabpanel" aria-labelledby="tabs-profile-tab">
            Tab 3 content
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
  import { useRoute } from "vue-router";

  const route = useRoute();
  const instanceId = ref(route.params.id);
</script>