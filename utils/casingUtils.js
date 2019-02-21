const camelCase = require("camelcase");
const decamelize = require("decamelize");

//the google sheets api seems to only respect kebab-casing, otherwise every column header is lower-cased and concatenated

const casingUtils = {
  kebabCaseToCamel: obj => {
    const objCopy = { ...obj };
    for (let key in objCopy) {
      //prevents deleting save, del, _links, and _xml keys
      if (!key.includes("-")) {
        continue;
      }
      const camelCasedKey = camelCase(key);
      delete Object.assign(objCopy, { [camelCasedKey]: objCopy[key] })[key];
    }
    return objCopy;
  },
  camelCaseToKebab: obj => {
    const objCopy = { ...obj };
    for (let key in objCopy) {
      const kebabCasedKey = decamelize(key, "-");
      //prevent deletion of single word keys
      if (kebabCasedKey !== key) {
        delete Object.assign(objCopy, { [kebabCasedKey]: objCopy[key] })[key];
      }
    }
    return objCopy;
  }
};

module.exports = casingUtils;
