const issues = require('./issues/issues.service.js');
const suppliers = require('./suppliers/suppliers.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(issues);
  app.configure(suppliers);
};
