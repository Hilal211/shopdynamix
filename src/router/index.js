import Vue from "vue";
import VueRouter from "vue-router";
import login from "../views/user/login/login.vue";
import home from "../views/user/home/home.vue";
import productDetails from "../views/user/productDetails/productDetails.vue";
import cart from "../views/user/cart/cart.vue";
import checkout from "../views/user/checkout/checkout.vue";
import product from "../views/Admin/product/index.vue";
import adminLogin from "../views/Admin/login/index.vue";
import quotation from "../views/Admin/quotation/index.vue";
import quotationlines from "../views/Admin/quotationsLines/index.vue";
import manageUser from "../views/Admin/manageUser/index.vue";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "login",
    component: login,
  },
  {
    path: "/home",
    name: "home",
    component: home,
    meta: { lay: "MainFrontLayout" },
  },
  {
    path: "/productdetails/:id",
    name: "productdetails",
    component: productDetails,
    meta: { lay: "MainFrontLayout" },
  },
  {
    path: "/cart",
    name: "cart",
    component: cart,
    meta: { lay: "MainFrontLayout" },
  },
  {
    path: "/checkout",
    name: "checkout",
    component: checkout,
    meta: { lay: "MainFrontLayout" },
  },
  {
    path: "/login",
    name: "adminLogin",
    component: adminLogin,
  },
  {
    path: "/product",
    name: "product",
    component: product,
    meta: { lay: "MainAdminLayout" },
  },
  {
    path: "/quotation",
    name: "quotation",
    component: quotation,
    meta: { lay: "MainAdminLayout" },
  },
  {
    path: "/quotationlines/:id",
    name: "quotationlines",
    component: quotationlines,
    meta: { lay: "MainAdminLayout" },
  },
  {
    path: "/user",
    name: "user",
    component: manageUser,
    meta: { lay: "MainAdminLayout" },
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
export default router;
