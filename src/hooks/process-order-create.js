// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    var stockToUpdate = [];
    const { data } = context;

    var Ajv = require('ajv');
    var ajv = new Ajv({ allErrors: true });

    var schema = {
      "type": "object",
      "properties": {

        "supplierID": { "type": "string", "pattern": "^[a-zA-Z0-9]{16}$" },
        "status": { "enum": ["Ordered", "Received", "Deleted", "Cancelled"] },

        "stocks": {
          "type": "array",
          "maxItems": 4,
          "items": {
            "type": "object",
            "properties": {
              "stockID": { "type": "string", "pattern": "^[a-zA-Z0-9]{16}$" },
              "quantity": { "type": "integer", "minimum": 1 }
            },
            "required": ["stockID", "quantity"],
            "additionalProperties": false
          }
        }
      },
      "required": ["supplierID", "status", "stocks"],
      "additionalProperties": false
    };

    var validate = ajv.compile(schema); 
    test(data);
    //checking if supplier exists in dtabase
    const findSupplier = await context.app.service('/suppliers').find({
      query: {
        _id: data.supplierID.toString()
      }
    });
    //throwing an error because supplier is not in database
    if (findSupplier.total != 1) {
      throw new Error('The provided supplier does not exist in database');
    }
    //validating each stock with the array of stocks
    for (var i = 0; i < data.stocks.length; i++) {
      //checking if the stock exists in db      
      const findstockID = await context.app.service('/stock').find({
        query: {
          _id: data.stocks[i].stockID.toString()
        }
      });

      //throwing an error if stock does not exist
      if (findstockID.total != 1)
        throw new Error(`the provided stock ID ${data.stocks[i].stockID} does not exist in database`);

      if (parseInt(findstockID.data[0].stockAvailable) < data.stocks[i].quantity) {
        throw new Error(`the quantity requested for the stock ${data.stocks[i].stockID} is greater than the quantity available in database`);
      }

      stockToUpdate[stockToUpdate.length] = findstockID.data[0];
      data.stocks[i].pricePaid = findstockID.data[0].price;
    }

    //updating quantity
    for(var i = 0; i < stockToUpdate.length; i++){
        let newQuantity = stockToUpdate[i].stockAvailable - data.stocks[i].quantity;

        let outcome = await context.app.service('/stock').patch(data.stocks[i].stockID, {
          stockAvailable: newQuantity
        }, {
            nedb: { upsert: false }
          });
    }

    function test(testData) {
      var valid = validate(testData);
      if (valid) {
        context.data = {
          supplierID: data.supplierID.toString(),
          status: data.status.toString(),
          orderDate: new Date(Date.now()).toLocaleString(),
          stocks: data.stocks
        }

      }
      else {        
        throw new Error('New Order failed: ' + ajv.errorsText(validate.errors));
      }
    }

    return context;



  };
};
