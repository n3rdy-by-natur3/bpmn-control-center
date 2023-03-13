import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProcessInstanceView from '../views/ProcessInstanceView.vue'
import ProcessInstanceSelectView from '../views/ProcessInstanceSelectView.vue'
import ProcessDefinitionView from '../views/ProcessDefinitionView.vue'
import NotFound from '../views/NotFoundView.vue';
import InternalServerError from '../views/InternalServerError.vue';
import { useApplicationStore } from '@/stores/ApplicationStore';
import appConfig from '../../app.config.json';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/definition',
      name: 'definition',
      component: ProcessDefinitionView
    },
    {
      path: '/processes',
      name: 'instances',
      component: ProcessInstanceSelectView
    },
    {
      path: '/processes/:id',
      name: 'instance',
      component: ProcessInstanceView
    },
    {
      path: '/404',
      name: 'not-found',
      component: NotFound,
      meta: {
        layout: 'authOrNotAuth' // layout depending on user is logged in
      }
    },
    {
      path: '/500',
      name: 'internal-server-error',
      component: InternalServerError,
      meta: {
        layout: 'authOrNotAuth' // layout depending on user is logged in
      }
    },
    {
      path: '/:pathMatch(.*)',
      redirect: {
        name: 'not-found'
      }
    }
  ]
});

// have a look if there is a host selected
router.beforeEach(async (to) => {
  const store = useApplicationStore();

  if (!store.domain && !store.isRedirected()) {
    const hosts = appConfig.hosts;
    console.log("hosts from config file: " + hosts);

    if (!hosts || hosts.length === 0) {
      store.error ='Property hosts is missing in app.config.json. Please provide at least one host, where a Camunda engine is running.';
      store.redirected = true;
      return '/500';
    } else if (hosts.length === 1) {
      store.domain = hosts[0];
    } else {
      // TODO change to show the login page
      //store.warn = 'Bitte wählen sie eine Camunda Engine aus.';
      store.redirected = true;
      return { name: 'home' };
    }
  }
});

export default router;
