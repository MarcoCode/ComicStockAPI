// Initializes the `stock` service on path `/stock`
const createService = require('feathers-nedb');
const createModel = require('../../models/stock.model');
const hooks = require('./stock.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'stock',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/stock', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('stock');

  service.hooks(hooks);
};
