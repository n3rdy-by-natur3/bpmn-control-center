import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProcessInstanceView from '../views/ProcessInstanceView.vue'
import ProcessInstanceSelectView from '../views/ProcessInstanceSelectView.vue'
import ProcessDefinitionView from '../views/ProcessDefinitionView.vue'

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
    }
  ]
})

export default router
