import api from "./api.js";
export default {
  name: "Login",
  data() {
    return {
      admin: JSON.parse(localStorage.getItem("admin")),
      errors: [],
      emailError: false,
      passwordError: false,
      show: false,
      password: null,
      email: null,
    };
  },
  mounted() {
    if (this.admin) {
      this.$router.push({ name: "product" });
      return;
    }
  },
  methods: {
    submit: function(e) {
      e.preventDefault();

      this.emailError = false;
      this.passwordError = false;

      this.errors = [];
      if (!this.password) {
        this.errors[1] = "You did not enter a password";
        this.passwordError = true;
      }
      if (!this.email) {
        this.errors[0] = "A valid email address is required";
        this.emailError = true;
      } else if (!this.$store.state.validEmail(this.email)) {
        this.errors[0] = "The email address you entered is invalid";
        this.emailError = true;
      }

      if (!this.errors.length) {
        let formData = new FormData();
        formData.append("email", this.email);
        formData.append("password", this.password);
        api
          .login(formData)
          .then((res) => {
            console.log("r", this.email, this.password);
            if (res.data.responseCode === 1) {
              const parsed = JSON.stringify(res.data.data.login);
              localStorage.setItem("admin", parsed);
              this.$router.replace({
                name: "product",
              });
              console.log("vv", res);
            } else {
              this.errors.push(res.data.responseMessage);
            }
          })
          .catch((error) => {
            this.errors.push(error);
          });
      }
    },
  },
};
