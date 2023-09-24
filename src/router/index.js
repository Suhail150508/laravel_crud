import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import StudentShow from '../views/StudentShow.vue'
import StudentCreate from'../views/StudentCreate.vue'
import StudentEdit from '../views/StudentEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/studentcreate',
      name: 'StudentCreate',
      component: StudentCreate
    },

    {
      path: '/student/:id/edit',
      name: 'StudentEdit',
      component:StudentEdit
    },
  ]
})

export default router
