import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VoteView from '../views/VoteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/vote/:id',
      name: 'vote',
      // route level code-splitting
      // this generates a separate chunk (Vote.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/VoteView.vue')
    }
  ]
})

export default router
