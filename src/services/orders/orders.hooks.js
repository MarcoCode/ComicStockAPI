const search = require('feathers-nedb-fuzzy-search');

const processOrderCreate = require('../../hooks/process-order-create');

module.exports = {
  before: {
    all: [],
    find: [search()],
    get: [],
    create: [processOrderCreate()],
    update: [],
    patch: [],
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
