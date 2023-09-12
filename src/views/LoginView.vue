<template>
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
  import { ref } from 'vue'
  import EngineDropdown from "../components/EngineDropdown.vue";
  import { useApplicationStore } from '@/stores/ApplicationStore';
  import { useAuthStore } from '@/stores/AuthStore';
  import { useRouter } from "vue-router";
  import axios from "axios";

  const domainMissing = ref(false);
  const router = useRouter();
  const store = useApplicationStore();
  const authStore = useAuthStore();

  const hostSelect = () => {
    domainMissing.value = false;
  }

  const send = async (credentials, node) => {
    // we need a domain for login, it should be configured in app.config.json,
    // if there is more than one, it has to be chosen by the user
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
        },
        baseURL: store.domain,
      };

      // there is no explicit login endpoint, so we use /identity/verify where we have to provide the credentials twice :D
      await axios
          .post(`/identity/verify`, { "username": credentials.name, "password": credentials.password }, config)
          .then(async function (response) {
            authStore.setCredentials(credentials.name, credentials.password);

            if (!response.data.authenticated) {
              // there should be a 401 when the user can't be authenticated
              console.log('missing user ID in /identity/verify');
              node.setErrors(['Server Fehler. Bitte versuchen Sie es später nochmal.']);
            } else {
              // get the users name for showing in dashboard
              await axios
                  .get(`/user/${credentials.name}/profile`, config)
                  .then(function(result) {
                    store.user_name = result.data.firstName + ' ' + result.data.lastName;
                  });

              router.push({ name: 'home'});
            }
          })
          .catch(function (error) {
            // 401 means login failed, all other status are handled as server error
            if (error.response && error.response.status === 401) {
              console.log('401');
              node.setErrors(['Login fehlgeschlagen. Bitte überprüfen Sie Nutzername und Passwort.']);
            } else if (error.response && error.response.status === 403) {
              console.log('403');
              node.setErrors(['Zugriff verweigert. Bitte wenden Sie sich an Ihren Camunda Admin.']);
            } else {
              console.log("status: " + error.response);
              node.setErrors(['Server Fehler. Bitte versuchen Sie es später nochmal.']);
            }
          });
    }
  }
</script>