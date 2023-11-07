import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const accessToken = sessionStorage.getItem("access_token");
  if (to.meta.requiresAuth && !isAuthenticated(accessToken)) {
    // If the route requires authentication and the user is not authenticated, redirect to the login page
    next({ name: "Login" });
  } else {
    store.commit("setAccessToken", accessToken);
    next(); // Continue to the requested route
  }
});

function isAuthenticated(accessToken: string | null) {
  return !!accessToken;
}

export default router;
