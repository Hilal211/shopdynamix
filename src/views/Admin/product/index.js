import api from "./api";
export default {
  name: "product",
  data() {
    return {
      admin: JSON.parse(localStorage.getItem("admin")),
      loading: false,
      selectedObject: { id: -1 },
      data: [],
      valid: null,
      name: null,
      summary: null,
      price: false,
      quantity: false,
      excelfile: null,
      // picture_path: null,
      picture: null,
      // priceError: false,
      error: null,
      // popups
      dialog: false,
      dialog2: false,
      dialogexcel: false,
      image: null,
      errorDialog: false,
      deleteDialog: false,
      // show: false,
      // show2: false,
      // table
      search: "",
      headers: [
        {
          text: "Id",
          align: "left",
          value: "id",
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
          text: "Price",
          value: "price",
        },
        {
          text: "Actions",
          value: "actions",
          align: "center",
        },
      ],
      // rules
      required: [(v) => !!v || "This field is required"],
      priceRule: [
        (v) => !!v || "This field is required",
        (v) => /.+@.+/.test(v) || "Invalid price",
      ],
    };
  },
  mounted() {
    if (!this.admin) {
      this.$router.push({ name: "adminLogin" });
      return;
    }
    this.loading = true;
    api
      .getUsers()
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
    onDelete(item) {
      this.selectedObject = item;
      this.deleteDialog = true;
    },
    agreeOnDelete() {
      this.deleteDialog = false;
      this.loading = true;
      let formData = new FormData();
      formData.append("id", this.selectedObject.id);

      api
        .archive(formData)
        .then((res) => {
          this.loading = false;
          if (res.data.responseCode === 1) {
            var index = this.data.indexOf(this.selectedObject);
            this.$delete(this.data, index);
          }
        })
        .catch((error) => {
          this.loading = false;
          this.error = error;
          this.errorDialog = true;
        });
    },
    showDialog(item) {
      this.valid = true;

      if (item == null) {
        this.selectedObject = { id: -1 };
        this.name = null;
        this.summary = null;
        this.quantity = null;
        this.price = null;
      } else {
        this.selectedObject = item;
        this.name = item.name;
        this.quantity = item.quantity;
        this.price = item.price;
        this.summary = item.summary;
      }
      this.dialog = true;
    },
    showDialog2(item) {
      if (item == null) {
        this.selectedObject = { id: -1 };
        this.name = null;
        this.summary = null;
        this.quantity = null;
        this.price = null;
      } else {
        this.selectedObject = item;
        this.name = item.name;
        this.quantity = item.quantity;
        this.price = item.price;
        this.summary = item.summary;
        this.image = item.image;
      }
      this.dialog2 = true;
    },
    showDialogExcel() {
      this.dialogexcel = true;
    },
    save() {
      if (!this.$refs.form.validate()) return false;
      this.loading = true;
      api
        .save(
          this.selectedObject.id,
          this.name,
          this.summary,
          this.price,
          this.quantity,
          this.picture
        )
        .then((res) => {
          this.loading = false;
          this.dialog = false;
          if (res.data.responseCode === 1) {
            if (this.selectedObject.id == -1) {
              this.data.push({
                id: res.data.data.id,
                name: this.name,
                summary: this.summary,
                quantity: this.quantity,
                price: this.price,
              });
            } else {
              var index = this.data.indexOf(this.selectedObject);
              this.data[index].name = this.name;
              this.data[index].summary = this.summary;
              this.data[index].quantity = this.quantity;
              this.data[index].price = this.price;
            }
          } else {
            this.error = res.data.responseMessage;
            this.errorDialog = true;
          }
        })
        .catch((error) => {
          this.loading = false;
          this.error = error;
          this.dialog = false;
          this.errorDialog = true;
        });
    },

    saveExcel() {
      let namef = this.excelfile.name;
      let ext = namef.substring(namef.lastIndexOf("."));
      if (ext == ".csv") {
        let form = new FormData();
        form.append("filename", this.excelfile);

        api
          .saveExcel(form)
          .then((res) => {
            this.loading = false;
            this.dialogexcel = false;
            if (res.data.responseCode === 1) {
              this.loading = true;
              api
                .getUsers()
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
            } else {
              this.error = res.data.responseMessage;
              this.errorDialog = true;
            }
          })
          .catch((error) => {
            this.loading = false;
            this.error = error;
            this.dialog = false;
            this.errorDialog = true;
          });
      } else {
        this.errorDialog = true;
        this.error = "you should upload a csv file";
      }
    },
  },
};
