const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const processSupplierPatch = require('../../src/hooks/process-supplier-patch');

describe('\'process-supplier-patch\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: processSupplierPatch()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
