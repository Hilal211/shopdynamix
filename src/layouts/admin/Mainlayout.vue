<template>
  <div id="parentx">
    <v-app id="inspire">
      <v-navigation-drawer
        v-model="drawer"
        :right="toright"
        :mini-variant="mini"
        hide-overlay
        app
        stateless
        fixed
        :mini-variant-width="minWidth"
      >
        <v-toolbar text class="transparent">
          <v-list class="pa-0">
            <v-list-item class="transparent">
              <v-list-item-action v-if="loggedin">
                <router-link class="" to="/">
                  <img alt="Vue logo" class="logoD" src="../../assets/images/logo.png" />
                </router-link>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-toolbar>
        <v-list class="pt-0">
          <v-divider></v-divider>
          <div :key="index" v-for="(item, index) in items">
            <v-list-item
              v-if="!item.children"
              :key="item.title"
              :to="item.to"
              class="sidebarmenu"
            >
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-title class="alleft">{{
                item.title
              }}</v-list-item-title>
            </v-list-item>
            <v-list-group v-if="item.children">
              <template v-slot:activator>
                <v-list-item>
                  <v-list-item-action>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-action>
                  <v-list-item-title class="alleft">{{
                    item.title
                  }}</v-list-item-title>
                </v-list-item>
              </template>

              <v-list-item
                v-for="iitem in item.children"
                :key="iitem.title"
                :to="iitem.to"
                class="sidebarmenu"
              >
                <v-list-item-action>
                  <v-icon>{{ iitem.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-title class="alleft">{{
                  iitem.title
                }}</v-list-item-title>
              </v-list-item>
            </v-list-group>
          </div>
          <v-container>
            <v-layout justify-center>
              <v-btn class="nohover" color="" text @click.stop="mini = !mini">
                <div v-if="mini">
                  <img
                    class="titleimg"
                    :style="firststyle"
                    alt="Vue logo"
                    src="../../assets/images/expandi.svg"
                  />
                </div>
                <div v-else>
                  <img
                    :style="secondstyle"
                    class="titleimg"
                    alt="Vue logo"
                    src="../../assets/images/expandi.svg"
                  />
                </div>
              </v-btn>
            </v-layout>
          </v-container>
        </v-list>
      </v-navigation-drawer>
      <v-content>
        <v-container fluid class="" pa-0>
          <v-toolbar id="admin">
            <v-toolbar-items> </v-toolbar-items>
            <v-btn
              class="nohover mobile-only"
              color=""
              text
              @click.stop="mini = !mini"
            >
              <div v-if="mini">
                <img
                  class="mobile-opener"
                  alt="Vue logo"
                  src="../../assets/images/burger.svg"
                />
              </div>
            </v-btn>
            <v-spacer></v-spacer>
            <v-toolbar-items class="">
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn color="#000" text v-on="on">
                    <div right ml-5 class="defont decol bold lower"> {{email}} </div>
                    <v-icon right>expand_more</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                  @click="logout"
                    color="#6A6A6A"
                    v-for="(item, index) in dropdown_User"
                    :key="index"
                  >
                    <v-list-item-title
                      class="menucolorred alleft"
                      color="#6A6A6A"
                      >{{ item.title }}</v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar-items>
          </v-toolbar>
          <router-view :key="$route.fullPath"></router-view>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>
<script>
export default {
  name: "parentx",
  data() {
    return {
      email:JSON.parse(localStorage.getItem("admin")).email,
      dropdown_User: [{ title: "Logout", to: "/login" }],
      drawer: true,
      mini: true,
      toright: false,
      fullname: "Admin",
      loggedin: false,
      items: [],
      firststyle: "border-top: 2px solid #6a6a6a;",
      secondstyle:
        "transform: scaleX(-1);filter: FlipH; border-top: 2px solid #6a6a6a;",
      minWidth: 80,
    };
  },
  mounted() {
    this.onResize(null);
    // console.log(this.$store.state.user);

    this.loggedin = true;

    this.items = [
      {
        title: "Dashboard",
        icon: "dashboard",
        to: "/dashboard",
      },
      {
        title: "Product",
        icon: "category",
        to: "/product",
      },
      {
        title: 'Quotation',
        icon: 'shopping_cart',
        to:"/quotation"
      },
      {
        title: 'User',
        icon: 'group',
        to:"/user"
      },
      // {
      //   title: 'Service Providers',
      //   icon: 'place',
      //   children: [
      //     {
      //       title: 'Providers',
      //       icon: 'place',
      //       to: '/providers'
      //     },
      //     {
      //       title: 'Services',
      //       icon: 'work',
      //       to: '/provider-services'
      //     },
      //   ]
      // },
      // {
      //   title: 'Trends',
      //   icon: 'trending_up',
      //   to: '/trends'
      // },
      // {
      //   title: 'Regulations',
      //   icon: 'gavel',
      //   to: '/regulations'
      // },
      // {
      //   title: 'Resources',
      //   icon: 'source',
      //   to: '/resources'
      // },
      // {
      //   title: 'Encyclopedia',
      //   icon: 'auto_stories',
      //   to: '/pedia'
      // },
      // {
      //   title: 'Adoptions',
      //   icon: 'pets',
      //   to: '/adoptions'
      // },
      // {
      //   title: 'Competitions',
      //   icon: 'emoji_events',
      //   to: "/competitions",
      // },
      // {
      //   title: 'Reports',
      //   icon: 'report',
      //   to: "/reports",
      // },
      // {
      //   title: 'Settings',
      //   icon: 'settings',
      //   children: [
      //     {
      //       title: 'General Services',
      //       icon: 'home_repair_service',
      //       to: '/services'
      //     },
      //     {
      //       title: 'Conditions',
      //       icon: 'download_done',
      //       to: '/conditions'
      //     },
      //     {
      //       title: 'Categories',
      //       icon: 'category',
      //       to: '/categories'
      //     },
      //   ]
      // },
      // {
      //   title: 'Contents',
      //   icon: 'subject',
      //   to: '/contents'
      // },
      // {
      //   title: 'Admins',
      //   icon: 'group_add',
      //   to: "/admins",
      // },
      // {
      //   title: 'Push Notifications',
      //   icon: 'notifications_none',
      //   to: "/push",
      // },
    ];
  },
  created() {
    document.addEventListener("resize", this.onResize);
  },
  destroyed() {
    document.removeEventListener("resize", this.onResize);
  },
  methods: {
    logout() {
      localStorage.removeItem("admin");
      this.$router.push({
        name: "adminLogin",
      });
    },

    onResize() {
      if (window.innerWidth < 1024) this.minWidth = "0";
      else this.minWidth = "80";
    },
  },
};
</script>
<style scoped src="@/assets/dashboardStyle.css">