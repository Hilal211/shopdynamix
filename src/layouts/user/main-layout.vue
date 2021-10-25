<template>
  <div>
    <v-card class="mx-auto overflow-hidden" width="100%">
      <v-app-bar class="bar" color="red" dark>
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          class="humberger"
        ></v-app-bar-nav-icon>
        My Closet
        <v-spacer></v-spacer>
        <div class="selectOption">
          <v-btn icon class="ml-6" @click="toHome">
            Home
          </v-btn>
          <v-btn icon class="ml-6" @click="toCart">
            My Cart
          </v-btn>
          <v-btn icon class="ml-6" @click="logoutAction">
            LogOut
          </v-btn>
        </div>
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        absolute
        class="selectMobile"
        temporary
      >
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            active-class="deep-red--text text--accent-4"
          >
            <v-list-item>
              <v-list-item-title @click="toHome">Home</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title @click="toCart">My Cart</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title @click="logoutAction">LogOut</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-card-text>
        <router-view></router-view>
      </v-card-text>
    </v-card>
    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-title class="footer">
          <strong class="subheading"
            >Get connected with us on social networks!</strong
          >
          <v-spacer></v-spacer>
          <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} — <strong>MYCLOSET</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>
<style scoped>
.bar {
  height: 60px !important;
  position: fixed;
  z-index: 10;
}
.humberger {
  display: none;
}
.selectMobile {
  margin-top: 60px;
  position: fixed;
  color: var(--first-color);
}
.footer {
  background-color: var(--first-color) !important;
}
@media screen and (max-width: 628px) {
  .humberger {
    display: block;
  }
  .selectOption {
    display: none;
  }
}
</style>
<script src="./script.js"></script>
