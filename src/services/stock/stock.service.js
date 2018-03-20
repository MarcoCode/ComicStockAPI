// Initializes the `stock` service on path `/stock`
const createService = require('feathers-nedb');
const createModel = require('../../models/stock.model');
const hooks = require('./stock.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'stock',
    Model,
    paginate
  };

  const events = createService(options)
  events.docs = {
    description: 'A Service to perform CRUD operations on Stock',

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

    get: {
      parameters:
        [
          {
            name: "_id",
            description: "Stock ID",
            in: "path",
            required: true,
            type: 'string' , 
            "pattern": "^[a-zA-Z0-9]{16}$"              
          }
        ]
    },

    remove: {
      parameters:
        [
          {
            name: "_id",
            description: "Stock ID",
            in: "path",
            required: true,
            type: 'string' , 
            "pattern": "^[a-zA-Z0-9]{16}$"              
          }
        ]
    },

    create: {
      parameters:
        [
          {
            name: "Post Stock",
            description: "Stock Object",
            in: "body",
            required: true,
            schema: { $ref: '#/definitions/stockPOST' }
          }
        ]
    },

    update: {
      parameters:
        [
          {
            name: "_id",
            description: "Stock ID",
            in: "path",
            required: true,
            type: 'string' , 
            "pattern": "^[a-zA-Z0-9]{16}$"              
          },
          {
            name: "Stock Update",
            description: "Stock Object",
            in: "body",
            required: true,
            schema: { $ref: '#/definitions/stockUPDATE' }
          }
        ]
    },

    patch: {
      parameters:
        [
          {
            name: "_id",
            description: "Stock ID",
            in: "path",
            required: true,
            type: 'string' , 
            "pattern": "^[a-zA-Z0-9]{16}$"          
          },
          {
            name: "Stock Patch",
            description: "Stock Object",
            in: "body",
            required: true,
            schema: { $ref: '#/definitions/stockUPDATE' }
          }
        ]
    },

    definitions: {
      stockPOST: {
        "type": "object",
        "properties": {
  
          "issueId": { "type": "string",
          "description": "Database Id of the Issue linked to Stock Item", 
          "pattern": "^[a-zA-Z0-9]{16}$" },

          "condition": { "type": "string",
          "description": "Condition of the Stock item, can be: Poor, Average, Fine or Very Fine", 
          "enum": [ "Poor" , "Average" , "Fine" , "Very Fine" ] },

          "stockAvailable": { "type": "integer" ,
          "description": "Amount of Stock available"},

          "price": { "type": "number" ,
          "description": "Price of Stock item"},
  
        },
        "required": [ "issueId", "condition", "stockAvailable", "price" ],
        "additionalProperties": false
      },

      stockUPDATE :{
        "type": "object",
        "properties": {
  
          "issueId": { "type": "string",
          "description": "Database Id of the Issue linked to Stock Item", 
          "pattern": "^[a-zA-Z0-9]{16}$" },

          "condition": { "type": "string",
          "description": "Condition of the Stock item, can be: Poor, Average, Fine or Very Fine", 
          "enum": [ "Poor" , "Average" , "Fine" , "Very Fine" ] },

          "stockAvailable": { "type": "integer" ,
          "description": "Amount of Stock available"},

          "price": { "type": "number" ,
          "description": "Price of Stock item"},
  
        },
        "additionalProperties": false
      },

      stock: {
        "type": "object",
        "properties": {
  
          "issueId": { "type": "string",
          "description": "Database Id of the Issue linked to Stock Item", 
          "pattern": "^[a-zA-Z0-9]{16}$" },

          "condition": { "type": "string",
          "description": "Condition of the Stock item, can be: Poor, Average, Fine or Very Fine", 
          "enum": [ "Poor" , "Average" , "Fine" , "Very Fine" ] },

          "stockAvailable": { "type": "integer" ,
          "description": "Amount of Stock available"},

          "price": { "type": "number" ,
          "description": "Price of Stock item"},
  
        },
        "additionalProperties": false
      },

      'stock list': {
        "type": "object",
        "properties": {
  
          "issueId": { "type": "string",
          "description": "Database Id of the Issue linked to Stock Item", 
          "pattern": "^[a-zA-Z0-9]{16}$" },

          "condition": { "type": "string",
          "description": "Condition of the Stock item, can be: Poor, Average, Fine or Very Fine", 
          "enum": [ "Poor" , "Average" , "Fine" , "Very Fine" ] },

          "stockAvailable": { "type": "integer" ,
          "description": "Amount of Stock available"},

          "price": { "type": "number" ,
          "description": "Price of Stock item"},
  
        },
        "additionalProperties": false
      }
      
    }
  }

  // Initialize our service with any options it requires
  app.use('/stock', events);

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('stock');

  service.hooks(hooks);
};
