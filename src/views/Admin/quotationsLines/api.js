import axios from "../../../plugins/http.service";
export default {
  quotationlineswithproduct(data) {
    return axios.post("quotation_lines/quotationlineswithproduct", data);
  },
};
