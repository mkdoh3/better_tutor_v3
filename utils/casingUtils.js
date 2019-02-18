const camelCase = require("camelcase");
const decamelize = require("decamelize");

const casingUtils = {
  kebabCaseToCamel: obj => {
    for (let oldKey in obj) {
      delete Object.assign(obj, { [camelCase(oldKey)]: obj[oldKey] })[oldKey];
    }
  },
  camelCaseToKebab: obj => {
    for (let oldKey in obj) {
      delete Object.assign(obj, { [decamelize(oldKey, "-")]: obj[oldKey] })[
        oldKey
      ];
    }
  }
};

module.exports = casingUtils;
