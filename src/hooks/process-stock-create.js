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

        "issueId": { "type": "string" , "pattern": "^[A-Za-z0-9_-]{16}*$" },
        "condition": { "enum": [ "Poor" , "Average" , "Fine" , "Very Fine" ] },
        "stockAvailable": { "type": "integer" },
        "price": { "type": "number" },

      },

      "required": [ "issueId", "condition", "stockAvailable", "price" ],
      "additionalProperties": false
    };

    var validate = ajv.compile(schema);

    test(data);

    function test(testData) {
      var valid = validate(testData);
      if (valid) {
        console.log('Valid!');
        return context;
      }
      else {
        console.log('Invalid: ' + ajv.errorsText(validate.errors));
        throw new Error('Stock create failed: ' + ajv.errorsText(validate.errors));
      }
    }
  };
};
