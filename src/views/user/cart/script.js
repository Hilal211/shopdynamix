export default {
  data: () => ({
    myProduct: [],
    user: JSON.parse(localStorage.getItem("user")),
  }),
  methods: {
    getProductCart() {
      this.myProduct = JSON.parse(localStorage.getItem("cart"));
    },
    remove(index) {
      let products = JSON.parse(localStorage.getItem("cart"));
      products.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(products));
      this.myProduct = JSON.parse(localStorage.getItem("cart"));
      console.log("mm", this.myProduct);
    },
    update(index, value) {
      let products = JSON.parse(localStorage.getItem("cart"));
      products[index].quantityS = value;
      localStorage.setItem("cart", JSON.stringify(products));
      this.myProduct = JSON.parse(localStorage.getItem("cart"));
    },
    goToCheckout() {
      this.$router.push({ name: "checkout" });
    },
  },
  mounted() {
    if (!this.user) {
      this.$router.push({ name: "login" });
      return;
    }
    this.getProductCart();
    // this.update();
  },
};
