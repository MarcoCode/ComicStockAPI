// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const errors = require('feathers-errors');
module.exports = function (options = {}) {
  return async context => {

    const { data } = context;

    console.log("dataaaa", context)
    var Ajv = require('ajv');
    var ajv = new Ajv({ allErrors: true });

    var schema = {
      "type": "object",
      "properties": {
        "status": { "enum": ["Received","Cancelled", "Returned"] }
      },
      "required": ["status"],
      "additionalProperties": false
    };

    var validate = ajv.compile(schema);
    test(data);

    if (context.id === undefined || context.id === null || context.id === "")
      throw new errors.BadRequest("Please specify a supplier ID in the url parameter");

    const findOrder = await context.app.service('/orders').find({
      query: {
        _id: context.id.toString()
      }
    });

    if (findOrder.total != 1) {
      throw new errors.NotFound('The provided order does not exist in database');
    }

    var newStatus = data.status;
    context.data = {};
    context.data = findOrder.data[0];
    context.data.status = newStatus;
    context.data.dateModfied = new Date(Date.now()).toLocaleString();

    return context;

    function test(testData) {
      var valid = validate(testData);
      if (valid) {
        //console.log('Valid!');
        return context;
      }
      else {
        //console.log('Invalid: ' + ajv.errorsText(validate.errors));
        throw new errors.BadRequest('Order edit failed: ' + ajv.errorsText(validate.errors));
      }
    }
  };
};
