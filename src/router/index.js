import { createRouter, createWebHistory } from 'vue-router'

import store from '../store'

import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import Category from '../views/Category.vue'
import Search from '../views/Search.vue'
import Cart from '../views/Cart.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import MyAccount from '../views/MyAccount.vue'
import Success from '../views/Success.vue'
import Checkout from '../views/Checkout.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/search',
    name: 'Search',
    component: Search
  },

  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn
  },
  
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },

  {
    path: '/my-account',
    name: 'MyAccount',
    component: MyAccount,
    meta: {
      requireLogin: true
    }
  },

  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },

  {
    path: '/cart/success',
    name: 'Success',
    component: Success
  },

  {
    path: '/cart/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: {
        requireLogin: true
    }
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  {
    path: '/:category_slug/:product_slug',
    name: 'Product',
    component: Product
  },

  {
    path: '/:category_slug/',
    name: 'Category',
    component: Category
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next({ name: 'SignIn', query: { to: to.path } });
  } else {
    next()
  }
})
export default router
