const search = require('feathers-nedb-fuzzy-search');

const processOrderCreate = require('../../hooks/process-order-create');

const processOrderEdit = require('../../hooks/process-order-edit');

const processOrderDelete = require('../../hooks/process-order-delete');

module.exports = {
  before: {
    all: [],
    find: [search()],
    get: [],
    create: [processOrderCreate()],
    update: [processOrderEdit()],
    patch: [processOrderEdit()],
    remove: [processOrderDelete()]
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
