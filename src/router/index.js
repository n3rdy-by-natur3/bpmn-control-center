import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProcessInstanceView from '../views/ProcessInstanceView.vue'
import ProcessInstanceSelectView from '../views/ProcessInstanceSelectView.vue'
import ProcessDefinitionView from '../views/ProcessDefinitionView.vue'
import Unauthorized from '../views/UnauthorizedView.vue';
import NotFound from '../views/NotFoundView.vue';
import InternalServerError from '../views/InternalServerError.vue';
import Login from '../views/LoginView.vue';
import { useApplicationStore } from '@/stores/ApplicationStore';

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
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        layout: 'PlainPageLayout'
      }
    },
    {
      path: '/401',
      name: 'unauthorized',
      component: Unauthorized
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

  if (!store.domain && to.name !== 'login') {
    // TODO logout
    return '/login';
  }
});

export default router;
