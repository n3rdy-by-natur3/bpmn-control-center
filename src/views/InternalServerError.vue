<template>
  <PageTitle title="500"/>

  <div class="mt-8">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col">
        <div class="grid min-w-full min-h-96 place-items-center overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg bg-white p-5">

          <div class="text-center">
            <p class="text-base font-semibold text-cyan-700">500</p>
            <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Interner Fehler</h1>

            <div v-show="message !== ''">
              <p class="mt-6 mb-2 text-base leading-7 text-gray-600">Bitte kontaktieren Sie ihren Administrator mit folgender Nachricht:</p>

              <div class="border-l-4 border-yellow-400 bg-yellow-50 p-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <ExclamationTriangleIcon class="h-5 w-5 text-yellow-400" />
                  </div>
                  <div class="ml-3">
                    <p class="text-sm text-yellow-700">
                      {{ message }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div v-show="message === ''">
              <p class="mt-6 mb-2 text-base leading-7 text-gray-600">
                Ein interner Server Fehler ist aufgetreten. Versuchen Sie es bitte nochmal.<br/>Sollte der Fehler bestehen bleiben, kontaktieren Sie bitte Ihren Administrator.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import PageTitle from "../components/shared/PageTitle.vue";
  import { useApplicationStore } from '@/stores/ApplicationStore';
  import { ExclamationTriangleIcon } from '@heroicons/vue/24/solid';

  const store = useApplicationStore();
  const message = store.getError();
</script>