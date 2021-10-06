import Vue from 'vue'
import store from "../store/index.js";
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ProductView from "../views/ProductView.vue";
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Cart from "../views/Cart.vue";
import AddProduct from "../views/AddProduct.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.state.user.isAuth) {
        next({ name: "Home"});
      } else {
        next();
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (store.state.user.isAuth) {
        next({ name: "Home"});
      } else {
        next();
      }
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    beforeEnter: (to, from, next) => {
      if (!store.state.user.isAuth) {
        next({ name: "Login"});
      } else {
        next();
      }
    }
  },
  {
    path: '/add',
    name: 'Add',
    component: AddProduct,
    beforeEnter: (to, from, next) => {
      if (!store.state.user.isAdmin) {
        next({ name: "Home"});
      } else {
        next();
      }
    }
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: ProductView,
    props: true
  },
]

const router = new VueRouter({
  routes
})

export default router
