import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/form-group",
    name: "FormGroup",
    component: () => import("../views/FormGroup.vue"),
  },
  {
    path: "/form-schema",
    name: "FormSchema",
    component: () => import("../views/FormSchema.vue"),
  },
  {
    path: "/form-json-schema",
    name: "FormJsonSchema",
    component: () => import("../views/FormJsonSchema.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
