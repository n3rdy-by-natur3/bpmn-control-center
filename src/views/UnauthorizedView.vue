<template>
  <PageTitle title="401"/>

  <div class="mt-8">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col">
        <div class="grid min-w-full min-h-96 place-items-center overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg bg-white p-5">

          <div class="text-center">
            <p class="text-base font-semibold text-cyan-700">404</p>
            <img src="/images/bpmn_404.svg" class="mt-6 mb-10"/>
            <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Nicht autorisiert</h1>
            <p class="mt-6 text-base leading-7 text-gray-600">Sie sind nicht autorisiert, die angefragten Daten zu sehen.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PageTitle from "../components/shared/PageTitle.vue";
</script>