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

        "issueId": { "type": "string" ,
        "pattern": "^[a-zA-Z0-9]{16}$" },

        "condition": { 
          "type": "string" ,
          "enum": [ "Poor" , "Average" , "Fine" , "Very Fine" ] },

        "stockAvailable": { "type": "integer" },

        "price": { "type": "number" },
      },

      "required": [ "issueId", "condition", "stockAvailable", "price" ],
      "additionalProperties": false
    };

    var validate = ajv.compile(schema);

    const findIssueID = await context.app.service('/issues').find({
      query: {
        _id:data.issueId.toString()
      }
    });

    if(findIssueID.total != 1){
    throw new errors.BadRequest(new Error('The provided issue does not exist in database, first create issue'));
    }

    const findExistingStock = await context.app.service('/stock').find({
      query: {
        issueId:data.issueId.toString(),
        condition:data.condition.toString()
      }
    });

    if(findExistingStock.total === 1){
    throw new errors.BadRequest(new Error('The database already contains stock of condition: '+data.condition.toString()+' for provided issue, update to change values'));
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
        throw new errors.BadRequest(new Error('Failed to create Stock: ' + ajv.errorsText(validate.errors)));
      }
    }
  };
};
