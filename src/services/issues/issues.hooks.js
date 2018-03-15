const search = require('feathers-nedb-fuzzy-search');
const processNewIssue = require('../../hooks/process-new-issue');

module.exports = {
  before: {
    all: [],
    find: [search()],
    get: [],
    create: [processNewIssue()],
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