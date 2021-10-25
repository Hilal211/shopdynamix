import axios from "axios";


let API_ENDPOINT = "http://localhost:8080/api/web/index.php?r=";   /// local

let config = {
  baseURL: `${API_ENDPOINT}`,
};

const httpClient = axios.create(config);

const URL = "http://localhost/loginProject/";


export { URL };
export default httpClient;

