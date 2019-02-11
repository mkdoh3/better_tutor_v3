import axios from "axios";
// MB: This is a good start to an abstraction layer, however
// I think you may eventually need to do more with this other than
// simple GET or POST. The method names may end up being too general
// for you when you start to add more methods as your application grows.

// MB: Put these in a types directory
const namespace = 'api';

const APIRoutes = Object.freeze({
  GET_SHEETS: `/${namespace}/sheets/`,
  UPDATE_SHEETS: `/${namespace}/sheets/update`,
});

const ErrorMessage = (source, error) => throw new Error(`[Source: ${source}] Error: ${error}`);

export default {
  getRows: async (tabNumber) => {
    // MB: Return the promise, else catch the error
    // right here in your API call.
    try {
      const result = await axios.get(APIRoutes.GET_SHEETS + tabNumber);

      return result;
    } catch(error) {
      ErrorMEssage('API.js', error);
    }
  },

  update: async (updates) => {
    try {
      const result = await axios.post(APIRoutes.UPDATE_SHEETS, { updates });

      return result;
    } catch(e) {
      ErrorMEssage('API.js', error);
    }
  },
};
