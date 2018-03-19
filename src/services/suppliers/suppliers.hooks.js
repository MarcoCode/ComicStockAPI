
const search = require('feathers-nedb-fuzzy-search')
const processSupplierCreate = require('../../hooks/process-supplier-create');
const processSupplierEdit = require('../../hooks/process-supplier-edit');
const processSupplierPatch = require('../../hooks/process-supplier-patch');
const processSupplierDelete = require('../../hooks/process-supplier-delete');
const processSupplierList = require('../../hooks/process-supplier-list');
module.exports = {
  before: {
    all: [],
    find: [search()],
    get: [],
    create: [processSupplierCreate()],
    update: [processSupplierEdit()],
    patch: [processSupplierPatch()],
    remove: [processSupplierDelete()]
  },

  after: {
    all: [],
    find: [processSupplierList()],
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
