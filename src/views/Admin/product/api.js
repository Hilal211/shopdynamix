import axios from "../../../plugins/http.service";
export default {
  save(id, name, summary, price, quantity, image) {
    var form = new FormData();
    form.append("id", id);
    form.append("name", name);
    form.append("summary", summary);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("image", image);
    return axios.post("product/save", form);
  },
  getUsers() {
    return axios.get("product/getproduct");
  },
  archive(data) {
    return axios.post("product/archive", data);
  },
  saveExcel(data) {
    return axios.post("product/aploadexcel", data);
  },

};
