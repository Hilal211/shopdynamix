import axios from "./../../../plugins/http.service";
export default {
  addQuotation(data) {
    return axios.post("quotation/addquotation", data);
  },
  addQuotationLines(data) {
    return axios.post("quotation_lines/addquotationlines", data);
  },
};
