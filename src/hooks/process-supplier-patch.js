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
        "status": { "enum": ["Active", "Inactive"] }
      },

      "required": [],
      "additionalProperties": false
    };

    var validate = ajv.compile(schema);
    test(data);


    if (context.id === undefined || context.id === null || context.id === "")
      throw new errors.BadRequest("Please specify a supplier ID in the url parameter");

    return context;

    function test(testData) {
      var valid = validate(testData);
      if (valid) {

        context.data = {};

        if (data.name !== undefined && data.name !== null && data.name !== "") {
          context.data.name = data.name.toString();
        }
        if (data.city !== undefined && data.city !== null && data.city !== "") {
          context.data.city = data.city.toString();
        }
        if (data.reference !== undefined && data.reference !== null && data.reference !== "") {
          context.data.reference = data.reference.toString();
        }
        if (data.status !== undefined && data.status !== null && data.status !== "") {
          context.data.status = data.status.toString();
        }

      }
      else {
        throw new errors.BadRequest('Patch Supplier failed: ' + ajv.errorsText(validate.errors));
      }
    }
  };
};
