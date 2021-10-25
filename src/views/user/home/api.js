import axios from "./../../../plugins/http.service";
export default {
  getproducts() {
    return axios.get("product/getproduct");
  },

  getpp(data) {
    return axios.post("product/getpp", data);
  },
};


