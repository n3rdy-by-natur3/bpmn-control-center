<template>
  <PageTitle title="Prozessdefinitionen"/>

  <div class="mt-8">
    <div class="mx-auto px-4">
      <div class="flex flex-col">
        <div class="min-w-full min-h-96 overflow-auto overscroll-contain align-middle shadow sm:rounded-lg bg-white p-5">
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