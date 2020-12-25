import Vue from "vue";
import VueRouter from "vue-router";

import store from "./store";

import IntroPage from "./components/intro/intro.vue";
import DashboardPage from "./components/dashboard/dashboard.vue";
import SignupPage from "./components/auth/signup.vue";
import SigninPage from "./components/auth/signin.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: IntroPage },
  { path: "/signup", component: SignupPage },
  { path: "/signin", component: SigninPage },
  {
    path: "./dashboard",
    component: DashboardPage,
    beforeEnter(to, from, next) {
      if (store.state.idToken) {
        next();
      } else {
        next("/signin");
      }
    }
  }
];

export default new VueRouter({ mode: "history", routes });
