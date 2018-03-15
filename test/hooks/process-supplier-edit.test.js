const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const processSupplierEdit = require('../../src/hooks/process-supplier-edit');

describe('\'process-supplier-edit\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: processSupplierEdit()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
