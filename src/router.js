import { createRouter, createWebHistory } from "vue-router";


// AUTHENTICATION
import theHome from "./pages/auth/theHome.vue";
import theHome2 from "./pages/auth/theHome2.vue";


import store from "./store/index.js";

function isAuthenticated() {
  const authResult = store.getters.isAuthenticated;
  if (authResult) {
    return "/events";
  }
}

// INITIALISE ROUTES
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: theHome,
      beforeEnter: [isAuthenticated],
    },
    {
      path: "/events",
      component: theHome2,
      beforeEnter: [isAuthenticated],
    },
    {
      path: "/queue_system/",
      component: theHome2,
      beforeEnter: [isAuthenticated],
    }
    
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
