import axios from "axios";
export default {
  getRows: tabNumber => axios.get(`/api/sheets/${tabNumber}`),
  update: (updates, tableName) =>
    axios.post("/api/sheets/update", { updates, tableName })
};
