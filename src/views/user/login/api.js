import axios from "./../../../plugins/http.service";
export default {
  login(data) {
    return axios.post("login/login", data);
  },
};
