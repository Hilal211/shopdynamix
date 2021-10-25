import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import Vuetify from 'vuetify';
import vuetify from './plugins/vuetify';
import FrontMainLayout from "./layouts/user/main-layout.vue"
import AdminLayout from "./layouts/admin/Mainlayout.vue"
import 'tiptap-vuetify/dist/main.css'
import 'vuetify/dist/vuetify.min.css';
import store from "./store";
import "material-design-icons-iconfont/dist/material-design-icons.css";
Vue.component("MainFrontLayout", FrontMainLayout);
Vue.component("MainAdminLayout", AdminLayout);
Vue.use(Vuetify);
new Vue({
  icons: {
    iconfont: "md",
  },
  store,
  vuetify,
  Vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

require("@/assets/style.css");
