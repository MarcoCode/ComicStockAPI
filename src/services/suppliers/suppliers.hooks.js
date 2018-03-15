
const search = require('feathers-nedb-fuzzy-search')
const processSupplierCreate = require('../../hooks/process-supplier-create');
const processSupplierEdit = require('../../hooks/process-supplier-edit');
module.exports = {
  before: {
    all: [],
    find: [search()],
    get: [],
    create: [processSupplierCreate()],
    update: [processSupplierEdit()],
    patch: [processSupplierEdit()],
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
