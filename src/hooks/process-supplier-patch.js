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

        "name": { "type": "string" },
        "city": { "type": "string" },
        "reference": { "type": "string" }
      },

      "required": [],
      "additionalProperties": false
    };

    var validate = ajv.compile(schema);
    test(data);


    if (context.id === undefined || context.id === null || context.id === "")
      throw new Error("Please specify a supplier ID in the url parameter");

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

      }
      else {
        throw new Error('Edit Supplier failed: ' + ajv.errorsText(validate.errors));
      }
    }
  };
};