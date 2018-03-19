const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const processSupplierDelete = require('../../src/hooks/process-supplier-delete');

describe('\'process-supplier-delete\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: processSupplierDelete()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
