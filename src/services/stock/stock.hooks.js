const search = require('feathers-nedb-fuzzy-search');
const processStockCreate = require('../../hooks/process-stock-create');
const processStockEdit = require('../../hooks/process-stock-edit');

module.exports = {
  before: {
    all: [],
    find: [search()],
    get: [],
    create: [processStockCreate()],
    update: [processStockEdit()],
    patch: [processStockEdit()],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
