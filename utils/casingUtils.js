const camelCase = require("camelcase");
const decamelize = require("decamelize");

const casingUtils = {
  kebabKeysToCamel: obj => {
    for (let oldKey in obj) {
      delete Object.assign(obj, { [camelCase(oldKey)]: obj[oldKey] })[oldKey];
    }
  },
  camelKeysToKebab: obj => {
    for (let oldKey in obj) {
      delete Object.assign(obj, { [decamelize(oldKey, "-")]: obj[oldKey] })[
        oldKey
      ];
    }
  }
};

module.exports = casingUtils;
