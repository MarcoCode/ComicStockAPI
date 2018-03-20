// Initializes the `orders` service on path `/orders`
const createService = require('feathers-nedb');
const createModel = require('../../models/orders.model');
const hooks = require('./orders.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'orders',
    Model,
    paginate
  };

  const events = createService(options)

  events.docs = {
    description: 'A service to perform crud operation on Order',
    //overwrite things here.
    //if we want to add a mongoose style $search hook to find, we can write this:
    find: {
      parameters: [
        {
          description: 'Number of results to returns',
          in: 'query',
          name: '$limit',
          type: 'integer'
        },
        {
          description: 'Number of results to skip',
          in: 'query',
          name: '$skip',
          type: 'integer'
        },
        {
          description: 'Property to sort results',
          in: 'query',
          name: '$sort',
          type: 'string'
        },
        {
          description: 'Property to query results',
          in: 'query',
          name: '$search',
          type: 'string'
        }
      ]
    },

    create: {
      parameters: [
        {
          name: "Order",
          description: "Order object",
          in: "body",
          required: true,
          schema: { $ref: '#/definitions/orderCreate' }

        }
      ]
    },


    update: {
      description: 'Changes the status of order, based on Provided Order ID',
      parameters: [
        {
          name: "Order",
          description: "Order object",
          in: "body",
          required: true,
          schema: { $ref: '#/definitions/orderPatch' }

        },
        {
          description: 'Order ID',
          in: 'path',
          name: '_id',
          type: 'string',
          required: true
        }

      ]
    },
    get: {
      description: 'Changes the status of order, based on Provided Order ID',
      parameters: [
        {
          description: 'Order ID',
          in: 'path',
          name: '_id',
          type: 'string',
          required: true
        }
      ]
    },
    remove: {
      description: 'Changes the status of order to Cancelled, based on Provided Order ID',
      parameters: [
        {
          description: 'Order ID',
          in: 'path',
          name: '_id',
          type: 'string',
          required: true
        }
      ]
    },


    patch: {
      description: 'Changes the status of order, based on Provided Order ID',
      parameters: [
        {
          name: "Order",
          description: "Order  object",
          in: "body",
          required: true,
          schema: { $ref: '#/definitions/orderPatch' }

        },
        {
          description: 'Order ID',
          in: 'path',
          name: '_id',
          type: 'string',
          required: true,
        }
      ]
    },
    //if we want to add the mongoose model to the 'definitions' so it is a named model in the swagger ui:
    definitions: {
      //event: mongooseToJsonLibraryYouImport(Model), //import your own library, use the 'Model' object in this file.
      // 'event list': { //this library currently configures the return documentation to look for ``${tag} list`
      //   type: 'array',
      //   schema: { $ref: '#/definitions/event' }
      // }
      orderCreate: {

        "type": "object",
        "properties": {

          "supplierID": { "description":"ID of supplier providing the stock ordered", "type": "string", "pattern": "^[a-zA-Z0-9]{16}$" },
          "stocks": {
            "type": "array",
            "maxItems": 4,
            "items": {
              "type": "object",
              "properties": {
                "stockID": {"Description":"ID of the stock ordered", "type": "string", "pattern": "^[a-zA-Z0-9]{16}$" },
                "quantity": { "Description":"Quantity of the stock ordered","type": "integer", "minimum": 1 }
              },
              "required": ["stockID", "quantity"],
            }
          }
        },
        "required": ["supplierID", "stocks"]
      },
      orderPatch: {

        "type": "object",
        "properties": {

          "supplierID": { "description":"ID of supplier providing the stock ordered", "type": "string", "pattern": "^[a-zA-Z0-9]{16}$" },
          "status": {  "type": "string", "enum": ["Received", "Cancelled","Returned"] },
        },
        "required": ["supplierID", "status", "stocks"]
      }
    }
  }

  // Initialize our service with any options it requires
  app.use('/orders', events);

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('orders');

  service.hooks(hooks);
};
