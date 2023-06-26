<template>
  <!--
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-gray-50">
    <body class="h-full">
    ```
  -->
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <!-- <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"> -->
      <h1 class="mx-auto w-auto text-cyan-700 text-xl">BPMN Control Center</h1>
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Loggen sie sich ein</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <FormKit type="form" @submit="send" submit-label="Login" #default="{ value }"
                 form-class="space-y-6" :incomplete-message="false"
        >
          <EngineDropdown :show-error="domainMissing" @host-selected="hostSelect"/>

          <FormKit
              type="text"
              name="name"
              id="name"
              validation="required"
              label="Nutzername"
              placeholder="Tina Tester"
              input-class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                     placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 focus:ring-cyan-600"
              inner-class="mt-2"
              label-class="block text-sm font-medium leading-6 text-gray-900"
              message-class="mt-2 text-sm text-red-600 text-left"
          />

          <FormKit
              type="password"
              name="password"
              id="password"
              validation="required"
              label="Passwort"
              input-class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                   placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 focus:ring-cyan-600"
              inner-class="mt-2"
              label-class="block text-sm font-medium leading-6 text-gray-900"
              message-class="mt-2 text-sm text-red-600 text-left"
          />
        </FormKit>
      </div>
    </div>
  </div>

</template>

<style>
  [data-invalid] .formkit-inner {
    @apply border rounded-md border-red-700 focus:ring-red-700;
  }
</style>

<script setup>
  import { ref, watch, getCurrentInstance } from 'vue'
  import EngineDropdown from "../components/EngineDropdown.vue";
  import { useApplicationStore } from '@/stores/ApplicationStore';
  import { useAuthStore } from '@/stores/AuthStore';
  import axios from "axios";

  const domainMissing = ref(false);
  const store = useApplicationStore();
  const authStore = useAuthStore();

  const hostSelect = () => {
    domainMissing.value = false;
  }

  const send = async (credentials, node) => {
    if (store.domain === '') {
      domainMissing.value = true;
    }

    if(!domainMissing.value) {
      // yeah, ready for authorization (party)
      const config = {
        // this will set the Basic Auth Header
        auth:{
          username: credentials.name,
          password: credentials.password
        }
      };

      // there is no login endpoint, so we misuse the version endpoint
      const version = await axios
          .get(`${store.domain}/version`, config)
          .then(function (response) {
            // to do forward, store credentials
            console.log("response: " + response.data.version + " status: " + response.status);
            console.log("cred: " + credentials.name + "-> " + credentials.password);
            var test = authStore.generateSecret();
            console.log("test: " + test);
            authStore.setCredentials(credentials.name, credentials.password);

            console.log("decrypted: " + authStore.decryptedPassword());
          })
          .catch(function (error) {
            // 401 means login failed, all other status are handled as server error
            if (error.response && error.response.status === 401) {
              console.log('401');
              node.setErrors(['Login fehlgeschlagen. Bitte überprüfen Sie Nutzername und Passwort.']);
            } else {
              console.log("status: " + error.response);
              node.setErrors(['Server Fehler. Bitte versuchen Sie es später nochmal.']);
            }
          });
    }
  }
</script>