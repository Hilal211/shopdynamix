import axios from "../../../plugins/http.service";
export default {
  getQuotations() {
    return axios.get("quotation/getquotation");
  },
  // archive(data) {
  //   return axios.post("product/archive", data);
  // },
};
