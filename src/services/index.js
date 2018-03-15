const issues = require('./issues/issues.service.js');
const stock = require('./stock/stock.service.js');
const orders = require('./orders/orders.service.js');
const suppliers = require('./suppliers/suppliers.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(issues);
  app.configure(stock);
  app.configure(orders);
  app.configure(suppliers);
};
