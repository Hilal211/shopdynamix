import api from "./api.js";
export default {
  data: () => ({
    myProduct: [],
    user: JSON.parse(localStorage.getItem("user")),
    notes: "",
    quotation_id: null,
    msg:false,
    msgContent:"",
    loading:false,

  }),

  methods: {
    getData() {
      this.myProduct = JSON.parse(localStorage.getItem("cart"));
      this.user = JSON.parse(localStorage.getItem("user"));
    },
    submitCheckout() {
      this.loading=true;
      let msgData;
      let user_id = this.user.id;
      let formData = new FormData();
      formData.append("user_id", user_id);
      formData.append("notes", this.notes);
      api.addQuotation(formData).then((res) => {
        msgData = res.data.responseMessage;
        if (msgData === "success") {
          var ids = [];
          var quantities = [];
          for (let i = 0; i < this.myProduct.length; i++) {
            ids.push(this.myProduct[i].id);
            quantities.push(this.myProduct[i].quantityS);
          }
          let formData1 = new FormData();
          formData1.append("product_id", ids);
          formData1.append("quantity", quantities);
          formData1.append("quotation_id", res.data.data.id);
          api.addQuotationLines(formData1).then((res) => {
            msgData = res.data.responseMessage;
            if (msgData === "success") {
              this.loading=false;
              this.msg=true;
              this.msgContent=msgData;        
              localStorage.removeItem("cart")
              this.$router.push({ name: "home" });
            }
          });
        } else {
          this.msg=true;
          this.msgContent=msgData;        
    }
      });
    },
  },
  mounted() {
    if (!this.user) {
      this.$router.push({ name: "login" });
      return;
    }
    this.getData();
  },
};
