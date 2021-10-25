import api from "./api";
export default {
  name: "quotation",
  data() {
    return {
      admin: JSON.parse(localStorage.getItem("admin")),
      loading: false,
      selectedObject: { id: -1 },
      data: [],
      valid: null,
      email: null,
      date: null,
      note: false,
      error: null,
      // popups
      dialog2: false,
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
          text: "Email",
          value: "email",
        },
        {
          text: "Notes",
          value: "notes",
        },
        {
          text: "Date",
          value: "created_date",
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
    this.loading = true;
    api
      .getQuotations()
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
    toQuotationLines(item) {
      this.$router.push({ path: `/quotationlines/${item.id}` });
    },
  },
};
