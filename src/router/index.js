import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import Dashboard from '@/views/Dashboard.vue'
import List_of_employees from '@/views/Employees.vue'
import SingleEmployer from '@/views/SingleEmployer.vue'
const routes = [
  {
    path: '/',
    name: 'main_page',
    component: MainPage,
    children:[
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
      },
      {
        path: '/list_of_employees',
        name: 'list_of_employees',
        component: List_of_employees
      },
      {
        path: '/singleEmployer/:id',
        name: 'singleEmployer',
        component: SingleEmployer
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
  
})

router.beforeEach((to, from, next) => {
  const path = to.path === '/'
  if(path) return next({name: 'dashboard'})
  next()
})

export default router
