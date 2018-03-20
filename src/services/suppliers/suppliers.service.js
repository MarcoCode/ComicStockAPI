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

  //SWAGGER THINGY

  const events = createService(options)
  events.docs = {
    description: 'A service to perform crud operations on suppliers',
    //overwrite things here.
    //if we want to add a mongoose style $search hook to find, we can write this:
    find: {
      description:"Returns list of Active Suppliers",
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
          name: "supplier",
          description: "Supplier object",
          in: "body",
          required: true,
          schema: { $ref: '#/definitions/supplierCreate' }

        }
      ]
    },


    update: {
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
    //if we want to add the mongoose model to the 'definitions' so it is a named model in the swagger ui:
    definitions: {
      //event: mongooseToJsonLibraryYouImport(Model), //import your own library, use the 'Model' object in this file.
      // 'event list': { //this library currently configures the return documentation to look for ``${tag} list`
      //   type: 'array',
      //   schema: { $ref: '#/definitions/event' }
      // }
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
      }
    }
  }





  // Initialize our service with any options it requires
  //app.use('/suppliers', createService(options));
  app.use('/suppliers', events);


  // Get our initialized service so that we can register hooks and filters
  const service = app.service('suppliers');

  service.hooks(hooks);
};
