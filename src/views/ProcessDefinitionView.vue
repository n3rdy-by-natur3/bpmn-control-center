<template>
  <PageTitle title="Prozessdefinitionen"/>

  <div class="mt-8">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col">
        <div class="min-w-full min-h-96 overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg bg-white p-5">
          <div class="flex flex-row">
          <Suspense>
            <ProcessDefinitionList/>
            <template #fallback>
              <p>Loading ...</p>
            </template>
          </Suspense>

          <div class="flex-grow ml-8">
            <Suspense>
              <ProcessDefinition/>
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
</template>

<script setup>
  import ProcessDefinitionList from "../components/ProcessDefinitionList.vue";
  import ProcessDefinition from "../components/ProcessDefinition.vue";
  import PageTitle from "../components/shared/PageTitle.vue";
</script>