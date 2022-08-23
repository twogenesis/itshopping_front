import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/admin/LoginView.vue'
import ShopSummaryView from '@/views/admin/ShopSummaryView.vue'
import ManagementView from '@/views/admin/ManagementView.vue'
import ManufacturerView from '@/views/admin/Manufacturer.vue'
import ProductView from '@/views/admin/ProductView.vue'


const routes = [
  {
    path: '/admin',
    name: LoginView,
    component: LoginView
  },
  {
    path:'/admin/management', 
    name:ManagementView,
    component:ManagementView,
    children:[
      { path:'summary', name:ShopSummaryView, component:ShopSummaryView },
      { path:'product', name:ProductView, component:ProductView },
      { path:'manufacturer', name:ManufacturerView, component:ManufacturerView },
    ]
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
