// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    const { data } = context;

    if(typeof context.id != "string")
    throw new Error('the specified id must be a string');

    var Ajv = require('ajv');
    var ajv = new Ajv({ allErrors: true });

    var schema = {
      "type": "object",
      "properties": {

        "issueId": { "type": "string", "pattern": "^[a-zA-Z0-9]{16}$" },
        "condition": { "enum": ["Poor", "Average", "Fine", "Very Fine"] },
        "stockAvailable": { "type": "integer" },
        "price": { "type": "number" },

      },

      "additionalProperties": false
    };

    var validate = ajv.compile(schema);

    const findIssueID = await context.app.service('/issues').find({
      query: {
        _id: data.issueId.toString()
      }
    });

    if (findIssueID.total != 1) {
      throw new Error('The provided issue does not exist in database, first create issue');
    }

    const findExistingStockaAndCondition = await context.app.service('/stock').find({
      query: {
        _id: context.id,
        condition: data.condition.toString()
      }
    });

    if (findExistingStockaAndCondition.total != 1) {
      throw new Error('The Condition of existing stock cannot be changed');
    }

    const findExistingStockaAndIssue = await context.app.service('/stock').find({
      query: {
        _id: context.id,
        issueId: data.issueId.toString()
      }
    });

    if (findExistingStockaAndIssue.total != 1) {
      throw new Error('The Issue associated to existing stock cannot be changed');
    }



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
