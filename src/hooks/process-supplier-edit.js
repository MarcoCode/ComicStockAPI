// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const errors = require('feathers-errors');
module.exports = function (options = {}) {
  return async context => {

    const { data } = context;

    var Ajv = require('ajv');
    var ajv = new Ajv({ allErrors: true });

    var schema = {
      "type": "object",
      "properties": {

        "name": { "type": "string" },
        "city": { "type": "string" },
        "reference": { "type": "string" },
        "status": { "type": "string", "enum": ["Active", "Inactive"] }
      },

      "required": ["name", "city", "reference"],
      "additionalProperties": false
    };

    var validate = ajv.compile(schema);
    test(data);

    if (context.id === undefined || context.id === null || context.id === "")
      throw new errors.BadRequest("Please specify a supplier ID in the url parameter");


    if (data.name.length === 0) {
      throw new errors.BadRequest('A supplier name must have at least 1 character');
    }
    if (data.city.length === 0) {
      throw new errors.BadRequest('A supplier city must have at least 1 character');
    }
    if (data.reference.length === 0) {
      throw new errors.BadRequest('A supplier reference must have at least 1 character');
    }

    if (context.id === undefined || context.id === null || context.id === "")
      throw new errors.BadRequest("Please specify a supplier ID in the url parameter");

    return context;

    function test(testData) {
      var valid = validate(testData);
      if (valid) {
        context.data = {
          name: data.name.toString(),
          city: data.city.toString(),
          reference: data.reference.toString(),
          status: "Active"
        }

      }
      else {
        throw new errors.BadRequest('Failed to edit Supplier: ' + ajv.errorsText(validate.errors));
      }
    }

  };
};
