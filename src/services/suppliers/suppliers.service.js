// Initializes the `suppliers` service on path `/suppliers`
const createService = require('feathers-nedb');
const createModel = require('../../models/suppliers.model');
const hooks = require('./suppliers.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'suppliers',
    Model,
    paginate
  };

  const events = createService(options)
  events.docs = {
    description: 'A Service to perform CRUD operations on Suppliers',

    find: {
      description: "Returns list of Active Suppliers",
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
      description: "Creates a Supplier, an automatically sets its status to Active ",
      parameters: [
        {
          name: "supplier",
          description: "Supplier object",
          in: "body",
          required: true,
          schema: { $ref: '#/definitions/supplierCreate' }

        }
      ]
    },


    update: {
      "description": "Edits a Supplier, an automatically sets its status to Active ",
      parameters: [
        {
          name: "supplier",
          description: "Supplier object",
          in: "body",
          required: true,
          schema: { $ref: '#/definitions/supplierCreate' }

        },
        {
          description: 'Supplier ID',
          in: 'path',
          name: '_id',
          type: 'string',
          required: true
        }

      ]
    },
    get: {
      "description": "Returns Supplier Details, based on provided ID",
      parameters: [
        {
          description: 'Supplier ID',
          in: 'path',
          name: '_id',
          type: 'string',
          required: true
        }
      ]
    },
    remove: {
      "description": "Sets the status of the provided Supplier to Inactive",
      parameters: [
        {
          description: 'Supplier ID',
          in: 'path',
          name: '_id',
          type: 'string',
          required: true
        }
      ]
    },


    patch: {
      parameters: [
        {
          name: "supplier",
          description: "Supplier object",
          in: "body",
          required: true,
          schema: { $ref: '#/definitions/supplierPatch' }

        },
        {
          description: 'Supplier ID',
          in: 'path',
          name: '_id',
          type: 'string',
          required: true,
        }
      ]
    },

    definitions: {

      supplierCreate: {
        "type": "object",
        "required": [
          "city", "reference", "name"
        ],
        "properties": {
          "name": {
            "type": "string",
            "description": "Supplier Name"
          },
          "city": {
            "type": "string",
            "description": "Supplier City"
          },
          "reference": {
            "type": "string",
            "description": "Supplier Reference"
          }
        }
      },
      supplierPatch: {
        "type": "object",
        "required": [],
        "properties": {
          "name": {
            "type": "string",
            "description": "Supplier Name"
          },
          "city": {
            "type": "string",
            "description": "Supplier City"
          },
          "reference": {
            "type": "string",
            "description": "Supplier Reference"
          },
          "status": { "type": "string", "enum": ["Active", "Inactive"] }
        }
      },
      'suppliers list': {
        "type": "object",
        "required": [],
        "properties": {
          "name": {
            "type": "string",
            "description": "Supplier Name"
          },
          "city": {
            "type": "string",
            "description": "Supplier City"
          },
          "reference": {
            "type": "string",
            "description": "Supplier Reference"
          },
          "status": { "type": "string", "enum": ["Active", "Inactive"] }
        }
      },
      suppliers: {
        "type": "object",
        "required": [],
        "properties": {
          "name": {
            "type": "string",
            "description": "Supplier Name"
          },
          "city": {
            "type": "string",
            "description": "Supplier City"
          },
          "reference": {
            "type": "string",
            "description": "Supplier Reference"
          },
          "status": { "type": "string", "enum": ["Active", "Inactive"] }
        }
      }

    }
  }





  // Initialize our service with any options it requires
  app.use('/suppliers', events);


  // Get our initialized service so that we can register hooks and filters
  const service = app.service('suppliers');

  service.hooks(hooks);
};
