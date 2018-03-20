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
    description: 'A service to perform CRUD operations on Orders',

    find: {
      parameters: [
        {
          description: 'Number of results to return',
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
          description: 'Order ID',
          in: 'path',
          name: '_id',
          type: 'string',
          required: true
        },
        {
          name: "Order",
          description: "Order object",
          in: "body",
          required: true,
          schema: { $ref: '#/definitions/orderPatch' }

        }
      ]
    },

    get: {
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
      description: 'Changes the status of order to Cancelled, based on Provided Order ID (Soft Delete)',
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
          description: 'Order ID',
          in: 'path',
          name: '_id',
          type: 'string',
          required: true,
        },
        {
          name: "Order",
          description: "Order object",
          in: "body",
          required: true,
          schema: { $ref: '#/definitions/orderPatch' }

        }
      ]
    },
    definitions: {
      orderCreate: {

        "type": "object",
        "properties": {

          "supplierID": {
            "type": "string",
            "description": "ID of supplier providing the stock ordered",
            "pattern": "^[a-zA-Z0-9]{16}$"
          },

          "stocks": {
            "type": "array",
            "maxItems": 4,
            "items": {
              "type": "object",
              "properties": {
                "stockID": { "description": "ID of the stock ordered", "type": "string", "pattern": "^[a-zA-Z0-9]{16}$" },
                "quantity": { "description": "Quantity of the stock ordered", "type": "integer", "minimum": 1 }
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

          "supplierID": { "description": "ID of supplier providing the stock ordered", "type": "string", "pattern": "^[a-zA-Z0-9]{16}$" },
          "status": { "type": "string", "enum": ["Received", "Cancelled", "Returned"] },
        },
        "required": ["supplierID", "status", "stocks"]
      },

      orders: {

        "type": "object",
        "properties": {

          "supplierID": {
            "type": "string",
            "description": "ID of supplier providing the stock ordered",
            "pattern": "^[a-zA-Z0-9]{16}$"
          },

          "status": {
            "type": "string",
            "enum": ["Ordered", "Received", "Cancelled", "Returned"],
            "description": "The status of the order"
          },

          "orderDate": {
            "type": "string",
            "format": "date-time",
            "description": "The date the order was placed"
          },

          "dateModfied": {
            "type": "string",
            "format": "date-time",
            "description": "The date the order was modified"
          },

          "stocks": {
            "type": "array",
            "description": "Array of Stock items ordered",
            "maxItems": 4,
            "items": {
              "type": "object",
              "properties": {

                "stockID": {
                  "description": "ID of the stock ordered",
                  "type": "string",
                  "pattern": "^[a-zA-Z0-9]{16}$"
                },

                "quantity": {
                  "description": "Quantity of the stock ordered",
                  "type": "integer",
                  "minimum": 1
                },

                "pricePaid": {
                  "description": "Price of Stock Ordered",
                  "type": "number"
                }

              }
            }
          }
        }
      },
      'orders list': {

        "type": "object",
        "properties": {

          "supplierID": {
            "type": "string",
            "description": "ID of supplier providing the stock ordered",
            "pattern": "^[a-zA-Z0-9]{16}$"
          },

          "status": {
            "type": "string",
            "enum": ["Ordered", "Received", "Cancelled", "Returned"],
            "description": "The status of the order"
          },

          "orderDate": {
            "type": "string",
            "format": "date-time",
            "description": "The date the order was placed"
          },

          "dateModfied": {
            "type": "string",
            "format": "date-time",
            "description": "The date the order was modified"
          },

          "stocks": {
            "type": "array",
            "description": "Array of Stock items ordered",
            "maxItems": 4,
            "items": {
              "type": "object",
              "properties": {

                "stockID": {
                  "description": "ID of the stock ordered",
                  "type": "string",
                  "pattern": "^[a-zA-Z0-9]{16}$"
                },

                "quantity": {
                  "description": "Quantity of the stock ordered",
                  "type": "integer",
                  "minimum": 1
                },

                "pricePaid": {
                  "description": "Price of Stock Ordered",
                  "type": "number"
                }

              }
            }
          }
        }
      }
    }
  }

  // Initialize our service with any options it requires
  app.use('/orders', events);

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('orders');

  service.hooks(hooks);
};
