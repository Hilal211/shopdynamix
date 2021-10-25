import api from "./api";
export default {
  name: "quotationline",
  data() {
    return {
      admin: JSON.parse(localStorage.getItem("admin")),
      quotation_id: null,
      loading: false,
      selectedObject: { id: -1 },
      data: [],
      valid: null,
      name: null,
      summary: null,
      quantity: false,
      picture: null,
      priceError: false,
      error: null,
      dialog2: false,
      image: null,
      errorDialog: false,
      // table
      search: "",
      headers: [
        {
          text: "Id",
          align: "left",
          value: "product_id",
        },
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Summary",
          value: "summary",
        },
        {
          text: "Quantity",
          value: "quantity",
        },

        {
          text: "Actions",
          value: "actions",
          align: "center",
        },
      ],
    };
  },
  mounted() {
    if (!this.admin) {
      this.$router.push({ name: "adminLogin" });
      return;
    }
    this.quotation_id = window.location.href.split("/").slice(-1)[0];
    this.loading = true;
    let formData = new FormData();
    formData.append("quotation_id", this.quotation_id);
    api
      .quotationlineswithproduct(formData)
      .then((res) => {
        this.loading = false;
        if (res.data.responseCode === 1) {
          this.data = res.data.data;
        }
      })
      .catch((error) => {
        this.error = error;
        this.loading = false;
        this.errorDialog = true;
      });
  },
  methods: {
    showDialog2(item) {
      if (item == null) {
        this.selectedObject = { id: -1 };
        this.name = null;
        this.summary = null;
        this.quantity = null;
      } else {
        this.selectedObject = item;
        this.name = item.name;
        this.quantity = item.quantity;
        this.summary = item.summary;
        this.image = item.image;
      }
      this.dialog2 = true;
    },
  },
};
