import api from "./api.js";
export default {
  name: "login",
  data: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    loginInfo: {
      email: null,
      password: null,
      email_details: true,
      password_details: true,
    },
    invalidEmail: false,
    confirmedEmail: false,
    required: [(v) => !!v || "This field is required"],
  }),
  methods: {
    login() {
      if (!this.$refs.form.validate()) {
        if (
          this.loginInfo.email &&
          this.$store.state.validEmail(this.loginInfo.email.trim())
        )
          this.loginInfo.email_details = true;
        else this.loginInfo.email_details = false;

        if (this.loginInfo.password) this.loginInfo.password_details = true;
        else this.loginInfo.password_details = false;

        return false;
      }
      let msg;
      let formData = new FormData();
      formData.append("email", this.loginInfo.email);
      formData.append("password", this.loginInfo.password);
      api.login(formData).then((res) => {
        msg = res.data.responseMessage;
        if (msg === "success") {
          localStorage.setItem("user", JSON.stringify(res.data.data.login));
          this.$router.push({ name: "home" });
        } else {
          alert(msg);
        }
      });
    },
  },
  computed: {
    emailRule() {
      return [
        (v) => !!v || "This field is required",
        this.$store.state.validEmail(this.loginInfo.email) ||
          `Email address is not valid`,
        // !this.existEmail || "Email address exist",
      ];
    },
  },
  mounted() {
    if (this.user) {
      this.$router.push({ name: "home" });
      return;
    }
  },
  watch: {
    "loginInfo.email"(newVal) {
      if (newVal && this.$store.state.validEmail(newVal.trim()))
        this.loginInfo.email_details = true;
      else this.loginInfo.email_details = false;
    },
    "loginInfo.password"(newVal) {
      if (newVal) this.loginInfo.password_details = true;
      else this.loginInfo.password_details = false;
    },
  },
};
