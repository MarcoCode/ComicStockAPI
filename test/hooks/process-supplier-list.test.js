const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const processSupplierList = require('../../src/hooks/process-supplier-list');

describe('\'process-supplier-list\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      after: processSupplierList()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
