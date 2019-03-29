import axios from "axios";
async function Get(url) {
  try {
    const response = await axios.get(`/api/${url}`);
    return response;
  } catch (err) {
    throw new Error("this is a get error!" + err);
  }
}

async function Post(url, params = {}) {
  try {
    const response = await axios.post(`/api/${url}`, params);
    return response;
  } catch (err) {
    throw new Error(err);
  }
}
async function Delete(url, params = {}) {
  try {
    const response = await axios.delete(`/api/${url}`, params);
    return response;
  } catch (err) {
    throw new Error(err);
  }
}

// This is good. One final thing you could do
// is save 'sheets' url under a URLs or API const,
// and even the sub urls should be saved in there.
export default {
  getSheetData: tab => {
    return Get(`sheets/tab/${tab}`);
  },
  getSessionData: () => {
    return Get(`sheets/sessions`);
  },
  updateSheet: (updates, tableName) => {
    return Post(`sheets/update`, { updates, tableName });
  },
  deleteRow: id => {
    return Delete("sheets/session", { data: { id: `${id}` } });
  }
};
