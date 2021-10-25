import api from "./api.js";
export default {
  data: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    idProduct: null,
    productDetails: {},
    productDetailsSelected: [],
    msg: false,
    msgContent: "",
    quantity: null,
  }),
  methods: {
    getproduct() {
      let formData = new FormData();
      formData.append("product_id", this.idProduct);
      api.productDetails(formData).then((res) => {
        this.productDetails = res.data.data;
      });
    },
    AddTocart() {
      let myLocal = JSON.parse(localStorage.getItem("cart"));
      if (this.productDetails.quantity != 0) {
        if (myLocal) {
          for (let i = 0; i < myLocal.length; i++) {
            if (myLocal[i].name == this.productDetails.name) {
              let products = JSON.parse(localStorage.getItem("cart"));
              if (products[i].quantityS < this.productDetails.quantity) {
                products[i].quantityS++;
                localStorage.setItem("cart", JSON.stringify(products));
                // this.qu = JSON.parse(localStorage.getItem("cart"));
                return;
              } else {
                this.msg = true;
                this.msgContent = "You are add it the max of quantity";
                return;
              }
            }
          }
        }
        this.productDetails.quantityS = 1;
        this.productDetailsSelected =
          JSON.parse(localStorage.getItem("cart")) || [];
        this.productDetailsSelected.push(this.productDetails);
        localStorage.setItem(
          "cart",
          JSON.stringify(this.productDetailsSelected)
        );
        // let p=localStorage.getItem("cart")
        // this.quantity=p.quantity
        // console.log(this.quantity);
        this.msg = true;
        this.msgContent = "this product add it to cart successfully";
      }else{
        this.msg = true;
        this.msgContent = "This product is not available";

      }
    },
  },
  mounted() {
    if (!this.user) {
      this.$router.push({ name: "login" });
      return;
    }
    this.idProduct = window.location.href.split("/").slice(-1)[0];
    this.getproduct();
  },
};
