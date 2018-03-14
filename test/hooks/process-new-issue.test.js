const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const processNewIssue = require('../../src/hooks/process-new-issue');

describe('\'process-new-issue\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: processNewIssue()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
