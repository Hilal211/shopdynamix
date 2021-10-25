import axios from "./../../../plugins/http.service";
export default {
  login(data) {
    return axios.post('admin/login/',data);
  },
};
