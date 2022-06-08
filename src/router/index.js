import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import CardInvoice from '../views/CardInvoice.vue'
import NewExpense from '../views/NewExpense.vue'
import NewCard from '../views/NewCard.vue'

Vue.use(VueRouter)

function guardMyroute(to, from, next) { 
  var isAuthenticated= false; 
  if(localStorage.getItem('login')) {
    isAuthenticated = true
  } else {
    isAuthenticated= false
  }
  
  if(isAuthenticated) { 
    next()
    
  } else { 
    next('/login') 
  } 
}

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    beforeEnter : guardMyroute,
    component: Dashboard
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/card-invoice/:id',
    name: 'CardInvoice',
    beforeEnter : guardMyroute,
    component: CardInvoice
  },
  {
    path: '/new-expense',
    name: 'NewExpense',
    beforeEnter : guardMyroute,
    component: NewExpense
  },
  {
    path: '/new-card',
    name: 'NewCard',
    beforeEnter : guardMyroute,
    component: NewCard
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
