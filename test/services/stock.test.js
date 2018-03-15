const assert = require('assert');
const app = require('../../src/app');

describe('\'stock\' service', () => {
  it('registered the service', () => {
    const service = app.service('stock');

    assert.ok(service, 'Registered the service');
  });
});
