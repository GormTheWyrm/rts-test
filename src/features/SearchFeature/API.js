import axios from "axios";
const baseURL = 'https://hn.algolia.com/api/v1/search?query=';

export default {
  search: function(query, parameters) {
    return axios.get(baseURL + query + parameters);
  }
};