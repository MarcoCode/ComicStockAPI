const search = require('feathers-nedb-fuzzy-search');
const processIssueCreate = require('../../hooks/process-issue-create');
const processIssueEdit = require('../../hooks/process-issue-edit');

module.exports = {
  before: {
    all: [],
    find: [search()],
    get: [],
    create: [processIssueCreate()],
    update: [processIssueEdit()],
    patch: [processIssueEdit()],
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