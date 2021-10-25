export default {
    data: () => ({
      drawer: false,
      group: null,
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    }),
    watch: {
      group() {
        this.drawer = false;
      },
    },
    methods: {
      toHome() {
        this.$router.push({ name: "home" });
      },
      logoutAction() {
        localStorage.removeItem("user");
        this.$router.push({ name: "login" });
        },
      toCart() {
        this.$router.push({ name: "cart" });
      },
    },
  };
  