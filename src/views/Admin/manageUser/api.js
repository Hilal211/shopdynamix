import axios from "../../../plugins/http.service";
export default {
  save(id, email, password) {
    var form = new FormData();
    form.append("id", id);
    form.append("email", email);
    form.append("password", password);
    return axios.post("login/save", form);
  },
  getUsers() {
    return axios.get("login/getuser");
  },
  archive(data) {
    return axios.post("login/deletee", data);
  },
};
