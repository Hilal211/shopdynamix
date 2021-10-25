<template>
  <v-app>
    <component v-if="layout" :is="layout">
      <router-view />
    </component>
    <router-view v-else />
  </v-app>
</template>

<script>
export default {
  name: "App",
  computed: {
    layout() {
      return this.$route.meta.lay ? this.$route.meta.lay : false;
    },
  },
};
</script>
