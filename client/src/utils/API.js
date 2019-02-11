import axios from "axios";
export default {
  getRows: tabNumber => axios.get(`/api/sheets/${tabNumber}`),
  update: updates => axios.post("/api/sheets/update", { updates })
};
