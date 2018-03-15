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
        "title": { "type": "string" },
        "series": { "type": "string" },
        "description": { "type": "string" },
        "publisherString": { "type": "string" },
        "publicationDate": { "type": "string", "format": "date-time" },

        "thumbnail": {
          "type": "object",
          "properties": {
            "path": { "type": "string" },
            "extension": { "type": "string" },
          },
          "required": ["path", "extension"],
          "additionalProperties": false
        },

        "images": {
          "type": "array",
          "maxItems": 150,
          "items": {
            "type": "object",
            "properties": {
              "path": { "type": "string" },
              "extension": { "type": "string" }
            },
            "required": ["path", "extension"],
            "additionalProperties": false
          }
        }
      },
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
        throw new Error('Issue edit failed: ' + ajv.errorsText(validate.errors));
      }
    }
  };
};
