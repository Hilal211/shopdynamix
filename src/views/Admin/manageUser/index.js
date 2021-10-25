import api from "./api";
export default {
  name: "user",
  data() {
    return {
      admin: JSON.parse(localStorage.getItem("admin")),
      loading: false,
      selectedObject: { id: -1 },
      data: [],
      valid: null,
      email: null,
      password: null,
      error: null,
      passwordError: false,
      // popups
      dialog: false,
      dialog2: false,
      errorDialog: false,
      deleteDialog: false,
      show: false,
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
          text: "Password",
          value: "password",
        },
        {
          text: "Actions",
          value: "actions",
          align: "center",
        },
      ],
      // rules
      required: [(v) => !!v || "This field is required"],
      emailRule: [
        v => !!v || 'This field is required',
        v => /.+@.+/.test(v) || 'Invalid Email address'
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
        this.email = null;
        this.password = null;
      } else {
        this.selectedObject = item;
        this.email = item.email;
        this.password = item.password;
      }
      this.dialog = true;
    },
    save() {
      if (!this.$refs.form.validate()) return false;
      if(this.password != null && this.password.length < 4)
        {
          this.passwordError = true;
          this.error = "Password must be at least 4 characters.";
          this.errorDialog = true;
          return false;
        }
        this.loading = true;

      api
        .save(
          this.selectedObject.id,
          this.email,
          this.password,
        )
        .then((res) => {
          this.loading = false;
          this.dialog = false;
          if (res.data.responseCode === 1) {
            if (this.selectedObject.id == -1) {
              this.data.push({
                id: res.data.data.id,
                email: this.email,
                password: this.password,
              });
            } else {
              var index = this.data.indexOf(this.selectedObject);
              this.data[index].email = this.email;
              this.data[index].password = this.password;
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
  },
};
