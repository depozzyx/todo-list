import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ErrorTest from "../views/ErrorTest.vue";
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
// import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/error-test",
    name: "ErrorTest",
    component: ErrorTest
  },
  {
    path: "/blogs",
    name: "Blogs",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/News.vue")
  },
  {
    path: "/account",
    name: "Account",
    component: () =>
      import("../views/Account.vue")
  },
  {
    path: "/article/:id",
    name: "Article",
    props: { id: 0 },
    component: () =>
      import("../views/Article.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
