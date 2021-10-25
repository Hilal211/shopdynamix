import axios from "./../../../plugins/http.service";
export default {
  productDetails(data) {
    return axios.post("product/getproductdetails", data);
  },
};
