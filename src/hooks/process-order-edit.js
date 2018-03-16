// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    const { data } = context;

    var Ajv = require('ajv');
    var ajv = new Ajv({ allErrors: true });

    var schema = {
      "type": "object",
      "properties": {
        "_id": { "type": "string" },
        "status": { "type": "string" }
      },
      "required": ["_id", "status"],
      "additionalProperties": false
    };

    var validate = ajv.compile(schema);
    test(data);

    const findOrder = await context.app.service('/orders').find({
      query: {
        _id: data._id.toString()
      }
    });

    if (findOrder.total != 1) {
      throw new Error('The provided order does not exist in database');
    }

    return context;

    function test(testData) {
      var valid = validate(testData);
      if (valid) {
        //console.log('Valid!');
        return context;
      }
      else {
        //console.log('Invalid: ' + ajv.errorsText(validate.errors));
        throw new Error('Issue create failed: ' + ajv.errorsText(validate.errors));
      }
    }
  };
};
