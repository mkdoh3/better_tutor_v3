import axios from "axios";
export default {
  getRows: function(tabNumber) {
    return axios.get(`/api/sheets/${tabNumber}`);
  }
};
