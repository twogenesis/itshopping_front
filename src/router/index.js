import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/admin/LoginView.vue'
import ShopSummaryView from '@/views/admin/ShopSummaryView.vue'
import ManagementView from '@/views/admin/ManagementView.vue'
import ProductView from '@/views/admin/ProductView.vue'
import ManufacturerView from '@/views/admin/Manufacturer.vue'
import OrderView from '@/views/admin/OrderView.vue'
import MemberView from '@/views/admin/MemberView.vue'
import CommentView from '@/views/admin/CommentView.vue'
import ReviewView from '@/views/admin/ReviewView.vue'
import DiscountView from '@/views/admin/DiscountView.vue'
import RecommendView from '@/views/admin/RecommendView.vue'


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
      { path:'order', name:OrderView, component:OrderView },
      { path:'member', name:MemberView, component:MemberView },
      { path:'comment', name:CommentView, component:CommentView },
      { path:'review', name:ReviewView, component:ReviewView },
      { path:'discount', name:DiscountView, component:DiscountView },
      { path:'recommend', name:RecommendView, component:RecommendView }
    ]
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
